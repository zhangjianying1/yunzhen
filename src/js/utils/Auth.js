
export default class Auth{
    getToken(){
        "use strict";
        let cookie = document.cookie;
        console.log(cookie);
        return localStorage.getItem('token');
    }
    setToken(token){
        "use strict";
        localStorage.setItem('token', token);
    }
}