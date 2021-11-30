<script lang="ts">
  import { decode } from 'blurhash';
  import { onMount } from 'svelte';

  export let hash: string;
  export let resolutionX = 16;
  export let resolutionY = 16;
  export let punch = 1;

  let canvas: HTMLCanvasElement;

  onMount(() => {
    if (hash && canvas) {
      const pixels = decode(hash, resolutionX, resolutionY, punch);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const imageData = ctx.createImageData(resolutionX, resolutionY);
        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  });
</script>

<canvas
  bind:this={canvas}
  width={resolutionX}
  height={resolutionY}
  style="width: 100%; height: 100%;"
/>
