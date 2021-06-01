import BaseService from './BaseService';

export default class UserService extends BaseService {
  index() {
    return this.api.get('users', this.options);
  }
}
