<script lang="ts">
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
import Button from '@smui/button';

  import Tab, { Label } from '@smui/tab';

  import TabBar from '@smui/tab-bar';

  let tabs = [
    {
      k: 1,
      label: 'New Arrivals',
      items: [
        {
          id: '1',
          name: 'Designer Name',
        },
        {
          id: '2',
          name: 'Designer Name',
        },
        {
          id: '3',
          name: 'Designer Name',
        },
        {
          id: '4',
          name: 'Designer Name',
        },
        {
          id: '5',
          name: 'Designer Name',
        },
        {
          id: '6',
          name: 'Designer Name',
        },
        {
          id: '7',
          name: 'Designer Name',
        },
        {
          id: '8',
          name: 'Designer Name',
        },
      ],
    },
    {
      k: 2,
      label: 'Designers',
    },
    {
      k: 3,
      label: 'Clothing',
    },
    {
      k: 4,
      label: 'Shoes',
    },
    {
      k: 5,
      label: 'Bags',
    },
    {
      k: 6,
      label: 'Accessories',
    },
    {
      k: 7,
      label: 'Vacation Shop',
    },
  ];
  let tabFilters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'Y',
    'Z',
  ];
  let active: {
    k: number;
    label: string;
    items?: { id: string; name: string }[];
  } = { k: 0, label: '' };
  let activeFilter: string = tabFilters[0];
</script>

<div class="shop-navigation">
  <div class="shop-navigation__menus">
    <TabBar {tabs} let:tab key={(tab) => tab.k} bind:active>
      <Tab
        {tab}
        stacked={true}
        indicatorSpanOnlyContent={true}
        tabIndicator$transition="fade"
      >
        <Label>{tab.label}</Label>
      </Tab>
    </TabBar>
  </div>
  <div class={`shop-navigation__content ${active?.label ? 'active' : ''}`}>
    <div class="shop-navigation__content_header">
      <h3>{active?.label}</h3>
      <div class="filters-wrap">
        {#each tabFilters as tabFilter}
          <Button on:click={() => (activeFilter = tabFilter)}
            ><Label class="text-body">{tabFilter}</Label></Button
          >
        {/each}
      </div>
    </div>
    <div class="shop-navigation__content_sub_menus">
      <h3>{activeFilter}</h3>
      <div class="row">
        {#if active.items}
          {#each active.items as item}
            <div class="menu-item col d-col-3">
              <a href="#"><span class="material-icons mr-5">favorite_border</span> {item.name}</a>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../theme/colors';
  @use '../../style/include/grid';
  .shop-navigation {
    margin-top: 87px;
    position: relative;
    .shop-navigation__menus {
      background-color: #f2f2f2;
      padding-left: 100px;
      padding-right: 100px;
    }
    .shop-navigation__content {
      display: none;
      &.active {
        display: block;
      }
      z-index: 1;
      padding-top: 30px;
      padding-bottom: 50px;
      padding-left: 100px;
      padding-right: 100px;
      position: absolute;
      background-color: #{colors.$white};
      width: 100%;
      .shop-navigation__content_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #{colors.$black};
        padding: 0 50px;
        .filters-wrap {
          justify-self: flex-end;
        }
      }
      .filters-wrap :global(.mdc-button) {
        min-width: auto;
        padding: 0 10px;
      }
      .menu-item a{
        display: flex;
        justify-content: center;
        &:hover{
          span{
            text-decoration: none;
          }
          text-decoration: underline;
        }
      }
    }
  }
</style>
