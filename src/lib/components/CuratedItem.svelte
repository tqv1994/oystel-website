<script lang="ts">
  import { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import BlurImage from './blur-image.svelte';

  export let item: Drop;
  export let heightThumbnail: string = '';
  export let classItem: string = '';
</script>

<a href={makeLink('drop', item)}>
  <div class={`${classItem}`}>
    <div class="thumbnail d-mb-20 m-mb-20">
      <div class="image-cover" style={`padding-top: ${heightThumbnail}`}>
        {#if item.gallery && typeof(item.gallery[0]) !== "undefined"}
          <BlurImage {...item.gallery[0]} />
        {:else}
          <BlurImage />
        {/if}
      </div>
    </div>
    <p class="mt-0 d-mb-15 text-eyebrow m-mb-15">Fashion</p>
    <h4 class="mt-0 d-mb-15 m-mb-10 title">
      {item.name}
    </h4>
    <p class="mt-0 d-mb-0 m-none">
      {(item.description || '').substr(0, 80)}...
    </p>
  </div>
</a>
