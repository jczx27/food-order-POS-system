require("module-alias/register");
const express = require("express");
const cors = require("cors");
const PORT = 5000;
const orderRoutes = require("@routes/order-routes");
const botRoutes = require("@routes/bot-routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(orderRoutes);
app.use(botRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;
