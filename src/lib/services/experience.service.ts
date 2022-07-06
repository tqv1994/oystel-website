import type { User } from '$lib/store/auth';
import type { Experience } from '$lib/store/experience';

export const likeExperienceService = async (
  id: string,
  experiencesLiked: Experience[],
): Promise<User> => {
  const experienceIds: string[] = experiencesLiked.map((item) => item.id);
  const indexExist = experienceIds.findIndex((item) => item === id);
  if (indexExist < 0) {
    experienceIds.push(id);
  } else {
    experienceIds.splice(indexExist, 1);
  }
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/experience/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceIds),
    });
    if (res.ok) {
      const data: {
        updateUser: {
          user: User;
        };
      } = await res.json();
      resolve(data.updateUser?.user);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};
