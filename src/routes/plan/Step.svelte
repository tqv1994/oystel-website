<script lang="ts">
  import { H2 } from '@smui/common/elements';

  let className = '';
  export { className as class };
  export let title: string;
  export let subtitle: string | undefined = undefined;
</script>

<div class="root {className}">
  <H2 class="mdc-typography--headline2 mb-20 title">{title}</H2>
  {#if subtitle}
    <p>{subtitle}</p>
  {/if}
  <div class="content d-pt-30 m-pt-15">
    <form>
      <slot />
    </form>
  </div>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  .root {
    min-height: 100vh;
    text-align: center;
    --mdc-typography-headline2-font-family: GTSupper;
    :global(.title) {
      margin: 0 auto;
      width: 765px;
    }
    p {
      max-width: 461px;
      margin: 0 auto;
    }
    @include mixins.mobile {
      :global(.title) {
        text-align: left;
        width: auto;
        margin: 0 auto;
      }
      p {
        text-align: left;
        width: auto;
        margin: 0 auto;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    max-width: 45em;
    width: 100%;
    margin: 0 auto;
  }
</style>
