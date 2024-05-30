/*
* File for process auth & authorization, we create this functions:
*   - check if token is provided. We get token from HTTP request , then we use the verify() function of "jsonwebtoken"
*   - check if roles of the user contains required or not
* */
const jwt = require("jsonwebtoken")
const {TokenExpiredError} = jwt
const config = require("../utils/config/config_auth")
const db = require("../models")
const User = db.user


const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({message: "Unauthorized! Access Token was expired!" });
    }
    return res.sendStatus(401).send({message: "Unauthorized!"});
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({ message: "No token provided!" });
        // 403 state for "access denied"
    }

    jwt.verify(token, config.SECRET_KEY,
        (err, decoded) => {
            if(err){
                return catchError(err,res)
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            // search if the user is an admin
            user.getRoles().then(roles => {
                for(let i = 0; i < roles.length; i++){
                    if(roles[i].name === "admin") {
                        next();
                        return
                    }
            }
                return res.status(403).send({message: "Require Admin Role!"});
            })
        })
        .catch(err => {
            res.status(500).send({ message: err || `Some error occured while search if id=${req.userId} is a Admin`});
        })
}

isModerator = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            // search if the user is an admin
            user.getRoles().then(roles => {
                for(const role of roles){
                    if(role.name === "moderator") {
                        next();
                        return
                    }
                }
                return res.status(403).send({message: "Require Moderator Role!"});
            })
        })
        .catch(err => {
            res.status(500).send({ message: err || `Some error occured while search if id=${req.userId} is a Moderator`});
        })
}

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(const role of roles){
                if(role.name ==="moderator" ){
                    next();
                    return;
                }

                if(role.name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Moderator or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt
