import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User.js"
const router = express.Router();

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    //ensure username exists in database
    const user = await User.findOne({username}); //need curly brackets or error
    if (!user) {
      return res.status(401).json({ error: "Unauthorized Login"});
    }
    //make sure password is right
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ error: "Unauthorized Login"});
    }
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "30m"});

    res.cookie('token', token, {
      httpOnly: true, //need this to prevent scripts
      secure: false, //NEED TO BE TRUE WHEN NOT TESTING  - secure: true is https
      sameSite: 'Lax', //use if frontend / backend on different ports
      maxAge: 1800000 //expire time in milliseconds
    })

    res.status(200).json({token});
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error When Logging In"});
  }
})

//Register
router.post("/register", async (req,res) => {
  const { username, email, password } = req.body;
  try {
    //Check if user already in DB
    const user = await User.find({email});
    if (user) {
      return res.status(409).json({error: "User Already Registered"});
    }

    const hashedPass = await bcrypt.hash(password, 10); //10 is # of salt rounds, more is greater security but longer waiting
    //or can do User.create
    const createdUser = new User({
      username,
      email,
      password:hashedPass
    });
    await createdUser.save();
    const token = jwt.sign({id:createdUser._id}, process.env.JWT_SECRET, {expiresIn: "30m"});
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 1800000 //expire time in milliseconds
    })
    res.status(201).json({token});
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ error: "Invalid Credentials"});
  }
})

export default router;