const db = require("../models");
const Istruzione = db.istruzioni;
const Op = db.Sequelize.Op;

// Create and Save a new instruction
exports.create = (req, res) => {
    // validate req
    if(!req.body.path) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create an Instruction
    const istruzione = {
        path: req.body.path,
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

    Istruzione.update(req.body, { where: { id : id} })
        .then(num => {
            if(num === 1){
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
};
// Delete an instructions with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Istruzione.destroy({ where : { id: id} })
        .then(num => {
            if(num === 1){
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
                message: "Error not delete instruction with id= " + id
            });
        });
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