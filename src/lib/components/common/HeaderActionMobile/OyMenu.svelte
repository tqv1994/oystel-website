<script lang="ts">
  import Button from '@smui/button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import { createEventDispatcher } from 'svelte';
  import { menus } from '$lib/const';
  import { routerHelper } from '$lib/helpers/router';
import Follow from '../Follow.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive: Menu;
  function doOpenSubmenu(menu: Menu) {
    menuActive = menu;
  }
  function openLink(menu: any) {
    routerHelper.redirect(menu.link);
    dispatch('close');
  }
</script>

<div id="menu-wrap" class="mt-20">
  {#if !menuActive && menus}
    <ul>
      {#each menus as menu}
        <li>
          <a
            href="javascript:void(0)"
            on:click={() => {
              menu.submenu.length > 0 ? doOpenSubmenu(menu) : openLink(menu);
            }}
            >{menu.name}
            {#if menu.submenu.length > 0}<i class="material-icons"
                >chevron_right</i
              >{/if}</a
          >
        </li>
      {/each}
    </ul>
  {/if}
  {#if menuActive}
    <ul>
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
        {#if menuActive.submenu.length > 0}
          {#each menuActive.submenu as menu}
            <li>
              <a
                href="javascript:void(0)"
                on:click={() => {
                  openLink(menu);
                }}>{menu.name}</a
              >
            </li>
          {/each}
        {/if}
        <li>
          <a
            href="javascript:void(0)"
            on:click={() => {
              openLink(menuActive);
            }}>All {menuActive.name}</a
          >
        </li>
      </ul>
    </ul>
  {/if}
</div>
<Follow/>
<style>
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
</style>
