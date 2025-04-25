import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Controls = ({ onAddOrder, onAddBot, onRemoveBot, refreshData }) => (
  <Container>
    <Row xs={2} md={4} lg={6}>
      <Col>
        <Button
          onClick={async () => {
            await onAddOrder("normal");
            await refreshData();
          }}
        >
          + Normal Order
        </Button>
      </Col>
      <Col>
        {" "}
        <Button
          variant="warning"
          onClick={async () => {
            onAddOrder("vip");
            await refreshData();
          }}
        >
          + VIP Order
        </Button>
      </Col>
      <Col>
        {" "}
        <Button
          variant="success"
          onClick={async () => {
            await onAddBot("normal");
            await refreshData();
          }}
        >
          + Bot
        </Button>
      </Col>
      <Col>
        {" "}
        <Button
          variant="warning"
          onClick={async () => {
            await onAddBot("fast");
            await refreshData();
          }}
        >
          + Faster Bot
        </Button>
      </Col>
      <Col>
        <Button
          variant="danger"
          onClick={async () => {
            onRemoveBot();
            await refreshData();
          }}
        >
          - Bot
        </Button>
      </Col>
    </Row>
  </Container>
);

export default Controls;
