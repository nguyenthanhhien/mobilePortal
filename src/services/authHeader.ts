export function getAuth() {
    // return authorization header with basic auth credentials
    let userStorage = localStorage.getItem('Authdata');
    if (userStorage) {
        let authdata = JSON.parse(userStorage.toString());

        if (authdata) {
            return 'Basic ' + authdata;
        } else {
            return "";
        }
    }
    return "";

}