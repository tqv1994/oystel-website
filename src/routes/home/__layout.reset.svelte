<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore } from '$lib/store/auth';
  import { insertToStore } from '$lib/store/types';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { advisorTypeStore } from '$lib/store/advisor-type';
  import { countryStore } from '$lib/store/country';
  import { languageStore } from '$lib/store/language';
  import { Locals } from '$lib/store/locals';
  import MainNav from '$lib/components/nav/MainNav.svelte';
  import { MainNavItem } from '$lib/components/nav/types';
  import { AutoAdjust } from '@smui/top-app-bar';
  import TopAppBar from '@smui/top-app-bar';

  const mainMenu: MainNavItem[] = [
    {
      name: 'Travel Advisors',
      url: '/advisor',
    },
    {
      name: 'Destinations',
      url: '/destination',
    },
    {
      name: 'Experiences',
      url: '/experience',
    },
    { name: 'Editorial', url: '/editorial' },
    { name: 'Shop', url: '/shop' },
  ];

  export const load: Load<{ session: Locals }> = async ({ session, url }) => {
    insertToStore(
      destinationTypeStore,
      session.metadata?.destinationTypes,
      false,
    );
    insertToStore(
      experienceTypeStore,
      session.metadata?.experienceTypes,
      false,
    );
    insertToStore(advisorTypeStore, session.metadata?.advisorTypes, false);
    insertToStore(countryStore, session.metadata?.countries, false);
    insertToStore(languageStore, session.metadata?.languages, false);
    authStore.set({ user: session.user });

    mainMenu[0].children = session.metadata?.feature?.advisors;
    mainMenu[1].children = session.metadata?.feature?.destinations;
    mainMenu[2].children = session.metadata?.feature?.experiences;

    var active: MainNavItem;
    for (const item of mainMenu) {
      if (url.pathname.startsWith(item.url)) {
        active = item;
        break;
      }
    }

    return {
      props: {
        key: url.pathname,
        mainMenu,
        active,
      },
    };
  };
</script>

<script lang="ts">
  export let active: MainNavItem | undefined;
</script>

<MainNav items={mainMenu} {active} />
<section>
  <slot />
</section>
