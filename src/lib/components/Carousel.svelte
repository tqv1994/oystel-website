<script lang="ts">
  import { onMount } from 'svelte';
  import { Icon } from '@smui/button';
  import Carousel from '@beyonk/svelte-carousel';

  export let easing = 'linear';
  export let perPage = 1;
  export let autoplay = 8000;
  export let duration = 1500;
  export let draggable = false;
  export let dots = false;
  export let loop = false;
  export let useCustomArrow = false;
  export let useCustomArrowAddChevron = false;
  export let customArrowLeftText: string | undefined = undefined;
  export let customArrowRightText: string | undefined = undefined;
  export let chevronPosition = 'inside';
  export let itemsShowMobile: number | undefined = undefined;
  export let startIndex = 0;
  export let controls = true;
  let itemsShowDesktop: number = perPage;
  export let totalItems = 0;
  let totalPage = 0;

  let carousel: Carousel;
  let currentPageIndex = 0;
  onMount(async () => {
    if (!checkIsDesktop()) {
      if (itemsShowMobile) {
        perPage = itemsShowMobile;
      }
    } else {
      perPage = itemsShowDesktop;
    }
    if (totalItems) {
      // totalPage = totalItems >  > 0;
      totalPage = totalItems <= perPage ? 1 : 1 + (totalItems - perPage);
    }
  });

  const checkIsDesktop = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (width >= 960) {
      return true;
    }
    return false;
  };

  const onResize = () => {
    if (!checkIsDesktop()) {
      if (itemsShowMobile) {
        perPage = itemsShowMobile;
      }
    } else {
      perPage = itemsShowDesktop;
    }
  };

  function onChange(
    event: CustomEvent<{ currentSlide: number; slideCount: number }>,
  ) {
    currentPageIndex = event.detail.currentSlide;
  }

  export function onLeftClick() {
    carousel.left();
  }

  export function onRightClick() {
    carousel.right();
  }

  export function onGo(index: number) {
    carousel.go(index);
  }
</script>

<svelte:window on:resize={onResize} />

<Carousel
  bind:this={carousel}
  on:change
  {easing}
  {autoplay}
  {duration}
  {draggable}
  {dots}
  {loop}
  {controls}
  {useCustomArrow}
  {useCustomArrowAddChevron}
  {customArrowLeftText}
  {customArrowRightText}
  bind:perPage
  bind:startIndex
  on:change={onChange}
>
  <span
    class={`arrow-${chevronPosition} ${
      totalPage > 0 && currentPageIndex === 0 ? 'disabled' : ''
    } left`}
    slot="left-control"
  >
    {#if useCustomArrow}
      {#if useCustomArrowAddChevron}
        <span class="custom-button-chevron -left"
          ><Icon class="material-icons">chevron_left</Icon></span
        >
      {/if}
      {customArrowLeftText}
    {:else}
      <Icon class={`material-icons`}>chevron_left</Icon>
    {/if}
  </span>
  <span
    class={`arrow-${chevronPosition} right ${
      totalPage > 0 && currentPageIndex + 1 === totalPage ? 'disabled' : ''
    }`}
    slot="right-control"
  >
    {#if useCustomArrow}
      {customArrowRightText}
      {#if useCustomArrowAddChevron}
        <span class="custom-button-chevron -right"
          ><Icon class="material-icons">chevron_right</Icon></span
        >
      {/if}
    {:else}
      <Icon class={`material-icons`}>chevron_right</Icon>
    {/if}
  </span>
  <slot />

  {#if totalItems > 0 && perPage - totalItems > 0}
    {#each Array(perPage - totalItems) as _, i}
      <div />
    {/each}
  {/if}
</Carousel>

<style lang="scss">
  @use '../../theme/mixins';
  span {
    &.disabled {
      :global(.mdc-icon-button) {
        color: #9a9a9a;
      }
    }
  }
  .arrow-inside {
    @include mixins.mobile {
      display: none;
    }
    position: absolute;
    z-index: 1;
    top: 50%;

    &:hover {
      color: #fff;
    }
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }

  .custom-button-chevron {
    display: inline-block;
    &.-left {
      padding-right: 4px;
    }
    &.-right {
      padding-left: 4px;
    }
  }

  .arrow-outside {
    @include mixins.mobile {
      display: none;
    }
    position: absolute;
    top: -82px;
    left: auto;
    transform: translateX(0);
    &.left {
      right: 100px;
    }
    &.right {
      right: 0px;
    }
  }
  :global(.sc-carousel__carousel-container
      .sc-carousel-dots__container.sc-carousel-dots__container) {
    @include mixins.desktop {
      display: none !important;
    }
    padding-top: 10px;
    column-gap: 15px;
  }
  :global(.sc-carousel-dot__dot) {
    --sc-dot-size: 11px;
    opacity: 1;
    --sc-color-rgb-light: transparent;
    border: 1px solid #fff;
  }
  :global(.sc-carousel-dots__dot-container) {
  }
  :global(.sc-carousel-dot__dot_active) {
    --sc-active-dot-size: 11px;
    background-color: #fff !important;
  }
</style>
