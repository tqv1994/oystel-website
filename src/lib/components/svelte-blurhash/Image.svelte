<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let src: string;
  export let alt: string;
  export let fadeDuration = 500;
  let thisImage: HTMLImageElement;
</script>

<img
  bind:this={thisImage}
  on:load={(event) => {
    thisImage.style.opacity = '1';
    dispatch('imageLoaded', { fadeDuration });
  }}
  {src}
  {alt}
  loading="lazy"
  decoding="async"
  style="transition: opacity linear{fadeDuration}ms; position: absolute; top: 0; left: 0; opacity: 0; transition: opacity 500ms; object-fit: cover; max-height: 100%; min-height: 100%; max-width: 100%; min-width: 100%;"
/>
