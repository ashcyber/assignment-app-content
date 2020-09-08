const mongoose = require("mongoose");

const { mongoURI } = require("./keys");

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});

db.once("open", () => {
  console.log("Database connection is open!");
});

process.on("SIGINT", () => {
  mongoose.disconnect(() => {
    console.log("Database Disconnected");
    process.exit(0);
  });
});

module.exports = db;
