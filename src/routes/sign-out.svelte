<script lang="ts">
  import authStore from '$lib/api/auth/store';
import Layout from '$lib/components/common/Layout.svelte';
import { routerHelper } from '$lib/helpers';

  async function signOut() {
    try {
      const res = await fetch('/api/auth/sign-out');
      authStore.set({ user: undefined });
      if (res.ok) {
        authStore.set({ user: undefined });
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>
<Layout>
{#if $authStore.user}
  <h1>Really sign out?</h1>
  <ul>
    <li><a href="javascript:void(0)" on:click={signOut}>Yes, sign out</a></li>
    <li><a href="/me">Stay signed in</a></li>
  </ul>
{:else}
  <h1>You've successfully signed out</h1>
  <a href="javascript:void(0);" on:click={()=>{routerHelper.redirect('/')}}>Go to the home page</a>
{/if}
</Layout>
