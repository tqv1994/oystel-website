import type { Country } from '$lib/store/country';

export function implodeString(
  arrStr: (string | undefined)[],
  separator: string,
) {
  const arr = [];
  for (const i in arrStr) {
    if (arrStr[i] == '' || typeof arrStr[i] == 'undefined') {
      continue;
    }
    arr.push(arrStr[i]);
  }
  return arr.join(separator);
}

export function createPatternPhoneCode(countries: Country[]): RegExp {
  const strRegex = countries.reduce(
    (acc, item) => (item.phone == null ? acc : `${acc}${item.phone}|`),
    '',
  );
  return new RegExp(`^\\+?(${strRegex})`, 'gm');
}

export function removeMeilisearchPrefixId(prefix: string, id: string): string {
  return id.replace(prefix, '');
}

export function getShortText(text: string, length = 80){
  if(!text || text === ''){
    return '';
  }
  return `${(text || '').substring(0, 80)}...`;
}