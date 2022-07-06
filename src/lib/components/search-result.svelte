<script lang="ts" context="module">
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import type { Identifiable, Nameable, Searchable } from '$lib/store/types';
  import type { SearchResultGroup } from '$lib/store/search';
  import { createEventDispatcher } from 'svelte';
  import Item from '$lib/components/Item.svelte';
  import type { Kind } from '$lib/store/category';
</script>

<script lang="ts">
  let dispathcher = createEventDispatcher();

  export let groups: SearchResultGroup<Searchable>[] = [];
  export let pathPrefix: string;
  export let cities: Kind[] = [];

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

  function makeLinkToType(id?: string): string {
    return id
      ? `${pathPrefix}?t=${id.substring(id.lastIndexOf('-') + 1)}`
      : pathPrefix;
  }
</script>

{#each groups as group, i}
  {#if group.result.hits.length}
    <div class="container search-result-wrapper">
      {#if groups.length > 1 && group.kind}
        <div class="section-title">
          <LayoutGrid class="p-0">
            <Cell span={12}
              ><h2 class="title {i === 0 ? 'mt-0' : ''} d-mb-30">
                {group.kind?.name}
              </h2></Cell
            >
          </LayoutGrid>
        </div>
      {/if}
      <div class="section-content">
        <LayoutGrid class="p-0">
          {#each group.result.hits as d, index}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <Item
                {...d}
                bind:pathPrefix
                bind:item={d}
                on:likeItem={callLikeItem}
                introShow={true}
                {cities}
              />
            </Cell>
          {/each}
          {#if groups.length > 1}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <a href={makeLinkToType(group.kind?.id)}>
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
    overflow: hidden;
    height: 100%;
  }

  .search-result-wrapper {
    margin-bottom: 120px;
    @include mixins.mobile {
      margin-bottom: 56px;
    }
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
