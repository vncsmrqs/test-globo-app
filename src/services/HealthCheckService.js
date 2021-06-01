import Http from '@/util/http';
import BaseService from './BaseService';

export default class HealthCheckService extends BaseService {
  index() {
    return this.api.get('health-check');
  }
}
