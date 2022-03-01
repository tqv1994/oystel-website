<script lang="ts">
  import BoxContent from './BoxContent.svelte';
  export let title: string = '';
  export let is_edit: boolean;
  let classNames: string;
  export { classNames as class };
</script>

<section class={`${classNames} pt-30 pb-30`}>
  <svelte:component this={BoxContent} {title} bind:is_edit>
    <slot />
  </svelte:component>
</section>

<style lang="scss">
  section {
    border-top: 1px solid #9d9d9d;
  }
</style>
