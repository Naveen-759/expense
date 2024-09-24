const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please give the user name"],
    },
    phone: {
      type: String,
      required: [true, "Please give the mobile number"],
    },
    email: {
      type: String,
      required: [true, "Please give the email"],
      unique: [true, "email address already exists"],
    },
    password: {
      type: String,
      required: [true, "Please give the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
