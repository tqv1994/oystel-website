<script lang="ts">
import BlurImage from '$lib/components/blur-image.svelte';

  import Checkbox from '@smui/checkbox';
  export let selected: string[];
  export let value: string;
  export let image: string;
</script>

<div class="item">
  <div class="thumbnail">
    <div class="image-cover"/>
    <BlurImage url={image} />
    <Checkbox bind:group={selected} {value} />
  </div>
</div>

<style lang="scss">
  .item {
    .thumbnail {
      position: relative;
      --mdc-checkbox-unchecked-color: white;
      --mdc-checkbox-ink-color: #000;
      :global(.mdc-checkbox) {
        position: absolute;
        top: 5px;
        right: 0;
      }
    }
  }
</style>
