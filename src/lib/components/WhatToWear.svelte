<script lang="ts">
  import type { Action } from '$lib/store/action';
  import type { UploadFile } from '$lib/store/upload-file';

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
  style={background.length
    ? `background-image: url(${background[0]?.url})`
    : ''}
>
  <div class="what-to-wear-content d-pr-160">
    <p class="text-eyebrow m-0">{description}</p>
    <h2 class="d-mt-25 m-mt-20 m-mb-25 text-h1">{name}</h2>
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
    height: 622px;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    background-color: rgba(black, 0.5);
    @include mixins.mobile {
      height: 510px;
      padding-left: var(--mdc-layout-grid-margin-phone);
      padding-right: var(--mdc-layout-grid-margin-phone);
    }
    .what-to-wear-content {
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      display: inline-block;
      padding-left: 11%;
      @media screen and (min-width: 1920px) {
        padding-left: calc((100vw - 1472px) / 2);
      }

      h2 {
        @include mixins.desktop {
          margin-top: 16px !important;
          margin-bottom: 24px;
        }
      }
    }
  }
</style>
