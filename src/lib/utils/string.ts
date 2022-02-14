import { Country } from "$lib/store/country";

export function implodeString(arrStr: (string|undefined)[],separator: string){
    let arr = [];
    for(let i in arrStr){
        if(arrStr[i] == '' || typeof arrStr[i] == 'undefined'){
            continue;
        }
        arr.push(arrStr[i]);
    }
    return arr.join(separator);
}

export function createPatternPhoneCode(countries: Country[]): RegExp{
    let strRegex = countries.reduce((acc, item)=>item.phone == null ? acc : `${acc}${item.phone}|`,'');
    return new RegExp(`^\\+?(${strRegex})`,'gm');
}

export function removeMeilisearchPrefixId(prefix: string,id: string): string{
    return id.replace(prefix,'');
}