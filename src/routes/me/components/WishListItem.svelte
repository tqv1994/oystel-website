<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Product } from '$lib/store/product';
  import IconButton from '@smui/icon-button/IconButton.svelte';
import Text from './Text.svelte';
  export let item: Product;
</script>

<div class="item-product">
  <div class="thumbnail">
    <div class="image-cover" style="padding-top: 145%">
      <BlurImage {...item.gallery[0]} />
    </div>
    <IconButton class="btn-delete material-icons">close</IconButton>
  </div>
  <p class="text-eyebrow mt-25">{item.brand}</p>
  <svelte:component this={Text}>{item.name}</svelte:component>
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
  }
</style>
