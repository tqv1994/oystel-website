<script lang="ts">
  import type { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import BlurImage from './blur-image.svelte';
import FeaturedImage from './FeaturedImage.svelte';

  export let item: Drop;
  export let heightThumbnail = '';
  export let classItem = '';
</script>

<div class={`${classItem}`}>
  <div class="thumbnail d-mb-20 m-mb-20">
    <FeaturedImage image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined} size="small" style={`padding-top: ${heightThumbnail}`} alt={item?.name || ''}/>
  </div>
  <p class="mt-0 d-mb-15 text-eyebrow m-mb-15">Fashion</p>
  <h4 class="mt-0 d-mb-15 m-mb-10 title">
    {item.name}
  </h4>
  <p class="mt-0 d-mb-0 m-none">
    {(item.description || '').substr(0, 80)}...
  </p>
</div>
