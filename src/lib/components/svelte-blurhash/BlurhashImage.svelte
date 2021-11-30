<script lang="ts">
  import VisibilityGuard from './VisibilityGuard.svelte';
  import Blurhash from './Blurhash.svelte';
  import Image from './Image.svelte';
  import { beforeUpdate } from 'svelte';

  export let src = '#';
  export let hash: string;
  export let alt = '';
  export let fadeDuration = 500;

  let isFadeIn = false;
  function onImageLoaded(event: CustomEvent<{ fadeDuration: number }>) {
    setTimeout(onImageFadeIn, event.detail.fadeDuration + 100);
  }
  function onImageFadeIn() {
    isFadeIn = true;
  }
  beforeUpdate(() => {
    isFadeIn = false;
  });
</script>

<VisibilityGuard let:hasBeenVisible>
  {#if hasBeenVisible}
    <div style="position: relative; height: 100%;">
      {#if !isFadeIn && hash}
        <Blurhash {hash} />
      {:else}
        <div
          style="width: 100%;height: 100%; max-width: 100%; max-height: 100%"
        />
      {/if}

      <Image on:imageLoaded={onImageLoaded} {src} {alt} {fadeDuration} />
    </div>
  {/if}
</VisibilityGuard>
