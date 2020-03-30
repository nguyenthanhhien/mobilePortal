import * as constant from './constant'
import axios from 'axios';
export const authService = {
    login,
    logout,
    clearStorage,
    getServerName,
    getUserName
};

function login(commonServerName: string, username: string, password: string) {
    return axios.post<number>(`/authorization/authenticate`, JSON.stringify({ commonServerName, username, password }))
        .then(result => {
            // login successful if there's a user in the response
            if (result && result?.data == constant.loginStatus.Success) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                let authdata = window.btoa(username + ':' + password + ':' + commonServerName);
                sessionStorage.setItem('Username', username);
                sessionStorage.setItem('ServerName', commonServerName);
                sessionStorage.setItem('Authdata', JSON.stringify(authdata));
            }
            return result?.data
        });
}

function logout() {
    // remove user from local storage to log user out
    clearStorage()
    window.location.reload(true);
}

function clearStorage() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('Authdata');
}

function getUserName(){
    
    var username = sessionStorage.getItem('Username')
    return username ? username : ''
}

function getServerName(){
    var serverName = sessionStorage.getItem('ServerName')
    return serverName ? serverName : ''
}
