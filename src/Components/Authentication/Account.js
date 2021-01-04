import { React, createContext } from 'react';
import UserPool from './UserPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const Account = props => {
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(session);
                    }
                })
            } else {
                reject();
            }
        });
    };

    const authenticate = async (email, password) => {
        return await new Promise((resolve, reject) => {
            var userData = { Username: email, Pool: UserPool, };
            var authenticationDetails = new AuthenticationDetails(
                { Username: email, Password: password }
            );
            var cognitoUser = new CognitoUser(userData);
            cognitoUser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
            
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: result => {
                    resolve(result);
                },
                onFailure: err => {
                    reject("Invalid email or password.");
                },
                mfaRequired: () => {
                    reject("Please verify account.");
                },
            });
        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user)
        {
            user.signOut();
        }
    }

    return (
        <AccountContext.Provider value={{authenticate, getSession, logout}}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };