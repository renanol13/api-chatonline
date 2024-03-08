const ChatModel = require("../Models/chatModel");

const ChatController = {
  CreateChat: async (req, res) => {
    const { firstId, secondId } = req.body;
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [firstId, secondId] },
      });

      if (chat) return res.status(200).json(chat);

      const newChat = await ChatModel.create({ members: [firstId, secondId] });

      res.status(201).json(newChat);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },

  FindUserChat: async (req, res) => {
    const userId = req.params.id;
    try {
      const chats = await ChatModel.find({ members: { $in: [userId] } });
      res.status(200).json(chats);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
  FindChat: async (req, res) => {
    const { firstId, secondId } = req.params;
    
    try {
      const chat = await ChatModel.find({ $all: [firstId, secondId] });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
};

module.exports = ChatController;
