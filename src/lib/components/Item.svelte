<script lang="ts">
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Experience } from '$lib/store/experience';
  import { Destination } from '$lib/store/destination';
  import { makeLink } from '$lib/utils/link';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import { Icon } from '@smui/common';
  import Svg from '@smui/common/elements/Svg.svelte';
  import { createEventDispatcher } from 'svelte';
import { Searchable } from '$lib/store/types';
  export let item: Experience | Destination|Searchable;
  export let pathPrefix: string;
  export let key: number|null = null;
  export let group_id: number|string|null = null;
  let dispathcher = createEventDispatcher();
  function callLikeItem() {
    setTimeout(() => {
      if (group_id && key) {
        dispathcher('likeItem', { group_id, key });
      } else {
        dispathcher('likeItem', { item });
      }
    }, 0);
  }
</script>

<div class="experience-item">
  <div class="thumbnail">
    <a href={makeLink(pathPrefix, item)}>
      <div class="image-cover" style="padding-top: calc(410 / 315 * 100%)">
        <BlurImage {...item.gallery[0]} />
      </div>
    </a>
    <IconButton
      class="btn-favorite {item.liked ? 'liked' : ''}"
      on:click={callLikeItem}
    >
      <Icon class="like" component={Svg} viewBox="-4 -4 24 24">
        <path
          d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
          transform="translate(0.001)"
          fill="#fff"
          fill-rule="evenodd"
        />
      </Icon>
      <Icon class="liked" component={Svg} viewBox="-4 -4 24 24">
        <path
          d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
          transform="translate(0)"
          fill="#fff"
          fill-rule="evenodd"
        />
      </Icon>
    </IconButton>
  </div>
  <!-- <a href="{pathPrefix}?c={d.country.id}"></a> -->
  <a href={makeLink(pathPrefix, item)}>
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ desktop: 6, phone: 2 }}
        ><p class="text-eyebrow text-left m-0 d-mt-25 d-mb-25">
          {item.country?.name || ''}
        </p></Cell
      >
    </LayoutGrid>
    <div class="divider" />
    <h4 class="text-h2 title m-mt-30">{item.name}</h4>
    <p class="short-text m-none">
      {(item.description || '').substr(0, 80)}...
    </p>
  </a>
</div>
<style lang="scss">
    .experience-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
  }
  .experience-item .divider::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .experience-item .title {
    height: 50px;
    overflow: hidden;
  }
  .experience-item .thumbnail {
    position: relative;
  }

  .experience-item .divider{
    width: 20%;
  }
</style>