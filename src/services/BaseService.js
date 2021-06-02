import Http from '@/util/http';
import store from '@/store';

export default class BaseService {
  constructor() {
    this.api = new Http({
      baseUrl: process.env.VUE_APP_BASE_API,
      onError: handleError,
    });
    const token = localStorage.getItem('auth.token');
    this.options = {
      headers: {
        'x-access-token': token,
      },
    };
  }
}

const handleError = (error) => {
  const code = parseInt(error.response && error.response.status);

  if (code === 401) {
    store.dispatch('auth/signOut');
  }

  return Promise.reject(error);
};
