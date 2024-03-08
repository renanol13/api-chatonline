const router = require("express").Router();
const ChatController = require("../Controllers/ChatController");

router
  .post("/", (req, res) => ChatController.CreateChat(req, res))
  .get("/:id", (req, res) => ChatController.FindUserChat(req, res))
  .get("/:find/firstId/:secondId", (req, res) =>
    ChatController.FindUserChat(req, res)
  );

module.exports = router;
