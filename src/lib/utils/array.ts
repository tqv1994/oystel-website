import type { Kind } from '$lib/store/category';

export function contains(
  haystack: any[],
  key: string | null,
  needle: string | number | boolean,
) {
  const index = haystack.findIndex((item: any) =>
    key != null ? item[key] == needle : item == needle,
  );
  if (index >= 0) {
    return true;
  }
  return false;
}

export function processArrayFromMeilisearch(input: Kind[]) {
  return input.map((item) => {
    item.id = item.id.substring(item.id.lastIndexOf('-') + 1);
    return item;
  });
}

export const getKindById = (
  id: string | number | undefined,
  kinds: Kind[],
): Kind | undefined => {
  if (!id) {
    return undefined;
  }
  return kinds.find((item) => item.id.toString() === id.toString());
};
