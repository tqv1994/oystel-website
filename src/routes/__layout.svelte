<script lang="ts" context="module">
  let menu: MainNavItem[] = [
    {
      name: 'Travel Advisors',
      url: '/advisors',
    },
    {
      name: 'Destinations',
      url: '/destinations',
    },
    {
      name: 'Experiences',
      url: '/experiences',
    },
    { name: 'Editorial', url: '/editorial' },
    {
      name: 'Shop',
      url: '/shop',
      children: [
        {
          name: 'Fashion Drops',
          url: '/shop/fashion-drops',
          thumbnail: '/img/shop/curated-looks-1.jpg',
        },
        {
          name: 'Curated Looks',
          url: '/shop/curated-looks-listing',
          thumbnail: '/img/shop/curated-looks-2.jpg',
        },
      ],
    },
  ];

  export const load: Load = async ({ session, fetch }) => {
    const { user } = session;
    menu[1].children = await searchFetchTopOfType(
      fetch,
      'destination',
      await getCollection(fetch, 'destination-type'),
    );
    menu[2].children = await searchFetchTopOfType(
      fetch,
      'experience',
      await getCollection(fetch, 'experience-type'),
    );

    return { props: { menu } };
  };

  export async function searchFetchTopOfType(
    fetch: SvelteFetch,
    index: string,
    kinds: Kind[],
  ): Promise<TopItem[]> {
    const items: TopItem[] = [];
    for (const kind of kinds) {
      const res = await trySearch<Destination | Experience>(fetch, index, {
        limit: 1,
        sort: ['num_views:desc'],
        filter: [buildFilter(kind.id, 3)],
      });
      items.push({ name: kind.name, item: res.hits[0] });
    }
    return items;
  }

  function buildFilter(kind: string, num: number): string[] {
    const filter: string[] = [];
    const id = kind.substring(kind.lastIndexOf('-') + 1);
    for (let i = 1; i <= num; i++) {
      filter.push(`type${i} = ${id}`);
    }
    return filter;
  }
</script>

<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import MainNav, {
    type MainNavItem,
    type TopItem,
  } from '$lib/components/nav/MainNav.svelte';
  import MobileBottomTool from '$lib/components/MobileBottomTool.svelte';
  import Loading from '$lib/components/Loading.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { session } from '$app/stores';
  import type { Load } from '@sveltejs/kit';
  import { trySearch } from '$lib/store/search';
  import type { SvelteFetch } from '$lib/utils/fetch';
  import type { Kind } from '$lib/store/category';
  import type { Destination } from '$lib/store/destination';
  import { getCollection } from '$lib/store/collection';
  import type { Experience } from '$lib/store/experience';
  import AutoAdjust from '@smui/top-app-bar/src/AutoAdjust.svelte';
  import { type TopAppBarComponentDev } from '@smui/top-app-bar';
  import { onMount } from 'svelte';
  import { getCookie, setCookie } from '$lib/utils/cookie';

  export let menu: MainNavItem[];

  let topAppBar: TopAppBarComponentDev;
  let drawerOpen = false;

  onMount(() => {
    if (!$session.user && !getCookie('isFirstTime')) {
      window.openSignUpModal();
    }
  });
</script>

<div class="content-wrap" class:drawer-open={drawerOpen}>
  <MainNav {topAppBar} {menu} {drawerOpen} />
  <AutoAdjust {topAppBar}><slot /></AutoAdjust>
  <Footer />
</div>
<Loading />
<MobileBottomTool />
<SigninModal />
<SignupModal />
<OyNotification />
