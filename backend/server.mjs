import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import Pallet from "./models/pallet.mjs";
import { generateID } from "./utilities.mjs";

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

router.route("/").get((_, response) => {
  Pallet.find({}, (error, documents) => {
    if (error) {
      console.error(error);
      response.status(500).json("Retrieving pallets failed.");
    } else response.json(documents);
  });
});

router.route("/new").post((request, response) => {
  const pallet = new Pallet({ ...request.body, id: generateID() });
  pallet
    .save()
    .then(() => response.json("New pallet created successfully."))
    .catch((error) => {
      console.error(error);
      response.status(400).json("Failed to create new pallet.");
    });
});

const MAX_BOXES = 3;
router.route("/:id/add-box").post((request, response) => {
  Pallet.findOne({ id: request.params.id }, (error, pallet) => {
    if (error) {
      console.error(error);
      response.status(400).json("Failed to update pallet.");
    } else if (!pallet) response.status(404).json("Pallet not found.");
    else {
      if (pallet.boxes.length >= MAX_BOXES)
        response
          .status(400)
          .json(`Cannot exceed the maximum number of boxes (${MAX_BOXES}).`);
      else {
        pallet.boxes.push(request.body);
        pallet
          .save()
          .then(() => response.json("New box added successfully."))
          .catch((error) => {
            console.log(error);
            response.status(500).json("Failed to add box.");
          });
      }
    }
  });
});

app.use(bodyParser.json());
app.use("/pallets", router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
