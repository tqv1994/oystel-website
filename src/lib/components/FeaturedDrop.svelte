<script lang="ts">
  import type { Action } from '$lib/store/action';
  import type { Drop } from '$lib/store/drop';
  import Button, { Label } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  import CarouselImages from './CarouselImages.svelte';
  import FeaturedImage from './FeaturedImage.svelte';
  export let drop: Drop;
  export let name = 'Featured Drop';
  export let button_1: Action;
  export let button_2: Action;
  onMount(() => {
    console.log('key');
    let galleryItems = document.querySelectorAll(
      '.gallery-images .gallery-images__item',
    );
    galleryItems.forEach((item, key) => {
      item.addEventListener('pointerover', function () {
        galleryItems.forEach(function (itemOther) {
          itemOther.classList.remove('active');
        });
        item?.classList.add('active');
      });
      item?.classList.add('active');
    });
  });
</script>

<section class="featured-drop container margin-auto add-padding">
  <LayoutGrid class="p-0">
    <Cell span={12}>
      <div class="row header-row m-mb-20">
        <div class="d-col-6 m-col-12 mb-0">
          <h2 class="mt-0 mb-0 featured-drop__title">{name}</h2>
        </div>
        <div
          class="d-col-6 text-right featured-drop__actions d-block m-none pt-10 mb-0"
        >
          {#if button_1}
            <Button
              class="mr-15 btn-active"
              variant="unelevated"
              href={button_1.url}><Label>{button_1.name}</Label></Button
            >
          {/if}
          {#if button_2}
            <Button variant="outlined" href={button_2.url}
              ><Label>{button_2.name}</Label></Button
            >
          {/if}
        </div>
      </div>

      <div class="featured-drop__content">
        <div class="gallery gallery-carousel mb-10 m-block d-none">
          <CarouselImages
            chevronPosition="outside"
            autoplay={5000}
            gallery={drop.gallery || []}
            styleItem="padding-top: calc(426 / 376 * 100%)"
          />
        </div>
        <div class="featured-drop__actions m-block d-none">
          <div class="row mr--5 ml--5">
            {#if button_1}
              <div
                class="col m-col-6 pr-5 pl-5 featured-drop__actions_button-wrap"
              >
                <Button
                  class="btn-active"
                  variant="unelevated"
                  href={button_1.url}><Label>{button_1.name}</Label></Button
                >
              </div>
            {/if}
            {#if button_2}
              <div
                class="col m-col-6 pr-5 pl-5 featured-drop__actions_button-wrap"
              >
                <Button variant="outlined" href={button_2.url}
                  ><Label>{button_2.name}</Label></Button
                >
              </div>
            {/if}
          </div>
        </div>
        <div class="gallery gallery-images mb-35 d-block m-none">
          {#if (drop.gallery || []).length > 0}
            {#each (drop.gallery || []) as item, i}
              <div class={`gallery-images__item ${i === 0 ? 'active' : ''}`}>
                <div class="thumbnail">
                  <FeaturedImage
                    image={item || undefined}
                    style="padding-top: 473px;"
                    alt={drop?.name || ''}
                  />
                </div>
              </div>
            {/each}
          {:else}
            <div class={`gallery-images__item active`}>
              <div class="thumbnail">
                <div class="image-cover" style="padding-top: 473px;">
                  <BlurImage alt={drop?.name || ''} />
                </div>
              </div>
            </div>
          {/if}
        </div>
        <div class="featured-drop__intro">
          <div class="row">
            <div class="d-col-5 m-col-12 mb-0">
              <p class="text-eyebrow">Fashion Drop</p>
              <h3 class="m-mb-0 drop-name">{drop.name}</h3>
            </div>
            <div class="d-col-7 m-col-12 mb-0">
              <p class="drop-description m-mt-0 m-mb-20">{drop.description}</p>
              <Button
                class="hover-affect-drop"
                variant="outlined"
                href="/shop/fashion-drops"><Label>SHOP THE DROP</Label></Button
              >
            </div>
          </div>
        </div>
      </div></Cell
    >
  </LayoutGrid>
</section>

<style lang="scss">
  @use '../../style/include/grid';
  @use '../../style/include/button';
  @use '../../theme/mixins';
  @use '../../theme/colors';
  @use '../../theme/variables' as v;
  @use '@material/button' as materialButton;
  .featured-drop {
    :global(.arrow-outside) {
      display: none;
    }
    @include mixins.desktop {
      :global(.sc-carousel-dots__container) {
        display: none;
      }
    }
    .featured-drop__actions {
      @include mixins.mobile {
        :global(button),
        :global(a) {
          width: 100%;
          min-width: 100%;
        }

        &_button-wrap {
          margin-bottom: 16px;
        }
      }
    }
    :global(.mdc-button) {
      max-width: 171px;
      padding-left: 0;
      padding-right: 0;
    }
    :global(.btn-active) {
      --mdc-typography-button-font-family: GTSupperTextBook;
      --mdc-typography-button-font-size: 15px;
    }
    .gallery {
      &.gallery-images {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        direction: ltr;
        .gallery-images__item {
          transition: flex 1s cubic-bezier(0.29, 0, 0.2, 1);
          -webkit-transition: flex 1s cubic-bezier(0.29, 0, 0.2, 1);
          -moz-transition: flex 1s cubic-bezier(0.29, 0, 0.2, 1);
          will-change: flex;
          flex: 1;
          :global(img) {
            width: calc(100vw * 659px / 1368px);
            max-width: calc(100vw * 659px / 1368px) !important;
          }
          &.active {
            flex: 2.12;
          }
        }
      }
      &.active {
        flex: 3;
      }
    }
    .gallery-carousel {
      :global(.sc-carousel-dots__container) {
        display: none;
      }
    }

    .header-row {
      margin-bottom: 24px;
    }

    .image-cover {
      @include mixins.mobile {
        padding-top: 129.87085% !important;
      }
    }

    .featured-drop__intro {
      :global(.mdc-button:not(:disabled)) {
        --mdc-outlined-button-hover-state-layer-color: transparent;
        min-width: auto;
        width: auto;
        max-width: 100%;
        border-width: 0;
        position: relative;
      }
      :global(.mdc-button:not(:disabled)::after) {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 1px;
        background-color: #000;
        transition: all 800ms;
      }
      :global(.mdc-button:not(:disabled).hover-affect-drop:hover) {
        background-color: transparent;
        --mdc-outlined-button-label-text-color: #{colors.$black};
      }
      :global(.mdc-button:not(:disabled).hover-affect-drop:hover::after) {
        width: 50%;
      }

      .text-eyebrow {
        font-size: 13px !important;
      }

      .drop-name {
        margin-top: 16px;
        max-width: 70%;
        @include mixins.mobile {
          max-width: 100%;
          margin-bottom: 16px !important;
        }
      }
      .drop-description {
        @include mixins.desktop {
          margin-top: 44px;
          width: 86%;
        }
      }
    }
  }
</style>
