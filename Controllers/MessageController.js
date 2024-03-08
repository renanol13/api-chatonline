const MessageModel = require("../Models/messageModel");

const MessageController = {
  CreateMessage: async (req, res) => {
    const { chatId, sendId, text } = req.body;

    try {
      const newMessage = await MessageModel.create({ chatId, sendId, text });
      res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },


  FindMessage: async (req, res) => {
    const  chatId   = req.params.chatId;
    try {
      const messages = await MessageModel.find({ chatId });
      if (!messages) {
        return res.status(404).json({ msg: "Mensagem não encontrada" });
      }
      res.status(200).json( messages );
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
};

module.exports = MessageController;
