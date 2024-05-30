/*

    In the case we access protected resources, the HTTP request needs Authorization header
* */
export default function authHeader() {
    /*
    * The code above checks Local Storage for user item. If there is a logged in user with accessToken (JWT),
    *  return HTTP Authorization header. Otherwise, return an empty object.
    * */
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken};
    }else {
        return {};
    }
}
