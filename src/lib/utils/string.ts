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