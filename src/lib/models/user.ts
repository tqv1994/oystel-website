import { AdvisorModel, RoleModel } from "$lib/types"
import { DestinationModel } from "./destination"
import { ExperienceModel } from "./experience"
import { GalleryModel, ThumbnailModel } from "./gallery";
import { ProductModel } from "./product"
import { apiPrefix } from '$lib/env';

export class UserModel{
    username: string;
    forenames?: string;
    surname?: string;
    displayName?: string;
    phoneNumber?: string;
    location?: string;
    birthday?: Date;
    height?: number;
    weight?: number;
    notes?: string;
    email?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    role: RoleModel;
    destinationLikes?: DestinationModel[];
    experienceLikes?: ExperienceModel[];
    productLikes?: ProductModel[];
    myAdvisors?: AdvisorModel[];
    advisorMe?: AdvisorModel;
    avatar: GalleryModel;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    get avatarUrl(){
        console.log(this.avatar);
        if(this.avatar){
            let url = this.avatar.url;
            if(url.indexOf(apiPrefix) < 0){
                return url;
            }else{
                return url;
            }
        }else{
            return '';
        }
    }
}