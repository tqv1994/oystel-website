import { Experience, ExperienceData } from '$lib/api/experience/type';
import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import authStore from '$lib/api/auth/store';
import { User } from '../auth/type';

export const experienceStore = writable<CollectionStore<Experience>>({
  items: {},
});

export const updateExperienceStore = (items: ExperienceData[]): void => {
  let me: User|undefined;
  authStore.subscribe(({user})=>{
    me = user;
  });
  updateStore(experienceStore, items, (item) => { 
    // if(me && item.users){
    //   let indexExist = item.users.findIndex((user: User)=>user.id === me?.id);
    //   if(indexExist >= 0){
    //     item.liked = true;
    //   }else{
    //     item.liked = false;
    //   }
    // }
    return new Experience(item)
  });
};
