import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_eOTU2WB9L',
    ClientId: '2jiutd84t06jv2v7trqureh6hf'
};
export default new CognitoUserPool(poolData);