import User from "../models/User.js";
import Coin from "../models/Coin.js";
import { getCoinData } from "../utils/openai.js";

export const createCoin = async (req, res) => {
  try {

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    //Get The Coin Info
    const coinInfo = await getCoinData(req.file);
    if (!coinInfo) {
      return res.status(500).json({message:"Server error"});
    }
    //Save Coin Info
    const createdCoin = new Coin({
      name: coinInfo[1],
      description: coinInfo[2],
      price: coinInfo[0]
    })
    await createdCoin.save();

    //Add to User
    await User.findByIdAndUpdate(
      user.id,
      {$push: {coins: createdCoin}}
    );

    res.status(201).json({message: "Coin Succesfully Created"});
  }
  catch(e) {
    console.error(`Error: ${e}`);
    res.status(500).json({message: "Server Error"});
  }
}