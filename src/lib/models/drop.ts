import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';
import { apiPrefix } from '$lib/env';

export class DropModel{
    id: any;
    title: string;
    body: string;
    products: ProductModel[];
    gallery: GalleryModel[];

    get link(){
        return '#';
    }

    get featuredPhoto(){
        const apiConfig = new ApiConfig();
        let photo = "";
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
            photoUrl = photo.url;
        }
        return {
            url: photoUrl,
            blurHash: photo.blurHash,
        };
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

    get imageUrlWithHashs(){
        let photos: {
            url: string,
            blurHash?: string
        }[] = [];
        if(this.gallery.length > 0){
            this.gallery.map((item)=>{
                item = new GalleryModel(item);
                if(item.url.indexOf(apiPrefix) < 0){
                    item.url = item.url;
                }
                photos.push({url: item.url, blurHash: item.blurHash});
            });
        }
        return photos;
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}