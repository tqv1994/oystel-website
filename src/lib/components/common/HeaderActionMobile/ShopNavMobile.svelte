<script lang="ts">
  import Button from '@smui/button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { createEventDispatcher } from 'svelte';
  import { menus } from '$lib/const';
  import { routerHelper } from '$lib/helpers/router';
  import { Category } from '$lib/store/category';
  import { get } from 'svelte/store';
  import { productDesignerStore, productTypeStore } from '$lib/store/product';
import Follow from '../Follow.svelte';
import { makeLinkShopCategory, makeLinkShopDesigner } from '$lib/utils/link';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  type MenuItem = Category & {
    items?: Category[];
  };
  let menuActive: MenuItem | undefined = undefined;
  let menus: MenuItem[] = [];
  const productTypes = get(productTypeStore);
  for (let k in productTypes.items) {
    menus.push(productTypes.items[k]);
  }
  const productDesigners = get(productDesignerStore);
  let designers: Category[] = [];
  for (let k in productDesigners.items) {
    designers.push(productDesigners.items[k]);
  }
  menus.splice(1, 0, { id: '999', name: 'Designers', items: designers });
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

  function doOpenSubmenu(menu: MenuItem) {
    menuActive = menu;
  }
  function openLinkCategory(menu: Category) {
    routerHelper.redirect(makeLinkShopCategory(menu));
    dispatch('close');
  }

  function openLinkDesginer(menu: Category){
    routerHelper.redirect(makeLinkShopDesigner(menu));
    dispatch('close');
  }

  let activeFilter: string = tabFilters[0];

  const getItemsSubMenu = (filter: string): { id: string; name: string }[] => {
    if (filter) {
      if (menuActive?.items) {
        return menuActive.items.filter((item) => {
          let firstLetter = item.name.charAt(0);
          if (firstLetter === filter) {
            return item;
          }
        });
      }
    }
    return [];
  };
</script>

<div id="menu-wrap" class="mt-20">
  {#if !menuActive && menus}
    <ul>
      {#each menus as menu}
        <li>
          <a
            href="javascript:void(0)"
            on:click={() => {
              menu.items && menu.items.length > 0
                ? doOpenSubmenu(menu)
                : openLinkCategory(menu);
            }}
            >{menu.name}
            {#if menu.items && menu.items.length > 0}<i class="material-icons"
                >chevron_right</i
              >{/if}</a
          >
        </li>
      {/each}
    </ul>
  {/if}
  {#if menuActive}
  <div class="submenu-wrap">
    <ul >
        <li>
          <a
            href="javascript:void(0)"
            class="back"
            on:click={() => {
              menuActive = undefined;
            }}><i class="material-icons">chevron_left</i> Back</a
          >
        </li>
        <li><a>{menuActive.name}</a></li>
        <ul>
          {#if menuActive.items && menuActive.items.length > 0}
            {#each getItemsSubMenu(activeFilter) as menu}
              <li>
                <a
                  href="javascript:void(0)"
                  on:click={() => {
                    openLinkDesginer(menu);
                  }}>{menu.name}</a
                >
              </li>
            {/each}
          {/if}
          <!-- <li>
            <a
              href="javascript:void(0)"
              on:click={() => {
                openLink(menuActive);
              }}>All {menuActive.name}</a
            >
          </li> -->
        </ul>
      </ul>
      <div class="filter-wrap">
          <ul>
              {#each tabFilters as item}
                <li><a href="javascript:void(0)" on:click={()=>{activeFilter = item;}}>{item}</a></li>
              {/each}
          </ul>
      </div>
  </div>
  {/if}
</div>
<Follow/>

<style lang="scss">
  :global(#header-action-mobile#header-action-mobile) {
    background-color: #f0f7f8;
  }
  #menu-wrap {
    height: calc(100vh / 812 * 460);
    overflow-x: scroll;
  }
  #menu-wrap ul {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }
  #menu-wrap ul ul {
    padding-left: 24px;
  }
  #menu-wrap ul li {
    margin-bottom: 25px;
  }
  #menu-wrap ul li a {
    position: relative;
  }
  #menu-wrap ul li a i {
    position: absolute;
    right: -30px;
    top: -4px;
  }
  #menu-wrap ul li a.back {
    padding-left: 15px;
  }
  #menu-wrap ul li a.back i {
    position: absolute;
    left: -7px;
    top: -4px;
  }
  .submenu-wrap{
      position: relative;
      .filter-wrap{
        position: absolute;
        top: 105px;
        right: 10px;
        left: auto;
        > ul > li{
            margin-bottom: initial !important;
        }
      }
  }
</style>
