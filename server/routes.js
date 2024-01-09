const express = require("express");

const router = express.Router();

router.get("/todosTest" , (req, res) => {
    res.status(200).json({mssg:"GET Request to api/todosTEST"});
} )

router.get("/todos", (req, res) => {
    res.status(200).json({mssg:"GET Request to api/todos"});
});

router.post("/todos", (req, res) => {
    res.status(201).json({mssg:"POST Request to api/todos"});
});


router.delete("/todos/:id", (req, res) => {
    res.status(200).json({mssg:"DELETE Request to api/todos/:id"});
});


router.put("/todos/:id", (req, res) => {
    res.status(200).json({mssg:"PUT Request to api/todos/:id"});
});

module.exports = router;
// // GET /todos
// router.get("/todos", async (req, res) => {
//     const collection = getCollection();
//     const todos = await collection.find({}).toArray();

//     res.status(200).json(todos);
// });

// // POST /todos
// router.post("/todos", async (req, res) => {
//     const collection = getCollection();
//     let { todo } = req.body;

//     if (!todo) {
//         return res.status(400).json({ mssg: "error no todo found"});
//     }

//     todo = (typeof todo === "string") ? todo : JSON.stringify(todo);

//     const newTodo = await collection.insertOne({ todo, status: false });

//     res.status(201).json({ todo, status: false, _id: newTodo.insertedId });
// });

// // DELETE /todos/:id
// router.delete("/todos/:id", async (req, res) => {
//     const collection = getCollection();
//     const _id = new ObjectId(req.params.id);

//     const deletedTodo = await collection.deleteOne({ _id });

//     res.status(200).json(deletedTodo);
// });

// // PUT /todos/:id
// router.put("/todos/:id", async (req, res) => {
//     const collection = getCollection();
//     const _id = new ObjectId(req.params.id);
//     const { status } = req.body;

//     if (typeof status !== "boolean") {
//         return res.status(400).json({ mssg: "invalid status"});
//     }

//     const updatedTodo = await collection.updateOne({ _id }, { $set: { status: !status } });

//     res.status(200).json(updatedTodo);
// });
