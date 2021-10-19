import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import { DestinationType, DestinationTypeData } from './type';
import authStore from '$lib/api/auth/store';
import { User } from '../auth/type';
import { Destination } from '../destination/type';

export const destinationTypeStore = writable<CollectionStore<DestinationType>>({
  items: {},
});

export const updateDestinationTypeStore = (items: DestinationTypeData[]): void =>{
  let me: User|undefined;
  authStore.subscribe(({user})=>{
    me = user;
  });
  updateStore(destinationTypeStore, items, (item) =>{
    if(item.destinations){
      item.destinations = item.destinations.map((destination: Destination) => {
        if(destination.users){
          let indexExist = destination.users.findIndex((user: User)=>user.id === me?.id);
          if(indexExist >= 0){
            destination.liked = true;
          }else{
            destination.liked = false;
          }
        }
        return destination;
      });
    } 
    return new DestinationType(item)
  });
};
