import { User, UserInput } from "$lib/store/auth"
import { UpdateUserData } from "../../routes/auth/update.json";

export const updateUserService = async (input: UserInput): Promise<User> =>{
    return new Promise(async(resolve, reject)=>{
        const res = await fetch(`/auth/update.json`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ...input
            }),
        });
        if(res.ok){
            const data: UpdateUserData = await res.json();
            resolve(data.updateUser?.user);
        }else{
            const error = await res.json();
            reject(error);
        }
    });
}