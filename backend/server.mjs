import express from "express";
import mongoose from "mongoose";
import Pallet from "./models/pallet.mjs";

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
const router = express.Router();

router.route("/").get((request, response) => {
  Pallet.find({}, (error, documents) => {
    if (error) console.error(error);
    else response.json(documents);
  });
});

app.use("/pallets", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
