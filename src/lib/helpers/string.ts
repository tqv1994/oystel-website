export const stringHelper = {
  objectToQueryString: function (obj: any, prefix?: string): string {
    const query = Object.keys(obj).map((key) => {
      const value = obj[key];

      if (obj.constructor === Array) key = `${prefix}[]`;
      else if (obj.constructor === Object)
        key = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === 'object')
        return stringHelper.objectToQueryString(value, key);
      else return `${key}=${encodeURIComponent(value)}`;
    });

    return [].concat.apply([], query).join('&');
  },

  queryURLParamToJSON: (query: string) => {
    const re = /([^&=]+)=?([^&]*)/g;
    const decodeRE = /\+/g;

    const decode = function (str: string) {
      return decodeURIComponent(str.replace(decodeRE, ' '));
    };

    let params: any = {},
      e;
    while ((e = re.exec(query))) {
      let k = decode(e[1]),
        v = decode(e[2]);
      if (k.substring(k.length - 2) === '[]') {
        k = k.substring(0, k.length - 2);
        (params[k] || (params[k] = [])).push(v);
      } else params[k] = v;
    }

    const assign = function (obj: any, keyPath: string, value: any) {
      const lastKeyIndex = keyPath.length - 1;
      for (let i = 0; i < lastKeyIndex; ++i) {
        const key = keyPath[i];
        if (!(key in obj)) obj[key] = {};
        obj = obj[key];
      }
      obj[keyPath[lastKeyIndex]] = value;
    };

    for (const prop in params) {
      const structure = prop.split('[');
      if (structure.length > 1) {
        var levels: any = [];
        structure.forEach(function (item, i) {
          const key = item.replace(/[?[\]\\ ]/g, '');
          levels.push(key);
        });
        assign(params, levels, params[prop]);
        delete params[prop];
      }
    }
    return params;
  },
};
