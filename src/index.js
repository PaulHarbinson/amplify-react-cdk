import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {CdkBackendStack} from './cdk-exports.json';

// const CDKConfig = {
//   "aws_appsync_graphqlEndpoint": CdkBackendStack.awsappsyncgraphqlEndpoint,
//   "aws_appsync_authenticationType": CdkBackendStack.awsappsyncauthenticationType,
//   "aws_appsync_apiKey": CdkBackendStack.awsappsyncapiKey
// }

// Amplify.configure({
//   ...config, CDKConfig
// })

Amplify.configure({
  "aws_project_region": "eu-west-1",
  "aws_cognito_identity_pool_id": "",
  "aws_cognito_region": "eu-west-1",
  "aws_user_pools_id": "eu-west-",
  "aws_user_pools_web_client_id": "",
  "oauth": {},
  "aws_appsync_apiKey": "",
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
