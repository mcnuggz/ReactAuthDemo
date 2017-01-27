class Auth{
    //authenticate user, save token in local storage
    static authenticateUser(token){
        localStorage.setItem('token', token);
    }

    //validate user and check if token is saved
    static isUserAuthenticated(){
        return localStorage.getItem('token') !== null;
    }

    //deauthenticate user and remove token
    static deauthenticateUser(){
        localStorage.removeItem('token');
    }

    //get token value
    static getToken(){
        return localStorage.getItem('token');
    }
}

export default Auth;