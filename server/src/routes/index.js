  
const router = require("express").Router();
const auth = require("./auth");
const discord = require("./todo");

router.use("/auth", auth);
router.use("/todo", discord);

module.exports = router;