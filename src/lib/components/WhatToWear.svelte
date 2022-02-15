<script lang="ts">
  import { Action } from '$lib/store/action';
  import { UploadFile } from '$lib/store/upload-file';

  import Button from '@smui/button';
  import { Label } from '@smui/list';

  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';

  export let name: string | undefined = undefined;
  export let headline: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let actions: Action[] | undefined = undefined;
  export let gallery: UploadFile[] | undefined = undefined;
  export let background: UploadFile[] = [];
</script>

<section
  class="what-to-wear-section dark"
  style={`background-image: url(${background[0]?.url})`}
>
  <div class="what-to-wear-content d-pl-150 d-pr-160">
    <p class="text-eyebrow m-0">{description}</p>
    <h1 class="d-mt-25 d-mb-35 m-mt-20 m-mb-25">{name}</h1>
    {#if actions?.length}
      {#each actions as action}
        <Button variant="outlined" class="hover-affect" href={action.url}
          ><Label class="text-button2">{action.name}</Label></Button
        >
      {/each}
    {/if}
  </div>
</section>

<style lang="scss">
  @use '../../style/include/grid';
  @use '../../style/include/button';
  @use '../../theme/mixins';
  .what-to-wear-section {
    padding-top: 200px;
    padding-bottom: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    @include mixins.mobile{
      padding-top: 180px;
      padding-bottom: 180px;
      padding-left: var(--mdc-layout-grid-margin-phone);
      padding-right: var(--mdc-layout-grid-margin-phone);
    }
    .what-to-wear-content {
      display: inline-block;
    }
  }
</style>
