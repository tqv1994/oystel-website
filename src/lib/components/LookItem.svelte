<script lang="ts">
  import type { Look } from '$lib/store/look';
  import { getSlug, makeLink } from '$lib/utils/link';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import IconButton from '@smui/icon-button/src/IconButton.svelte';

  import BlurImage from './blur-image.svelte';
import FeaturedImage from './FeaturedImage.svelte';
  export let item: Look;
  export let isHero = false;
</script>

<div class="item-product">
  <a href={makeLink('/shop/looks', item)}>
    <div class="thumbnail">
      <FeaturedImage image={(item.gallery || []).length > 0 ? item.gallery[0] : undefined} alt={item?.name || ''} style={`padding-top: calc( ${
        isHero ? '568 / 638 * 100%' : '410 / 311 * 100%'
      } );`} size={isHero ? 'medium' : 'small'}/>
    </div>
    <div class="title-wrap">
      <h5 class="get-the-look-h5">Get the Look</h5>
      <div class="btn-wrap get-the-look-button-wrap">
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
  @use '../../theme/mixins';
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
  .get-the-look-h5 {
    letter-spacing: 0.05em;
    margin-top: 16px;
  }

  .get-the-look-button-wrap {
    margin-top: -12px;
    :global(.mdc-icon-button) {
      padding: 0;
      height: 32px;
      width: auto;
    }
  }

  .item-product .title-wrap .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }
</style>
