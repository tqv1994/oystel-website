<script lang="ts">
  import Button, { Label } from '@smui/button';

  export let label: string | undefined = '';
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let type: string | undefined = undefined;
  let classNames: string | '' = '';
  export { classNames as class };
</script>

<Button
  class={`button-underline ${classNames || ''}`}
  on:click
  bind:href
  {type}
  bind:target><Label class="text-button2">{label}</Label></Button
>

<style lang="scss">
  @use '../../../theme/mixins';
  :global(.mdc-button.button-underline) {
    text-decoration: underline;
    margin: 0;
    padding: 0;
    min-width: max-content;
    @include mixins.mobile {
      min-width: max-content !important;
    }
  }
</style>
