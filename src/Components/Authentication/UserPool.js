import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_UVqcmOCeb',
    ClientId: '3dc45up4nratv28q4fa19rmshu'
};
export default new CognitoUserPool(poolData);