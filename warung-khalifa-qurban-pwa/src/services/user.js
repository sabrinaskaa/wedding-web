import { axiosInstance } from "../config";

export const getUserProfile = async () => {
  const response = axiosInstance.get(`/customer/profile`);
  return response;
};

export const getUserVoucher = async page => {
  const response = axiosInstance.get(`/customer/vouchers?page=${page || "1"}`);
  return response;
};

export const getUserRewards = async page => {
  const response = axiosInstance.get(
    `/customer/ecommerce/rewards?page=${page || "1"}`
  );
  return response;
};

export const buyReward = async id => {
  try {
    const response = axiosInstance.post(
      `/customer/ecommerce/rewards/${id}/buy`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const redeemCode = async code => {
  try {
    const response = axiosInstance.post("/customer/vouchers", code);
    return response;
  } catch (error) {
    console.error(error);
  }
};
