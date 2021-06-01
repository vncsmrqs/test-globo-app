import Http from '@/util/http';

export default class AuthService {
  constructor() {
    this.api = new Http({
      baseUrl: process.env.VUE_APP_BASE_API,
    });
  }

  signIn({ email, password }) {
    return this.api.post('auth/sign-in', { email, password });
  }
}
