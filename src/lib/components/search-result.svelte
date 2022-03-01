<script lang="ts" context="module">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { Identifiable, Nameable, Searchable } from '$lib/store/types';
  import { SearchResultGroup } from '$lib/store/search';
  import { createEventDispatcher } from 'svelte';
  import Item from '$lib/components/Item.svelte';
</script>

<script lang="ts">
  let dispathcher = createEventDispatcher();

  export let categories: (Identifiable & Nameable)[];
  export let groups: Record<string, SearchResultGroup<Searchable>>;
  export let pathPrefix: string;
  export let showHeadings: boolean = true;
  function callLikeItem(event: CustomEvent) {
    setTimeout(() => {
      if (event.detail.group_id && event.detail.key) {
        dispathcher('likeItem', {
          group_id: event.detail.group_id,
          key: event.detail.key,
        });
      }
    }, 0);
  }
</script>

{#each categories as cat, i}
  {#if (groups[cat.id]?.items || []).length}
    <div class="container">
      {#if showHeadings}
        <div class="section-title">
          <LayoutGrid class="p-0">
            <Cell span="12"
              ><h2 class="title {i === 0 ? 'mt-0' : ''} d-mb-30">
                {cat.name}
              </h2></Cell
            >
          </LayoutGrid>
        </div>
      {/if}
      <div class="section-content">
        <LayoutGrid class="p-0">
          {#each groups[cat.id].items as d, index}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <Item
                {...d}
                bind:pathPrefix
                bind:item={d}
                group_id={cat.id}
                key={index}
                on:likeItem={callLikeItem}
                introShow={true}
              />
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
  @use '../../theme/mixins';

  /* Section title */
  .section-title .title {
    position: relative;
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

  @include mixins.mobile {
    .section-title .title:after {
      margin-left: 20px;
    }

    .experience-item .title {
      height: auto;
      overflow: auto;
    }
  }
</style>
