<script lang="ts">
  let innerWidth: number;
  let isMobile = false;
  export let showInMobile = false;
  export let showInDesktop = false;
  $: if (innerWidth > 959) {
    isMobile = false;
  } else {
    isMobile = true;
  }
</script>

<svelte:window bind:innerWidth />
{#if showInDesktop && isMobile === false}
  <slot />
{:else if showInMobile && isMobile === true}
  <slot />
{/if}
