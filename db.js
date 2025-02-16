const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// db

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  // console.log(`connect to ${MONGODB_URI}`);
});

// disconnect from db
process.on("SIGINT", () => {
  mongoose.disconnect(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
