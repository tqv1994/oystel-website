<script lang="ts">
  import { Look } from '$lib/store/look';
import { getSlug, makeLink } from '$lib/utils/link';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import IconButton from '@smui/icon-button/src/IconButton.svelte';

  import BlurImage from './blur-image.svelte';
  export let item: Look;
</script>

<div class="item-product">
  <a href={`/shop/look-${getSlug(item)}`}>
    <div class="thumbnail">
      <div class="image-cover" style="padding-top: calc( 142 / 165 * 100% );">
        {#if item.gallery?.length}
            <BlurImage {...item.gallery[0]} />
          {:else}
            <BlurImage/>
          {/if}
      </div>
    </div>
    <div class="title-wrap">
      <h5>Get the Look</h5>
      <div class="btn-wrap">
        <IconButton>
          <Icon component={Svg} viewBox="0 0 16.583 16.583">
            <g data-name="Group 397" transform="translate(0)">
              <path
                id="Path_310"
                data-name="Path 310"
                d="M9145.428-3682.169v16.583"
                transform="translate(-9137.136 3682.169)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
              <path
                id="Path_311"
                data-name="Path 311"
                d="M0,0V16.583"
                transform="translate(16.583 8.292) rotate(90)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
            </g>
          </Icon>
        </IconButton>
      </div>
    </div>
  </a>
</div>

<style lang="scss">
  .item-product .title-wrap {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .item-product .title-wrap h5 {
    width: 50%;
  }
  .item-product .title-wrap .btn-wrap {
    justify-self: flex-end;
    width: 50%;
    text-align: right;
  }

  .item-product .title-wrap .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
