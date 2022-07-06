<script lang="ts">
  import type { HeroGalleryData } from '$lib/store/page';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  import OySearch from './common/OySearch.svelte';

  export let section: HeroGalleryData;
</script>

<section id="slider" class="full-width hero pt-0 pb-0">
  <Carousel
    easing="cubic-bezier(0.45, 0, 0.55, 1)"
    perPage={1}
    autoplay={8000}
    duration={1500}
    draggable={false}
    dots={false}
    loop={true}
  >
    {#if section.gallery.length > 0}
      {#each section.gallery || [] as item}
        <div class="slide">
          <div class="image-cover" style="padding-top: 100vh;">
            <img
              src={item.url}
              alt={item.alternativeText || item.caption || item.name}
            />
          </div>
        </div>
      {/each}
    {:else}
      <div class="slide">
        <div class="image-cover" style="padding-top: 100vh;">
          <BlurImage alt={section?.name || ''} />
        </div>
      </div>
    {/if}
  </Carousel>
  <div class="dark text-box">
    <h1>{section.name}</h1>
    <OySearch searchResult="" />
  </div>
</section>
