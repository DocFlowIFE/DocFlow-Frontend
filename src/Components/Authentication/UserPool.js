import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_lHOLkJAd9',
    ClientId: '70b4ivddaped43kolp54ipno9i'
};
export default new CognitoUserPool(poolData);