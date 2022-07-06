import { PRODUCT_DESIGNER, TYPE } from '$lib/store/search';
import type { Linkable } from '$lib/store/types';
import slugify from 'slugify';

export function makeLink<T extends Linkable>(prefix: string | null, o: T): string {
  if(prefix === null){
    return 'javascript:void(0);';
  }
  if (prefix === '') {
    prefix = '/';
  }
  if (!o) {
    return prefix;
  }
  return `${prefix}/${slugify(o?.name || 'n')}-${o.id}`;
}

export const getSlug = <T extends Linkable>(o: T): string =>
  `${slugify(o?.name || '')}-${o.id}`;

export const makeLinkShopCategory = <T extends Linkable>(o: T): string =>
  `/shop/products-listing?${TYPE}=${o.id.substring(o.id.lastIndexOf('-') + 1)}`;

export const makeLinkShopDesigner = <T extends Linkable>(o: T): string =>
  `/shop/products-listing?${PRODUCT_DESIGNER}=${o.id.substring(
    o.id.lastIndexOf('-') + 1,
  )}`;

export const getWebsiteUrl = () => {
  return `${window.location.protocol}//${window.location.host}`;
}