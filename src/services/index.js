import * as admin from './admin';

import AuthService from './AuthService';
import HealthCheckService from './HealthCheckService';

export const authService = new AuthService();
export const healthCheckService = new HealthCheckService();

export default {
  admin,
  authService,
  healthCheckService,
};
