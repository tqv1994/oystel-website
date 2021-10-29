import { writable } from 'svelte/store';
import { CollectionStore, updateStore } from '../types';
import authStore from '$lib/api/auth/store';
import { Product, ProductData } from '$lib/api/product/type';
import { User } from '../auth/type';

export const productStore = writable<CollectionStore<Product>>({
  items: {},
});

export const updateProductStore = (items: ProductData[]): void =>{
  let me: User|undefined;
  authStore.subscribe(({user})=>{
    me = user;
  });
  updateStore(productStore, items, (item) => { 
    // if(me && item.users){
    //   let indexExist = item.users.findIndex((user: User)=>user.id === me?.id);
    //   if(indexExist >= 0){
    //     item.liked = true;
    //   }else{
    //     item.liked = false;
    //   }
    // }
    return new Product(item)
  });
}
