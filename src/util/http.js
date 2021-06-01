import axios from 'axios';

axios.defaults.withCredentials = false;

const BASE_URL = process.env.VUE_APP_BASE_API;
const TIMEOUT = process.env.TIMEOUT;

export default class Http {
  constructor({
    baseUrl,
    headers = {},
    timeout = 10000,
    onSuccess,
    onError,
  } = {}) {
    const api = axios.create({
      baseURL: baseUrl || BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      timeout: timeout || TIMEOUT,
    });

    api.interceptors.response.use(
      onSuccess ? onSuccess : (response) => Promise.resolve(response.data),
      onError ? onError : (error) => Promise.reject(error)
    );

    return api;
  }
}
