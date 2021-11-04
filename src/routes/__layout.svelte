<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import PageTransition from '$lib/components/common/PageTransition.svelte';
  import { authStore } from '$lib/store/auth';
  import { onMount } from 'svelte';
  import { insertToStore } from '$lib/store/types';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { specialityStore } from '$lib/store/speciality';
  import { countryStore } from '$lib/store/country';
  import { languageStore } from '$lib/store/language';
  import { Metadata } from './metadata.json';
  export let key;

  export const load: Load = async ({ fetch, session, page }) => {
    const metaRes = await fetch('/metadata.json');
    if (metaRes.ok) {
      const data: Metadata = await metaRes.json();
      insertToStore(destinationTypeStore, data.destinationTypes, false);
      insertToStore(experienceTypeStore, data.experienceTypes, false);
      insertToStore(specialityStore, data.specialities, false);
      insertToStore(countryStore, data.countries, false);
      insertToStore(languageStore, data.languages, false);
    } else {
      const error = await metaRes.json();
      console.log(error);
    }
    authStore.set({ user: session.user });
    return {
      props: {},
      key: page.path,
    };
  };
</script>

<script lang="ts">
  let innerHeight: number;
  function runScript() {
    var bodyEl = document.querySelector('body');
    if (typeof bodyEl != 'undefined' && bodyEl != null) {
      bodyEl.style.height = innerHeight + 'px';
    }
  }
  onMount(async () => {
    runScript();
  });
</script>

<svelte:window
  on:load={() => {
    runScript();
  }}
  on:scroll={() => {
    runScript();
  }}
  bind:innerHeight
/>
<!-- __layout.svelte -->
<PageTransition refresh={key}>
  <slot />
</PageTransition>
