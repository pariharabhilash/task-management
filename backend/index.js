const express = require("express");
const cors = require("cors");
const initDB = require("./db");
const router = require("./routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

initDB();

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`server listening on port: ${process.env.PORT}`);
});
