import BaseService from './BaseService';

export default class HealthCheckService extends BaseService {
  index() {
    return this.api.get('health-check', this.options);
  }
}
