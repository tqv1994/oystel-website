<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
import FeaturedImage from '$lib/components/FeaturedImage.svelte';
  import type { Destination } from '$lib/store/destination';
  import type { Experience } from '$lib/store/experience';
  import type { Product } from '$lib/store/product';
  import IconButton from '@smui/icon-button';
  import { createEventDispatcher } from 'svelte';
  import Text from './Text.svelte';
  export let item: Product | Experience | Destination;
  const dispatcher = createEventDispatcher();
  const onUnlike = (wishListId: string, typeName: string) => {
    dispatcher('unlike', { id: wishListId, typeName: typeName });
  };
</script>

<div class="item-product">
  <div
    class={!item.available && typeof item.available != 'undefined'
      ? 'no-longer-container'
      : ''}
  >
    <div class="thumbnail">
      <FeaturedImage style="padding-top: 145%" image={(item?.gallery|| []).length > 0 ? item?.gallery[0] : undefined} alt={`${item.name} ${item.id}`}/>
      <IconButton
        class="btn-delete material-icons"
        on:click={(e) => onUnlike(item.id, item.typeName)}>close</IconButton
      >
    </div>
    <p class="text-eyebrow mt-25">
      {item.typeName == 'Product' ? item.brand || '' : item.country?.name || ''}
    </p>
    <Text>{item.name}</Text>
  </div>
  {#if !item.available && typeof item.available != 'undefined'}
    <p class="text-eyebrow no-longer mt-25">No longer available</p>
  {/if}
</div>

<style lang="scss">
  .image-cover {
    background-color: #e6e6e6;
  }
  .item-product {
    :global(.btn-delete) {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 2;
    }

    .no-longer-container {
      opacity: 0.6;
    }
  }

  .no-longer {
    display: inline-block;
    border: 1.25px solid black;
    padding: 3px 12px;
  }
</style>
