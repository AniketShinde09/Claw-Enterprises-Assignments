const Session = require('../models/Session');

exports.createSession = async (req, res) => {
  try {
    const session = new Session({
      userId: req.user.id,
      ipAddress: req.ip
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
