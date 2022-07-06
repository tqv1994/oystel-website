<script lang="ts" context="module">
  import { redirect } from '$lib/helpers/redirect.svelte';
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch, session, url }) => {
    if (!session.user) {
      return redirect('/');
    }
    const res = await fetch('/p/travellers/me');
    let travellerMe: Traveller;
    if (res.ok) {
      travellerMe = await res.json();
    }
    return {
      props: {
        travellerMe,
      },
    };
  };
</script>

<script lang="ts">
  import { updateTravellerMeStore, type Traveller } from '$lib/store/traveller';
  import { onMount } from 'svelte';
  export let travellerMe: Traveller;
  onMount(() => {
    if (travellerMe) {
      updateTravellerMeStore(travellerMe);
    }
  });
</script>

<slot />
