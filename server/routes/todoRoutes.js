const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("../database");
const { ObjectId } = require("mongodb");

const getTodosCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection(`todos`);
  return collection;
};

// GET ALL /todos 
router.get("/:username/todos", async (req, res) => {
  const { username } = req.params;
  const collection = getTodosCollection();
  const todos = await collection.find({ username }).toArray();

  res.status(200).json(todos);
});

// POST /todos Create new Todo
router.post("/:username/todos", async (req, res) => {
  const { username } = req.params;
  const collection = getTodosCollection(username);
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).json({ mssg: "error todo not created" });
  }
  try {
    const newTodo = await collection.insertOne({
      username,
      todo: todo,
      status: false,
    });
    res.status(201).json({ todo, status: false, _id: newTodo.insertedId});
  } catch (error) {
    console.error("Error inserting new todo:", error);
    res.status(500).json({ error: "Failed to insert new todo" });
  }
});

// DELETE /todos/:id
router.delete("/:username/todos/:id", async (req, res) => {
  const { username, id } = req.params;
  const collection = getTodosCollection();
  const _id = new ObjectId(id);
  const deletedTodo = await collection.deleteOne({ username, _id });

  res.status(200).json(deletedTodo);
});

// DELETE /todos/:username delete all
router.delete("/:username/todos", async (req, res) => {
  const { username } = req.params;
  const collection = getTodosCollection();

  try {
    const result = await collection.deleteMany({ username });
    res.status(200).json({
      message: `Deleted ${result.deletedCount} todos for ${username}`,
    });
  } catch (error) {
    console.error("Error deleting todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /todos/:id
router.put("/:username/todos/:id", async (req, res) => {
  const { username, id } = req.params;
  const collection = getTodosCollection();
  console.log("Received params:", req.params);
  const _id = new ObjectId(id);
  const todo = await collection.findOne({ username, _id });

  if (!todo) {
    return res.status(404).json({ mssg: "Todo not found" });
  }
  const updatedTodo = await collection.updateOne(
    { username, _id },
    { $set: { status: !todo.status } },
    { returnDocument: "after" }
  );
  res.status(200).json(updatedTodo);
});

module.exports = router;
