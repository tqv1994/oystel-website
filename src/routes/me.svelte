<script lang="ts" context="module">
  import authStore from '../stores/auth';
</script>

<script lang="ts">
</script>

{#if $authStore.user}
  <h1>Hello {$authStore.user.displayName || 'there'}</h1>
  <p>Email: {$authStore.user.email}</p>
  <a href="/sign-out">Sign out</a>
{:else}
  <h1>Hello</h1>
  <p>Sign up to Oysteo to experience the best in luxury travel</p>
  <a href="/sign-in">Sign up</a>
  <h2>Already have an account?</h2>
  <a href="/sign-in">Sign in</a>
{/if}
