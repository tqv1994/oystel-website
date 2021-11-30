<script lang="ts">
  import { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';

  import Button from '@smui/button/Button.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import Label from '@smui/list/Label.svelte';
  import BlurImage from './blur-image.svelte';

  export let item: Drop;
</script>

<Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
  <a href={makeLink('drop', item)}>
    <div class="item-featured-drop">
      <div class="thumbnail dark d-mb-60 m-mb-30">
        <div class="image-cover" style="padding-top: calc(410/311 * 100%)">
          <BlurImage {...item.gallery[0]} />
        </div>
        <div class="caption">
          <span>{item.products?.length} Packages left</span>
        </div>
      </div>
      <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">Fashion Drop</p>
      <div class="divider d-pb-30 m-pb-25" />
      <h4 class="text-h3 mt-0 d-mb-25 m-mb-0 title">
        {item.name}
      </h4>
      <Button class="hover-affect" variant="outlined" href="/plan"
        ><Label>Plan Your Trip</Label></Button
      >
    </div>
  </a>
</Cell>
