/*
* File for verify the Signup action, we check:
*   - duplication of username
*   - irregular role
* */
const db = require("../models")
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsername = (req, res, next) =>{
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then( user => {
      if (user) {
          return res.status(400).send({message: "Errore! Username esiste già!"});
      }
      next(); // Only call next if no user was found
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the Instruction."
        });
    });

};

checkRoleExisted = (req, res, next) => {
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                })
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername,
    checkRoleExisted: checkRoleExisted
}

module.exports = verifySignUp;
