<script lang="ts">
  import { Drop } from '$lib/store/drop';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import SliderItems from './SliderItems.svelte';
import { Experience } from '$lib/store/experience';
import { Destination } from '$lib/store/destination';
import Item from './Item.svelte';
  export let items: (Experience | Destination)[];
  export let desktopColumns: number = 4;
  export let mobileColumns: number = 2;
</script>

{#if items && items.length > 0}
  <SliderItems>
    <div class="row">
      {#each items as item}
        <div class="col d-col-{12 / desktopColumns} m-col-{12 / mobileColumns}">
            <div class="item">
               <Item {...item} bind:item />
            </div>
        </div>
      {/each}
    </div>
  </SliderItems>
{/if}

<style lang="scss">
  @use '../../style/include/grid';
  .divider {
    width: 20%;
  }
  .divider:after {
    background-color: #0003;
  }
  .row{
    --mdc-layout-grid-gutter-desktop: calc(15px/2);
  }
  .row .col {
    --mdc-layout-grid-gutter-desktop: calc(15px / 2);
  }
</style>
