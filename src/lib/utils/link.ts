import { Identifiable, Nameable } from '$lib/store/types';
import slugify from 'slugify';

export const makeLink = <T extends Identifiable & Nameable>(
  prefix: string,
  o: T,
): string => `${prefix}/${slugify(o.name || '')}-${o.id}`;
