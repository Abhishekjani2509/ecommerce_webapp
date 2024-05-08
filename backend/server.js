const app = require("./app");
const mongoose = require("mongoose");
const connectDb = require("./config/database");
const dotenv = require("dotenv").config({ path: "config/.env" });

connectDb();

app.listen(process.env.PORT, (req, res) => {
  console.log(`Backend is Working Fine on port ${process.env.PORT}!`);
});
