const express = require("express");
const { getConnectedClient } = require("../database");
const router = express.Router();


const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../middlewares/userAuth");

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
      return res.json({
        error: "password must be at least 8 characters long",
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

    const userCollection = getUserCollection();
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

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials, please try again." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res
        .status(401)
        .json({ error: "Invalid credentials, please try again." });
    }

    const token = generateAuthToken(user.userId);

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

// router.get('/logout', (req, res) => {
//   res.clearCookie("token");
//   res.status(200).send();
// });

module.exports = router;
