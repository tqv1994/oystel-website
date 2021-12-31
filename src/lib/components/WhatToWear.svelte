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
  export let background: UploadFile[] | undefined = undefined;
</script>

<div
  class="what-to-wear-content d-pb-85 d-pt-85 d-pl-150 d-pr-160 d-block m-none"
>
  <h5>{description}</h5>
  <h1>{name}</h1>
  {#if actions?.length}
    {#each actions as action}
      <Button variant="outlined" class="hover-affect" href={action.url}
        ><Label class="text-button2">{action.name}</Label></Button
      >
    {/each}
  {/if}
</div>
<div class="d-none m-block container m-mr-0 m-ml-0">
  <div class="image-cover" style="padding-top: calc(375 / 319 * 100%)">
    <BlurImage {...gallery[0]} />
  </div>
  <div class="what-to-wear-content pb-50 pt-55 m-ml-25 m-mr-25">
    <h5>{description}</h5>
    <h1>{name}</h1>
    {#if actions?.length}
      {#each actions as action}
        <Button variant="outlined" class="hover-affect" href={action.url}
          ><Label class="text-button2">{action.name}</Label></Button
        >
      {/each}
    {/if}
  </div>
</div>
