/*
 There are 3 main functions for Authentication:
- signup:   create new User in MongoDB database (role is user if not specifying role)
- signin:   find username of the request in database, if it exists
            compare password with password in database using bcrypt, if it is correct
            generate a token using jsonwebtoken return user information & access Token
- signout:  clear current session.

* */
const config = require("../utils/config/config_auth")
const db = require("../models")
const User = db.utenti;
const Role = db.ruoli

var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")

exports.signup =(req, res) => {
    // take the user's role and search in the Role's table
    console.log("questa riga non dovrebbe comparire")
    Role.findOne({ where: {name: req.body.role}})
        .then(role => {
            const user = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password,8),
                role_id: role.id
            };
            // save the user
            User.create(user)
                .then(
                    res.send({message: "User was registered successfully!"})
                )
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occured while creating the user."
                    });
                })

        })
        .catch(err =>{
            res.status(500).send({ message: err || `Some error occured while sign up`});
        })
};

exports.signin = (req, res) =>{
    User.findOne({ where: {
        username: req.body.username}
    }).then(user => {
            if(!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
                );
            if(!passwordIsValid){
                return res.status(401).send({ message: "Invalid Password!" });
            }
            const token = jwt.sign({id: user.id},
                                            config.SECRET_KEY,
                {
                    algorithm: "HS256",
                    allowInsecureKeySizes: true,
                    expiresIn: 86400 // 24 hours
                });
            Role.findByPk(user.role_id)
                .then(role => {
                     let authoritie = "ROLE_" + role.name.toUpperCase();

                    req.session.token = token;
                    res.status(200).send({
                        id: user.id,
                        username: user.username,
                        role: authoritie
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err || `Some error occured while sign in`});
                })
        })
        .catch(err => {
            return res.status(404).send({ message: err.message || "User Not found." });
        })
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch(err){
        this.next(err);
    }
};
