import { apiPrefix } from "$lib/env";

export class ApiConfig{

  public getApiRoute(endpoint: string){
    return apiPrefix+endpoint;
  }
};