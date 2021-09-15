import {GalleryModel} from './gallery';
import { ApiConfig } from '../../routes/api/config';
import { CountryModel } from './country';
import { UserModel }  from '$lib/models/user';
import { StringHelper } from '$lib/helpers';
import { LanguageModel } from './language';

export class AdvisorModel{
    id: any;
    name: string;
    countries: CountryModel[];
    bio: string;
    accept: boolean;
    userMe: UserModel;
    specialties: AdvisorSpecialty[];
    location: CountryModel;
    languages: LanguageModel[];

    constructor(values: Object = {}) {
        Object.assign(this, values);
        if(this.userMe){
            this.userMe = new UserModel(this.userMe);
        }
    }

    get link(){
        if(!this.userMe){
            return '#';
        }
        const stringHelper = new StringHelper();
        return '/advisor/'+stringHelper.stringToSlug(this.userMe.displayName ? this.userMe.displayName : this.userMe.username)+'-'+this.id;
    }

    get specialtiesString(){
        let result = '';
        if(this.specialties && this.specialties.length > 0){
            this.specialties.map((item: AdvisorSpecialty, index)=>{
                if(index == 0){
                    result = item.title;
                }else{
                    result += ', '+item.title;
                }
            });
        }
        return result;
    }

    get locationTitle(){
        return this.location ? this.location.name : '';
    }

    get languagesString(){
        let result = '';
        if(this.languages && this.languages.length > 0){
            this.languages.map((item,index)=>{
                if(index == 0){
                    result = item.title;
                }else{
                    result += ', '+item.title;
                }
            });
            return result;
        }
    }
}

export class AdvisorSpecialty{
    id: number;
    title: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}