export const firebaseConfig = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG as string,
);
export const cmsUrlPrefix = import.meta.env.VITE_API_PREFIX as string;
export const graphApiUrl = cmsUrlPrefix + '/graphql';
export const meilisearchUrl = import.meta.env.VITE_MEILISEARCH_URL as string;
export const meilisearchPublicApiKey = import.meta.env
  .VITE_MEILISEARCH_PUBLIC_API_KEY as string;
export const meilisearchAdminApiKey = import.meta.env
  .VITE_MEILISEARCH_ADMIN_API_KEY as string;
export const instagramLink =
  import.meta.env.VITE_INSTAGRAM_LINK ||
  'https://www.instagram.com/oysteotravel';
export const facebookLink =
  import.meta.env.VITE_FACEBOOK_LINK ||
  'https://business.facebook.com/OysteoTravel';
export const twitterLink =
  import.meta.env.VITE_TWITTER_LINK || 'https://twitter.com/oysteo';
export const pinterestLink =
  import.meta.env.VITE_PINTEREST_LINK ||
  'https://www.pinterest.co.uk/oysteotravel';
export const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'https://staging-website-oysteo.su93rheroes.com';
