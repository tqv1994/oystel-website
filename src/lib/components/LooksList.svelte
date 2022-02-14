<script lang="ts">
  import { Look } from '$lib/store/look';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import LookItem from './LookItem.svelte';
  export let items: Look[] = [];
  let group: Look[][] = [];
    if (items.length > 0) {
      group = [];
      let count = 0;
      let groupData: Look[] = [];
      for (const [i,item] of items.entries()) {
        if (count == 0) {
          groupData = [];
        }
        groupData.push(item);
        if(i < items.length-1){
            if (count >= 2) {
            group.push(groupData);
            count = 0;
            } else {
            count++;
            }
        }else{
            group.push(groupData);
        }
      }
    }
</script>

{#each group as itemGroup}
  <LayoutGrid class="p-0">
    {#each itemGroup as item, index}
      {#if index == 0}
        <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 8 }}>
          <LookItem bind:item />
        </Cell>
      {:else}
        <Cell spanDevices={{ desktop: 6, phone: 4, tablet: 8 }} class={`${index == 2 ? 'd-mt-80' : ''}`}>
          <LookItem bind:item />
        </Cell>
      {/if}
    {/each}
  </LayoutGrid>
{/each}
