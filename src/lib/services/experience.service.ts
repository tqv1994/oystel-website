import { Experience, ExperienceInput } from "$lib/store/experience";

export const updateExperienceService = async(id: string, input: ExperienceInput):Promise<Experience> => {
    return new Promise (async(resolve, reject)=>{
        const res = await fetch(`/experience/update-${id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...input
            }),
        });
        if(res.ok){
            const data: Experience = await res.json();
            resolve(data);
        }else{
            const error = await res.json();
            reject(error);
        }
    });
}

export const updateNumViewsForExperienceService = async(id: string, experience: Experience): Promise<Experience> => {
    return new Promise (async(resolve, reject)=>{
        const num_views = (experience.num_views || 0) + 1;
        try{
            const res = await updateExperienceService(id,{num_views});
            resolve(res);
        }catch(error){
            reject(error);
        }
    })
}