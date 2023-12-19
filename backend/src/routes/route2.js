const { Router } = require('express');
const bodyParser = require("body-parser");

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/api/something/2", (req, res) => {
    res.send("Example for get router 2")
})

module.exports = router;