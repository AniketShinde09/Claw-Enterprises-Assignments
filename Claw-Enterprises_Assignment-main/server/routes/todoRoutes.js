const express = require('express');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

router.post('/todos', auth, async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({
      userId: req.userId,
      title
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/todos/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/todos/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


// const express = require('express');
// const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
// const router = express.Router();

// router.post('/todos', createTodo);
// router.get('/todos', getTodos);
// router.put('/todos/:id', updateTodo);
// router.delete('/todos/:id', deleteTodo);

// module.exports = router;
