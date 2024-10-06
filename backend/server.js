const app = require("./app");
const connectDb = require("./config/database");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config({ path: "config/.env" });
//uncaught error
process.on("uncaughtException", (err) => {
  console.log("Error:", err.message);
  console.log("Shutting Down Server due to uncaughtException");
  process.exit(1);
});

connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
