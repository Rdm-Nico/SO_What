var express = require("express");
var router = express.Router();
var pool = require('../database').pool;

router.get('/get-rettifica', (req, res) => {
    let sql = 'select * from schede where reparto = Rettifica';
    pool.getConnection((err, connection) =>{
        if(err) throw err;

        connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send('Info of Rettifica recived via pool');

            connection.release();
        })
    })
})