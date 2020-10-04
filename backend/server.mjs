import express from "express";
import mongoose from "mongoose";

const PORT = 4000;

/* MongoDB */
mongoose.connect("mongodb://localhost/pallets", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connection established successfully.");
});

/* Express */
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
