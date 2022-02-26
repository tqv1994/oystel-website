<script type="ts">
  import { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';

  export let drops: Drop[];
  export let title: string = '';
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: false,
    particlesToShow: 2,
    chevronPosition: 'outside',
  };
</script>

<div class="stories-list d-pl-100 d-pr-100">
  <h2 class="m-0 mb-40">{title}</h2>
  <div class="m-none d-block">
    {#if drops?.length > 0}
      <Carousel {...carouselConfig} totalItems={drops.length}>
        {#each drops as item}
          <div class="slide-content slide-item text-left">
            <div class="story-item">
              <div class="thumbnail">
                <a href={makeLink('/drop', item)}>
                  <div
                    class="image-cover"
                    style="padding-top: calc(410 / 529 * 100%)"
                  >
                    {#if item.gallery.length > 0}
                      <BlurImage {...item.gallery[0]} />
                    {:else}
                      <BlurImage />
                    {/if}
                  </div>
                </a>
              </div>
              <a href={makeLink('/drop', item)}>
                <LayoutGrid class="p-0">
                  <Cell spanDevices={{ desktop: 6, phone: 2 }}
                    ><p class="text-eyebrow text-left m-0 mt-25">Fashion</p></Cell
                  >
                </LayoutGrid>
                <h4 class="title m-mt-30 d-mt-15 mb-15">{item.name}</h4>
                <p class="short-text m-none m-0">
                  {(item.description || '').substr(0, 80)}...
                </p>
              </a>
            </div>
          </div>
        {/each}
      </Carousel>
    {/if}
  </div>
  <div class="m-block d-none">
    <LayoutGrid class="p-0">
      <Cell spanDevices={{phone: 4, tablet: 8}}>
        {#each drops as item}
            <div class="story-item">
              <div class="thumbnail">
                <a href={makeLink('/drop', item)}>
                  <div
                    class="image-cover"
                    style="padding-top: calc(404 / 358 * 100%)"
                  >
                    {#if item.gallery.length > 0}
                      <BlurImage {...item.gallery[0]} />
                    {:else}
                      <BlurImage />
                    {/if}
                  </div>
                </a>
              </div>
              <a href={makeLink('/drop', item)}>
                <LayoutGrid class="p-0">
                  <Cell spanDevices={{ desktop: 6, phone: 2 }}
                    ><p class="text-eyebrow text-left m-0 mt-25">Fashion</p></Cell
                  >
                </LayoutGrid>
                <h3 class="text-h3 title m-mt-30 mb-15">{item.name}</h3>
                <p class="short-text m-none m-0">
                  {(item.description || '').substr(0, 80)}...
                </p>
              </a>
            </div>
        {/each}
      </Cell>
    </LayoutGrid>
  </div>
</div>
<style lang="scss">
    @use '../../theme/mixins';
      .stories-list {
        :global(.sc-carousel-dots__container){
            margin-top: 30px;
        }
        @include mixins.desktop {
            :global(.sc-carousel-dots__container){
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
      }
</style>