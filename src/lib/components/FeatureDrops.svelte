<script lang="ts">
  import { storeHelper } from '$lib/helpers';

  import { Drop } from '$lib/store/drop';

  import { makeLink } from '$lib/utils/link';

  import Button from '@smui/button/Button.svelte';

  import Cell from '@smui/layout-grid/Cell.svelte';

  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Label from '@smui/list/Label.svelte';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';

  export let drops: Drop[] = [];
  export let name: string | undefined = undefined;
  export let prominent: boolean = false;
  export let vertical: boolean = false;
  export let columns: number = 4;
  let hero: Drop | undefined;
  let nonHeros: Drop[] | undefined;
  $: if (prominent && drops.length) {
    drops = storeHelper.getItems(drops, 6);
    hero = drops[0];
    if (drops.length > 1) {
      nonHeros = drops.slice(1);
    }
  }

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: false,
    particlesToShow: 2.5,
    chevronPosition: 'outside',
  };
</script>

<LayoutGrid class="pt-0">
  <Cell span={12}><h3 class="text-h1 mt-0 mb-0">{name}</h3></Cell>
</LayoutGrid>
<LayoutGrid class="pt-0">
  {#if hero}
    <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-mb-45">
      <div class="item-featured-drop new">
        <div class="thumbnail dark d-mb-45 m-mb-40">
          <div class="image-cover" style="padding-top: calc(474/420 * 100%)">
            <BlurImage {...hero.gallery[0]} />
          </div>
          <div class="caption">
            <span>{hero.products?.length} Packages left</span>
          </div>
        </div>
        <div class="">
          <p class="mt-0 mb-25 m-mb-15 text-eyebrow">Fashion Drop</p>
          <h4 class="text-h3 mt-0 mb-20 title">
            {hero.name}
          </h4>
          <Button
            type="button"
            href={makeLink('/drops', hero)}
            class="hover-affect-drop"
            variant="outlined"><Label>Plan Your Trip</Label></Button
          >
        </div>
      </div>
    </Cell>
  {/if}
  <Cell
    spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
    class="d-mr--30 m-mr-0"
  >
    {#if nonHeros?.length}
      <div class="list-featured-drop">
        <Carousel {...carouselConfig}>
          {#each nonHeros as drop}
            {#if drop.products.length > 0}
              <div
                class="item-featured-drop slide-content slide-item text-left"
              >
                <div class="thumbnail dark d-mb-40 m-mb-40">
                  <div
                    class="image-cover"
                    style="padding-top: calc(410/311 * 100%)"
                  >
                    <BlurImage {...drop.gallery[0]} />
                  </div>
                  <div class="caption">
                    <span>{drop.products.length} Packages left</span>
                  </div>
                </div>
                <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                  Experience Drop
                </p>
                <h4 class="text-h3 mt-0 d-mb-25 m-mb-15 title">
                  {drop.name}
                </h4>
                <Button
                  class="hover-affect-drop"
                  variant="outlined"
                  href={makeLink('/drops', drop)}
                  ><Label>Plan Your Trip</Label></Button
                >
              </div>
            {/if}
          {/each}
        </Carousel>
      </div>
    {/if}
  </Cell>
</LayoutGrid>
