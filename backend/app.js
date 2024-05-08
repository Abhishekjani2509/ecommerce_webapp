const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
app.use(cors());
const product = require("./routes/productRoute");
app.use("/api/v1", product);
app.use(errorMiddleware);
module.exports = app;