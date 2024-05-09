const app = require("./app");
const mongoose = require("mongoose");
const connectDb = require("./config/database");
const dotenv = require("dotenv").config({ path: "config/.env" });
//uncaught error
process.on("uncaughtException", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting Down Server due to uncaughtException");
  process.exit(1);
});

connectDb();

app.listen(process.env.PORT, (req, res) => {
  console.log(`Backend is Working Fine on port ${process.env.PORT}!`);
});

//unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting Down Server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});
