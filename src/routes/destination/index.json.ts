import { DestinationSearchResultItem } from '$lib/store/destination';
import { createSearchHandler } from '$lib/store/search';

export const get =
  createSearchHandler<DestinationSearchResultItem>('destination');
