const express = require('express');
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');
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

router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.userId });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


// const express = require('express');
// const { createSession, getSessions } = require('../controllers/sessionController');
// const router = express.Router();

// router.post('/sessions', createSession);
// router.get('/sessions', getSessions);

// module.exports = router;
