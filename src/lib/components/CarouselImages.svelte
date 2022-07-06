<script lang="ts">
  import type { UploadFile } from '$lib/store/upload-file';
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  export let easing = 'linear';
  export let autoplay = 8000;
  export let duration = 1500;
  export let draggable = false;
  export let dots = false;
  export let loop = false;
  export let useCustomArrow = false;
  export let useCustomArrowAddChevron = false;
  export let customArrowLeftText: string | undefined = undefined;
  export let customArrowRightText: string | undefined = undefined;
  export let controls = true;
  export let gallery: UploadFile[];
  export let styleItem: string = '';
  let currentIndex: number = 0;
  let loaded: boolean = false;
  let imageUrls: (string | undefined)[] = [];
  function onchange(
    event: CustomEvent<{ currentSlide: number; slideCount: number }>,
  ) {
    currentIndex = event.detail.currentSlide;
  }

  async function handleImage() {
    loaded = false;
    for (const [index, item] of gallery.entries()) {
      if (gallery[index].formats?.medium) {
        try {
          imageUrls.push(await loadImage(gallery[index].formats.medium?.url));
        } catch (err) {
          imageUrls.push(undefined);
        }
      }
    }
    loaded = true;
  }

  onMount(() => {
    handleImage();
  });

  function loadImage(path: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // img.crossOrigin = 'Anonymous'; // to avoid CORS if used with Canvas
      img.src = path;
      img.onload = () => {
        resolve(img.src);
      };
      img.onerror = (e) => {
        reject(undefined);
      };
    });
  }
</script>

{#if (gallery || []).length > 0}
  <Carousel
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
    on:change={onchange}
    on:change
  >
    {#each gallery || [] as item, i}
      <div class="slide">
        <div class="image-cover" style={`${styleItem}`}>
          {#if !loaded || !imageUrls[i]}
            <div transition:fade>
              <BlurImage {...gallery[i]} />
            </div>
          {:else}
            <img
              transition:fade
              src={imageUrls[i]}
              alt={gallery[i].alternativeText ||
                gallery[i].caption ||
                gallery[i].name}
            />
          {/if}
        </div>
      </div>
    {/each}
  </Carousel>
{/if}
