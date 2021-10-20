import { Menu } from "./types";

export const menus: Menu[] = [
    {
        name: "Travel Advisors",
        slug: "travel-advisors",
        link: "/advisor",
        submenu: [],
    },
    {
        name: "Destinations",
        slug: "destinations",
        link: "/destination",
        submenu: [
            {
                name: 'Beach',
                link: '/destination/white-sans-in-goa-9',
                catalog: 'White sans in Goa',
                image: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_wi2_38d65ecf64.jpg',
            },
            {
                name: 'City',
                link: '/destination/courtyard-splendour-in-rome-12',
                catalog: 'Courtyard splendour in Rome',
                image: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination_ju2_e575bc6f26.jpg',
            },
            {
                name: 'Mountain',
                link: '/destination/the-french-alps-24',
                catalog: 'The French Alps',
                image: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_39_27_d951f63514.png',
            },
            {
                name: 'Sea',
                link: '/destination/cruising-around-sardinia-3',
                catalog: 'Cruising around Sardinia',
                image: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/destination3_55a03ac308.jpg',
            },
            {
                name: 'Countryside',
                link: '/destination/loire-valley-29',
                catalog: 'Loire Valley',
                image: 'https://oysteo-cms-dev.s3.ap-southeast-1.amazonaws.com/Screenshot_2021_10_19_at_13_36_23_341d368105.png',
            },
        ],
    },
    {
        name: "Experiences",
        slug: "experiences",
        link: "/experiences-listing",
        submenu: [],
    },
    {
        name: "Editorial",
        slug: 'editorial',
        link: "#",
        submenu: []
    },
    {
        name: "Shop",
        slug: "shop",
        link: "/shop",
        submenu: [],
    },
];

export const searchKeys: string[] = [
    'Sea',
	'Beach',
    'Mountain',
    'City',
    'Countryside'
]