import bodyParser from "body-parser";
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

router.route("/add").post((request, response) => {
  const pallet = new Pallet(request.body);
  pallet
    .save()
    .then((result) => {
      console.log(result);
      response.status(200).json("Adding pallet ID succeeded.");
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json("Adding new pallet failed.");
    });
});

app.use(bodyParser.json());
app.use("/pallets", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
