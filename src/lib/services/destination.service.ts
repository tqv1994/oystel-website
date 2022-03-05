import { User } from "$lib/store/auth";
import { Destination } from "$lib/store/destination";

export const likeDestinationService = async(id: string, destinationsLiked: Destination[]): Promise<User> => {
    let destinationIds: string[] = destinationsLiked.map((item)=>item.id);
    const indexExist = destinationIds.findIndex((item)=>item === id);
    if(indexExist < 0){
        destinationIds.push(id);
    }else{
        destinationIds.splice(indexExist,1);
    }
    return new Promise (async(resolve, reject)=>{
        const res = await fetch(`/destination/like.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(destinationIds),
        });
        if(res.ok){
            const data:  {updateUser:{
                user: User
            }} = await res.json();
            resolve(data.updateUser?.user);
        }else{
            const error = await res.json();
            reject(error);
        }
    });
}