<script lang="ts">
  import IconButton from '@smui/icon-button';

  import { onMount } from 'svelte';

  export let autoplayDuration = 8000;
  export let duration = 1500;
  export let infinite = true;
  export let particlesToShow = 1;
  export let chevronPosition = 'inside';
  export let itemsShowMobile: number | undefined = undefined;
  export let initialPageIndex: number = 0;
  export let autoplay: boolean = false;
  let itemsShowDesktop: number = particlesToShow;
  export let totalItems: number = 0;
  let totalPage: number = 0;
  

  let Carousel: Carousel; // for saving Carousel component class
  let carouselObject: Carousel;
  let currentPageIndex: number = 0;
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
    if (!checkIsDesktop()) {
      if (itemsShowMobile) {
        particlesToShow = itemsShowMobile;
      }
    } else {
      particlesToShow = itemsShowDesktop;
    }
    if(totalItems){
      // totalPage = totalItems >  > 0;
      totalPage = totalItems <= particlesToShow ? 1 : 1 + (totalItems - particlesToShow);
    }
  });

  const handleNextClick = (carousel: Carousel) => {
    carousel.goToNext();
  };

  const handlePrevClick = (carousel: Carousel) => {
    carousel.goToPrev();
  };

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
        particlesToShow = itemsShowMobile;
      }
    } else {
      particlesToShow = itemsShowDesktop;
    }
  };

</script>

<svelte:window on:resize={onResize} />

<svelte:component
  this={Carousel}
  bind:this={carouselObject}
  {autoplay}
  {autoplayDuration}
  {duration}
  {infinite}
  bind:particlesToShow
  bind:initialPageIndex
  let:showPrevPage
  let:showNextPage
  swiping={false}
  on:pageChange={
    event => currentPageIndex = event.detail
  }
>
  <aside class={`arrow-${chevronPosition} ${totalPage > 0 && currentPageIndex === 0  ? "disabled" : ""} left`} slot="prev">
    <IconButton
      class={`material-icons`}
      on:click={() => showPrevPage(carouselObject)}
    >
      chevron_left
    </IconButton>
  </aside>
  <aside class={`arrow-${chevronPosition} right ${totalPage > 0 && currentPageIndex+1 === totalPage  ? "disabled" : ""}`} slot="next">
    <IconButton
      class={`material-icons`}
      on:click={() => showNextPage(carouselObject)}
    >
      chevron_right
    </IconButton>
  </aside>
  <slot />
  
  {#if totalItems > 0 && (particlesToShow - totalItems) > 0}
    {#each Array(particlesToShow - totalItems) as _, i}
      <div></div>
    {/each}
  {/if}
</svelte:component>

<style lang="scss">
  @use '../../theme/mixins';
  aside{
    &.disabled{
      :global(.mdc-icon-button){
        color: #9A9A9A;
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
  :global(.sc-carousel-dots__dot-container){
    
  }
  :global(.sc-carousel-dot__dot_active) {
    --sc-active-dot-size: 11px;
    background-color: #fff !important;
  }
</style>
