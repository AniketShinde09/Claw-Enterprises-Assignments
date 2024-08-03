const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.user.id,
      title: req.body.title
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
