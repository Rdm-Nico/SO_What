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
const {user: User, role: Role, refreshToken: RefreshToken} = db;

const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken")
var bcrypt = require("bcrypt")

exports.signup =(req, res) => {
    // take the user's role and search in the Role's table
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err =>{
            res.status(500).send({ message: err || `Some error occured while sign up`});
        })
};

exports.signin = (req, res) =>{
    User.findOne({ where: {
        username: req.body.username}
    }).then(async(user) => {
            if(!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
                );

            if(!passwordIsValid){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({id: user.id},
                                            config.SECRET_KEY,
                {
                    algorithm: "HS256",
                    allowInsecureKeySizes: true,
                    expiresIn: config.jwtExpiration
                });
            // create refreshable token
            let refreshToken = await RefreshToken.createToken(user)

            // add authorities
            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    roles: authorities,
                    accessToken: token,
                    refreshToken: refreshToken,
                });
            });
        })
        .catch(err => {
            return res.status(404).send({ message: err.message });
        })
};

exports.refreshToken = async (req, res) => {
    const {refreshToken: requestToken} = req.body;

    if(requestToken == null){
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try{
        let refreshToken = await RefreshToken.findOne({where: {token: requestToken}});

        console.log("refresh token: "+ refreshToken);

        if(!refreshToken){
            return res.status(403).json({ message: "Refresh token is not in database!" });
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({where: {id: refreshToken.id}});
            return res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
        }
        const user = await refreshToken.getUser();
        let NewAccessToken = jwt.sign({id: user.id},
            config.SECRET_KEY,
            {
                algorithm: "HS256",
                allowInsecureKeySizes: true,
                expiresIn: config.jwtExpiration
            });

        return res.status(200).json({
            accessToken: NewAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch(err){
        return res.status(500).send({message: err});
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch(err){
        this.next(err);
    }
};
