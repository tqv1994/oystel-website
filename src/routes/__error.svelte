<script lang="ts" context="module">
  import type { ErrorLoad } from '@sveltejs/kit';
  import { Locals } from '$lib/store/locals';

  export const load: ErrorLoad<{ session: Locals }> = async ({
    url,
    error,
    status,
  }) => {
    return {
      props: {
        path: url.pathname,
        error,
        status,
      },
    };
  };
</script>

<script lang="ts">
  export let path: string;
  export let error: Error;
  export let status: number;
</script>

<div class="root">
  <h1>There was an error rendering {path}</h1>
  <h3>{status}</h3>
  <p>{error.message ? error.message : JSON.stringify(error)}</p>
</div>

<style lang="scss">
  .root {
    background-color: black;
    opacity: 0.8;
    background-image: repeating-radial-gradient(
        circle at 100px 0,
        transparent 0,
        black 10px
      ),
      repeating-linear-gradient(black, #5078bc);

    color: white;
    height: 150vh;
    text-align: center;
    padding: 20em 0 0;
  }
</style>
