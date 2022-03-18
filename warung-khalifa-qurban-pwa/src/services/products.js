import { axiosInstance } from "../config";

export const getProductTopSellers = async (vendorId, page) => {
  const response = await axiosInstance
    .get(`/customer/ecommerce/products?isFeatured=true&page=${page || "1"}`)
    .catch(error => {
      localStorage.removeItem("selectedPasar");
      window.location.replace("/market");
    });
  return response.data;
};

export const getProductCategories = async () => {
  const response = await axiosInstance
    .get(
      "/customer/ecommerce/products/categories?page=1&perPage=100&isParent=true"
    )
    .catch(error => {
      localStorage.removeItem("selectedPasar");
      window.location.replace("/market");
    });
  return response.data.data;
};

export const getProductBrands = async () => {
  const response = await axiosInstance.get("/products/brands").catch(error => {
    localStorage.removeItem("selectedPasar");
    window.location.replace("/market");
  });
  return response.data.data;
};

export const getProductDetail = async productId => {
  const response = await axiosInstance
    .get(`/customer/ecommerce/products/${productId}`)
    .catch(error => {
      localStorage.removeItem("selectedPasar");
      window.location.replace("/market");
    });
  return response.data.data;
};

export const getProductbyCategories = async (categoryId, page) => {
  const response = await axiosInstance
    .get(
      `/customer/ecommerce/products?category=${categoryId}&page=${page || "1"}`
    )
    .catch(error => {
      localStorage.removeItem("selectedPasar");
      window.location.replace("/market");
    });
  return response.data;
};

export const getProductbyKeyword = async (keyword, vendorId) => {
  const response = await axiosInstance
    .get(`/customer/ecommerce/products?search=${keyword}`)
    .catch(error => {
      localStorage.removeItem("selectedPasar");
      window.location.replace("/market");
    });
  return response.data.data;
};

export const getListArticles = async id => {
  const response = await axiosInstance.get(
    `/customer/cms/articles?category=${id}`
  );

  return response.data.data;
};
export const getListAllArticles = async () => {
  const response = await axiosInstance.get(`/customer/cms/articles`);
  return response.data.data;
};
export const getListArticleCategories = async id => {
  const response = await axiosInstance.get(`/customer/cms/categories`);
  return response.data.data;
};

export const getDetailArticle = async id => {
  const response = await axiosInstance.get(`/customer/cms/articles/${id}`);
  return response.data.data;
};
