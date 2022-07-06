<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import type { UploadFile } from '$lib/store/upload-file';

  import Checkbox from '@smui/checkbox';
  export let selected: string[];
  export let value: string;
  export let image: UploadFile;
</script>

<div class="item">
  <div class="thumbnail">
    <div class="image-cover" />
    <BlurImage {...image} />
    <Checkbox bind:group={selected} {value} />
  </div>
</div>

<style lang="scss">
  .item {
    .thumbnail {
      position: relative;
      --mdc-checkbox-unchecked-color: white;
      :global(.mdc-checkbox) {
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
  }
</style>
