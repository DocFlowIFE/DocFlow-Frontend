import { CognitoUserPool } from 'amazon-cognito-identity-js';

var poolData = {
    UserPoolId: 'us-east-1_L8CsQCf4O',
    ClientId: '3sj7psi8v4mh34gu0ido12gb7u'
};
export default new CognitoUserPool(poolData);