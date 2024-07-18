const db = require("../models");
const Istruzione = db.istruzioni;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken')
const config = require('../utils/config/config_token')
const fs = require('fs')
const path = require('path')
const manage_file = require('../utils/deleteSingleFile')

// Create and Save a new instruction
exports.create =  (req, res) => {

    // validate req
    if(!req.file.path) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create an Instruction
    const istruzione = {
        path: "http://localhost:9000/uploads/" + req.file.filename,
        title: req.body.title,
        reparto: req.body.reparto
    };

    // save instruction in db
    Istruzione.create(istruzione)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating the Instruction."
            });
        });
};

// find a single instructions with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;


    Istruzione.findByPk(id)
        .then(data => {
            if(data) {
                json_data = data.toJSON()
                console.log(json_data.path)

                res.send(data);
            } else {
                res.status(404).send({
                    message: 'Cannot find instruction with id=' + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving instruction with id= " +id
            });
        });
};

// Update an instructions by the id in the req
exports.update = (req, res) =>{
    const id = req.params.id;

    console.log('questo é il body:',req.body)
    console.log(id)
    // create the Istruction
    let istruzione = {
        title: req.body.title,
        reparto: req.body.reparto,
    }
    // check if there is a file to update
    if(req.file){
        istruzione.path = "http://localhost:9000/uploads/" + req.file.filename
    }

    console.log(istruzione)

    Istruzione.findByPk(id)
        .then(data => {
            if(data) {
                json_data = data.toJSON()
                console.log(json_data)
                if(json_data.path !== istruzione.path){
                    console.log('inside first if')
                    // delete the old file and then update
                    manage_file.delete_File(json_data.path)
                }
                console.log('outside first if')
                Istruzione.update(istruzione, { where: { id : id} })
                    .then(num => {

                        if(num[0] === 1){
                            res.send({
                                message: "Instruction was updated successfully."
                            });
                        } else {
                            res.send({
                                message: `Cannot update Instruction with id=${id}. Maybe Instruction was not found or req.body is empty! `
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: "Error updating instruction with id= " + id
                        });
                    });

            } else {
                res.status(404).send({
                    message: 'Cannot find instruction with id=' + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving instruction with id= " +id
            });
        });

};
// Delete an instructions with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;
    Istruzione.findByPk(id).then(data => {
        if(data) {
            json_data = data.toJSON()
            console.log('this is json data:', json_data)
            let path_file = json_data.path

            Istruzione.destroy({ where : { id: id} })
                .then(num => {
                    if(num === 1){
                        console.log('questo é il url: ',path_file)
                        manage_file.delete_File(path_file)
                        res.send({
                            message: "Instruction was deleted successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot find Instruction with id=${id}. Maybe Instruction was not found`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error not delete instruction with id= " + id,
                        error: err
                    });
                });

        } else {
            res.status(404).send({
                message: 'Cannot find instruction with id=' + id
            });
        }
    })
};

// Delete all instructions from the db
exports.deleteAll = (req, res) =>{
    Istruzione.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Instructions were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all instructions."
            });
        });
};

// find instructions by name or retrieve all instructions
exports.findAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: `%${title}%`}} : null;

    Istruzione.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the Instructions"
            })
        })
};
// find instructions by department
exports.findByReparto = (req, res) =>{
    const reparto = req.query.reparto;
    var condition = reparto ? {reparto: { [Op.like]: `%${reparto}%`}} : null;

    Istruzione.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving the Instructions"
            })
        })

    //TODO: guardare per fare un Server side Pagination con sequelize
};

exports.displayFile = (req, res) =>{
    const id = req.params.id;


    Istruzione.findByPk(id)
        .then(data => {
            if(data) {
                json_data = data.toJSON()
                res.sendFile(json_data.path)
            } else {
                res.status(404).send({
                    message: 'Cannot find instruction with id=' + id
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving instruction with id= " +id
            });
        });
};

function generateAccessToken(payload){
    return jwt.sign({payload: payload},config.TOKEN_SECRET,{expiresIn: 1800});
}

// create a JWT for view the file
exports.generateLink = (req, res) =>{
    const id = req.params.id;
    const token = generateAccessToken(id)
    //const url= `${req.protocol}://${req.hostname}:9000/api/istruzioni/view-file/${token}`;
    return res.json({token});
}

exports.viewFile = (req, res) =>{
    const token = req.params.token
    const conn = req.headers.connection
    console.log(conn)
    try {
        const id = jwt.verify(token,config.TOKEN_SECRET).payload;
        console.log(id)
        Istruzione.findByPk(id)
            .then(data => {
                if(data) {
                    json_data = data.toJSON()
                    res.sendFile(json_data.path)
                } else {
                    res.status(404).send({
                        message: 'Cannot find instruction with id=' + id
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving instruction with id= " +id
                });
            });
    } catch(err){
        return res.status(400).json({message: err.message})
    }
}
