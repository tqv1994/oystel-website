import { Destination, DestinationData } from './type';
import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import authStore from '$lib/api/auth/store';
import { User } from '../auth/type';

export const destinationStore = writable<CollectionStore<Destination>>({
  items: {},
});

export const updateDestinationStore = (items: DestinationData[]): void => {
  let me: User|undefined;
  authStore.subscribe(({user})=>{
    me = user;
  });
  updateStore(destinationStore, items, (item) => {
    // if(me && item.users){
    //   let indexExist = item.users.findIndex((user: User)=>user.id === me?.id);
    //   if(indexExist >= 0){
    //     item.liked = true;
    //   }else{
    //     item.liked = false;
    //   }
    // }
    return new Destination(item)
  });
};
