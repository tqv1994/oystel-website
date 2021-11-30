import { ExperienceSearchResultItem } from '$lib/store/experience';
import { createSearchHandler } from '$lib/store/search';

export const get =
  createSearchHandler<ExperienceSearchResultItem>('experience');
