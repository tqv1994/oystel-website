export const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG as string,
);
export const cmsUrlPrefix = import.meta.env.VITE_API_PREFIX as string;
export const graphApiUrl = import.meta.env.VITE_GRAPH_API_URL as string;
export const meilisearchUrl = import.meta.env.VITE_MEILISEARCH_URL as string;
