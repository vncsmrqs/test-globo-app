import Http from '@/util/http';
import store from '@/store';

export default class BaseService {
  constructor() {
    this.api = new Http({
      baseUrl: process.env.MIX_API_URL,
      onError: handleError,
    });
  }
}

const handleError = (error) => {
  const code = parseInt(error.response && error.response.status);

  if (code === 401) {
    store.dispatch('auth/signOut');
  }

  return Promise.reject(error);
};
