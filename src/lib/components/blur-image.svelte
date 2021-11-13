<script lang="ts">
  import { BlurhashImage } from 'svelte-blurhash/src';

  let className: string = '';
  export { className as class };
  export let url: string;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
  export let blurHash: string = 'LjI5DEWB?bRj_4aytRWBozayRjoL';
</script>

{#if url}
  <BlurhashImage
    class={className}
    fadeDuration={1000}
    src={url}
    {width}
    {height}
    hash={blurHash}
  />
{/if}
