<script lang="ts">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Experience } from '$lib/store/experience';
  import { Destination } from '$lib/store/destination';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button';
  import { Searchable } from '$lib/store/types';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import { Country } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import { Product } from '$lib/store/product';
  import { authStore } from '$lib/store/auth';
  import { likeExperienceService } from '$lib/services/experience.service';
  import { likeDestinationService } from '$lib/services/destination.service';
  export let item: Experience | Destination | Product | Searchable;
  export let pathPrefix: string;
  export let key: number | null = null;
  export let group_id: number | string | null = null;
  export let gallery: UploadFile[] | undefined = undefined;
  let liked: boolean = false;
  export let id: string;
  export let name: string;
  export let intro: string;
  export let description: string | undefined = undefined;
  export let country: Country | undefined = undefined;
  export let type: Category | undefined = undefined;
  export let introShow: boolean = false;
  let me = $authStore.user;
  $: if (me) {
    if (pathPrefix.startsWith('/experience')) {
      const indexExist = (me.experienceLikes || []).findIndex(
        (itemExperience) =>
          item.id.replace('experience-', '') === itemExperience.id,
      );
      if (indexExist < 0) {
        liked = false;
      } else {
        liked = true;
      }
    } else if (pathPrefix.startsWith('/destination')) {
      const indexExist = (me.destinationLikes || []).findIndex(
        (itemDestination) =>
          item.id.replace('destination-', '') === itemDestination.id,
      );
      if (indexExist < 0) {
        liked = false;
      } else {
        liked = true;
      }
    } else {
      liked = false;
    }
  } else {
    liked = false;
  }

  async function callLikeItem() {
    if (me) {
      if (pathPrefix.startsWith('/experience')) {
        try {
          const userUpdated = await likeExperienceService(
            item.id.replace('experience-', ''),
            me.experienceLikes || [],
          );
          me.experienceLikes = userUpdated.experienceLikes;
          authStore.set({ user: me });
        } catch (error) {
          console.error(error);
        }
      }
      if (pathPrefix.startsWith('/destination')) {
        try {
          const userUpdated = await likeDestinationService(
            item.id.replace('destination-', ''),
            me.destinationLikes || [],
          );
          me.destinationLikes = userUpdated.destinationLikes;
          authStore.set({ user: me });
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      window.openSignInModal();
    }
  }
</script>

<div class="item">
  <div class="thumbnail">
    <a href={makeLink(pathPrefix, item)}>
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
          {country?.name || type?.name || ''}
        </p></Cell
      >
    </LayoutGrid>
    <h4 class="title mt-15 mb-15">{name}</h4>
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
    .divider::after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    .title {
      height: 32px;
      overflow: hidden;
      @include mixins.mobile {
        height: 43px;
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
