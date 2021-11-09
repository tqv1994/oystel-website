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
  import { Locals } from '$lib/store/locals';
  export let key;

  export const load: Load<{ session: Locals }> = async ({ session, page }) => {
    insertToStore(
      destinationTypeStore,
      session.metadata.destinationTypes,
      false,
    );
    insertToStore(experienceTypeStore, session.metadata.experienceTypes, false);
    insertToStore(specialityStore, session.metadata.specialities, false);
    insertToStore(countryStore, session.metadata.countries, false);
    insertToStore(languageStore, session.metadata.languages, false);
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
