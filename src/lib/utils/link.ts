import { Linkable } from '$lib/store/types';
import slugify from 'slugify';

export const makeLink = <T extends Linkable>(
  prefix: string,
  o: T,
): string => `${prefix}/${slugify(o.name || '')}-${o.id}`;

export const getSlug = <T extends Linkable>(o: T): string => `${slugify(o.name || '')}-${o.id}`;