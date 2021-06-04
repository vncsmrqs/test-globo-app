import Http from '@/util/http';
import { handleError } from './BaseService';

export default class AuthService {
  constructor() {
    this.api = new Http({
      baseUrl: process.env.VUE_APP_BASE_API,
      onError: handleError,
    });
  }

  signIn({ email, password }) {
    return this.api.post('auth/sign-in', { email, password });
  }
}
