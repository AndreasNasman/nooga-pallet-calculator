import mongoose from "mongoose";

const { Schema } = mongoose;

const palletSchema = new Schema({
  boxes: [
    {
      amount: Number,
      article_name: String,
      batch_number: Number,
      box_number: Number,
      due_date: Date,
      registration_date: Date,
    },
  ],
  creation_date: { default: Date.now, type: Date },
  user: String,
});

export default mongoose.model("Pallet", palletSchema);
