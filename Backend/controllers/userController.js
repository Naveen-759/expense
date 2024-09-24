const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = asyncHandler(async (req, res) => {
  const { name, phone, email, password } = req.body;
  if (!name || !phone || !email || !password) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  console.log("@12345", req.body);

  //Creating the hashed password
  const hashedPassword = await bcript.hash(password, 10);
  console.log("Hashed password is:", hashedPassword);

  console.log("@12345", req.body.name);

  const user = await User.create({
    name,
    phone,
    email,
    password: hashedPassword,
  });
  console.log("new user created");

  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
          phone: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201);
    res.json({ _id: user.id, email: user.email, accessToken });
  } else {
    res.status(400);
    throw new Error("User already exists123");
  }
});

const userlogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  console.log("Fecting user........");

  const user = await User.findOne({ email });

  if (user && (await bcript.compare(password, user.password))) {
    console.log("password matched successfully");

    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
          phone: user.phone,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
      // { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password mismatch");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  res.json(req.user);
});

module.exports = { userSignup, userlogin, currentUser };
