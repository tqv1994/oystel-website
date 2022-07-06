<script lang="ts" context="module">
  export const load: Load = async ({ fetch, session, url }) => {
    const res = await fetch(`/p/auth/sign-out`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    return {};
  };
</script>

<script lang="ts">
  import { session as sessionStore } from '$app/stores';
  import { ppost } from '$lib/utils/fetch';
  import { goto } from '$app/navigation';
  import type { Load } from '@sveltejs/kit';
  import { redirect } from '$lib/helpers/redirect.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    sessionStore.set({ user: undefined });
    redirect('/');
  });

  async function signOut() {
    try {
      const res = await ppost(`auth/sign-out`, {});
      if (res.ok) {
        sessionStore.set({ user: undefined });
        goto('/');
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>

<div class="content">
  <section class=" d-pt-128 m-pt-70">
    <div class="container">
      {#if $sessionStore.user}
        <h1>Really sign out?</h1>
        <ul>
          <li>
            <button on:click={signOut}>Yes, sign out</button>
          </li>
          <li><a href="/me">Stay signed in</a></li>
        </ul>
      {:else}
        <h1>You've successfully signed out</h1>
        <a href="/">Go to the home page</a>
      {/if}
    </div>
  </section>
</div>

<style lang="scss">
  @use '../theme/mixins';
  section {
    @include mixins.desktop {
      padding-left: calc(8%);
    }
  }
</style>
