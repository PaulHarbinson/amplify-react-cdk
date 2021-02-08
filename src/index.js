import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import {CdkBackendStack} from '../cdk-exports.json';

const CDKConfig = {
  aws_appsync_graphqlEndpoint: CdkBackendStack.awsappsyncgraphqlEndpoint,
  aws_appsync_authenticationType: CdkBackendStack.aws_appsync_authenticationType,
  aws_appsync_apiKey: CdkBackendStack.aws_appsync_apiKey
}

Amplify.configure({
  ...config, CDKConfig
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
