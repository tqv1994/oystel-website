export class ApiConfig{
  apiUrl:string = 'https://cms.oysteo.su93rheroes.com';

  public getApiRoute(endpoint: string){
    return this.apiUrl+endpoint;
  }
};