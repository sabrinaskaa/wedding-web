import { axiosInstance } from "../config";

export const loginWithFirebaseToken = async token => {
  const response = await axiosInstance.post(
    "/customer/auth/login-with-firebase-gmail",
    {
      token
    }
  );
  return response.data;
};

export const loginWithEmailToken = async data => {
  const response = await axiosInstance.post(
    "/customer/auth/login-with-email",
    data
  );
  return response.data;
};
export const resetPassword = async email => {
  try {
    const response = axiosInstance.post(
      "/customer/auth/request-reset-password",
      email
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmail = async data => {
  const response = await axiosInstance.post("/customer/auth/register", data);
  return response.data;
};
