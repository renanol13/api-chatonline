const mongoose = require("mongoose");
require("dotenv").config();
const DATA_BASE_URL = process.env.DATA_BASE_URL;

const connect = async () => {
  try {
    await mongoose.connect(DATA_BASE_URL);
    console.log("Connected to data base ");
  } catch (error) {
    console.log("failed to connect to data base");
  }
};

module.exports = connect;
