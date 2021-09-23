import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { CountryModel } from './country';
import { StringHelper } from '$lib/helpers';
import { apiPrefix } from '$lib/env';

export class ExperienceModel{
    id: any;
    title: string;
    intro: string;
    type: string;
    gallery: any[];
    videos: string[];
    body: string;
    country: CountryModel;
    liked?: boolean = false;

    get featuredPhoto(){
        const apiConfig = new ApiConfig();
        let photo = '';
        if(this.gallery?.length>0) {
            photo = new GalleryModel(this.gallery[0]).url;
        }
        if(photo.indexOf(apiPrefix) < 0){
            photo = apiPrefix+photo;
        }
        return photo;
    }

    get featuredPhotoWithHash(){
        const apiConfig = new ApiConfig();
        let photo: GalleryModel = new GalleryModel();
        let photoUrl = '';
        if(this.gallery && this.gallery.length>0) {
            photo = new GalleryModel(this.gallery[0]);
        }
        if(photo.url.indexOf(apiPrefix) < 0){
            photoUrl = apiPrefix+photo.url;
        }
        return {
            url: photoUrl,
            blurHash: photo.blurHash,
        };
    }

    getImagesUrl(type='default'){
        let photos: string[] = [];
        if(this.gallery.length > 1){
            this.gallery.map((item, index)=>{
                if(index > 0){
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
                }
            });
        }
        return photos;
    }

    get imageUrlWithHashs(){
        let photos: {
            url: string,
            blurHash?: string
        }[] = [];
        if(this.gallery.length > 0){
            this.gallery.map((item, index)=>{
                if(index > 0){
                    item = new GalleryModel(item);
                    if(item.url.indexOf(apiPrefix) < 0){
                        item.url = item.url;
                    }
                    photos.push({url: item.url, blurHash: item.blurHash});
                }
            });
        }
        return photos;
    }

    get link(){
        if(!this.title){
            return '#';
        }
        const stringHelper = new StringHelper();
        return '/experiences-listing/'+stringHelper.stringToSlug(this.title)+'-'+this.id;
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

    get bodySection(){
        return this.body.split("\n\n\n");
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}