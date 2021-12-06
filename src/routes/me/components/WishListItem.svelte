<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Product } from '$lib/store/product';
  import IconButton from '@smui/icon-button';
  import { createEventDispatcher } from 'svelte';
  import Text from './Text.svelte';
  export let item: Product;
  const dispatcher = createEventDispatcher();
  const onUnlike = (productId: string) => {
    dispatcher('unlike', { productId });
  };
</script>

<div class="item-product">
  <div class={item.available ? '' : 'no-longer-container'}>
    <div class="thumbnail">
      <div class="image-cover" style="padding-top: 145%">
        <BlurImage {...item.gallery[0]} />
      </div>
      <IconButton
        class="btn-delete material-icons"
        on:click={(e) => onUnlike(item.id)}>close</IconButton
      >
    </div>
    <p class="text-eyebrow mt-25">{item.brand}</p>
    <svelte:component this={Text}>{item.name}</svelte:component>
  </div>
  {#if !item.available}
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

    .no-longer-container{
      opacity: 0.6;
    }
  }

  .no-longer {
    display: inline-block;
    border: 1.25px solid black;
    padding: 3px 12px;
  }
</style>
