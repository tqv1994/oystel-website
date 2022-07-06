<script lang="ts">
  import type { Experience } from '$lib/store/experience';
  import type { Destination } from '$lib/store/destination';
  import Masonry from './Masonry.svelte';
  import Item from './Item.svelte';
  import type { Kind } from '$lib/store/category';
  export let items: (Experience | Destination)[];
  export let cities: Kind[] = [];
  export let pathPrefix: string;
  $: innerWidth = 0;

  const assignAspectRatio = (index: number) => {
    return index % 2 == 0 ? 'square' : 'portrait';
  };
</script>

<svelte:window bind:innerWidth />

{#if items && items.length > 0}
  <Masonry
    gridGap="0"
    colWidth={innerWidth >= 1024 ? '33.33333%' : '50%'}
    {items}
  >
    {#each items as item, i}
      <div class="curated-item item-{assignAspectRatio(i)}">
        <Item bind:item {pathPrefix} {cities} />
      </div>
    {/each}
  </Masonry>
{/if}

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../style/include/grid';
  .divider {
    width: 20%;
  }
  .divider:after {
    background-color: #0003;
  }
  .row {
    --mdc-layout-grid-gutter-desktop: calc(15px / 2);
  }
  .row .col {
    --mdc-layout-grid-gutter-desktop: calc(15px / 2);
  }

  .curated-item {
    padding-bottom: 16px;
    @include mixins.desktop {
      &:nth-child(3n) {
        padding-left: 8px;
      }
      &:nth-child(3n + 1) {
        padding-right: 8px;
      }
      &:nth-child(3n - 1) {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
    @include mixins.mobile {
      &:nth-child(even) {
        padding-left: 8px;
      }
      &:nth-child(odd) {
        padding-right: 8px;
      }
    }
    &.item-square {
      :global(.image-cover) {
        padding-top: 90% !important;
      }
    }
  }
</style>
