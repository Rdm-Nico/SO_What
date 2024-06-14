import axios from "axios";
import TokenService from "../services/token.service";

const http = axios.create({
    baseURL: "http://localhost:9000/api"
});

// for manages the expired token with interceptors request and response
http.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if(token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config

        if(originalConfig.url !== "/auth/signin" && err.response){
            // Access Token was expired
            if(err.response.status === 401 && !originalConfig._retry){
                originalConfig._retry = true;

                try{
                    const rs = await http.post("auth/refreshtoken", {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const {accessToken} = rs.data
                    TokenService.updateLocalAccessToken(accessToken);
                    return http(originalConfig)
                } catch (_error){
                    return Promise.reject(_error)
                }
            }
        }
        return Promise.reject(err)
    }
)


export default http
