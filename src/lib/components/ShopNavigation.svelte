<script lang="ts">
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import Button from '@smui/button';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { clickOutside } from '$lib/components/events/clickOutside';
  import { productDesignerStore, productTypeStore } from '$lib/store/product';
  import { get } from 'svelte/store';
  import { Category } from '$lib/store/category';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
import { makeLinkShopCategory, makeLinkShopDesigner } from '$lib/utils/link';
import { goto } from '$app/navigation';
import { routerHelper } from '$lib/helpers';
  const types = get(productTypeStore);
  const designers = get(productDesignerStore);
  let contentHeaderActionMobile: string = '';
  type MenuItem = Category & {
    items?: Category[];
  };
  let tabs: MenuItem[] = [];
  for (let k in types.items) {
    tabs.push(types.items[k]);
  }

  let designerItems: Category[] = [];
  for (let k in designers.items) {
    designerItems.push(designers.items[k]);
  }

  let menuDesigner: MenuItem = {
    id: '999',
    name: 'Designers',
    items: designerItems,
  };

  tabs.splice(1, 0, menuDesigner);

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
  let active: MenuItem = { id: '', name: '' };
  let activeFilter: string = tabFilters[0];

  const getItemsSubMenu = (filter: string): { id: string; name: string }[] => {
    if (filter) {
      if (active.items) {
        return active.items.filter((item) => {
          let firstLetter = item.name.charAt(0);
          if (firstLetter === filter) {
            return item;
          }
        });
      }
    }
    return [];
  };

  const onCloseSubTabActived = () => {
    active = { id: '', name: '' };
    activeFilter = tabFilters[0];
  };
</script>

{#if tabs.length > 0}
  <div class="shop-navigation m-none">
    <div class="shop-navigation__menus">
      <TabBar {tabs} let:tab key={(tab) => tab.id} bind:active>
        <Tab
          {tab}
          stacked={true}
          indicatorSpanOnlyContent={true}
          tabIndicator$transition="fade"
          on:click={()=>{ if(tab.id !== "999") goto(makeLinkShopCategory(tab))}}
        >
          <Label>{tab.name}</Label>
        </Tab>
      </TabBar>
    </div>
    {#if active.items}
      <div
        use:clickOutside
        on:click_outside={() => {
          onCloseSubTabActived();
        }}
        class={`shop-navigation__content ${active?.name ? 'active' : ''}`}
      >
        <div class="shop-navigation__content_header">
          <h3>{active?.name}</h3>
          <div class="filters-wrap">
            {#each tabFilters as tabFilter}
              <Button on:click={() => (activeFilter = tabFilter)}
                ><Label
                  class={`text-body ${
                    activeFilter == tabFilter ? 'active' : ''
                  }`}>{tabFilter}</Label
                ></Button
              >
            {/each}
          </div>
        </div>
        <div class="shop-navigation__content_sub_menus">
          <h3>{activeFilter}</h3>
          <div class="row">
            {#if getItemsSubMenu(activeFilter).length > 0}
              {#each getItemsSubMenu(activeFilter) as item}
                <div class="menu-item col d-col-3">
                  <a href={`#`} on:click={()=>{ routerHelper.redirect(makeLinkShopDesigner(item))}}
                    ><span class="material-icons mr-5">favorite_border</span>
                    {item.name}</a
                  >
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="shop-navigation d-none m-block">
    <Button variant="outlined" on:click={()=>{contentHeaderActionMobile = 'shop-nav';}}><Label>Shop Menu</Label></Button>
  </div>
  <HeaderActionMobile
    bind:content={contentHeaderActionMobile}
/>
{/if}

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../theme/colors';
  @use '../../style/include/grid';
  .shop-navigation {
    // desktop
    margin-top: 87px;
    position: relative;
    .shop-navigation__menus {
      background-color: #f2f2f2;
      padding-left: 100px;
      padding-right: 100px;
      :global(.mdc-tab.mdc-tab) {
        font-family: var(--mdc-typography-navlink-font-family);
        font-size: var(--mdc-typography-navlink-font-size);
        font-weight: var(--mdc-typography-navlink-font-weight);
        line-height: var(--mdc-typography-navlink-line-height);
        letter-spacing: var(--mdc-typography-navlink-letter-spacing);
      }
    }
    .shop-navigation__content {
      // display: none;
      // &.active {
      //   display: block;
      // }
      z-index: 2;
      padding-top: 30px;
      padding-bottom: 50px;
      padding-left: calc(8% - 45px);
      padding-right: calc(8% - 45px);
      position: absolute;
      background-color: #{colors.$white};
      width: 100%;
      .shop-navigation__content_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #{colors.$black};
        padding: 0 calc(8% - 45px);
        .filters-wrap {
          justify-self: flex-end;
        }
      }
      .filters-wrap :global(.mdc-button) {
        min-width: auto;
        padding: 0 10px;
        :global(.active) {
          font-weight: bold;
        }
      }
      .shop-navigation__content_sub_menus {
        padding: 0 calc(8% - 45px);
      }
      .menu-item a {
        display: flex;
        justify-items: center;
        align-items: flex-start;
        &:hover {
          span {
            text-decoration: none;
          }
          text-decoration: underline;
        }
        :global(.mdc-label) {
          font-family: var(--mdc-typography-navlink-font-family);
          font-size: var(--mdc-typography-navlink-font-size);
          font-weight: var(--mdc-typography-navlink-font-weight);
          line-height: var(--mdc-typography-navlink-line-height);
          letter-spacing: var(--mdc-typography-navlink-letter-spacing);
        }
      }
    }
    // mobile
    &.m-block{
      background: #f2f2f2;
      padding: 25px  var(--mdc-layout-grid-margin-phone);
      :global(.mdc-button){
        width: 100%;
        
      }
    }
  }
</style>
