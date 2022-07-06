<script lang="ts">
  import { storeHelper } from '$lib/helpers';
  import type { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';
  import Button from '@smui/button';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import BlurImage from './blur-image.svelte';
  import type { UploadFile } from '$lib/store/upload-file';
import FeaturedImage from './FeaturedImage.svelte';

  export let drop: Drop;
  export let name: string | undefined = undefined;

  let image: UploadFile;
  $: if (drop.gallery?.length) {
    image = drop.gallery[0];
  }
</script>

<LayoutGrid class="pt-0">
  <Cell span={12}><h2 class="mt-0 mb-0">{name}</h2></Cell>
</LayoutGrid>
<LayoutGrid class="pt-0">
  <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-mb-45">
    <div class="item-featured-drop new">
      <div class="thumbnail dark d-mb-45 m-mb-40">
        <FeaturedImage image={image || undefined} style="padding-top: calc(474/420 * 100%)" size="small" />
        <div class="caption">
          <span>x packages left</span>
        </div>
      </div>
      <div class="">
        <p class="mt-0 mb-25 m-mb-15 text-eyebrow">Fashion Drop</p>
        <h4 class="text-h3 mt-0 mb-20 title">
          {drop.name}
        </h4>
        <Button
          type="button"
          href={makeLink('/drops', drop)}
          class="hover-affect-drop"
          variant="outlined"><Label>Plan Your Trip</Label></Button
        >
      </div>
    </div>
  </Cell>
</LayoutGrid>
