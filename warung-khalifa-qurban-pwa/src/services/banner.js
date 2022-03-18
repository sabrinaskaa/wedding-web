import { axiosInstance } from "../config";

export const getBanners = async () => {
  const response = await axiosInstance.get("/customer/ecommerce/banners");
  return response.data;
};

export const getBannerById = async id => {
  const response = await axiosInstance.get(`/customer/ecommerce/banners/${id}`);
  return response.data;
};
