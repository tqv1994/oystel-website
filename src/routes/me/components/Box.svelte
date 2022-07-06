<script lang="ts">
  import BoxContent from './BoxContent.svelte';
  export let title = '';
  export let is_edit: boolean;
  let classNames = '';
  export { classNames as class };
</script>

<section class={`${classNames} my-account-box`}>
  <BoxContent {title} bind:is_edit>
    <slot />
  </BoxContent>
</section>

<style lang="scss">
  section {
    border-top: 1px solid #9d9d9d;
  }
</style>
