<script lang="ts">
  import type { UploadFile } from '$lib/store/upload-file';
  import FeaturedImage from './FeaturedImage.svelte';
  export let avatar: UploadFile | undefined;
  export let style: string = '';
  export let alt: string = '';
</script>

<FeaturedImage size="small" image={avatar} {style} {alt} />
