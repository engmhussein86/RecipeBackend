import express from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

/**
 * Create a new User
 * @method POST /users/register
 * @description This route is used by the addUser function in Register.jsx
 */
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username,email,password } = req.body;
try{
  // check if user exists
  const dbUser = await User.findOne({ username });

  if (dbUser) {
    console.log(dbUser);
    res.status(400).json({msg: "User already exists"});
  } else {
    const hashedPw = await bcrypt.hash(password,10);
    const newUser =  new User({ 
      username : username,
      password : hashedPw,
      email: email
    });
    // await User.create(newUser);
    await newUser.save();
    console.log(newUser);

    return res.status(201).json(newUser);
  }
}
  catch(error){
    console.log('register error', error); 
    res.status(500).json({msg: error.message});   
  }
  
});
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
/**
 * login User
 * @method POST /users/login
 * @description This route is used by the addUser function in login.jsx
 */
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username,password } = req.body;
  try{
  // check if user exists
  const dbUser = await User.findOne({ username });

  if (!dbUser) {
     return res.status(400).json({msg: "User not found"});
  } else {
    const isMatch = await bcrypt.compare(password, dbUser.password);
    console.log(isMatch);
    if(!isMatch){
      return res.status(400).json({msg: "please correct your credantials"}); 
    }
    else{
      const token = jwt.sign({id: dbUser._id}, process.env.JWT_SECRET,{expiresIn : "1hr"});
      return res.status(200).json({msg:"successfuly login", token, id:  dbUser._id});

    }

  }
}
catch(error){
  res.status(500).json({msg: error.message});
}
});
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

/**
 * @method GET /users/
  */
router.get("/", async (req, res) => {
  try {
    res.send("users api");
  } catch (error) {
    res.json({ msg: error.message });
  }
});


export default router;