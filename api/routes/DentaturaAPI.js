var express = require("express");
var router = express.Router();

router.get("/",function (req, res, next) {
    res.send("API che arriva solo nel reparto dentatura");
})

module.exports = router;