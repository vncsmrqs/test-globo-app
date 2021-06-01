import Http from '@/util/http';

export default class AuthService {
  constructor() {
    this.api = new Http({
      baseUrl: process.env.BASE_URL,
    });
  }

  signIn({ email, password }) {
    return this.api.post('auth/sign-in', { email, password });
  }
}
