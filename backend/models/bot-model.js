let botCounter = 1;
const bots = [];
const {
  getPendingOrderLength,
  moveOrderToCompleted,
  getLatestPendingOrder,
  unshiftPendingOrder,
} = require("@models/order-model");
const botCookingTime = {
  normal: 10000,
  fast: 5000,
};
const createBot = (newBot) => {
  const { botType } = newBot;
  console.log(`${botType} bot added`);
  const bot = {
    bot_id: botCounter++,
    current_order: null,
    active: true,
    cooking_time: botCookingTime[botType] || 10000,
  };
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
    console.log(
      `${bot.cooking_time} for bot to cook #${bot.current_order.order_id} (${bot.current_order.order_type})`
    );
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
    }, bot.cooking_time);
  } else {
    // processOrders(bot)
    setTimeout(() => processOrders(bot), 1000); // loop and search for pending if bot is active
  }
};

module.exports = { bots, createBot, removeBot };
