import type { User } from '$lib/store/auth';
import type { Destination } from '$lib/store/destination';
import type { Product } from '$lib/store/product';

export const likeProductService = async (
  id: string,
  productsLiked: Product[],
): Promise<User> => {
  const productIds: string[] = productsLiked.map((item) => item.id);
  const indexExist = productIds.findIndex((item) => item === id);
  if (indexExist < 0) {
    productIds.push(id);
  } else {
    productIds.splice(indexExist, 1);
  }
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`/product/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productIds),
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
