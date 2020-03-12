import * as constant from './constant'
import axios from 'axios';
export const authService = {
    login,
    logout,
    clearStorage
};

function login(commonServerName: string, username: string, password: string) {
    return axios.post<number>(`/authorization/authenticate`, JSON.stringify({ commonServerName, username, password }))
        //.then(handleResponse)
        .then(result => {
            // login successful if there's a user in the response
            if (result && result?.data == constant.loginStatus.Success) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                let authdata = window.btoa(username + ':' + password + ':' + commonServerName);
                localStorage.setItem('Authdata', JSON.stringify(authdata));
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
    localStorage.removeItem('Authdata');
}

function handleResponse(response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}