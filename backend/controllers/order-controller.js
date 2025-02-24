const { orders, createOrder } = require("@models/order-model");

const addOrder = (req, res) => {
  const { order_type } = req.body;
  if (!order_type) {
    return res.status(400).json({ error: "Order type is required" });
  }
  createOrder(order_type);
  res.status(201).json({ message: "Order added successfully" });
};

const getOrders = (req, res) => {
  res.json({
    pending_orders: orders.pending,
    completed_orders: orders.completed,
  });
};

module.exports = { addOrder, getOrders };
