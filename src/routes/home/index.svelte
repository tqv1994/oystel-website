<script lang="ts" context="module">
  import { onMount } from 'svelte';
  import type Carousel from 'svelte-carousel';
  import type { Load } from '@sveltejs/kit';
  import { Identifiable, Likeable } from '$lib/store/types';
  import { Locals } from '$lib/store/locals';
  import BlurImage from '$lib/components/blur-image.svelte';
  import IconButton from '@smui/icon-button';

  function addLikes(
    likes: (Identifiable & Likeable)[] | undefined,
    likeables: Identifiable[] | undefined,
  ) {
    if (!likes?.length || !likeables?.length) {
      return;
    }
    for (var i = 0; i < likes.length; i++) {
      for (var ii = 0; ii < likeables.length; ii++) {
        if (likes[i].id === likeables[ii].id) {
          likes[i].liked = true;
        }
      }
    }
  }

  export const load: Load<{ session: Locals }> = async ({ fetch }) => {
    const res = await fetch('home.json');
    if (res.ok) {
      const data: Page = await res.json();
      return {
        props: {
          data,
        },
      };
    }
    const error = await res.json();
    console.error(error);
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import OySearch from '$lib/components/common/OySearch.svelte';
  import { Page } from '$lib/store/page';
  import { HomePageData } from './index.json';

  export let data: HomePageData;
  console.log(data);

  let Carousel: Carousel; // for saving Carousel component class
  let carousel: Carousel; // for calling methods of the carousel instance
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
  });

  const handleNextClick = () => {
    carousel.goToNext();
  };

  const handlePrevClick = () => {
    carousel.goToPrev();
  };
</script>

<div class="hero">
  <svelte:component
    this={Carousel}
    bind:this={carousel}
    autoplay
    autoplayDuration={8000}
    duration={1500}
    let:showPrevPage
    let:showNextPage
  >
    <aside class="arrow left" slot="prev">
      <IconButton class="material-icons" on:click={() => showPrevPage()}>
        chevron_left
      </IconButton>
    </aside>
    <aside class="arrow right" slot="next">
      <IconButton class="material-icons" on:click={() => showNextPage()}>
        chevron_right
      </IconButton>
    </aside>
    <section slot="dots">
      <h1>Explore the World in Style</h1>
      <OySearch searchResult="" />
    </section>
    {#each data.gallery as item}
      <div class="slide">
        <BlurImage {...item} />
      </div>
    {/each}
  </svelte:component>
</div>

{#each data.page.sections as section}
  {#if section.__typename === 'ComponentGalleriesDropGallery'}
    <!-- <DropGallery {...section} /> -->
    <h3>{section.name}</h3>
    <p>{section.__typename} goes here</p>
  {:else if section.__typename === 'ComponentGalleriesDestinationGallery'}
    <h3>{section.name}</h3>
    <p>{section.__typename} goes here</p>
  {:else if section.__typename === 'ComponentGalleriesExperienceGallery'}
    <h3>{section.name}</h3>
    <p>{section.__typename} goes here</p>
  {:else if section.__typename === 'ComponentBannersBanner'}
    <h3>{section.name}</h3>
    <p>{section.__typename} goes here</p>
  {/if}
{/each}

<style lang="scss">
  @use '@material/icon-button';
  @use '../../theme/colors';
  .slide {
    width: 100%;
    height: 100vh;
  }
  .arrow {
    position: absolute;
    top: 50%;
    z-index: 1;
    &.right {
      right: 0;
    }
  }
  .dots {
    position: absolute;
    top: 50%;
    left: 10%;
  }
  :global(.arrow .mdc-icon-button) {
    @include icon-button.ink-color(colors.$white);
    transform: scale(3);
  }
</style>
