import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { ExperienceModel } from './experience';
import { DestinationModel } from './destination';

export class CountryModel{
    id: any;
    name: string;
    experiences: ExperienceModel[];
    destinations: DestinationModel[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}