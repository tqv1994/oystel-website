<script lang="ts">
  import { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import BlurImage from './blur-image.svelte';

  export let item: Drop;
  export let heightThumbnail: string = '';
  export let classItem: string = '';
</script>

<a href={makeLink('drop', item)}>
  <div class={`${classItem} t-mb-0 m-mb-50`}>
    <div class="thumbnail d-mb-25 t-mb-25 m-mb-20">
      <div class="image-cover" style={`padding-top: ${heightThumbnail}`}>
        {#if item.gallery && typeof(item.gallery[0]) !== "undefined"}
          <BlurImage {...item.gallery[0]} />
        {:else}
          <BlurImage />
        {/if}
      </div>
    </div>
    <p class="mt-0 d-mb-25 text-eyebrow t-mb-25 m-mb-15">Fashion</p>
    <div class="divider d-pb-30 t-pb-30 m-pb-25" />
    <h3 class="mt-0 d-mb-30 t-mb-30 m-mb-25 title">
      {item.name}
    </h3>
    <p class="mt-0 d-mb-0 m-none">
      {(item.description || '').substr(0, 80)}...
    </p>
  </div>
</a>
