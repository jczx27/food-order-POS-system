let botCounter = 1;
const bots = [];
const {
  getPendingOrderLength,
  moveOrderToCompleted,
  getLatestPendingOrder,
  unshiftPendingOrder,
} = require("@models/order-model");
const createBot = () => {
  const bot = { bot_id: botCounter++, current_order: null, active: true };
  bots.push(bot);
  processOrders(bot);
};

const assignOrderToBot = (bot) => {
  bot.current_order = getLatestPendingOrder();
};

const removeBot = () => {
  if (bots.length > 0) {
    const botToRemove = bots.pop();
    botToRemove.active = false;
    if (botToRemove.current_order) {
      unshiftPendingOrder(botToRemove.current_order); // return Processing order back to pending list
    }
  }
};

const processOrders = (bot) => {
  if (!bot.active) {
    // Early exit if bot is not active
    return;
  }
  if (!bot.current_order && getPendingOrderLength() > 0) {
    bot.current_order = getLatestPendingOrder();
    setTimeout(() => {
      if (bot.active) {
        // only proceed with process if Bot is still active
        if (bot.current_order) {
          moveOrderToCompleted(bot.current_order, bot);
          bot.current_order = null;
          processOrders(bot); // Bot to pick up next order
        } else {
          assignOrderToBot(bot);
        }
      }
    }, 10000);
  } else {
    setTimeout(() => processOrders(bot), 1000); // loop and search for pending if bot is active
  }
};

module.exports = { bots, createBot, removeBot };
