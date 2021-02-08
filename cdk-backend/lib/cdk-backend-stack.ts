import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda'
import * as cognito from '@aws-cdk/aws-cognito';

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const userPool = cognito.UserPool.fromUserPoolId(
      this,
      'amplify-user-pool',
      "eu-west-1_Dbw9wRPAX"
    )

    const api = new appsync.GraphqlApi(this, 'Api', {
      name: 'cdk-blog-api',
      schema: appsync.Schema.fromAsset('graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: 'default',
            description: 'default auth mode',
          }
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool
            }
          }
        ]
      },
      xrayEnabled: true,
    });

    // Print out the AppSync GraphQL API URL to the terminal
    new cdk.CfnOutput(this, "aws_appsync_graphqlEndpoint", {
      value: api.graphqlUrl
    });

    // Print out the AppSync GraphQL API Key to the terminal
    new cdk.CfnOutput(this, "aws_appsync_apiKey", {
      value: api.apiKey || ''
    });

    new cdk.CfnOutput(this, "aws_appsync_authenticationType", {
      value: "API_KEY"
    });

    const blogLambda = new lambda.Function(this, 'AppSyncBlogHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambda-functions'),
      memorySize: 1024
    });

    // Set the lambda function as the data source for the AppSync API
    const lambdaDS = api.addLambdaDataSource('lambdaDatasource', blogLambda);

    lambdaDS.createResolver({
      typeName: "Query",
      fieldName: "getPostById"
    });

    lambdaDS.createResolver({
      typeName: "Query",
      fieldName: "listPosts"
    });

    lambdaDS.createResolver({
      typeName: "Mutation",
      fieldName: "createPost"
    });

    lambdaDS.createResolver({
      typeName: "Mutation",
      fieldName: "deletePost"
    });

    lambdaDS.createResolver({
      typeName: "Mutation",
      fieldName: "updatePost"
    });

    const postsTable = new dynamodb.Table(this, 'CDKPostsTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    // enable the lambda function to access to DynamoDB table (using IAM)
    postsTable.grantFullAccess(blogLambda)

    // create an environment variable required for use in the lamba function code
    blogLambda.addEnvironment('POSTS_TABLE', postsTable.tableName);

  }
}
