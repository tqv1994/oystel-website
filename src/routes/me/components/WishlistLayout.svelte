<script lang="ts">
  import Exhibit from '$lib/components/exhibit.svelte';
  import { authStore, User } from '$lib/store/auth';
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';
  import { Product } from '$lib/store/product';
  import Select, { Option } from '@smui/select';
  import type { Load } from '@sveltejs/kit';
  import { createEventDispatcher } from 'svelte';
  import WishListItem from './WishListItem.svelte';
  const dispatcher = createEventDispatcher();

  export let data: Product[] | Experience[] | Destination[] | [];
  let sort: string = 'Recently Added';
  const onUnlike = (e: CustomEvent) => {
    dispatcher('unlike', { id: e.detail.id, typeName: e.detail.typeName });
  };
</script>

{#if data.length > 0}
  <div class="row header mb-30">
    <div class="d-col-6 m-col-6">{data.length} Items</div>
    <div class="d-col-6 m-col-6 text-right">
      <Select bind:value={sort} label="" class="text-left">
        <Option value="Recently Added" selected>Recently Added</Option>
      </Select>
    </div>
  </div>
  <div class="row items-list">
    {#each data as item}
      <div class="d-col-4 m-col-6">
        <svelte:component
          this={WishListItem}
          {item}
          on:unlike={(e) => onUnlike(e)}
        />
      </div>
    {/each}
  </div>
{:else}
  <div>There is no product...</div>
{/if}

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  .header {
    align-items: center;
    :global(.mdc-select) {
      width: auto;
    }
  }
  .items-list {
    grid-row-gap: 30px;
  }
</style>
