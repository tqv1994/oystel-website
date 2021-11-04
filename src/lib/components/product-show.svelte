<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import { destinationStore } from '$lib/store/destination';
  import { Destination } from '$lib/store/destination';
  import { insertToStore } from '$lib/store/types';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import { Product } from '$lib/store/product';

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
  export let items: Product[];
</script>

<section class="d-pt-55 m-pt-40">
  <div class="container">
    <h1 class="mt-0">What to Pack</h1>
    <div class="products-list">
      <LayoutGrid class="p-0">
        {#each items as item, i}
          <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
            <div
              on:click={() => {
                openProductSlide = true;
                productIndex = i;
              }}
              class="item-product"
            >
              <div
                class="thumbnail"
                style="background-image: url({item.gallery &&
                item.gallery.length
                  ? item.gallery[0]?.url
                  : '/missing-image'})"
              >
                <IconButton class="btn-favorite">
                  <Icon class="like" component={Svg} viewBox="-4 -4 24 24">
                    <path
                      d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                      transform="translate(0.001)"
                      fill="#fff"
                      fill-rule="evenodd"
                    />
                  </Icon>
                  <Icon class="liked" component={Svg} viewBox="-4 -4 24 24">
                    <path
                      d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                      transform="translate(0)"
                      fill="#fff"
                      fill-rule="evenodd"
                    />
                  </Icon>
                </IconButton>
              </div>
              <p class="text-eyebrow mt-25">{item.brand}</p>
              <h3>{item.name}</h3>
            </div>
          </Cell>
        {/each}
      </LayoutGrid>
    </div>
  </div>
</section>
