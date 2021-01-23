import { React, createContext } from 'react';
import UserPool from './UserPool';
import AdminPool from './AdminPool';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

const AccountContext = createContext();

const Account = props => {
    const getSession = async (asAdmin = false) => {
        return await new Promise((resolve, reject) => {
            var user = UserPool.getCurrentUser();
            if (asAdmin)
            {
                user = AdminPool.getCurrentUser();
            }
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject();
                    } else {
                        let token = session.idToken.jwtToken;
                        resolve(token);
                    }
                })
            } else {
                reject();
            }
        });
    };

    const authenticate = async (email, password, asAdmin = false) => {
        return await new Promise((resolve, reject) => {
            if(!email || !password)
            {
                reject("Invalid email or password.");
            }

            var userData = { Username: email, Pool: UserPool, };
            if(asAdmin)
            {
                userData = { Username: email, Pool: AdminPool, };
            } 
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
        const admin = AdminPool.getCurrentUser();
        if (user)
        {
            user.signOut();
        }
        if (admin)
        {
            admin.signOut();
        }
    }

    return (
        <AccountContext.Provider value={{authenticate, getSession, logout}}>
            {props.children}
        </AccountContext.Provider>
    );
};

export { Account, AccountContext };