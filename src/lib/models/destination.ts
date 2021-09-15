import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { CountryModel } from './country';
import { apiPrefix } from '$lib/env';
import { StringHelper } from '$lib/helpers';

export class DestinationModel{
    id: any;
    name: string;
    intro: string;
    type: string;
    gallery: any[];
    videos: string[];
    body: string;
    country: CountryModel;

    get featuredPhoto(){
        const apiConfig = new ApiConfig();
        let photo = '';
        if(this.gallery && this.gallery.length>0) {
            photo = new GalleryModel(this.gallery[0]).url;
        }
        if(photo.indexOf(apiPrefix) < 0){
            photo = apiPrefix+photo;
        }
        return photo;
    }

    getImagesUrl(type='default'){
        let photos: string[] = [];
        if(this.gallery.length > 0){
            this.gallery.map((item)=>{
                switch (type){
                    case 'small':
                        photos.push(new GalleryModel(item).formats.small.url);
                        break;
                    case 'medium':
                        photos.push(new GalleryModel(item).formats.medium.url);
                        break
                    case 'thumbnail':
                        photos.push(new GalleryModel(item).formats.thumbnail.url);
                        break;
                    default:
                        photos.push(new GalleryModel(item).url);
                        break;
                }

            });
        }
        return photos;
    }

    get link(){
        if(!this.name){
            return '#';
        }
        const stringHelper = new StringHelper();
        return '/destination/'+stringHelper.stringToSlug(this.name)+'-'+this.id;
    }

    get excerpt(){
        const maxLength = 90; // maximum number of characters to extract

      //trim the string to the maximum length
      const trimmedString = this.intro.replace(/<[^>]*>?/gm, '').substr(0, maxLength);
        return trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))+'...';
    }

    get country_title(){
        return this.country ? this.country.name : '';
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}