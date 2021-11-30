<script lang="ts">
  let classNames: string;
  export { classNames as class };
</script>

<section class={`${classNames || ''}`}>
  <slot name="tabs" />
  <slot name="content" />
</section>

<style lang="scss">
  section {
    border-top: 1px solid #9d9d9d;
    :global(.mdc-tab-bar) {
      border-bottom: 1px solid #9d9d9d;
    }
    :global(.mdc-tab) {
      flex: initial;
    }
  }
</style>
