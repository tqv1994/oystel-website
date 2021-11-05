export const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG as string,
);
export const cmsUrlPrefix = import.meta.env.VITE_API_PREFIX as string;
export const graphApiUrl = cmsUrlPrefix + '/graphql';
export const meilisearchUrl = import.meta.env.VITE_MEILISEARCH_URL as string;
export const meilisearchApiKey = import.meta.env.VITE_MEILISEARCH_API_KEY as string;
