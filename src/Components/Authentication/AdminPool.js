import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_tmsXkeGKZ',
    ClientId: '27ddoclkmvhta4mgre7ohar9a5'
};
export default new CognitoUserPool(poolData);