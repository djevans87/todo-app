const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("todosdb").collection("todos");
  return collection;
};

router.get("/todosTest", (req, res) => {
  res.status(200).json({ mssg: "GET Request to api/todosTEST" });
});

// GET /todos
router.get("/todos", async (req, res) => {
  const collection = getCollection();
  const todos = await collection.find({}).toArray();

  res.status(200).json(todos);
});

// POST /todos
router.post("/todos", async (req, res) => {
  const collection = getCollection();
  let { text } = req.body;

  if (!text) {
    return res.status(400).json({ mssg: "error todo not created" });
  }
  const newTodo = await collection.insertOne({ todo: text, status: false });

  res.status(201).json({ todo: text, status: false, _id: newTodo.insertedId });
});

// DELETE /todos/:id
router.delete("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const deletedTodo = await collection.deleteOne({ _id });

  res.status(200).json(deletedTodo);
});

// PUT /todos/:id
router.put("/todos/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const todo = await collection.findOne({ _id });

  if (!todo) {
    return res.status(404).json({ mssg: "Todo not found" });
  }
  const updatedTodo = await collection.updateOne(
    { _id },
    { $set: { status: !todo.status } },
    { returnDocument: "after" }
  );
  res.status(200).json(updatedTodo);
});

module.exports = router;
