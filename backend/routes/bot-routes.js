const express = require("express");
const { addBot, deleteBot, getBots } = require("@controllers/bot-controller");

const router = express.Router();

router.post("/bot", addBot);
router.delete("/bot", deleteBot);
router.get("/bots", getBots);

module.exports = router;
