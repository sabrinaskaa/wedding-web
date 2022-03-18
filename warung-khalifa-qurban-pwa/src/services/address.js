import axios from "axios";
import { axiosInstance } from "../config";

export const getAddress = async () => {
  const response = await axios.get("../local-data/data.json");
  return response.data;
};

export const getUserAddrres = async () => {
  const response = await axiosInstance.get(
    `/customer/profile/addresses?page=1&perPage=${Number.MAX_SAFE_INTEGER}&search=&isDefault=false`
  );
  return response.data;
};

export const setDefaultUserAddrres = async id => {
  const response = await axiosInstance.put(
    `/customer/profile/addresses/${id}/default`
  );
  return response.data;
};

export const getProvinces = async () => {
  const response = await axiosInstance.get(
    `/customer/locations/provinces?page=1&perPage=50`
  );
  return response.data;
};

export const getCities = async id => {
  const response = await axiosInstance.get(
    `/customer/locations/cities?page=1&perPage=50&province=${id}`
  );
  return response.data;
};

export const searchProvince = async keyword => {
  const response = await axiosInstance.get(
    `/customer/locations/provinces?page=1&perPage=50&search=${keyword}`
  );
  return response.data;
};

export const searchCity = async (id, keyword) => {
  const response = await axiosInstance.get(
    `/customer/locations/cities?province=${id}&search=${keyword}`
  );
  return response.data;
};

export const multipleSearch = async (keyword, page, subdistricId) => {
  const response = await axiosInstance.get(
    `/customer/locations/subdistricts?search=${keyword || ""}&page=${page ||
      "1"}&subdistrictId=${subdistricId || ""}`
  );
  return response.data;
};

export const getLocationByOpenStreetMapReverse = async (lat, lon) => {
  const response = await axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
    .then(res => res.data);
  return response;
};

export const getLocationByOpenStreetMapStreet = async street => {
  const response = await axios
    .get(
      `https://nominatim.openstreetmap.org/search?street=${street}&country=id&format=json`
    )
    .then(res => res.data);
  return response;
};

export const createAddress = async data => {
  const response = await axiosInstance.post(
    `/customer/profile/addresses`,
    data
  );
  return response.data;
};

export const getAddressById = async id => {
  const response = await axiosInstance.get(`/customer/profile/addresses/${id}`);
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await axiosInstance.put(
    `/customer/profile/addresses/${id}`,
    data
  );
  return response.data;
};

export const deleteAddress = async id => {
  const response = await axiosInstance.delete(
    `/customer/profile/addresses/${id}`
  );
  return response.data;
};
