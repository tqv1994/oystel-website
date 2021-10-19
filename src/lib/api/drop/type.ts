import { Linkable } from '../linkable';
import { FileUpload, FileUploadData } from '../file-upload/type';
import { Product, ProductData } from '../product/type';
import { BaseData, PublishableBase, PublishBaseData } from '../types';

export type DropData = BaseData &
  PublishBaseData & {
    name: string;
    description: string;
    products: ProductData[];
    gallery: FileUploadData[];
  };

export class Drop extends PublishableBase implements DropData, Linkable {
  name: string;
  description: string;
  products: Product[];
  gallery: FileUpload[];

  constructor(data: DropData) {
    super(data);
    this.name = data.name;
    this.description = data.description;
    this.products = Product.fromData(data.products);
    this.gallery = FileUpload.fromData(data.gallery);
  }

  get url() {
    return `/drops/${this.id}`;
  }
}
