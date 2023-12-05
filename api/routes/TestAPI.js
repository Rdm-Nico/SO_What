let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
    res.send("API sta funzionando correttamente ");

})

module.exports = router;