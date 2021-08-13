<script lang="ts" context="module">
  import { browser } from '$app/env';
  import type { Load } from '@sveltejs/kit';
  import authStore from '$lib/stores/auth';

  export const load: Load = async ({ fetch, session, context }) => {
    console.log('load -', browser ? 'in browser' : 'ssr');
    console.log(session);
    authStore.set({ user: session.user });
    return {
      props: {},
    };
  };
</script>
<slot></slot>