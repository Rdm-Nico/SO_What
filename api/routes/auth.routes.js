/*
    Define Authentication Routes
    When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we
    need to determine how the server will response by setting up the routes.
    3 routes for Authentication :
   - POST /api/auth/signup
   - POST /api/auth/signin
   - POST /api/auth/signout
* */

const {verifySignUp} = require("../middlewares")
const controller = require("../controllers/auth.controller")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/auth/signup",
        [
            // here we verify the data
            verifySignUp.checkDuplicateUsername,
            verifySignUp.checkRoleExisted
        ],
        // and process the sign-up
        controller.signup
    );

    app.post("/api/auth/refreshtoken", controller.refreshToken);
    app.post("/api/auth/signin", controller.signin);
    app.post("/api/auth/signout", controller.signout);
};
