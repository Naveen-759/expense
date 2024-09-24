const express = require("express");
const router = express.Router();

const {
  userSignup,
  userlogin,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateTokenHandler");

router.post("/signup", userSignup);

router.post("/login", userlogin);

router.get("/current-user", validateToken, currentUser);

module.exports = router;
