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
  import { MainNavItem } from '$lib/components/nav/types';
  import { salutationTypeStore } from '$lib/store/salutation-type';
  import { interestTypeStore } from '$lib/store/interest';

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
    insertToStore(interestTypeStore, session.metadata?.interestTypes, false);
    insertToStore(
      travelPreferenceTypeStore,
      session.metadata?.travelPreferenceTypes,
      false,
    );
    insertToStore(
      personalPreferenceTypeStore,
      session.metadata?.personalPreferenceTypes,
      false,
    );
    insertToStore(
      salutationTypeStore,
      session.metadata?.salutationTypes,
      false,
    );
    authStore.set({ user: session.user });

    mainMenu[0].children = session.metadata?.feature?.advisors;
    mainMenu[1].children = session.metadata?.feature?.destinations;
    mainMenu[2].children = session.metadata?.feature?.experiences;
    mainMenu[4].children = [
      // {name: 'Limited Drops', url: '/shop/fashion-drops', description: 'Fashion Collection',gallery: [{url: '/img/slides/shop-slide-2.jpg'}]},
      {
        name: 'Curated Looks',
        url: '/shop/curated-looks-listing',
        description: 'Fashion Collection',
        gallery: [{ url: '/img/shop/shop-thumbnail.jpg' }],
      },
    ];

    var active: MainNavItem;
    let isHomePage = false;
    for (const item of mainMenu) {
      if (url.pathname.startsWith(item.url)) {
        active = item;
        break;
      }
    }
    if (url.pathname === '/') {
      isHomePage = true;
    }
    console.log(url.pathname);
    return {
      props: {
        key: url.pathname,
        mainMenu,
        active,
        isHomePage,
      },
    };
  };
</script>

<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import MainNav from '$lib/components/nav/MainNav.svelte';
  import MobileBottomTool from '$lib/components/MobileBottomTool.svelte';
  import {
    personalPreferenceTypeStore,
    travelPreferenceTypeStore,
  } from '$lib/store/preference';
  import Loading from '$lib/components/Loading.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  export let active: MainNavItem | undefined;
  export let isHomePage = false;
  export let key: string;
</script>

<div class="content-wrap">
  <MainNav
    items={mainMenu}
    bind:active
  />
  <section>
    <slot />
  </section>
  <Footer />
</div>
<Loading />
<MobileBottomTool />
<SigninModal />
<SignupModal />
<OyNotification/>
