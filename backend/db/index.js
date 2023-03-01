const mongoose = require("mongoose");

const init = async () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("MongoDB Connected successfully");
  });
};

module.exports = init;
