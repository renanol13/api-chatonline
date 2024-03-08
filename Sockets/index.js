const { io } = require("../app");

let onlineUser = [];

const ConnectSoketIo = () => {
  try {
    io.on("connection", (socket) => {
      socket.on("addNewUser", (userId) => {
        const verifyUser = onlineUser.find((user) => user.userId === userId);
        if (!verifyUser) {
          onlineUser.push({
            userId,
            socketId: socket.id,
          });
        }
        io.emit("getOnlineUsers", onlineUser);
      });

      socket.on("sendMessage", (message) => {
        const user = onlineUser.find(
          (user) => user.userId === message.recipientId
        );

        if (user) {
          io.to(user.socketId).emit("getMessage", message);
          io.to(user.socketId).emit("getNotification", {
            sendId: message.sendId,
            isRead: false,
            date: new Date()
          });
        }
      });

      socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUser);
      });
    });
  } catch (error) {
    console.log("Falha ao conectar socket.io");
  }
};

module.exports = ConnectSoketIo;
