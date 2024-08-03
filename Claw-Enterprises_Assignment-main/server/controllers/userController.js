const User = require('../models/User');
const { register, login } = require('../auth');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await register(email, password);
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
