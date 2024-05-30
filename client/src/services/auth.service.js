/*
     The service uses Axios for HTTP requests and Local Storage for user information & JWT.
    It provides following important functions:
    - login(): POST {username, password} & save JWT to Local Storage
    - logout(): remove JWT from Local Storage
    - register(): POST {username, email, password}
    - getCurrentUser(): get stored user information (including JWT)
* */

import http from "../http-common"


const register = (username, password) => {
    return http.post("/auth/signup", {
        username,
        password
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
                localStorage.setItem("user",JSON.stringify(response.data));
            }
            return response.data;
        })
};

const logout = () =>{
    localStorage.removeItem("user");
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
