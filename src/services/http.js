import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import baseURL from "../configs/http";

const http = axios.create({
  baseURL: baseURL.baseURL
});
axios.defaults.baseURL = baseURL.baseURL;

Vue.use(VueAxios, axios);
Vue.axios.interceptors.request.use(

  async config => {
    const toknzer = localStorage.getItem('tokenizer');
    try {
      const token = toknzer;

      if (!token) {
        // throw new Error("token not found!");
      }

      config.headers.Authorization = token;
      return config;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);

      return Promise.reject(err);
    }
  },
  err => Promise.reject(err)
);


Vue.axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error.response.status === 401) {
    console.log('error 401')
  }
  return error.response
});

export default http;
