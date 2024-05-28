/*
    Define Authorization Routes
    When a client sends request for an endpoint using HTTP request (GET, POST, PUT, DELETE), we
    need to determine how the server will response by setting up the routes.
    3 routes for Authorization :
   - POST /api/auth/signup
   - POST /api/auth/signin
   - POST /api/auth/signout
* */
const {authJwt} = require("../middlewares")
const controller = require("../controllers/user.controller")

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })

    app.get("/api/test/all", controller.allAccess)
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard)
    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

};
