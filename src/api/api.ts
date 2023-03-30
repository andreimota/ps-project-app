import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;

const get = async (url: string) => {
  const response = (await axios.get(`${url}`))?.data;

  return response;
};

const post = async (url: string, data: unknown) => {
  const response = (await axios.post(`${url}`, data))?.data;

  return response;
};

const put = async (url: string, data: unknown = undefined) => {
  const response = (await axios.put(`${url}`, data));

  return response;
};

const remove = async (url: string) => {
  const response = await axios.delete(url);

  return response;
};

const api = {
  get,
  post,
  put,
  remove
};

export default api;