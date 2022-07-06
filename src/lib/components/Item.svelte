<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import type { Experience } from '$lib/store/experience';
  import type { Destination } from '$lib/store/destination';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button';
  import type { Searchable } from '$lib/store/types';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import type { Product } from '$lib/store/product';
  import OyDeviceDetector from './common/OyDeviceDetector.svelte';
  import { updateTravellerMeStore, type Traveller } from '$lib/store/traveller';
  import { ppatch } from '$lib/utils/fetch';
  import { session } from '$app/stores';
  import { actionLike } from './LikeAction.svelte';
  import type { Kind } from '$lib/store/category';
  import { getShortText } from '$lib/utils/string';
  import FeaturedImage from './FeaturedImage.svelte';
  export let cities: Kind[] = [];
  export let item: Experience | Destination | Product | Searchable;
  export let pathPrefix: string | null;
  let liked = false;
  let city: Kind | undefined;
  export let introShow = false;
  let classNames: string | '' = '';
  export { classNames as class };
  session.subscribe((s) => {
    if (s.user && s.travellerMe) {
      const travellerMe = s.travellerMe;
      if (pathPrefix && pathPrefix.startsWith('/experiences')) {
        const indexExist = (travellerMe.experienceLikes || []).findIndex(
          (itemExperience) =>
            item.id.toString() === itemExperience.id.toString(),
        );
        if (indexExist < 0) {
          liked = false;
        } else {
          liked = true;
        }
      } else if (pathPrefix && pathPrefix.startsWith('/destinations')) {
        const indexExist = (travellerMe.destinationLikes || []).findIndex(
          (itemDestination) =>
            item?.id.toString() === itemDestination.id.toString(),
        );
        if (indexExist < 0) {
          liked = false;
        } else {
          liked = true;
        }
      }
    }
  });
  console.log('gallery', item.gallery);
  $: if (!city && item.city && cities.length > 0) {
    city = cities.find(
      (cityItem) => cityItem.id.toString() === item.city.toString(),
    );
  }

  async function callLikeItem() {
    actionLike(async () => {
      try {
        let res;
        if (pathPrefix && pathPrefix.startsWith('/experiences')) {
          res = await ppatch('travellers/me', {
            experienceLikes: processItemLikeIds(
              item.id.toString(),
              $session.travellerMe?.experienceLikes || [],
            ),
          });
        } else if (pathPrefix && pathPrefix.startsWith('/destinations')) {
          res = await ppatch('travellers/me', {
            destinationLikes: processItemLikeIds(
              item.id.toString(),
              $session.travellerMe?.destinationLikes || [],
            ),
          });
        }
        if (res && res.ok) {
          updateTravellerMeStore(await res.json());
        } else {
          window.pushToast('An error occurred');
        }
      } catch (error) {
        console.error(error);
      }
    }, $session);
  }

  const processItemLikeIds = (
    id: string,
    items: (Experience | Destination)[],
  ) => {
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

<div class="item {classNames}">
  <div class="thumbnail">
    <a href={makeLink(pathPrefix, item)}>
      <OyDeviceDetector showInDesktop={true}>
        <FeaturedImage
          image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
          alt={item.name || ''}
          style="padding-top: calc(410 / 311 * 100%)"
          size="small"
        />
      </OyDeviceDetector>
      <OyDeviceDetector showInMobile={true}>
        <FeaturedImage
          image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
          alt={item.name || ''}
          style="padding-top: calc(195 / 152 * 100%)"
          size="small"
        />
      </OyDeviceDetector>
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
          {city?.name || item.type?.name || ''}
        </p></Cell
      >
    </LayoutGrid>
    <h4 class="title mt-15 mb-15">{item.name || item.location || ''}</h4>
    {#if introShow}
      <p class="short-text m-none m-0">{getShortText(item.description)}</p>
    {/if}
  </a>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  .item {
    :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
    }
    .divider::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    :global(.mdc-layout-grid__inner) {
      @include mixins.mobile {
        grid-gap: 0;
      }
    }
    .title {
      margin-bottom: 24px !important;
      @include mixins.mobile {
        height: auto;
        margin-bottom: 8px !important;
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
