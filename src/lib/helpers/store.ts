import { Destination } from "$lib/store/destination";
import { Experience } from "$lib/store/experience";
import { Drop } from "$lib/store/drop";

export const storeHelper = {
    getItems: function (data: Destination[] | Experience[] | Drop[], limit: number) {
        return data.slice(0, limit);
    }
}