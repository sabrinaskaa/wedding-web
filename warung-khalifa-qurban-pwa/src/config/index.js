import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || "https://api.warung.io"
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  const selectedPasar = JSON.parse(localStorage.getItem("selectedPasar"));
  return {
    ...config,
    headers: {
      Authorization: "Bearer " + token,
      "x-tenant-id": process.env.REACT_APP_TENANT_ID,
      "x-location-id": selectedPasar?.id || null,
      ...config.headers
    }
  };
});

axiosInstance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // if (window.confirm('Terjadi kesalahan, silahkan muat ulang')) {
    //   window.location.reload();
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
