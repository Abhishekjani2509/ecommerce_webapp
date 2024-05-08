const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK);
    console.log(`DB connection successful at: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
