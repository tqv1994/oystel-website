<script lang="ts">
  import { Drop } from '$lib/store/drop';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import SliderItems from './SliderItems.svelte';
  export let items: Drop[];
  export let desktopColumns: number = 4;
  export let mobileColumns: number = 2;
  let drops: Drop[];
  $: if (items && items.length) {
      drops = items;
  }
  console.log('items', items);
</script>

{#if items && items.length > 0}
  <SliderItems>
    <div class="row">
      {#each drops as item}
        <div class="col d-col-{12 / desktopColumns} m-col-{12 / mobileColumns}">
            <div class="item">
                {#if item.gallery[0]}
                    <div class="thumbnail">
                        <!-- <BlurImage {...item.gallery[0]} /> -->
                        <div class="image-cover" style="padding-top: 100%">
                            <img src={item.gallery[0].url} />
                        </div>
                    </div>
                {/if}
                  <a href="#">
                    <div class="row">
                        <div class="d-col-6 m-col-6 mb-0">
                            <p class="text-eyebrow text-left m-0 mt-20 mb-15">
                                Fashion
                              </p>
                        </div>
                    </div>
                    <div class="divider" />
                    <h4 class="text-h3 title m-mt-30">
                      {item.name}
                    </h4>
                  </a>
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
