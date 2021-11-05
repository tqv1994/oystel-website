<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { destinationStore } from '$lib/store/destination';
  import { Destination } from '$lib/store/destination';
  import { insertToStore } from '$lib/store/types';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import { Look } from '$lib/store/look';

  export const load: Load = async ({ fetch, page }) => {
    const id = parseId(page.params.slug);
    if (get(destinationStore).items[id]) {
      return {
        props: { id },
      };
    }

    const res = await fetch(`/destination/${id}`);
    if (res.ok) {
      const data: Destination = await res.json();
      insertToStore(destinationStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  export let title: string;
  export let items: Look[];
</script>

<section class="pt-40" id="shop-by-look-section">
  <div class="container">
    <LayoutGrid class="p-0 pb-30">
      <Cell span="12"><h1 class="mt-0 mb-0">Shop By Look</h1></Cell>
    </LayoutGrid>
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
        <div class="item-product">
          <div class="thumbnail">
            <div
              class="image-cover"
              style="padding-top: calc( 142 / 165 * 100% );"
            >
              <BlurImage
                data={{ url: '/img/experiences/product-1.jpg' }}
                is_static={true}
              />
            </div>
          </div>
          <div class="title-wrap">
            <h5>Get the Look</h5>
            <IconButton>
              <Icon component={Svg} viewBox="0 0 16.583 16.583">
                <g data-name="Group 397" transform="translate(0)">
                  <path
                    id="Path_310"
                    data-name="Path 310"
                    d="M9145.428-3682.169v16.583"
                    transform="translate(-9137.136 3682.169)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  />
                  <path
                    id="Path_311"
                    data-name="Path 311"
                    d="M0,0V16.583"
                    transform="translate(16.583 8.292) rotate(90)"
                    fill="none"
                    stroke="#000"
                    stroke-width="1"
                  />
                </g>
              </Icon>
            </IconButton>
            <div class="divider" />
          </div>
        </div>
      </Cell>
      <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
        <LayoutGrid class="p-0">
          {#each items.slice(1) as look}
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <div class="item-product">
                <div class="thumbnail">
                  <div
                    class="image-cover"
                    style="padding-top: calc( 58 / 45 * 100% );"
                  >
                    <BlurImage data={look.gallery[0]} />
                  </div>
                </div>
                <div class="title-wrap">
                  <h5>Get the Look</h5>
                  <IconButton>
                    <Icon component={Svg} viewBox="0 0 16.583 16.583">
                      <g data-name="Group 397" transform="translate(0)">
                        <path
                          id="Path_310"
                          data-name="Path 310"
                          d="M9145.428-3682.169v16.583"
                          transform="translate(-9137.136 3682.169)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <path
                          id="Path_311"
                          data-name="Path 311"
                          d="M0,0V16.583"
                          transform="translate(16.583 8.292) rotate(90)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                      </g>
                    </Icon>
                  </IconButton>
                  <div class="divider" />
                </div>
              </div>
            </Cell>
          {/each}
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </div>
</section>
<style lang="scss">
  #shop-by-look-section {
    --mdc-typography-headline5-font-size: 14px;
    --mdc-typography-headline5-line-height: 22px;
    /* Products */
    .item-product .title-wrap {
      position: relative;
    }
    .item-product .title-wrap :global(.mdc-icon-button) {
      position: absolute;
      top: 20%;
      right: 0;
      transform: translateY(-50%);
    }

    .item-product .title-wrap .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
</style>