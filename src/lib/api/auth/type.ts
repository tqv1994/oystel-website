import { Destination } from "../destination/type";
import { Experience } from "../experience/type";
import { FileUploadData } from "../file-upload/type";
import { ProductData } from "../product/type";
import { BaseData, PublishableBase, PublishBaseData } from "../types";

export type UserData = BaseData & PublishBaseData &{
    username: string;
    surname: string;
    displayName: string;
    mobile: string;
    location?: string;
    birthday?: string;
    height?: number;
    weight?: number;
    notes?: string;
    email?: string;
    phoneNumber?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    destinationLikes?: Destination[];
    experienceLikes?: Experience[];
    productLikes?: ProductData[];
    avatar: FileUploadData
};

export class User extends PublishableBase implements UserData{
    username: string;
    surname: string;
    displayName: string;
    mobile: string;
    location?: string;
    birthday?: string;
    height?: number;
    weight?: number;
    notes?: string;
    email?: string;
    phoneNumber?: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    destinationLikes?: Destination[];
    experienceLikes?: Experience[];
    productLikes?: ProductData[];
    avatar: FileUploadData;
    constructor(data: UserData) {
        super(data);
        Object.assign(this, data);
    }
}

