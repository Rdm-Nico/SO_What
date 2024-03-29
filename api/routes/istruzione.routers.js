const multer = require("multer")
const moduleF = require("../utils/uploadSingleFile")
module.exports = app => {
    const istruzioni = require("../controllers/istruzioni.controller")

    var router = require("express").Router();

    // Create a new Instruction
    router.post("/", moduleF.upload, istruzioni.create);

    function uploadFile(req, res){
        console.log(req.file);
        res.json({message: "upload the file"});
    }

    // Retrieve all Instructions or by name
    router.get("/", istruzioni.findAll);

    // Retrieve all Instructions by reparto
    router.get("/reparti", istruzioni.findByReparto);

    // Retrieve a single Instruction with id
    router.get("/:id", istruzioni.findOne);

    // Update a single Instruction with id
    router.put("/:id", istruzioni.update);

    // Delete an Instruction by id
    router.delete("/", istruzioni.delete);

    // Delete all Instructions
    router.delete("/", istruzioni.deleteAll);

    app.use('/api/istruzioni', router);
};