/*
    Sequelize model has one-to-one relationship with User model. It contains expiryDate field which value is set by adding config.
    jwtRefreshExpiration value above.

    There are 2 static methods:
     - createToken: use uuid library for creating a random token and save new object into MySQL database
     - verifyExpiration: compare expiryDate with current Date time to check the expiration
* */
const config = require("../utils/config/config_auth")
const {v4: uuidv4} = require("uuid")



module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken",{
        token: {
            type: Sequelize.STRING,
        },
        expiryDate: {
            type: Sequelize.DATE,
        },
    });

    RefreshToken.createToken = async function(user) {
        let expiredAt = new Date()
        expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

        let  _token = uuidv4();
        let refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt.getTime(),
        });

        return refreshToken.token;
    };

    RefreshToken.verifyExpiration = (token) => {
        return token.expiryDate.getTime() < new Date().getTime();
    };
    return RefreshToken;
};
