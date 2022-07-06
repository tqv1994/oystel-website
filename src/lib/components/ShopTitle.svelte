<script lang="ts">
  import ShareIcon from '$lib/icons/ShareIcon.svelte';
  import type { UploadFile } from '$lib/store/upload-file';

  import IconButton, { Icon } from '@smui/icon-button';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  import OyDeviceDetector from './common/OyDeviceDetector.svelte';
  import { Svg } from '@smui/common/elements';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import FeaturedImage from './FeaturedImage.svelte';
  import CarouselImages from './CarouselImages.svelte';

  export let gallery: UploadFile[] | undefined;
  export let title = '';
  export let subTitle = '';
  export let description = '';
  export let showLikeIcon = false;
  export let showShareIcon = false;
  export let theme: 'dark' | 'light' = 'light';
  export let background = '#f2f2f2';
  export let galleryPosition: 'left' | 'right' = 'left';
  let classNames: string | '';
  export { classNames as class };
</script>

<section
  class="header-title full-width -slide-content {theme} {classNames}"
  style={`background-color:${background}`}
>
  <div class="content-wrap">
    <div class="container margin-auto add-padding">
      <LayoutGrid class="p-0">
        <Cell
          spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}
          class={`${
            galleryPosition == 'left' ? 'd-order-1' : 'd-order-2'
          } m-order-1`}
        >
          {#if gallery && gallery.length >= 2}
            <CarouselImages {gallery} styleItem="padding-top: 100%" />
          {:else if gallery && gallery.length == 1}
            <FeaturedImage
              image={(gallery || []).length > 0 ? gallery[0] : undefined}
              class="-shop-title"
              style="padding-top:100%"
            />
          {:else}
            <FeaturedImage
              image={undefined}
              class="solo-image"
              alt={title || ''}
            />
          {/if}
        </Cell>
        <Cell
          spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}
          style="position: relative"
          class={`${
            galleryPosition == 'left' ? 'd-order-2' : 'd-order-1'
          } m-order-2`}
        >
          <div class="content-left">
            <div class="row mb-0">
              <div class="col d-col-6 m-col-6 mb-0 pb-24 subtitle">
                <span class="text-eyebrow">{subTitle}</span>
              </div>
              <div class="col d-col-6 m-col-6 text-right mb-0">
                {#if showLikeIcon}
                  <IconButton class="pl-0 pr-0 m-0 btn-share">
                    <ShareIcon size="md" />
                  </IconButton>
                {/if}
                {#if showShareIcon}
                  <IconButton class="pl-0 pr-0 m-0 btn-like">
                    <HeartIcon size="sm" />
                  </IconButton>
                {/if}
              </div>
            </div>
            <h1 class="d-mt-0 m-mt--10 d-mb-15 m-mb-10 text-h2">{title}</h1>
            <p class="short-description m-0">
              {@html description}
            </p>
          </div>
        </Cell>
      </LayoutGrid>
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../style/include/grid';
  .header-title {
    padding-top: 20px;
    padding-bottom: 20px;
    @include mixins.mobile {
      padding-bottom: 40px;
      margin-bottom: 24px;
    }
    --mdc-layout-grid-gutter-desktop: 30px;

    &.-slide-content {
      padding-top: 20px;
      padding-bottom: 20px;
      margin-bottom: 8px;
      height: calc(100vh - 88px);
      :global(.image-cover) {
        height: calc(100vh - 128px) !important;
        padding-top: 0 !important;
      }
      :global(.image-cover.solo-image),
      :global(.image-cover.-shop-title) {
        height: calc(100vh - 88px - 68px - 40px) !important;
        @include mixins.mobile {
          height: 100% !important;
        }
      }
      @include mixins.mobile {
        padding-top: 24px;
        height: auto;
        margin-bottom: 24px;
        padding-bottom: 32px;

        .image-cover {
          height: auto !important;
          padding: 100% 0 0 0 !important;
          &.solo-image {
            height: auto !important;
          }
        }
      }
    }

    :global(.sc-carousel-dots__container) {
      align-self: flex-start;
      --sc-color-rgb-light: #fff;
      padding: 0;
    }

    :global(.sc-carousel-dot__dot_active) {
      opacity: 1;
    }
    :global(.d-order-1) {
      order: 1;
    }
    :global(.d-order-2) {
      order: 2;
    }
    @include mixins.mobile {
      :global(.m-order-1) {
        order: 1;
      }
      :global(.m-order-2) {
        order: 2;
      }
    }

    .subtitle {
      margin-left: 0;
      padding-left: 0;
      @include mixins.mobile {
        padding-bottom: 20px !important;
      }

      .text-eyebrow {
        padding: 0 0 0 16px;
        @include mixins.mobile {
          padding-left: 12px;
        }
      }
    }
  }
  .header-title :global(.btn-like),
  .header-title :global(.btn-share) {
    top: -10px;
  }
  .header-title .content-left {
    @include mixins.desktop {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .header-title .short-description {
    width: 80%;
  }

  @include mixins.mobile {
    .header-title .short-description {
      width: 100%;
    }

    .header-title .content-left {
      padding-top: 10px;
      padding-bottom: 20px;
    }

    .header-title :global(.mdc-layout-grid__inner) {
      grid-gap: 40px;
    }
  }
</style>
