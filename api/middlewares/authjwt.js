/*
* File for process auth & authorization, we create this functions:
*   - check if token is provided. We get token from HTTP request , then we use the verify() function of "jsonwebtoken"
*   - check if roles of the user contains required or not
* */
const jwt = require("jsonwebtoken")
const config = require("../utils/config/config_auth")
const db = require("../models")
const User = db.utenti
const ROLES = db.ROLES

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if(!token){
        return res.status(403).send({ message: "No token provided!" });
        // 403 state for "access denied"
    }

    jwt.verify(token, config.SECRET_KEY,
        (err, decoded) => {
            if(err){
                return res.status(401).send({message: "Unauthorized!"});
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            // search if the user is an admin
            const role = user.toJSON().name
            console.log(role)

            if(role === "admin"){
                next();
            }
            else{
                res.status(403).send({message: "Require Admin Role!"});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err || `Some error occured while search if id=${req.userId} is a Admin`});
        })
}

isModerator = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            // search if the user is an admin
            const role = user.toJSON().name
            console.log(role)

            if(role === "moderator"){
                next();
            }
            else{
                res.status(403).send({message: "Require Moderator Role!"});
            }
        })
        .catch(err => {
            res.status(500).send({ message: err || `Some error occured while search if id=${req.userId} is a Moderator`});
        })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
};
module.exports = authJwt
