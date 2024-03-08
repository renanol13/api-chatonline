const express = require("express");
const { Server } = require("socket.io");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors("*"));

const serverHttp = require("http").createServer(app);
const io = new Server(serverHttp, { cors: { origin: "*" } });

//Routers User
const routerUser = require("./Routers/userRouter");
app.use("/users", routerUser);

//Routers chat

const routerChat = require("./Routers/chatRouter");
app.use("/chats", routerChat);

//Routers Message

const routerMessage = require("./Routers/messageRouter");
app.use("/messages", routerMessage);

module.exports = serverHttp 
module.exports = io
