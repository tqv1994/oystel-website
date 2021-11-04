<script lang="ts">
  import { UploadFile } from '$lib/store/upload-file';
  import { BlurhashImage } from 'svelte-blurhash';

  let className: string = '';
  export { className as class };
  export let data: UploadFile;
</script>

{#if data}
  <BlurhashImage
    class={className}
    fadeDuration={1000}
    src={data.url}
    width={data.width || 100}
    height={data.height || 100}
    hash={data.blurHash}
  />
{/if}
