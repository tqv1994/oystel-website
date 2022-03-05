<script lang="ts">
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';

  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import { likeProductService } from '$lib/services/product.service';
  import { authStore } from '$lib/store/auth';

  import { Product } from '$lib/store/product';
  import Button, { Label } from '@smui/button';

  import IconButton from '@smui/icon-button';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from '../blur-image.svelte';
  import Markdown from '../Markdown.svelte';
  export let item: Product;
  let liked: boolean = false;
  let me = $authStore.user;

  $: if (me) {
    const indexExist = (me.productLikes || []).findIndex(
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
          me.productLikes || [],
        );
        me.productLikes = userUpdated.productLikes;
        authStore.set({ user: me });
      } catch (error) {
        console.error(error);
      }
    } else {
      window.openSignInModal();
    }
  }
</script>

<LayoutGrid class="p-0">
  <Cell spanDevices={{ desktop: 1 }} class="m-none" />
  <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
    <div class="thumbnail">
      <div class="image-cover" style="padding-top: calc(406 / 301 * 100%)">
        {#if item.gallery && item.gallery.length > 0}
            <BlurImage {...item.gallery[0]} />
        {:else}
            <BlurImage/>
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
</LayoutGrid>
