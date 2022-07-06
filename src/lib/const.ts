import type { Nameable } from './store/types';

export type Menu = {
  name: string;
  slug: string;
  link: string;
  submenu: {
    name: string;
    image: string;
    catalog: string;
    link: string;
  }[];
};

export const menus: Menu[] = [
  {
    name: 'Travel Advisors',
    slug: 'travel-advisors',
    link: '/advisors',
    submenu: [],
  },
  {
    name: 'Destinations',
    slug: 'destinations',
    link: '/destinations',
    submenu: [
      {
        name: 'Beach',
        link: '/destinations?t=6',
        catalog: 'White sans in Goa',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_wi2_38d65ecf64.jpg',
      },
      {
        name: 'City',
        link: '/destinations?t=5',
        catalog: 'Courtyard splendour in Rome',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_ju2_e575bc6f26.jpg',
      },
      {
        name: 'Mountain',
        link: '/destinations?t=2',
        catalog: 'The French Alps',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_39_27_d951f63514.png',
      },
      {
        name: 'Sea',
        link: '/destinations?t=1',
        catalog: 'Cruising around Sardinia',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination3_55a03ac308.jpg',
      },
      {
        name: 'Countryside',
        link: '/destinations?t=7',
        catalog: 'Loire Valley',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_36_23_341d368105.png',
      },
    ],
  },
  {
    name: 'Experiences',
    slug: 'experiences',
    link: '/experiences',
    submenu: [
      {
        name: 'Food',
        link: '/experiences?t=6',
        catalog: 'White sans in Goa',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_wi2_38d65ecf64.jpg',
      },
      {
        name: 'Safari',
        link: '/destinations?t=5',
        catalog: 'Courtyard splendour in Rome',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_ju2_e575bc6f26.jpg',
      },
      {
        name: 'Yoga',
        link: '/destinations?t=2',
        catalog: 'The French Alps',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_39_27_d951f63514.png',
      },
      {
        name: 'Active',
        link: '/destinations?t=1',
        catalog: 'Cruising around Sardinia',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination3_55a03ac308.jpg',
      },
      {
        name: 'Fitness',
        link: '/destinations?t=7',
        catalog: 'Loire Valley',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_36_23_341d368105.png',
      },
    ],
  },
  {
    name: 'Editorial',
    slug: 'editorial',
    link: '/editorial',
    submenu: [],
  },
  {
    name: 'Shop',
    slug: 'shop',
    link: '/shop',
    submenu: [],
  },
];

export type KeySearch = Nameable & {
  id?: string;
  type: 'text' | 'destinationType' | 'experienceType' | 'advisor' | 'country' | 'product';
};

export const searchKeys: KeySearch[] = [
  { name: 'Beach', type: 'text' },
  { name: 'Countryside', type: 'text' },
  { name: 'City', type: 'text' },
  { name: 'Mountain', type: 'text' },
  { name: 'Sea', type: 'text' },
];

export const TIME_RESEND_EMAIL_FORGOT_PW = 10;

export const PASSWORD_RESET_LINK = '/auth/reset-password';
