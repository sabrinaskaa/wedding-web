import { axiosInstance } from "../config";

export const getOrderDetails = async orderId => {
  const response = axiosInstance.get(`/customer/ecommerce/orders/${orderId}`);
  return response;
};

export const getOrderDetailGuest = async (id, email) => {
  const response = axiosInstance.get(
    `/customer/ecommerce/orders/${id}/guest?email=${email}`
  );
  return response;
};

export const calculateOrder = async body => {
  try {
    const response = axiosInstance.post(
      "/customer/ecommerce/orders/calculate?showAllPayment=false",
      body
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createOrder = async order => {
  try {
    const response = axiosInstance.post("/customer/ecommerce/orders", order);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createOrderGuest = async order => {
  try {
    const response = axiosInstance.post(
      "/customer/ecommerce/orders/guest-checkout",
      order
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const cancelOrder = async orderId => {
  try {
    const response = axiosInstance.put(
      `/customer/ecommerce/orders/${orderId}/cancel`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOrders = async page => {
  const response = axiosInstance.get(
    `/customer/ecommerce/orders?page=${page}&perPage=10&status=PENDING,PROCESSING,ON_HOLD`
  );
  return response;
};

export const getLastOrders = async email => {
  const response = axiosInstance.get(`/orders/last-order?email=${email}`);
  return response;
};

export const getOrdersHistory = async (email, page) => {
  const response = axiosInstance.get(
    `/customer/ecommerce/orders?page=1&perPage=1000&status=COMPLETED,CANCELLED,REFUNDED,FAILED`
  );
  return response;
};
