const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

async function signUp(req, res) {
  try {
    const user = req.body;

    await User.create({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname,
    });
    res.status(200).send("successfully signed up!");
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return res.status(400).send({ error: "Email is already in use" });
    }
    if (error.name === "ValidationError") {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
        console.log("error.errors[field].message: ", error.errors[field]);
      }
      res
        .status(400)
        .send({ error: Object.values(validationErrors).join(",") });
    } else {
      console.error("Error creating user:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}

async function logIn(req, res) {
  const userId = req.body.userId.valueOf();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = {
      nickname: user.nickname,
      userId: userId,
    };
    const token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("token", token, { httpOnly: true });

    res.send({
      userId: user._id,
      nickname: user.nickname,
    });
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

function logOut(req, res) {
  res.clearCookie("token");
  res.send("Cookie has been deleted successfully");
}

async function getUserByToken(req, res) {
  const cookies = req.cookies;
  if (!cookies?.token) return res.status(401).send("Token required.");
  const token = cookies.token;

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await User.findById(decodedToken.userId);

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      return res.send({
        nickname: user.nickname,
        userId: user._id,
        email: user.email,
        admin: user.isAdmin,
      });
    }
  );
}

async function getUsersByIds(req, res) {
  const usersIds = req.body.usersIds;
  console.log({ usersIds });
  try {
    const users = await User.find({ _id: { $in: usersIds } });
    console.log(users);
    return res.send(users);
  } catch (error) {
    console.error("Error:", error);
    return res.status(404).send({ error: "Users not found" });
  }
}

module.exports = { signUp, logIn, logOut, getUserByToken, getUsersByIds };
