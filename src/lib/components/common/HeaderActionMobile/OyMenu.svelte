<script lang="ts">
  import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
  import Button, { Icon } from '@smui/button';
  import Svg from '@smui/common/Svg.svelte';
  import IconButton from '@smui/icon-button';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { Menu } from '$lib/types';
  import { menus } from '$lib/const';
import { routerHelper } from '$lib/helpers/router';

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
              (menu.submenu.length > 0) ? doOpenSubmenu(menu) : openLink(menu);
            }}
            >{menu.name}
            {#if menu.submenu.length > 0}<i class="material-icons">chevron_right</i
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
<div class="follow-wrap">
  <h5>Follow Oysteo</h5>
  <Button>
    <Icon component={Svg} viewBox="0 0 24 24">
      <path
        id="Path_297"
        data-name="Path 297"
        d="M16.85,0H7.15A7.158,7.158,0,0,0,0,7.15v9.7A7.158,7.158,0,0,0,7.15,24h9.7A7.158,7.158,0,0,0,24,16.85V7.15A7.158,7.158,0,0,0,16.85,0Zm4.735,16.85a4.735,4.735,0,0,1-4.735,4.735H7.15A4.735,4.735,0,0,1,2.414,16.85V7.15A4.735,4.735,0,0,1,7.15,2.414h9.7A4.735,4.735,0,0,1,21.586,7.15v9.7Z"
      />
      <path
        id="Path_298"
        data-name="Path 298"
        d="M137.662,133a4.662,4.662,0,1,0,4.662,4.662A4.667,4.667,0,0,0,137.662,133Zm0,7.51a2.849,2.849,0,1,1,2.849-2.849A2.849,2.849,0,0,1,137.662,140.51Z"
        transform="translate(-125.662 -125.662)"
      />
      <ellipse
        id="Ellipse_25"
        data-name="Ellipse 25"
        cx="1.242"
        cy="1.242"
        rx="1.242"
        ry="1.242"
        transform="translate(17.123 4.454)"
      />
    </Icon>
  </Button>
  <Button>
    <Icon component={Svg} viewBox="0 0 24 23.854">
      <path
        id="Icon_-_Facebook"
        data-name="Icon - Facebook"
        d="M-938-441a12,12,0,0,0-12,12,12,12,0,0,0,10.125,11.854v-8.385h-3.047V-429h3.047v-2.644c0-3.008,1.792-4.669,4.533-4.669a18.454,18.454,0,0,1,2.686.234v2.953h-1.513a1.734,1.734,0,0,0-1.956,1.874V-429h3.328l-.532,3.469h-2.8v8.385A12,12,0,0,0-926-429,12,12,0,0,0-938-441Z"
        transform="translate(950 441)"
      />
    </Icon>
  </Button>
  <Button>
    <Icon component={Svg} viewBox="0 0 24 19.501">
      <path
        id="The_bigger_question"
        data-name="The bigger question"
        d="M22.552,6.355c.014.211.014.423.014.637A13.915,13.915,0,0,1,8.557,21v0A13.94,13.94,0,0,1,1.009,18.79a10.018,10.018,0,0,0,1.172.071A9.88,9.88,0,0,0,8.3,16.749a4.93,4.93,0,0,1-4.6-3.42,4.915,4.915,0,0,0,2.223-.084,4.926,4.926,0,0,1-3.95-4.827V8.355A4.887,4.887,0,0,0,4.2,8.972,4.928,4.928,0,0,1,2.679,2.4,13.98,13.98,0,0,0,12.828,7.543a4.929,4.929,0,0,1,8.391-4.491,9.869,9.869,0,0,0,3.127-1.2,4.941,4.941,0,0,1-2.165,2.724,9.827,9.827,0,0,0,2.828-.775A10.019,10.019,0,0,1,22.552,6.355Z"
        transform="translate(-1.009 -1.5)"
      />
    </Icon>
  </Button>
</div>

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

  .follow-wrap {
    position: absolute;
    bottom: 45px;
  }
  .follow-wrap :global(.mdc-button) {
    min-width: auto;
  }
</style>
