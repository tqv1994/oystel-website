<script type="ts">
  import type { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  import FeaturedImage from './FeaturedImage.svelte';

  export let drops: Drop[];
  export let title = '';
</script>

<div class="stories-list">
  <h2 class="m-0 mb-40 the-latest-title">{title}</h2>
  <div class="m-none d-block">
    {#if drops?.length > 0}
      <Carousel totalItems={drops.length} chevronPosition="outside" perPage={2}>
        {#each drops as item}
          <div class="slide-content slide-item text-left">
            <div class="story-item">
              <div class="thumbnail">
                <FeaturedImage
                  image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
                  style="padding-top: calc(410 / 529 * 100%)"
                  alt={item?.name || ''}
                  size="medium"
                />
              </div>
              <LayoutGrid class="p-0">
                <Cell spanDevices={{ desktop: 6, phone: 2 }}
                  ><p class="text-eyebrow text-left m-0 mt-25">Fashion</p></Cell
                >
              </LayoutGrid>
              <h4 class="title m-mt-30 d-mt-15 mb-15">{item.name}</h4>
              <p class="short-text m-none m-0">
                {(item.description || '').substr(0, 80)}...
              </p>
            </div>
          </div>
        {/each}
      </Carousel>
    {/if}
  </div>
  <div class="m-block d-none">
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ phone: 4, tablet: 8 }}>
        {#each drops as item}
          <div class="story-item">
            <div class="thumbnail">
              <FeaturedImage
                image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined}
                style="padding-top: calc(404 / 358 * 100%)"
                alt={item?.name || ''}
                size="medium"
              />
            </div>
            <LayoutGrid class="p-0">
              <Cell spanDevices={{ desktop: 6, phone: 2 }}
                ><p class="text-eyebrow text-left m-0 mt-25 adjust-mobile">
                  Fashion
                </p></Cell
              >
            </LayoutGrid>
            <h3 class="text-h3 title m-mt-25 mb-15 adjust-mobile">
              {item.name}
            </h3>
            <p class="short-text m-0 mb-35">
              {(item.description || '').substr(0, 80)}...
            </p>
          </div>
        {/each}
      </Cell>
    </LayoutGrid>
  </div>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  .stories-list {
    :global(.sc-carousel-dots__container) {
      margin-top: 30px;
    }
    @include mixins.desktop {
      :global(.sc-carousel-dots__container) {
        display: none;
      }
    }
    .slide-item {
      padding-right: var(--mdc-layout-grid-gutter-desktop);
      direction: ltr;
    }
    .wrap-control {
      top: auto;
      bottom: -80px;
      img {
        cursor: pointer;
        filter: brightness(0%);
        &:hover {
          filter: invert(43%) sepia(89%) saturate(304%) hue-rotate(177deg)
            brightness(91%) contrast(94%);
        }
      }
    }
    .the-latest-title {
      @include mixins.mobile {
        margin-bottom: 20px !important;
      }
    }

    .text-eyebrow.adjust-mobile {
      @include mixins.mobile {
        margin-top: 20px !important;
      }
    }

    .title.adjust-mobile {
      @include mixins.mobile {
        margin-top: 16px !important;
      }
    }
  }
</style>
