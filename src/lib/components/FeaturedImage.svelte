<script lang="ts">
    import type { UploadFile } from '$lib/store/upload-file';
    import BlurImage from './blur-image.svelte';
    export let image: UploadFile | undefined;
    export let style: string = '';
    export let alt: string = '';
    export let size: 'medium' | 'small' | 'original' = 'original';
    let classNames: string | "" = "";
    export { classNames as class };
  </script>
  
  <div class={`image-cover ${classNames}`} {style}>
    {#if image}
      {#if size === 'small' && image.formats?.small}
        <BlurImage {...image} url={image.formats.small.url} />
      {:else if size === 'medium' && image.formats?.medium}
        <BlurImage {...image} url={image.formats.medium.url} />
      {:else}
        <BlurImage {...image} />
      {/if}
    {:else}
      <BlurImage {alt} />
    {/if}
  </div>
  