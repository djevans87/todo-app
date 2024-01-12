const express = require("express");
const { getConnectedClient } = require("../database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUserCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection(`user`);
  return collection;
};

router.get("/", (req, res) => {
  res.json("ToDoList");
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.json({
        error: "Please provide a username, email, and password.",
      });
    }

    if (password.length < 8) {
      return res.status(401).json({
        error: "password must be at least 8 characters long",
      });
    }
    const userCollection = getUserCollection();

    const existingUser = await userCollection.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      const duplicateField =
        existingUser.username === username ? "username" : "email";
      return  res.status(401).json({
        error: `${duplicateField} is already in use. Please choose a different one.`,
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error("Error Password encryption:", error);
      return res.json({
        error: "server error, please try again.",
      });
    }

    const user = await userCollection.insertOne({
      username,
      email,
      password: hashedPassword,
    });

    console.log("User creation result:", user);
    res.json(user);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      error: "registration failed, please try again",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(404)
        .send({ message: "Both username and password are required." });
    }

    const usersCollection = getUserCollection();
    const user = await usersCollection.findOne({ username });

    if (!user) {
      client.close();
      return res
        .status(401)
        .json({
          error: "Invalid credentials, please try again.",
          field: "username",
        });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      client.close();
      return res
        .status(401)
        .json({
          error: "Invalid credentials, please try again.",
          field: "password",
        });
    }

    const token = jwt.sign({ userId: user.userId }, JWT_SECRET_KEY, {
      expiresIn: "1h", // Set an expiration time for the token
    });
    client.close();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.json({ username: user.username });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send();
});

module.exports = router;
