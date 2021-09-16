import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { ProductModel } from './product';

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
        let photo = '';
        if(this.gallery?.length>0) {
            photo = new GalleryModel(this.gallery[0]).url;
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

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}