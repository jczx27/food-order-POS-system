const { bots, createBot, removeBot } = require("@models/bot-model");

const addBot = (req, res) => {
  createBot(req.body);
  res.status(201).json({ message: "Bot added successfully" });
};

const deleteBot = (req, res) => {
  removeBot();
  res.status(200).json({ message: "Bot removed successfully" });
};

const getBots = (req, res) => {
  res.json({ active_bots: bots });
};

module.exports = { addBot, deleteBot, getBots };
