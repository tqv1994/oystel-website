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
    link: '/advisor',
    submenu: [],
  },
  {
    name: 'Destinations',
    slug: 'destinations',
    link: '/destination',
    submenu: [
      {
        name: 'Beach',
        link: '/destination?t=6',
        catalog: 'White sans in Goa',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_wi2_38d65ecf64.jpg',
      },
      {
        name: 'City',
        link: '/destination?t=5',
        catalog: 'Courtyard splendour in Rome',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_ju2_e575bc6f26.jpg',
      },
      {
        name: 'Mountain',
        link: '/destination?t=2',
        catalog: 'The French Alps',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_39_27_d951f63514.png',
      },
      {
        name: 'Sea',
        link: '/destination?t=1',
        catalog: 'Cruising around Sardinia',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination3_55a03ac308.jpg',
      },
      {
        name: 'Countryside',
        link: '/destination?t=7',
        catalog: 'Loire Valley',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_36_23_341d368105.png',
      },
    ],
  },
  {
    name: 'Experiences',
    slug: 'experiences',
    link: '/experience',
    submenu: [
      {
        name: 'Food',
        link: '/experience?t=6',
        catalog: 'White sans in Goa',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_wi2_38d65ecf64.jpg',
      },
      {
        name: 'Safari',
        link: '/destination?t=5',
        catalog: 'Courtyard splendour in Rome',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_ju2_e575bc6f26.jpg',
      },
      {
        name: 'Yoga',
        link: '/destination?t=2',
        catalog: 'The French Alps',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_39_27_d951f63514.png',
      },
      {
        name: 'Active',
        link: '/destination?t=1',
        catalog: 'Cruising around Sardinia',
        image:
          'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination3_55a03ac308.jpg',
      },
      {
        name: 'Fitness',
        link: '/destination?t=7',
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

export const searchKeys: string[] = [
  'Sea',
  'Beach',
  'Mountain',
  'City',
  'Countryside',
];
