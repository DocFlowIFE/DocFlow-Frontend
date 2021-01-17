import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_gLVHRdHaj',
    ClientId: '5jaofo35nn8colstv4ol5jbg0g'
};
export default new CognitoUserPool(poolData);