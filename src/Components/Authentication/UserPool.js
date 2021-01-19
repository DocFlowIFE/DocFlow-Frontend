import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_o9wxSVAVP',
    ClientId: '482avgqgv59o0ms0011clackrs'
};
export default new CognitoUserPool(poolData);