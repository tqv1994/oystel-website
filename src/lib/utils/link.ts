import { PRODUCT_DESIGNER, TYPE } from '$lib/store/search';
import { Linkable } from '$lib/store/types';
import slugify from 'slugify';

export const makeLink = <T extends Linkable>(
  prefix: string,
  o: T,
): string => `${prefix}/${slugify(o.name || '')}-${o.id}`;

export const getSlug = <T extends Linkable>(o: T): string => `${slugify(o.name || '')}-${o.id}`;

export const makeLinkShopCategory = <T extends Linkable>(
  o: T,
): string => `/shop/products-listing?${TYPE}=${o.id}`;

export const makeLinkShopDesigner = <T extends Linkable>(
  o: T,
): string => `/shop/products-listing?${PRODUCT_DESIGNER}=${o.id}`;