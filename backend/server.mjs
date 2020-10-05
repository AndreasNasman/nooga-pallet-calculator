import bodyParser from "body-parser";
import express from "express";
import "./database.mjs";
import { router } from "./router.mjs";

const app = express();
app.use(bodyParser.json());
app.use("/pallets", router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
