import { Country } from '$lib/store/country';
import { Language } from '$lib/store//language';
import { Category } from '$lib/store/advisor-type';
import { cmsUrlPrefix } from '$lib/env';

export const stringHelper = {
  objectToQueryString: function(obj: any, prefix?: string): string {
    const query = Object.keys(obj).map((key) => {
      const value  = obj[key];
  
      if (obj.constructor === Array)
        key = `${prefix}[]`;
      else if (obj.constructor === Object)
        key = (prefix ? `${prefix}[${key}]` : key);
  
      if (typeof value === 'object')
        return stringHelper.objectToQueryString(value, key);
      else
        return `${key}=${encodeURIComponent(value)}`;
    });
  
    return [].concat.apply([], query).join('&');
  },

  queryURLParamToJSON: (query: string) => {
    console.log(query);
    var re = /([^&=]+)=?([^&]*)/g;
    var decodeRE = /\+/g;

    var decode = function (str: string) {
        return decodeURIComponent(str.replace(decodeRE, " "));
    };

    var params: any = {}, e;
    while (e = re.exec(query)) {
        var k = decode(e[1]), v = decode(e[2]);
        if (k.substring(k.length - 2) === '[]') {
            k = k.substring(0, k.length - 2);
            (params[k] || (params[k] = [])).push(v);
        }
        else params[k] = v;
    }

    var assign = function (obj: any, keyPath: string, value: any) {
        var lastKeyIndex = keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            var key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    for (var prop in params) {
        var structure = prop.split('[');
        if (structure.length > 1) {
            var levels: any = [];
            structure.forEach(function (item, i) {
                var key = item.replace(/[?[\]\\ ]/g, '');
                levels.push(key);
            });
            assign(params, levels, params[prop]);
            delete(params[prop]);
        }
    }
    return params;
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

  getFullUrlImage: function(url:string,is_static?: boolean){
    if(typeof url != "undefined"){
      if(is_static){
        return url;
      }
      if (url.indexOf('https') < 0) {
        url = cmsUrlPrefix + url;
      }
      return url;
    }
    return "";
  },

  getSpecialtiesString: function(advisorTypes?: Category[],emptyValue?: string){
    let result = '';
    if (advisorTypes && advisorTypes.length > 0) {
        advisorTypes.map((item: Category, index) => {
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
  },

  getExcerpt: function(str: string){
    const maxLength = 70; // maximum number of characters to extract
    if(str.length <= maxLength) return str;
    //trim the string to the maximum length
    const trimmedString = str
      .replace(/<[^>]*>?/gm, '')
      .substr(0, maxLength);
    return (
      trimmedString.substring(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
      ) + '...'
    );
  }
}
