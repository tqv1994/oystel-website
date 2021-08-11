export class ApiConfig{
  apiUrl:string = 'http://localhost:1337/';

  public getApiRoute(endpoint: string){
    return this.apiUrl+endpoint;
  }
};