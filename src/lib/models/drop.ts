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
        let photo;
        if(this.gallery?.length>0) {
            photo = new GalleryModel(this.gallery[0]);
        }

        return this.getImageWithBlurHash(photo);
    }

    getImagesUrl(type='default'){
        let photos: string[] = [];
        if(this.gallery.length > 0){
            this.gallery.map((item)=>{
                switch (type){
                    case 'small':
                        photos.push(this.getImageWithBlurHash(new GalleryModel(item).formats.small));
                        break;
                    case 'medium':
                        photos.push(this.getImageWithBlurHash(new GalleryModel(item).formats.medium));
                        break
                    case 'thumbnail':
                        photos.push(this.getImageWithBlurHash(new GalleryModel(item).formats.thumbnail));
                        break;
                    default:
                        photos.push(this.getImageWithBlurHash(new GalleryModel(item)));
                        break;
                }

            });
        }
        return photos;
    }

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    getImageWithBlurHash(image?: any){
        // if(image){
        //     if(image.url.indexOf(apiPrefix) < 0){
        //         image.url = apiPrefix+image.url;
        //     }
        // }else{
        //     let image = {
        //         url: '#',
        //         hash: ''
        //     }
        // }
        if(image.url.indexOf(apiPrefix) < 0){
                    image.url = apiPrefix+image.url;
                }
        return image.url;
    }
}