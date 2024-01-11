const express = require('express');
const { register, login, recent, getTodos, createTodo, deleteTodo, toggleTodo} = require('../controllers/mainController');
const router = express.Router();

router.get('/', (req, res) => {
  res.json("ToDoList");
})

router.post('/register', register);
router.post('/login', login);

// router.get('/logout', (req, res) => {
//   res.clearCookie("token");
//   res.status(200).send();
// });



module.exports = router;