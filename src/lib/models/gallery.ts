export class GalleryModel{
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    url: string;
    formats: {
        thumbnail: ThumbnailModel,
        medium: ThumbnailModel,
        small: ThumbnailModel
    };
    blurHash: string;
    hash: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class ThumbnailModel{
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string;
    url: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}