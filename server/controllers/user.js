import User from "../models/User.js";

export const generateInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username coins").populate('coins'); //select only username and coins fields in User Schema
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({user});
  }
  catch(e) {
    console.error( `Error logging in ${e}`);
    res.status(500).json({message: "Server Error"});
  }
}