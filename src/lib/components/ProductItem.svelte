<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import IconButton from '@smui/icon-button';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import type { UploadFile } from '$lib/store/upload-file';
  import type { Country } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  import type { Product } from '$lib/store/product';
  import { ppatch } from '$lib/utils/fetch';
  import { updateTravellerMeStore, type Traveller } from '$lib/store/traveller';
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import { actionLike } from './LikeAction.svelte';
  import { getShortText } from '$lib/utils/string';
  import FeaturedImage from './FeaturedImage.svelte';
  export let item: Product;
  export let pathPrefix: string;
  export let key: number | null = null;
  export let group_id: number | string | null = null;
  export let gallery: UploadFile[] | undefined = undefined;
  let liked = false;
  export let id: string;
  export let name: string;
  export let intro: string;
  export let description: string | undefined = undefined;
  export let country: Country | undefined = undefined;
  export let type: Kind | undefined = undefined;
  export let introShow = false;
  export let brand: string | undefined = undefined;
  session.subscribe((s) => {
    if (s.user && s.travellerMe) {
      const travellerMe = s.travellerMe;
      const indexExist = (travellerMe.productLikes || []).findIndex(
        (itemProduct) => item.id.toString() === itemProduct.id.toString(),
      );
      if (indexExist < 0) {
        liked = false;
      } else {
        liked = true;
      }
    }
  });
  async function callLikeItem() {
    return actionLike(async () => {
      try {
        const res = await ppatch('travellers/me', {
          productLikes: processItemLikeIds(
            item.id.toString(),
            $session.travellerMe?.productLikes || [],
          ),
        });
        if (res.ok) {
          updateTravellerMeStore(await res.json());
        } else {
          window.pushToast('An error occurred');
        }
      } catch (error) {
        console.error(error);
      }
    }, $session);
  }

  const processItemLikeIds = (id: string, items: Product[]) => {
    const itemIds: string[] = items.map((item) => item.id.toString());
    const indexExist = itemIds.findIndex((item) => item === id);
    if (indexExist < 0) {
      itemIds.push(id);
    } else {
      itemIds.splice(indexExist, 1);
    }
    return itemIds;
  };
</script>

<div class="item" on:click on:pointerdown>
  <div class="thumbnail">
    <a href="javascript:void(0);">
      <FeaturedImage
        image={gallery && gallery.length > 0 && gallery[0] ? gallery[0] : undefined}
        style="padding-top: calc(410 / 315 * 100%)"
        alt={item?.name || ''}
        size="small"
      />
    </a>
    <IconButton
      class="btn-favorite {liked ? 'liked' : ''}"
      on:click={callLikeItem}
    >
      <HeartIcon size="sm" />
      <HeartFilledIcon size="sm" />
    </IconButton>
  </div>
  <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
  <a href="javascript:void(0);">
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ desktop: 6, phone: 6 }}
        ><p class="text-eyebrow text-left m-0 mt-20 mb-0">
          {brand || ''}
        </p></Cell
      >
    </LayoutGrid>
    <h3 class="text-body1 mt-15 mb-15">{name || ''}</h3>
    {#if introShow}
      <p class="short-text m-none m-0">{getShortText(description || '')}</p>
    {/if}
  </a>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  .item {
    :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
    }
    :global(.mdc-icon-button) {
      filter: brightness(0%);
    }
    .divider::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .title {
      height: 34px;
      overflow: hidden;
      @include mixins.mobile {
        height: 42px;
      }
    }
    .thumbnail {
      position: relative;
    }
    .divider {
      width: 20%;
    }
    h3.text-body1 {
      @include mixins.mobile {
        line-height: 24px;
      }
    }
  }
</style>
