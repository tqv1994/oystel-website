<script lang="ts">
  import Button from '@smui/button';
  import { Icon } from '@smui/common';
  import IconButton from '@smui/icon-button';

  import { Cell } from '@smui/layout-grid';
  import { Svg } from '@smui/common/elements';
  import LayoutGrid from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import Carousel from './Carousel.svelte';
  import { Experience } from '$lib/store/experience';
  import { Destination } from '$lib/store/destination';
  import BlurImage from './blur-image.svelte';
  import { createEventDispatcher } from 'svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';

  const dispatcher = createEventDispatcher();
  export let data: Experience | Destination;

  export const likeItem = () => {
    dispatcher('like');
  };

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
</script>

<LayoutGrid class="p-0 hidden-on-sticky">
  <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
    <div class="data-detail-image">
      {#if data.gallery.length > 0}
        <Carousel {...carouselConfig}>
          {#each data.gallery as item}
            <div class="image-cover" style="padding-top: 0; height: 90vh">
              <BlurImage {...item} />
            </div>
          {/each}
        </Carousel>
      {/if}
    </div>
  </Cell>
  <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
    <div class="d-pt-25-vh m-pt-45">
      <p class="text-eyebrow m-m-0">{data?.country.name}</p>
      <h1 class="m-mt-30 m-mb-15">{data?.name}</h1>
      <p class="mb-30 short-description m-mt-0">
        {data.intro ? data.intro : ''}
      </p>
      <Button variant="outlined" class="mb-15"
        ><Label>Find My Advisor</Label></Button
      >
      <br />
      <Button variant="outlined"><Label>What to Pack</Label></Button>
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
  </Cell>
</LayoutGrid>

<style lang="scss">
  @use '../../theme/mixins';
  .data-detail-image {
    width: 100%;
    height: calc(90vh - 115px);
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
