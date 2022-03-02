<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Text from './Text.svelte';
  export let label: string;
  export let column_1: number = 6;
  export let column_2: number = 6;
  let classNames: string;
  export { classNames as class };
</script>

<div class={`${classNames} pb-30`}>
  <LayoutGrid class="p-0">
    <Cell class="label" spanDevices={{ desktop: column_1, phone: 2, tablet: 4 }}
      ><svelte:component this={Text} class="mt-0 mb-0 font-weight-bold"
        >{label}</svelte:component
      ></Cell
    >
    <Cell class="value" spanDevices={{ desktop: column_2, phone: 2, tablet: 4 }}
      ><slot /></Cell
    >
  </LayoutGrid>
</div>

<style lang="scss">
  @use '../../../theme/mixins';
  div :global(.mdc-layout-grid__inner) {
    align-items: center;
  }
  div {
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
  }
  @include mixins.mobile{
    :global(.form){
      :global(.label.mdc-layout-grid__cell--span-2), :global(.label.mdc-layout-grid__cell--span-4-tablet),
      :global(.value.mdc-layout-grid__cell--span-4-tablet), :global(.label.mdc-layout-grid__cell--span-2){
        grid-column-end: span 8;
      }
      :global(.mdc-layout-grid__inner){
        margin-bottom: 10px;
      }
      --mdc-layout-grid-gutter-tablet: 5px;
      --mdc-layout-grid-gutter-phone: 5px;
    }
    
  }
</style>
