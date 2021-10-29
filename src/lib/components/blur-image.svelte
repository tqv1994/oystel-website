<script lang="ts">
  import { FileUpload } from '$lib/api/file-upload/type';
  import { stringHelper } from '$lib/helpers';

  import { BlurhashImage } from 'svelte-blurhash';

  export let data: FileUpload;
  export let is_static: boolean = false;
</script>

<BlurhashImage
  fadeDuration="1000"
  src={(data && typeof data.url != "undefined" && data.url) ? stringHelper.getFullUrlImage(data.url,is_static) : ""}
  width={(data && data.width) || 100}
  height={(data && data.height) || 100}
  hash={(data && data.blurHash) || null}
/>
