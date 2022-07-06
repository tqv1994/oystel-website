<script lang="ts">
  import type { Look } from '$lib/store/look';
  import { getSlug, makeLink } from '$lib/utils/link';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import FeaturedImage from './FeaturedImage.svelte';
  import LookItem from './LookItem.svelte';
  export let items: Look[] = [];
  export let title = '';
</script>

<h2 class="mt-0">{title}</h2>
<LayoutGrid class="p-0">
  {#each items as item, index}
    <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
      <div class="item">
        <div class="thumbnail">
          <a href={makeLink('/shop/looks', item)}>
            <FeaturedImage
              image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
              size="small"
              style="padding-top: calc(410 / 315 * 100%)"
              alt={item?.name || ''}
            />
          </a>
        </div>
        <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
        <a href={makeLink('/shop/looks', item)}>
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 6, phone: 2 }}
              ><p class="text-eyebrow text-left m-0 mt-20 mb-0">
                {item.type1?.name || 'Fashion'}
              </p></Cell
            >
          </LayoutGrid>
          <h4 class="title mt-15 mb-15">{item.name}</h4>
          <p class="m-0 m-none">
            {item.curatedBy ? `Curated by: ${item.curatedBy}` : ''}
          </p>
        </a>
      </div>
    </Cell>
  {/each}
</LayoutGrid>
