require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const bcrypt = require("bcrypt");
const { generateAuthToken } = require("../middlewares/userAuth");

const register = async (req, res) => {
  
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.json({
        error: "name is required",
      });
    }

    if (!email) {
      return res.json({
        error: "email is required",
      });
    }

    if (!password) {
      return res.json({
        error: "password is required",
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
    } catch (err) {
      return res.json({
        error: "server error, please try again.",
      });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.json({
        error: "username is already taken",
      });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.json({
        error: "email is already taken",
      });
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log('User creation result:', user);
    if (!user) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
    res.json(user);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      error: "registration failed, please try again",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(404)
        .send({ message: "Invalid credentials, please try again." });
    }

    let passwordMatches;
    try {
      passwordMatches = await bcrypt.compare(password, user.password);
    } catch (err) {
      return res.json({
        error: "server error, please try again.",
      });
    }

    if (!passwordMatches) {
      return res.status(404).send({
        message: "invalid credentials please try again",
      });
    }

    const token = generateAuthToken(user.userId);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.json(user.username);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getTodos = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todos = user.todos || [];
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user's todos", error });
  }
};

const createTodo = async (req, res) => {
  try {
    const { username } = req.params;
    const { text } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.todos.push(text);
    await user.save();

    res.status(201).json({ todo: text, status: false });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { username, id } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.todos.pull(id);
    await user.save();

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error });
  }
};

const toggleTodo = async (req, res) => {
  try {
    const { username, id } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const todoIndex = user.todos.findIndex(
      (todo) => todo._id.toString() === id
    );

    if (todoIndex === -1) {
      return res.status(404).json({ message: "Todo not found" });
    }

    user.todos[todoIndex].status = !user.todos[todoIndex].status;
    await user.save();

    res.status(200).json({ message: "Todo toggled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle todo", error });
  }
};
module.exports = {
  register,
  login,
  getTodos,
  createTodo,
  deleteTodo,
  toggleTodo,
};
