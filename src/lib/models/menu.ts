import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { DestinationTypeModel } from './destination_type';
import { ExperienceTypeModel } from './experience_type';

export class MenuModel{
    id: any;
    title: string;
    link: string;
    destination_types: DestinationTypeModel[];
    experience_types: ExperienceTypeModel[];
    slug: string;

    get hasSubMenu(){
        if(this.destination_types && this.destination_types.length > 0){
            return true;
        }
        if(this.experience_types && this.experience_types.length > 0){
            return true;
        }
        return false;
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}