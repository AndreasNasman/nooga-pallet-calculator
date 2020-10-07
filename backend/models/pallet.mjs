import mongoose from "mongoose";

const { Schema } = mongoose;

const palletSchema = new Schema({
  boxes: [
    {
      amount: Number,
      articleName: String,
      batchNumber: Number,
      boxNumber: Number,
      dueDate: Date,
      registrationDate: Date,
    },
  ],
  creationDate: { default: Date.now, type: Date },
  id: String,
  user: String,
});

export default mongoose.model("Pallet", palletSchema);
