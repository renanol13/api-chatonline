const { serverHttp } = require("./app");
const connect = require("./DataBase/connection");
const ConnectSoketIo = require('./Sockets/index')

const PORT = process.env.PORT || 3001;

serverHttp.listen(PORT, () => {
    connect();
    ConnectSoketIo()
  console.log("Server running on port: " + PORT);
});
