import { axiosInstance } from "../config";

export const getListPasar = async (keyword, page) => {
  const response = await axiosInstance.get(
    `/customer/ecommerce/locations?search=${keyword}&page=${page || "1"}`
  );
  return response.data;
};

export const locationById = async id => {
  const response = await axiosInstance.get(
    `/customer/ecommerce/locations/${id}`
  );
  return response.data;
};

export const tenantInfo = async () => {
  const response = await axiosInstance.get(`/customer/tenant/profile`);
  return response.data;
};

export const popups = async () => {
  const response = await axiosInstance.get("/customer/cms/popups");
  return response.data;
};
