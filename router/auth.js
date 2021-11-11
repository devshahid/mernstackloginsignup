const express = require("express");

// Creating express router to handle the api calls
const router = express.Router();

// bcrypt helps to encrypt and decrypt password
const bcrypt = require("bcryptjs");

const Authenticate = require("../middleware/Authenticate");
require("../database/conn");

// Using Schema model to store data in mongoDB
const User = require("../model/userSchema");

// executed when about api is called
// Authenticate function will return user data if user is logged in else the webpage redirected to login page
router.get("/about", Authenticate, (req, res) => {
  res.send(req.rootUser);
});
// executed when register api is called
router.post("/register", async (req, res) => {
  const { name, email, phone, profession, password, cpassword } = req.body;
  if (!name || !email || !phone || !profession || !password || !cpassword) {
    return res
      .status(422)
      .json({ status: "422", error: "some data is missing" });
  }
  if (password != cpassword) {
    return res.status(422).json({ error: "Password should be match" });
  }
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("User Already Exist");
      return res.status(422).json({ error: "Email already exists" });
    }
    const user = new User({
      name,
      email,
      phone,
      profession,
      password,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "user created" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ CatchBlock: err });
  }
});
// executed when login api is called
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "some data is missing", status: "422" });
  }
  try {
    // findone (database key, local variable)
    const userLogin = await User.findOne({ email: email });
    if (!userLogin) {
      return res
        .status(422)
        .json({ error: "Invalid credentials", status: "422" });
    }
    const isMatch = await bcrypt.compare(password, userLogin.password);
    const token = await userLogin.generateAuthToken();
    res.cookie("jwtToken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });
    // console.log(token);
    if (!isMatch) {
      return res
        .status(422)
        .json({ error: "Invalid credentials", status: "422" });
    }
    return res.status(200).json({ message: "Welcome user", status: "200" });
  } catch (err) {
    return res.status(500).json({ error: err, status: "500" });
  }
});
// executed when logout api is called
router.get("/logout", async (req, res) => {
  res.clearCookie("jwtToken", { path: "/" });
  res.status(200).send({ message: "successfully logout", status: "200" });
});

// exporting the module router to use in another file
module.exports = router;
