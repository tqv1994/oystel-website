import { Country } from '$lib/api/country/type';
import { Language } from '$lib/api/language/type';
import { Speciality } from '$lib/api/specialty/type';
import { cmsUrlPrefix } from '$lib/env';

export const stringHelper = {
  objectToQueryString: function(obj: any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },

  queryURLParamToJSON: function(entries?: any){
    const result: any = {}
    if(entries){
      for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value;
      }
    }
    return result;
  },

  stringToSlug: function(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuunc------';

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  },

  getSlugId: function(str: string) {
    let strArr = str.split('-');
    return strArr[strArr.length - 1];
  },

  getFullUrlImage: function(url:string){
    if(typeof url != "undefined"){
      if (url.indexOf('https') < 0) {
        url = cmsUrlPrefix + url;
      }
      return url;
    }
    return "";
  },

  getSpecialtiesString: function(specialities?: Speciality[],emptyValue?: string){
    let result = '';
    if (specialities && specialities.length > 0) {
        specialities.map((item: Speciality, index) => {
            if (index == 0) {
                result = item.name;
            } else {
                result += ', ' + item.name;
            }
        });
    }else if(emptyValue){
      return emptyValue;
    }
    return result;
},

getCountriesString: function(countries?: Country[], emptyValue?: string){
    let result = '';
    if (countries && countries.length > 0) {
        countries.map((item: Country, index) => {
            if (index == 0) {
                result = item.name;
            } else {
                result += ', ' + item.name;
            }
        });
    }else if(emptyValue){
      return emptyValue;
    }
    return result;
},

getLanguagesString: function(languages?: Language[], emptyValue?: string){
    let result = '';
    if (languages && languages.length > 0) {
        languages.map((item: Language, index) => {
            if (index == 0) {
                result = item.name;
            } else {
                result += ', ' + item.name;
            }
        });
    }else if(emptyValue){
      return emptyValue;
    }
    return result;
}
}
