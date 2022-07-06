<script lang="ts">
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';

  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import { likeProductService } from '$lib/services/product.service';
  import { session } from '$app/stores';

  import type { Product } from '$lib/store/product';
  import Button, { Label } from '@smui/button';

  import IconButton from '@smui/icon-button';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from '../blur-image.svelte';
  import Markdown from '../Markdown.svelte';
  import FeaturedImage from '../FeaturedImage.svelte';
  export let item: Product;
  let liked = false;
  let me = $session.user;

  $: if (me) {
    const indexExist = ($session.travellerMe?.productLikes || []).findIndex(
      (itemProduct) => item.id.replace('product-', '') === itemProduct.id,
    );
    if (indexExist < 0) {
      liked = false;
    } else {
      liked = true;
    }
  } else {
    liked = false;
  }

  async function callLikeItem() {
    if (me) {
      try {
        const userUpdated = await likeProductService(
          item.id.replace('product-', ''),
          $session.travellerMe?.productLikes || [],
        );
        session.update((s) => {
          if (s.travellerMe) {
            s.travellerMe.productLikes = userUpdated.productLikes;
          }
          return s;
        });
        session.set({ user: me });
      } catch (error) {
        console.error(error);
      }
    } else {
      window.openSignInModal();
    }
  }
</script>

<div class="product-slider-item-modal">
  <div class="product-slider-item-left">
    <div class="thumbnail">
      <FeaturedImage
        size="medium"
        image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
        alt={`${item.name} ${item.id}`}
      />
      <IconButton
        class="btn-favorite {liked ? 'liked' : ''}"
        on:click={callLikeItem}
      >
        <HeartIcon size="sm" />
        <HeartFilledIcon size="sm" />
      </IconButton>
    </div>
  </div>
  <div class="product-slider-item-right">
    <div class="product-item-content-wrapper">
      <p class="text-eyebrow ">{item.brand || ''}</p>
      <h6 class="mb-20 mt-20">{item.name || ''}</h6>
      <p class="description"><Markdown source={item.description || ''} /></p>
      <h3 class="mt-20 product-item-h3">${item.price || 0}</h3>
      <Button variant="outlined"><Label>Purchase Item</Label></Button>
    </div>
  </div>
</div>

<!--<LayoutGrid class="p-0">
  <Cell spanDevices={{ desktop: 1 }} class="m-none" />
  <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
    <div class="thumbnail">
      <div class="image-cover" style="padding-top: calc(406 / 301 * 100%)">
        {#if item.gallery && item.gallery.length > 0}
          <BlurImage {...item.gallery[0]} />
        {:else}
          <BlurImage />
        {/if}
      </div>
      <IconButton
        class="btn-favorite {liked ? 'liked' : ''}"
        on:click={callLikeItem}
      >
        <HeartIcon size="sm" />
        <HeartFilledIcon size="sm" />
      </IconButton>
    </div>
  </Cell>
  <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
    <div class="d-mt-90">
      <p class="text-eyebrow ">{item.brand}</p>
      <h6 class="mb-20 mt-20">{item.name}</h6>
      <p class="description"><Markdown source={item.description || ''} /></p>
      <h3 class="mb-35 mt-20">${item.price}</h3>
      <Button variant="outlined"><Label>Purchase Item</Label></Button>
    </div>
  </Cell>
</LayoutGrid>-->
<style lang="scss" global>
  @use '../../../theme/mixins';
  .product-slider-item-modal {
    display: flex;
    align-items: center;
    padding: 0 9.787557%;
    position: relative;
    :global(.mdc-layout-grid__inner) {
      align-items: center;
    }
    @include mixins.mobile {
      padding: 0;
      flex-direction: column;
      align-items: flex-start;
      &::after {
        position: absolute;
        bottom: 24px;
        left: 0;
        right: 0;
        width: 100%;
        content: '';
        display: block;
        height: 24px;
        background: linear-gradient(
          0deg,
          rgba(black, 1) 0%,
          rgba(black, 0) 100%
        );
        opacity: 0.1;
        z-index: 45;
      }
    }
  }
  .product-slider-item-left {
    flex: 1;
    .thumbnail {
      width: 76.603774%;
      :global(.image-cover) {
        padding-top: 125.862068% !important;
        margin: 24px 0;
        @include mixins.mobile {
          padding-top: 100% !important;
          margin: 52px 0 0 0;
        }
      }
      @include mixins.mobile {
        width: 100%;
      }
    }
    @include mixins.mobile {
      width: 100%;
    }
  }
  .product-slider-item-right {
    flex: 1;
    max-height: calc(100vh - 88px);
    padding: 48px 0;
    overflow-y: auto;
    @include mixins.mobile {
      max-height: none;
      padding: 24px 0;
    }
  }
  .product-item-content-wrapper {
    padding-left: 24px;
    width: 80%;
    position: relative;
    @include mixins.mobile {
      width: 100%;
      height: 42vh;
      overflow-y: auto;
      padding: 0 0 24px 0;

      h6 {
        font-size: 18px;
        margin-bottom: 24px !important;
      }

      h3 {
        font-size: 18px;
        font-family: Surt, sans-serif;
        margin: 24px 0 32px 0 !important;
      }
    }
  }
  .product-item-h3 {
    margin-bottom: 64px;
  }
</style>
