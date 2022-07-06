<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import type { Exhibitable } from '$lib/store/types';
  import Item from './Item.svelte';
  import type { Kind } from '$lib/store/category';

  export let urlPrefix: string;
  export let items: Exhibitable[];
  export let cities: Kind[] = [];
  export let introShow: boolean;
</script>

<LayoutGrid class="p-0 ">
  {#each items || [] as item}
    <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
      <Item {item} pathPrefix={urlPrefix} {cities} {introShow}/>
    </Cell>
  {/each}
</LayoutGrid>
