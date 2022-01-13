<script lang="ts">
  import IconButton from '@smui/icon-button';
  import BlurImage from '$lib/components/blur-image.svelte';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import { UploadFile } from '$lib/store/upload-file';

  export let image1: UploadFile;
  export let image2: UploadFile;
  export let image3: UploadFile;
</script>

<div class="root">
  <div class="img1">
    <BlurImage {...image1} />
  </div>
  <div class="img2">
    <BlurImage {...image2} />
  </div>
  <div class="img3">
    <BlurImage {...image3} />
  </div>
  <div class="main">
    <OysteoLogo />
    <div class="content">
      <div>
        <slot />
      </div>
    </div>
  </div>
  <IconButton class="btn-close material-icons" href="/">close</IconButton>
</div>

<style type="text/scss">
  * :global(.btn-close) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .root {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .img1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .img2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .img3 {
    grid-area: 2 / 1 / 3 / 3;
    height: calc(50vh - 0.5em);
  }
  .main {
    grid-area: 1 / 3 / 3 / 4;
    align-self: center;
    padding: 2em 3em;
  }

  @media (min-width: 768px) {
    .content {
      max-width: 28em;
    }
  }
  @media (max-width: 768px) {
    .root {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    .img1 {
      grid-area: 2 / 1;
    }
    .img2 {
      grid-area: 2 / 2;
    }
    .img3 {
      grid-column: 1 / 3;
      grid-row: 3;
    }
    .main {
      grid-column: 1 / 3;
      grid-row: 1;
    }
  }
</style>
