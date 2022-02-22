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
  
  test
  <Follow/>
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
</style>
