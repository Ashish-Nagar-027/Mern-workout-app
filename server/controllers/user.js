const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// =======================================

//           login user

// =======================================

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validations
    if (!email || !password) {
      throw Error("All fields must be filler");
    }

    // checking if  user available or not in use or not
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("User not available , try sign up");
    }

    // compareing passwords
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw Error("Incorrect password");
    }

    // create token
    const token = createToken(user._id);

    res.json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =======================================

//           signup user

// =======================================

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validations
    if (!email || !password) {
      throw Error("All fields must be filler");
    }

    // email validation check
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid email");
    }

    // checking if  email already in use or not
    const emailExistance = await User.findOne({ email });
    if (emailExistance) {
      throw Error("Email Already in use");
    }

    // password stregth check
    if (!validator.isStrongPassword(password)) {
      throw Error("password not strong enough");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user
    const user = await User.create({ email, password: hashedPassword });

    // creating jwt token
    const token = createToken(user._id);

    // removing password
    user.password = undefined;

    res.status(200).json({ token, email: user.email, id: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
