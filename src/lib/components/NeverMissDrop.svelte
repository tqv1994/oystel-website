<script lang="ts">
  import type { Action } from '$lib/store/action';
  import type { UploadFile } from '$lib/store/upload-file';

  import Button from '@smui/button';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
import FeaturedImage from './FeaturedImage.svelte';
import CarouselImages from './CarouselImages.svelte';

  export let name: string | undefined = undefined;
  export let headline: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let actions: Action[] | undefined = undefined;
  export let gallery: UploadFile[] | undefined = undefined;
  export let background: UploadFile[] | undefined = undefined;
</script>

<LayoutGrid>
  {#if gallery?.length}
    <Cell
      spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
      class="content-left"
    >
      {#if gallery.length > 1}
        <div class="thumbnail dark multi-images-affect">
          <CarouselImages {gallery} styleItem="padding-top: calc(610 / 420 * 100%)" />
          <div class="caption" style="bottom:0">
            <span class="">Channel Resort ‘21</span>
          </div>
        </div>
      {:else}
        <div class="thumbnail dark multi-images-affect">
          <div class="image-cover" style="padding-top: calc(610 / 420 * 100%)">
            <FeaturedImage
              image={(gallery || []).length > 0 ? gallery[0] : undefined}
              size="small"
              style="padding-top: calc(410 / 315 * 100%)"
              alt={name || ''}
            />
          </div>
          <div class="caption">
            <span class="">Channel Resort ‘21</span>
          </div>
        </div>
      {/if}
    </Cell>
  {/if}
  <Cell
    spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
    class="light d-pl-100 d-pr-70 content-right"
  >
    <p class="text-body2 d-mb-100 m-mt-40 m-mb-40">{description}</p>
    <div class="d-pb-35 m-pb-0" />
    <h4 class="mt-0 mb-20">{headline}</h4>
    <h2 class="text-h1 mt-0 d-mb-40 m-mb-15">{name}</h2>
    {#if actions?.length}
      {#each actions as action}
        <Button
          variant="outlined"
          class="hover-affect"
          on:click={() => {
            window.openSignUpModal();
          }}><Label class="text-button2">{action.name}</Label></Button
        >
      {/each}
    {/if}
  </Cell>
</LayoutGrid>
