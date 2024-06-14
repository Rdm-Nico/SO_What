/*
     The service uses Axios for HTTP requests and Local Storage for user information & JWT.
    It provides following important functions:
    - login(): POST {username, password} & save JWT to Local Storage
    - logout(): remove JWT from Local Storage
    - register(): POST {username, email, password}
    - getCurrentUser(): get stored user information (including JWT)
* */

import http from "../common/http-common"
import TokenService from "./token.service";


const register = (username, password, roles) => {
    return http.post("/auth/signup", {
        username,
        password,
        roles
    });
};

const login = (username, password) => {
    return http.post("/auth/signin", {
        username,
        password
    })
        .then((response) => {
            if(response.data.accessToken){
                // the access token is present(login correct) we can store it
                TokenService.setUser(response.data)
            }
            return response.data;
        })
};

const logout = () =>{
    TokenService.removeUser()
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;

