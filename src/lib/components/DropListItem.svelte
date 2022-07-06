<script lang="ts">
  import type { Drop } from '$lib/store/drop';
  import { makeLink } from '$lib/utils/link';

  import Button from '@smui/button';
  import { Cell } from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import BlurImage from './blur-image.svelte';
import FeaturedImage from './FeaturedImage.svelte';

  export let item: Drop;
</script>

<Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
  <div class="item-featured-drop">
    <div class="thumbnail dark d-mb-60 m-mb-30">
      <FeaturedImage image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined} size="small" style="padding-top: calc(410/311 * 100%)"/>
      <div class="caption">
        <span>{item.products?.length} Packages left</span>
      </div>
    </div>
    <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">Fashion Drop</p>
    <div class="divider d-pb-30 m-pb-25" />
    <h4 class="text-h3 mt-0 d-mb-25 m-mb-0 title">
      {item.name}
    </h4>
    <Button class="hover-affect-drop" variant="outlined" href="/plan"
      ><Label>Plan Your Trip</Label></Button
    >
  </div>
</Cell>

<style lang="scss" global>
  @use '@material/button';
  .item-featured-drop {
    --mdc-outlined-button-hover-state-layer-color: transparent;
    .mdc-button:not(:disabled) {
      min-width: auto;
      width: 171px;
      max-width: 100%;
      @include button.outline-width(0, 0);
      .mdc-button__label {
        text-transform: uppercase;
      }
      position: relative;
      border-bottom: 0;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        height: 1px;
        background-color: #000;
        transition: all 800ms;
      }
    }
    .mdc-button:not(:disabled).hover-affect-drop:hover {
      background-color: transparent;
      :global(.mdc-button__label) {
        font-weight: bold;
      }
      &::after {
        width: 50%;
      }
    }
  }
</style>
