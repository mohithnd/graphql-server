const mongoose = require("mongoose");
const { MONGODB_URL } = require("./server.config");

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Successfully Connected To MongoDB Database...");
  } catch (error) {
    console.log("Unable To Connect To MongoDB Database...");
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDB;
