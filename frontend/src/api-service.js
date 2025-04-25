import axios from "axios";
const API_URL = "http://localhost:5000"; // Backend API Base URL

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("error while fetching orders", e);
    return { pending_orders: [], completed_orders: [], active_bots: [] };
  }
};
export const getBots = async () => {
  try {
    const response = await axios.get(`${API_URL}/bots`);
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("error while fetching orders", e);
    return { pending_orders: [], completed_orders: [], active_bots: [] };
  }
};

export const addOrder = async (orderType) => {
  try {
    const response = await axios.post(`${API_URL}/order`, {
      order_type: orderType,
    });
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("error while adding order", e);
    return null;
  }
};

export const addBot = async (botType) => {
  try {
    const response = await axios.post(`${API_URL}/bot`, {
      botType,
    });
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("error while adding bot", e);
  }
};

export const removeBot = async () => {
  try {
    const response = await axios.delete(`${API_URL}/bot`);
    if (response.data) {
      return response.data;
    }
  } catch (e) {
    console.error("error while removing bot", e);
    return null;
  }
};
