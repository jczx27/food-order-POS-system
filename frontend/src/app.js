import React, { useState, useEffect } from "react";
import {
  fetchOrders,
  addOrder,
  addBot,
  removeBot,
  getBots,
} from "./api-service";
import OrderList from "./components/order-list";
import BotList from "./components/bot-list";
import Controls from "./components/controls";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [bots, setBots] = useState([]);

  const refreshData = async () => {
    const { pending_orders, completed_orders } = await fetchOrders();
    const { active_bots } = await getBots();
    setOrders({ pending_orders, completed_orders });
    setBots(active_bots);
  };

  useEffect(() => {
    refreshData();
    const intervalId = setInterval(refreshData, 3000); // loop to fetch intervally
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Order Tasking System</h1>
      <Controls
        onAddOrder={addOrder}
        onAddBot={addBot}
        onRemoveBot={removeBot}
        refreshData={refreshData}
      />
      <hr />
      <Container>
        <Row>
          <Col>
            <OrderList title="PENDING" orders={orders.pending_orders || []} />
          </Col>
          <Col>
            <OrderList
              title="COMPLETE"
              orders={orders.completed_orders || []}
            />
          </Col>
        </Row>
      </Container>
      <hr />
      <Container>
        <Col>
          <BotList bots={bots} />
        </Col>
      </Container>
    </div>
  );
};

export default App;
