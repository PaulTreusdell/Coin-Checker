import mongoose from "mongoose";
const Schema = mongoose;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    unique: true
  },
  //ensure hashed
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  //collection of coins
  coins: [{
    type: Schema.Types.ObjectId,
    ref: 'Coin'
  }]
},
{ timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;