import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

httpRequest.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export const getAPI = async (path, options = {}) => {
  const res = await httpRequest.get(path, options);

  return res.data;
};

export const postAPI = async (path, options = {}) => {
  const res = await httpRequest.post(path, options.formData);

  return res.data;
};

export const putAPI = async (path, options = {}) => {
  const res = await httpRequest.put(path, options.formData);

  return res.data;
};

export const deleteAPI = async (path, options = {}) => {
  const res = await httpRequest.delete(path, options);

  return res.data;
};

export default httpRequest;
