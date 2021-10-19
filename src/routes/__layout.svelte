<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import PageTransition from '$lib/components/common/PageTransition.svelte';
  import { MetadataData } from '$lib/api/pages/type';
  import authStore from '$lib/api/auth/store';
  import { updateCountryStore } from '$lib/api/country/store';
  import { updateDestinationTypeStore } from '$lib/api/destination-type/store';
  import { updateExperienceTypeStore } from '$lib/api/experience-type/store';
  import { updateSpecialityStore } from '$lib/api/specialty/store';
  import { updateProductStore } from '$lib/api/product/store';
  export let key;

  export const load: Load = async ({ fetch, session, page }) => {
    const res = await fetch('/api/metadata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data: MetadataData = await res.json();
      updateCountryStore(data.countries || []);
      updateExperienceTypeStore(data.experienceTypes || []);
      updateDestinationTypeStore(data.destinationTypes || []);
      updateSpecialityStore(data.specialties || []);
    } else {
      const error = await res.json();
      console.log(error);
    }
    authStore.set({ user: session.user });
    return {
      props: {},
      key: page.path,
    };
  };
</script>

<!-- __layout.svelte -->
<PageTransition refresh={key}>
  <slot />
</PageTransition>
