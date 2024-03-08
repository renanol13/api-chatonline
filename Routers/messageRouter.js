const router = require("express").Router();
const MessageController = require("../Controllers/MessageController");

router
    .post("/", (req, res) => MessageController.CreateMessage(req, res))
    .get("/:chatId", (req, res) => MessageController.FindMessage(req, res))

module.exports = router