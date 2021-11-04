<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Exhibitable } from '$lib/store/types';

  export let urlPrefix: string;
  export let items: Exhibitable[];
</script>

<LayoutGrid class="p-0 ">
  {#each items || [] as item}
    <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
      <a href={`${urlPrefix}/${item.id}`}>
        <div class="item-advisor">
          <div class="thumbnail">
            <div
              class="image-cover"
              style="padding-top: calc( 410 / 315 * 100% );"
            >
              {#if item.gallery}
                <BlurImage data={item.gallery[0]} />
              {/if}
            </div>
          </div>
          <h4 class="text-h2 mt-30 title">
            {item.name}
          </h4>
        </div>
      </a>
    </Cell>
  {/each}
</LayoutGrid>
