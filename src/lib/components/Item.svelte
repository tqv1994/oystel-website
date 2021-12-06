<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Experience } from '$lib/store/experience';
  import { Destination } from '$lib/store/destination';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { createEventDispatcher } from 'svelte';
  import { Searchable } from '$lib/store/types';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import { Country } from '$lib/store/country';
  export let item: Experience | Destination | Searchable;
  export let pathPrefix: string;
  export let key: number | null = null;
  export let group_id: number | string | null = null;
  export let gallery: UploadFile[] | undefined = undefined;
  export let liked: boolean = false;
  export let id: string;
  export let name: string;
  export let description: string | undefined = undefined;
  export let country: Country | undefined = undefined;

  let dispathcher = createEventDispatcher();
  function callLikeItem() {
    setTimeout(() => {
      if (group_id && key) {
        dispathcher('likeItem', { group_id, key });
      } else {
        dispathcher('likeItem', { item });
      }
    }, 0);
  }
</script>

<div class="item">
  <div class="thumbnail">
    {#if gallery?.length}
      <a href={makeLink(pathPrefix, item)}>
        <div class="image-cover" style="padding-top: calc(410 / 315 * 100%)">
          <BlurImage {...gallery[0]} />
        </div>
      </a>
    {/if}
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
        ><p class="text-eyebrow text-left m-0 mt-25 mb-25">
          {country?.name || ''}
        </p></Cell
      >
    </LayoutGrid>
    <div class="divider" />
    <h4 class="text-h3 title m-mt-30">{name}</h4>
    <p class="short-text m-none">
      {(description || '').substr(0, 80)}...
    </p>
  </a>
</div>

<style lang="scss">
  .item {
    :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
    }
    .divider::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .title {
      height: 45px;
      overflow: hidden;
    }
    .thumbnail {
      position: relative;
    }
    .divider {
      width: 20%;
    }
  }
</style>
