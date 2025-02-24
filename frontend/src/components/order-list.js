import React from "react";

const OrderList = ({ orders, title }) => (
  <div>
    <h2>{title}</h2>
    <ul>
      {orders.map((order) => (
        <li key={order.order_id}>
          Order #{order.order_id} ({order.order_type.toUpperCase()})
        </li>
      ))}
    </ul>
  </div>
);

export default OrderList;
