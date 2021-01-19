import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_ckTe96QJo',
    ClientId: '33nv5uu5m33eothmbpqrtnbknp'
};
export default new CognitoUserPool(poolData);