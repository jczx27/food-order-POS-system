import React from "react";

const BotList = ({ bots }) => (
  <div>
    <h2>Active Bots</h2>
    <ul>
      {bots.map((bot) => (
        <li key={bot.bot_id}>
          Bot #{bot.bot_id} -{" "}
          {bot.current_order
            ? `BUSY COOKING #${bot.current_order.order_id} ${
                bot.current_order.order_type === "vip" ? "(VIP)" : "(NORMAL)"
              }`
            : "IDLE"}
        </li>
      ))}
    </ul>
  </div>
);

export default BotList;
