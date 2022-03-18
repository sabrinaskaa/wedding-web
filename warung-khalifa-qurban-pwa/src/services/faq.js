import { axiosInstance } from "../config";

export const getFaq = async () => {
  const response = await axiosInstance.get(
    "/customer/cms/faqs?page=1&perPage=10&search&category=&sortBy=createdAt&orderBy=asc"
  );
  return response.data;
};

export const getFaqById = async id => {
  const response = await axiosInstance.get(`/customer/cms/faqs/${id}`);
  return response.data;
};

export const getCategoryFaq = async () => {
  const response = await axiosInstance.get(
    "/customer/cms/faqs/categories?page=1&perPage=1000&search="
  );
  return response.data;
};
