const multer = require("multer");

/*
import * as path from "path";
import {Request, Response} from 'express'

const uploadFilePath = path.resolve(__dirname, '../..','public/uploads');
*/
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, "../public/uploads")
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const uploadFile = multer({
    storage: storage
}).single('file');


exports.handleSingleUploadFile = async (req, res) => {
    return new Promise((resolve, reject) => {
        uploadFile(req, res, (error) => {
            if (error){
                reject(error);
            }

            resolve({file: req.file, body: req.body});
        })
    })
}

