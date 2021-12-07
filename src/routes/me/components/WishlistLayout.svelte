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
  let filter: string = '';
  const onUnlike = (e: CustomEvent) => {
    dispatcher('unlike', { id: e.detail.id, typeName: e.detail.typeName });
  };

  const handleFilter = (e: CustomEvent) => {
    console.log(e.detail);
  };
</script>

{#if data.length > 0}
  <div class="row header mb-30">
    <div class="d-col-6 m-col-6">{data.length} Items</div>
    <div class="d-col-6 m-col-6 text-right">
      <Select bind:value={filter} label="" class="text-left" on:change={handleFilter}>
        <Option value="">All</Option>
        <Option value="Product">Product</Option>
        <Option value="Destination">Destination</Option>
        <Option value="Experience">Experience</Option>
      </Select>
    </div>
  </div>
  <div class="row items-list">
    {#each filter != '' ? data.filter(item => item.__typename == filter) : data as item}
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
  <div>There is no wishlist...</div>
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
