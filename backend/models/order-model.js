let orderCounter = 1;
const orders = { pending: [], completed: [], cancelled: [] };

const createOrder = (orderType) => {
  const order = { order_id: orderCounter++, order_type: orderType };
  pushPendingOrder(order);
};

const getPendingOrderLength = () => {
  return orders.pending.length;
};
const getLatestPendingOrder = () => {
  return orders.pending.shift();
};

const moveOrderToCompleted = (order) => {
  orders.completed.push(order);
};
const moveOrderToCancelled = (order) => {
  const index = orders.pending.indexOf((o) => o.order_id === order.order_id);
  if (index !== -1) {
    array.splice(index, 1);
  }
  orders.cancelled.push(order);
};

const pushPendingOrder = (order) => {
  // This operation priortizes VIP and
  // put new VIP order behind pending VIP orders,
  // This also push normal orders behind normal orders behind VIP
  const { order_type } = order;
  if (order_type === "vip") {
    const vipIndex = orders.pending.findIndex((o) => o.order_type !== "vip");
    const insertIndex = vipIndex === -1 ? orders.pending.length : vipIndex;
    orders.pending.splice(insertIndex, 0, order);
  } else {
    orders.pending.push(order);
  }
};

const unshiftPendingOrder = (order) => {
  // This operation priortizes VIP and
  // put new VIP order in front of pending VIP orders,
  // This also push normal orders in front of normal orders behind VIP
  const { order_type } = order;
  if (order_type !== "vip") {
    const vipIndex = orders.pending.findIndex((o) => o.order_type !== "vip");
    const insertIndex = vipIndex === -1 ? orders.pending.length : vipIndex;
    orders.pending.splice(insertIndex, 0, order);
  } else {
    orders.pending.unshift(order);
  }
};

module.exports = {
  orders,
  createOrder,
  getLatestPendingOrder,
  getPendingOrderLength,
  moveOrderToCompleted,
  moveOrderToCancelled,
  pushPendingOrder,
  unshiftPendingOrder,
};
