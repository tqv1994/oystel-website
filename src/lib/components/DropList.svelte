<script lang="ts">
  import { storeHelper } from '$lib/helpers';

  import type { Drop, DropGallery } from '$lib/store/drop';

  import LayoutGrid from '@smui/layout-grid';
  import DropListItem from './DropListItem.svelte';

  export let data: DropGallery[];
</script>

<LayoutGrid class="p-0">
  {#each storeHelper.getItems(data.drops, 8) as item}
    <DropListItem {item} />
  {/each}
</LayoutGrid>
