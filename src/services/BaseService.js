import Http from '@/util/http';
import store from '@/store';
import NetworkError from '../util/errors/network-error';

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

export const handleError = (error) => {
  if (error.message === 'Network error') {
    throw new NetworkError('Tente em alguns minutos.');
  }

  const code = parseInt(error.response && error.response.status);

  if (code === 401) {
    store.dispatch('auth/signOut');
  }

  return Promise.reject(error);
};
