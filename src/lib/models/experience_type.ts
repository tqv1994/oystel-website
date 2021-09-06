import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { ExperienceModel } from './experience';

export class ExperienceTypeModel{
    id: any;
    title: string;
    experiences: ExperienceModel[];

    get link(){
        return '#';
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}