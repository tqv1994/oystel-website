<script lang="ts">
  import IconButton from '@smui/icon-button/IconButton.svelte';

  import { onMount } from 'svelte';

  export let autoplayDuration = 8000;
  export let duration = 1500;
  export let infinite = true;
  export let particlesToShow = 1;
  export let chevronPosition = 'inside';

  let Carousel: Carousel; // for saving Carousel component class
  let carouselObject: Carousel;
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  const handleNextClick = (carousel: Carousel) => {
    carousel.goToNext();
  };

  const handlePrevClick = (carousel: Carousel) => {
    carousel.goToPrev();
  };
</script>

<svelte:component
  this={Carousel}
  bind:this={carouselObject}
  autoplay
  {autoplayDuration}
  {duration}
  {infinite}
  {particlesToShow}
  let:showPrevPage
  let:showNextPage
>
  <aside class="arrow-{chevronPosition} left " slot="prev">
    <IconButton
      class="material-icons"
      on:click={() => showPrevPage(carouselObject)}
    >
      chevron_left
    </IconButton>
  </aside>
  <aside class="arrow-{chevronPosition} right " slot="next">
    <IconButton
      class="material-icons"
      on:click={() => showNextPage(carouselObject)}
    >
      chevron_right
    </IconButton>
  </aside>
  <slot />
</svelte:component>

<style lang="scss">
  @use '../../theme/mixins';
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
    top: -65px;
    left: auto;
    transform: translateX(0);
    &.left {
      right: 100px;
    }
    &.right {
      right: 0px;
    }
  }
</style>
