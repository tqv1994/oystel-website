import { Advisor } from "$lib/store/advisor";
import { authStore, convertUserToInput, User, UserInput } from "$lib/store/auth"
import { ENUM_TRIP_STATE, TripInput } from "$lib/store/trip";
import { UpdateUserData } from "../../routes/auth/update.json";
import { getTripsService, updateTripService } from "./trip.service";

export const updateUserService = async (input: UserInput): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        const res = await fetch(`/auth/update.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...input
            }),
        });
        if (res.ok) {
            const data: UpdateUserData = await res.json();
            resolve(data.updateUser?.user);
        } else {
            const error = await res.json();
            reject(error);
        }
    });
}

export const deRegisterAdvisorService = async (idAdvisor: string, me: User): Promise<User> => {
    return new Promise(async (resolve, reject) => {
        let userInput = convertUserToInput(me);
        let myAdvisors = userInput.myAdvisors.filter((id) => id !== idAdvisor);
        try {
            const user = await updateUserService(new UserInput({ myAdvisors }));
            const trips = await getTripsService({ advisor: idAdvisor, lead_traveller: me.travellerMe.id, state_neq: ENUM_TRIP_STATE.completed});
            if (trips && trips.length > 0) {
                for (const trip of trips) {
                    await updateTripService(trip.id, { state: ENUM_TRIP_STATE.completed });
                }
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}