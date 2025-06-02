import mongoose from "mongoose";

const coinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
},
  { timestamps: true }
);

const Coin = mongoose.model("Coin", coinSchema);
export default Coin;