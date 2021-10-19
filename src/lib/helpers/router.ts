import { stringHelper } from ".";

export const routerHelper = {
    getUrl: function(endpoint: string, title?: string, id?: number|string){
        let url = '/'+endpoint;
        if(title){
            url += '/'+stringHelper.stringToSlug(title);
        }
        if(id){
            if(title){
                url += '-';
            }else{
                url += `/${endpoint}-`;
            }
            url += id;
        }
        return url;
    },
    redirect: function(endpoint: string){
        window.location.href = endpoint;
    }
};