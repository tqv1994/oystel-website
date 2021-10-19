import { writable } from 'svelte/store';
import { User } from '../auth/type';
import { CollectionStore, updateStore } from '../types';
import { ExperienceType, ExperienceTypeData } from './type';
import authStore from '../auth/store';
import { Experience } from '../experience/type';

export const experienceTypeStore = writable<CollectionStore<ExperienceType>>({
  items: {},
});

export const updateExperienceTypeStore = (items: ExperienceTypeData[]): void => {
  let me: User|undefined;
  authStore.subscribe(({user})=>{
    me = user;
  });
  updateStore(experienceTypeStore, items, (item) =>{
    if(item.experiences){
      item.experiences = item.experiences.map((experience: Experience) => {
        if(experience.users){
          let indexExist = experience.users.findIndex((user: User)=>user.id === me?.id);
          if(indexExist >= 0){
            experience.liked = true;
          }else{
            experience.liked = false;
          }
        }
        return experience;
      });
    } 
    return new ExperienceType(item)
  });
}
