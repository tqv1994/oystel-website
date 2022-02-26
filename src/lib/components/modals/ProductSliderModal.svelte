<script lang="ts">
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { Svg } from '@smui/common/elements';
  import OyCarousel from '../common/OyCarousel.svelte';
  import { Product } from '$lib/store/product';
  import BlurImage from '../blur-image.svelte';
  import { onMount } from 'svelte';
  import Carousel from '../Carousel.svelte';
import Markdown from '../Markdown.svelte';
import { authStore } from '$lib/store/auth';
import HeartIcon from '$lib/icons/HeartIcon.svelte';
import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  export let open = false;
  export let products: Product[];
  export let active: number;

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside' 
  };

  const callLikeItem = (item: Product)=> {
    if($authStore.user){
      item.liked = true;
    }else{
      window.openSignInModal();
    }
  }
</script>

<div class="content-wrap popup-products {open ? 'open' : 'close'}">
  {#if products && products.length > 0 && open}
    <section class="full-width pt-50 pb-70">
      <div class="content-wrap">
        <div class="container">
          <IconButton
            class="btn-close"
            on:click={() => {
              open = false;
            }}
          >
            <Icon component={Svg} viewBox="0 0 14.707 14.707">
              <g data-name="Close Icon" transform="translate(-4.596 -4.596)">
                <line
                  id="Line"
                  x2="14"
                  y2="14"
                  transform="translate(4.949 4.949)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                />
                <line
                  id="Line-2"
                  data-name="Line"
                  x1="14"
                  y2="14"
                  transform="translate(4.949 4.949)"
                  fill="none"
                  stroke="#000"
                  stroke-width="1"
                />
              </g>
            </Icon>
          </IconButton>
          <Carousel {...carouselConfig} initialPageIndex={active}>
            {#each products as item}
              <div class="slide-content slide-item">
                <LayoutGrid class="p-0">
                  <Cell spanDevices={{ desktop: 1 }} class="m-none" />
                  <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
                    <div class="thumbnail">
                      <div
                        class="image-cover"
                        style="padding-top: calc(406 / 301 * 100%)"
                      >
                        <BlurImage {...item.gallery[0]} />
                      </div>
                      <IconButton
                        class="btn-favorite {item.liked ? 'liked' : ''}"
                        on:click={() => callLikeItem(item)}
                      >
                        <HeartIcon size="sm" />
                        <HeartFilledIcon size="sm" />
                      </IconButton>
                    </div>
                  </Cell>
                  <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
                    <div class="d-mt-90">
                      <p class="text-eyebrow ">{item.brand}</p>
                      <h6 class="mb-20 mt-20">{item.name}</h6>
                      <p><Markdown source={item.description || ''} /></p>
                      <h3 class="mb-35 mt-20">${item.price}</h3>
                      <Button variant="outlined"
                        ><Label>Purchase Item</Label></Button
                      >
                    </div>
                  </Cell>
                </LayoutGrid>
              </div>
            {/each}
          </Carousel>
        </div>
      </div>
    </section>
  {/if}
</div>

<style lang="scss" global>
  @use '../../../theme/mixins';
  @include mixins.mobile {
    .slide-item {
      .thumbnail {
        margin: auto calc(100px - var(--mdc-layout-grid-margin-phone));
      }
    }
  }
  .popup-products {
    .slide-item{
      .mdc-icon-button{
          filter:brightness(0%);
      }
    }
    @import './src/style/partial/thumbnail.scss';
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    section {
      --mdc-layout-grid-gutter-desktop: 100px;
      background-color: #fff;
    }
    .arrow-inside .mdc-icon-button:hover{
      color: rgba(0,0,0,0.7);
    }
    .arrow {
      @include mixins.mobile {
        display: none;
      }
      position: absolute;
      z-index: 1;
      top: 50%;
      &:hover {
        color: rgba(0,0,0,0.7);
      }
      &.left {
        left: 20px;
      }
      &.right {
        right: 20px;
      }
    }
    .sc-carousel-dots__container {
      position: absolute;
      bottom: 45px;
      --sc-color-rgb-light: #fff;
      @include mixins.desktop {
        display: none;
      }
      .sc-carousel-dot__dot_active {
        opacity: 1;
      }
    }
    .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
    }
    z-index: 5;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    opacity: 1;
    transition: bottom 2s ease;
    &.close {
      opacity: 0;
      bottom: -999px;
      z-index: -1;
    }
    .popup-products.open {
    }

    .btn-close {
      position: absolute;
      top: -30px;
      right: 0;
      z-index: 7;
    }

    .wrap-control {
      top: 38%;
    }
    .carousel .wrap-control button.left .control,
    .carousel .wrap-control button.right .control {
      position: relative;
    }
    .carousel .wrap-control button.left .control i {
      position: absolute;
      left: -20px;
      top: 2px;
    }
    .carousel .wrap-control button.right .control i {
      position: absolute;
      right: -20px;
      top: 2px;
    }
    .carousel .wrap-control button .control i img {
      filter: brightness(0) !important;
    }

    .carousel .dots {
      display: none;
    }

    @media (max-width: 949px) {
      .open {
        top: 0;
        overflow-y: scroll;
      }
      .carousel .wrap-control {
        top: 105%;
      }
      .carousel button.left {
        left: 10vw;
      }
      .carousel button.right {
        right: 10vw;
      }
      .btn-close {
        right: 10px;
      }
    }
  }
</style>
