import { websiteUrl } from '$lib/env';
import type { Kind } from '$lib/store/category';
import { getCollection } from '$lib/store/collection';
import { makeLink } from '$lib/utils/link';
import { getSiteMapData, type SiteMapItem } from '$lib/utils/sitemap';

export async function get() {
  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  const advisors = await getCollection(fetch, 'advisor');
  const experiences = await getCollection(fetch, 'experience');
  const destinations = await getCollection(fetch, 'destination');
  const looks = await getCollection(fetch, 'look');
  const sitemapData = getSiteMapData(
    advisors,
    destinations,
    experiences,
    looks,
  );
  return {
    headers,
    body: sitemap(sitemapData),
  };
}

const sitemap = (
  data: SiteMapItem[],
) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
    ${data
      .map(
        (item) => `<url>
        <loc>${item.loc}</loc>
        <changefreq>${item.changefreq}</changefreq>
        <priority>${item.priority}</priority>
    </url>`,
      )
      .join('')}
</urlset>`;
