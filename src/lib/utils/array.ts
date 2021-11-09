export function contains(haystack: any[], key: string|null, needle: string|number|boolean){
    const index = haystack.findIndex((item: any)=> key != null ? item[key] == needle : item == needle);
    if(index >= 0){
        return true;
    }
    return false;
}