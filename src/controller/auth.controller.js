import User from "../modal/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

     return res.status(201).json({user: user});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
     
    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
   
    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: "7d" });

    
    return res.status(200).json({
        user:{
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password
      },
      accessToken: token
      
    })

    // res.json({
    //   token,
    
    // });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDhmOTJkODA2MjA2YmIwM2EyZTBhNSIsImlhdCI6MTc3NTgzMjUyNiwiZXhwIjoxNzc2NDM3MzI2fQ.fgkALNBFrMsFSbXYaVwuaBE19l5t-Z6T-vCIXvlEKAw