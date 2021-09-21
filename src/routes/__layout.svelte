<script lang="ts" context="module">
  import { browser } from '$app/env';
  import type { Load } from '@sveltejs/kit';
  import authStore from '$lib/stores/auth';
  import PageTransition from "$lib/components/common/PageTransition.svelte"
  export let key;

  export const load: Load = async ({ fetch, session, context, page }) => {
    console.log('load -', browser ? 'in browser' : 'ssr');
    console.log(session);
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