<script lang="ts">
  import authStore from '../stores/auth';

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

{#if $authStore.user}
  <h1>Really sign out?</h1>
  <ul>
    <li><button on:click={signOut}>Yes, sign out</button></li>
    <li><a href="/me">Stay signed in</a></li>
  </ul>
{:else}
  <h1>You've successfully signed out</h1>
  <a href="/">Go to the home page</a>
  <a href="/sign-in">Sign in again</a>
{/if}
