import { AuthModel} from '../models/models'
// return the user data from the session storage
export const getUser = () => {
    let sessionObjectString = sessionStorage.getItem('sessionObject')
    if(sessionObjectString){
        let sessionObject: AuthModel = JSON.parse(sessionObjectString)
        if (sessionObject) {
            return sessionObject.userName;
        }
    }
    return '';
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('sessionObject');
}

// set the token and user from the session storage
export const setUserSession = (name: string, token: string, expire: Date) => {
    let sessionObject: AuthModel = {
        userName: name,
        token: token,
        expire: expire
    } 
    sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
}