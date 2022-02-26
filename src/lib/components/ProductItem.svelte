<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { createEventDispatcher } from 'svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import { Country } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import { Product } from '$lib/store/product';
import { authStore } from '$lib/store/auth';
  export let item: Product;
  export let pathPrefix: string;
  export let key: number | null = null;
  export let group_id: number | string | null = null;
  export let gallery: UploadFile[] | undefined = undefined;
  export let liked: boolean = false;
  export let id: string;
  export let name: string;
  export let intro: string;
  export let description: string | undefined = undefined;
  export let country: Country | undefined = undefined;
  export let type: Category | undefined = undefined;
  export let introShow: boolean = false;
  export let brand: string | undefined = undefined;
  

  let dispathcher = createEventDispatcher();
  function callLikeItem() {
    if($authStore.user){
      setTimeout(() => {
        if (group_id && key) {
          dispathcher('likeItem', { group_id, key });
        } else {
          dispathcher('likeItem', { item });
        }
        liked = !liked;
      }, 0);
    }else{
      window.openSignInModal();
    }
    
  }
</script>

<div class="item" on:click on:pointerdown>
  <div class="thumbnail">
    <a href="javascript:void(0);" >
      <div class="image-cover" style="padding-top: calc(410 / 315 * 100%)">
        <BlurImage />
        {#if gallery && gallery.length > 0 && gallery[0] !== null}
          <BlurImage {...gallery[0]} />
        {:else}
          <BlurImage />
        {/if}
      </div>
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
  <a href={makeLink(pathPrefix, item)}>
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ desktop: 6, phone: 2 }}
        ><p class="text-eyebrow text-left m-0 mt-20 mb-0">
          {brand || ''}
        </p></Cell
      >
    </LayoutGrid>
    <h3 class="text-body1 mt-15 mb-15">{name}</h3>
    {#if introShow}
      <p class="short-text m-none m-0">{(intro || '').substring(0, 80)}</p>
    {/if}
  </a>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  .item {
    :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
    }
    :global(.mdc-icon-button){
        filter:brightness(0%);
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
  }
</style>
