const express = require("express");
const { addOrder, getOrders } = require("@controllers/order-controller");

const router = express.Router();

router.post("/order", addOrder);
router.get("/orders", getOrders);

module.exports = router;
