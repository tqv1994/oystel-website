import { websiteUrl } from '$lib/env';
import type { Kind } from '$lib/store/category';
import { makeLink } from './link';

export type SiteMapItem = {
  loc: string;
  changefreq: string;
  priority: number;
};
export function getSiteMapData(
  advisors: Kind[],
  destinations: Kind[],
  experiences: Kind[],
  looks: Kind[],
): SiteMapItem[] {
  const sitemapAdvisors: SiteMapItem[] = advisors.map((advisor) => {
    return {
      loc: `${websiteUrl}${makeLink('/advisors', advisor)}`,
      changefreq: 'daily',
      priority: 0.7,
    };
  });
  const sitemapDestinations: SiteMapItem[] = destinations.map((destination) => {
    return {
      loc: `${websiteUrl}${makeLink('/destinations', destination)}`,
      changefreq: 'daily',
      priority: 0.7,
    };
  });
  const sitemapExperiences: SiteMapItem[] = experiences.map((experience) => {
    return {
      loc: `${websiteUrl}${makeLink('/experiences', experience)}`,
      changefreq: 'daily',
      priority: 0.7,
    };
  });
  const sitemapLooks: SiteMapItem[] = looks.map((look) => {
    return {
      loc: `${websiteUrl}${makeLink('/shop/looks', look)}`,
      changefreq: 'daily',
      priority: 0.7,
    };
  });
  return [
    {
      loc: websiteUrl,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/advisor`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/advisor`,
      changefreq: 'daily',
      priority: 0.7,
    },
    ...sitemapAdvisors,
    {
      loc: `${websiteUrl}/experience`,
      changefreq: 'daily',
      priority: 0.7,
    },
    ...sitemapExperiences,
    {
      loc: `${websiteUrl}/destination`,
      changefreq: 'daily',
      priority: 0.7,
    },
    ...sitemapDestinations,
    {
      loc: `${websiteUrl}/search`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/editorial`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/shop`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/shop/fashion-drops`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/shop/curated-looks-listing`,
      changefreq: 'daily',
      priority: 0.7,
    },
    {
      loc: `${websiteUrl}/shop/products-listing`,
      changefreq: 'daily',
      priority: 0.7,
    },
    ...sitemapLooks,
    {
      loc: `${websiteUrl}/plan`,
      changefreq: 'daily',
      priority: 0.7,
    },
  ];
}
