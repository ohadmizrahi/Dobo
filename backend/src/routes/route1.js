const { Router } = require('express');
const bodyParser = require("body-parser");


const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/api/something/1", (req, res) => {
    res.send(`Example for get router 1`)

})

module.exports = router;