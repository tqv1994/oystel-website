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
                link: '#',
                catalog: 'St. Barths, Grand Cul De Sac',
                image: '/img/image-submenu.jpg',
            },
            {
                name: 'City',
                link: '#',
                catalog: 'St. Barths, Grand Cul De Sac',
                image: '/img/image-submenu.jpg',
            },
            {
                name: 'Mountain',
                link: '#',
                catalog: 'St. Barths, Grand Cul De Sac',
                image: '/img/image-submenu.jpg',
            },
            {
                name: 'Sea',
                link: '#',
                catalog: 'St. Barths, Grand Cul De Sac',
                image: '/img/image-submenu.jpg',
            },
            {
                name: 'Wilderness',
                link: '#',
                catalog: 'St. Barths, Grand Cul De Sac',
                image: '/img/image-submenu.jpg',
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
    'Mountain',
    'Jungle',
    'Wilderness'
]