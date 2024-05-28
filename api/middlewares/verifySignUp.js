/*
* File for verify the Signup action, we check:
*   - duplication of username
*   - irregular role
* */
const db = require("../models")
const ROLES = db.ROLES
const User = db.utenti

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
    if(req.body.role){
        if(!ROLES.includes(req.body.role)){
            return res.status(400).send({
                message: `Failed! Role ${req.body.role} does not exist!`
            });
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsername,
    checkRoleExisted
}

module.exports = verifySignUp
