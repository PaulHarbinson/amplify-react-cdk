import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {CdkBackendStack} from './cdk-exports.json';

const CDKConfig = {
  aws_appsync_graphqlEndpoint: CdkBackendStack.awsappsyncgraphqlEndpoint,
  aws_appsync_authenticationType: CdkBackendStack.aws_appsync_authenticationType,
  aws_appsync_apiKey: CdkBackendStack.aws_appsync_apiKey
}

Amplify.configure({
  "aws_project_region": "eu-west-1",
  "aws_cognito_identity_pool_id": "eu-west-1:7cf44034-ac23-41c5-9fb1-b71c727d4d14",
  "aws_cognito_region": "eu-west-1",
  "aws_user_pools_id": "eu-west-1_Dbw9wRPAX",
  "aws_user_pools_web_client_id": "1aei85ab3q4fo8tab3a0ts8hu4",
  "oauth": {},
  "aws_appsync_apiKey": "da2-onrvevjuizewtjryaobxe2vbbq",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_graphqlEndpoint": "https://47e4anvyhfg4nnvkw72qhmcrcu.appsync-api.eu-west-1.amazonaws.com/graphql"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
