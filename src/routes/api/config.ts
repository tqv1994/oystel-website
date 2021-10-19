import { cmsUrlPrefix } from '$lib/env';

export class ApiConfig {
  public getApiRoute(endpoint: string) {
    return cmsUrlPrefix + endpoint;
  }
}
