<script lang="ts" context="module">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { makeLink } from '$lib/utils/link';
  import { Identifiable, Nameable, Searchable } from '$lib/store/types';
  import { SearchResultGroup } from '$lib/store/search';
import { createEventDispatcher } from 'svelte';
import { Product } from '$lib/store/product';
import { Destination } from '$lib/store/destination';
import { Experience } from '$lib/store/experience';

</script>

<script lang="ts">
  let dispathcher = createEventDispatcher();

  export let categories: (Identifiable & Nameable)[];
  export let groups: Rec<SearchResultGroup<Searchable>>;
  export let pathPrefix: string;
  export let showHeadings: boolean = true;
  function callLikeItem(group_id: string,key: number) {
    setTimeout(()=>{
      dispathcher('likeItem',{group_id, key});
    },0);
    
  }
</script>

{#each categories as cat, i}
  {#if (groups[cat.id]?.items || []).length}
    <div class="container">
      {#if showHeadings}
        <div class="section-title">
          <LayoutGrid class="p-0">
            <Cell span="12"
              ><h2 class="text-h1 title {i === 0 ? 'mt-0' : ''} d-mb-30">
                {cat.name}
              </h2></Cell
            >
          </LayoutGrid>
        </div>
      {/if}
      <div class="section-content">
        <LayoutGrid class="p-0">
          {#each groups[cat.id].items as d,index}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <div class="experience-item">
                <div class="thumbnail">
                  <a href={makeLink(pathPrefix, d)}>
                    <div
                      class="image-cover"
                      style="padding-top: calc(410 / 315 * 100%)"
                    >
                      <BlurImage data={d.gallery && d.gallery[0]} />
                    </div>
                  </a>
                  <IconButton class="btn-favorite {d.liked ? 'liked' : ''}" on:click={()=>{callLikeItem(cat.id,index)}}>
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
                <a href={makeLink(pathPrefix, d)}>
                  <LayoutGrid class="p-0 d-block m-none">
                    <Cell spanDevices={{ desktop: 6, phone: 2 }}
                      ><p class="text-eyebrow text-left">
                        {d.country?.name || ''}
                      </p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2 }}
                      ><p class="text-eyebrow text-right">
                        {d.type?.name || ''}
                      </p></Cell
                    >
                  </LayoutGrid>
                  <LayoutGrid class="p-0 m-block d-none">
                    <Cell spanDevices={{ desktop: 6, phone: 2 }}
                      ><p class="text-eyebrow text-left mt-20 mb-20">
                        {d.type?.name || ''}
                      </p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title m-mt-30">{d.name}</h4>
                  <p class="short-text m-none">
                    {d.description.substr(0, 80)}...
                  </p>
                </a>
              </div>
            </Cell>
          {/each}
          {#if groups[cat.id].hasMore}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <a href="{pathPrefix}?t={cat.id}">
                <div
                  class="experience-read-more item-read-more"
                  style="padding-top: calc(410 / 315 * 100%)"
                >
                  <p class="text-h3 label">
                    See more <i class="material-icons">chevron_right</i>
                  </p>
                </div>
              </a>
            </Cell>
          {/if}
        </LayoutGrid>
      </div>
    </div>
  {/if}
{/each}

<style lang="scss">
  $desktop-width: 950px;
  @mixin mobile {
    @media (max-width: #{$desktop-width - 1px}) {
      @content;
    }
  }

  /* Section title */
  .section-title .title {
    position: relative;
    overflow: hidden;
  }
  .section-title .title:after {
    content: '';
    display: inline-block;
    border-top: 1px solid;
    border-color: #000;
    vertical-align: middle;
    width: 100%;
    margin-right: -100%;
    margin-left: 40px;
  }

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

  .item-read-more {
    background-color: #f0f7f8;
    position: relative;
  }
  .item-read-more .label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    margin: 0;
  }
  .item-read-more .label .material-icons {
    position: relative;
    top: 5px;
  }

  @include mobile {
    .section-title .title:after {
      margin-left: 20px;
    }

    .experience-item .title {
      height: auto;
      overflow: auto;
    }
  }
</style>
