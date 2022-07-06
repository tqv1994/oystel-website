<script lang="ts">
  import Button from '@smui/button';
  import { Icon } from '@smui/common';
  import IconButton from '@smui/icon-button';

  import { Cell } from '@smui/layout-grid';
  import { Svg } from '@smui/common/elements';
  import LayoutGrid from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import Carousel from './Carousel.svelte';
  import CarouselImages from './CarouselImages.svelte';
  import type { Experience } from '$lib/store/experience';
  import type { Destination } from '$lib/store/destination';
  import BlurImage from './blur-image.svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  import { documentHelper } from '$lib/helpers';
  import type { UploadFile } from '$lib/store/upload-file';

  const dispatcher = createEventDispatcher();
  export let data: Experience | Destination;
  export const likeItem = () => {
    dispatcher('like');
  };
  const onClickWhatToPack = () => {
    documentHelper.onScrollToSectionSelector('.what-to-pack');
  };
</script>

<div class="content-wrap">
  <LayoutGrid class="p-0">
    <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
      <div class="data-detail-image">
        <div class="m-none d-mr-0">
          {#if (data.gallery || []).length > 0}
            <CarouselImages loop={true} gallery={data.gallery || []} styleItem="padding-top: 0;"/>
          {:else}
            <div class="image-cover" style="padding-top: 0;">
              <BlurImage alt={data?.name || ''} />
            </div>
          {/if}
        </div>
        <div class="d-none m-block">
          {#if (data.gallery || []).length > 0}
            <CarouselImages loop={true} gallery={data.gallery || []} styleItem="padding-top: 0;"/>
          {:else}
            <div class="image-cover" style="padding-top: 0;">
              <BlurImage alt={data?.name || ''} />
            </div>
          {/if}
        </div>
      </div>
    </Cell>
    <Cell
      class="detail-content-side"
      spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}
    >
      <div class="detail-content-side-inner" style="position: relative;">
        <div class="container">
          <p class="text-eyebrow m-m-0 detail-eyebrow">
            {data?.country?.name || ''}
          </p>
          <h1 class="text-h2 m-mt-30 m-mb-15 detail-h2">
            {data?.name || data?.location || ''}
          </h1>
          <p class="mb-30 short-description m-mt-0">
            {data.intro ? data.intro : ''}
          </p>
          <Button variant="unelevated" class="mb-15" href="/advisor"
            ><Label>Find My Advisor</Label></Button
          >
          <br />
          <Button variant="outlined" on:click={onClickWhatToPack}
            ><Label>What to Pack</Label></Button
          >
        </div>
        <div class="action-buttons m-none">
          <IconButton>
            <Icon component={Svg} viewBox="0 0 13.246 19.134">
              <g
                id="Icon_-_Share"
                data-name="Icon - Share"
                transform="translate(0.5 1.233)"
              >
                <path
                  id="Path_318"
                  data-name="Path 318"
                  d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                  transform="translate(-150.699 5872.56)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                />
                <path
                  id="Path_320"
                  data-name="Path 320"
                  d="M161.543-5862.169v-11.12"
                  transform="translate(-155.42 5873.29)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                />
                <path
                  id="Line"
                  d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                  transform="translate(-153.713 5873.443)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                />
              </g>
            </Icon>
          </IconButton>
          <IconButton
            class="btn-favorite {data.liked ? 'liked' : ''}"
            on:click={likeItem}
          >
            <HeartIcon size="md" />
            <HeartFilledIcon size="md" />
          </IconButton>
        </div>
      </div>
    </Cell>
  </LayoutGrid>
</div>

<style lang="scss">
  @use '../../theme/mixins';

  .data-detail-image {
    width: 100%;
    height: 100%;
    @include mixins.desktop {
      padding-left: 64px;
    }

    :global(.image-cover) {
      height: calc(100vh - 128px);
    }
  }

  .detail-content-side-inner {
    @include mixins.desktop {
      width: calc(100% - 64px);
    }
  }

  :global(.mdc-layout-grid__cell.detail-content-side) {
    display: flex;
    align-items: center;

    .detail-h2 {
      margin-top: 20px;
      @include mixins.mobile {
        margin-top: 20px !important;
      }
    }

    .detail-eyebrow {
      @include mixins.mobile {
        margin-top: 20px !important;
      }
    }
  }

  :global(.sc-carousel-dots__container) {
    position: absolute;
    bottom: 5%;
    --sc-color-rgb-light: #fff;
    @include mixins.desktop {
      display: none !important;
    }
    :global(.sc-carousel-dot__dot_active) {
      opacity: 1;
    }
  }
  @media screen and (max-width: 949px) {
    .data-detail-image {
      position: relative;
      width: 100%;
      .image-cover {
        padding-bottom: 65.625% !important;
        height: auto !important;
      }
    }
  }
</style>
