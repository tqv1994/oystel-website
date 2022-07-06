import type { Destination } from '$lib/store/destination';
import type { Experience } from '$lib/store/experience';
import type { Drop } from '$lib/store/drop';

export const storeHelper = {
  getItems: function (
    data: Destination[] | Experience[] | Drop[],
    limit: number,
  ) {
    return data.slice(0, limit);
  },
};
