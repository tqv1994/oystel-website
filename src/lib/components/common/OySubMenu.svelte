<script lang="ts">
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { createEventDispatcher } from 'svelte';
  import Tab, { Icon, Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { afterUpdate } from 'svelte';
  import { documentHelper, routerHelper } from '$lib/helpers';
  import { goto } from '$app/navigation';
  export let open = false;
  export let menuId: string;
  export let tabs: any[];
  export let active: any;
  export let urlViewAll: string;
  if (open == false) {
    reset();
  } else {
    if (tabs) {
      active = tabs[0];
      const indexTabLast = tabs.findIndex(
        (item) => typeof item.is_last == 'boolean',
      );
      if (indexTabLast < 0) {
        tabs.push({ title: 'View All', is_last: true });
      }
    }
  }

  afterUpdate(async () => {
    let liMenus = document.querySelectorAll('header #main-menu li');
    if (typeof liMenus !== 'undefined' && liMenus.length > 0) {
      for (let i = 0; i < liMenus.length; i++) {
        liMenus[i].classList.remove('active');
      }
    }
    if (open == true) {
      if (menuId) {
        let menuActive = document.querySelector(
          'header #main-menu li#' + menuId,
        );
        if (typeof menuActive != 'undefined' && menuActive != null) {
          menuActive.classList.add('active');
        }
      }
    }
  });

  function handleCloseSubMenu() {
    open = false;
    var headerEl = document.getElementById('header');
    if (typeof headerEl != 'undefined' && headerEl != null) {
      if (!headerEl.classList.contains('scrolling')) {
        documentHelper.changeBackgroundHeader();
      }
    }
  }

  function reset() {
    menuId = '';
    active = undefined;
    tabs = [];
    urlViewAll = '';
  }
</script>

<div class="light sub-menu {open == true ? 'open' : ''}">
  {#if tabs && tabs.length > 0}
    <LayoutGrid class="p-0">
      <Cell spanDevices={{ desktop: 3, mobile: 12 }} class="p-40 pt-50">
        <TabBar {tabs} let:tab bind:active>
          <!-- Note: the `tab` property is required! -->
          {#if tab.is_last == true}
            <button
              on:click={() => {
                goto(urlViewAll);
              }}
              class="mb-10 mdc-tab "
              role="tab"
              aria-selected="true"
              tabindex="0"
            >
              <span class="mdc-tab__content">
                <span class="mdc-tab__text-label">View All</span>
              </span>
            </button>
          {/if}
          {#if typeof tab.is_last == 'undefined'}
            <Tab {tab} class="mb-10">
              <Label>{tab.name}</Label>
            </Tab>
          {/if}
        </TabBar>
      </Cell>
      <Cell
        spanDevices={{ desktop: 4, mobile: 12 }}
        class="p-50 pt-120 tab-content light"
      >
        {#if active && active.name}
          <div>
            <div class="post-type mb-15 text-eyebrow">Most Popular</div>
            <h3 class="mb-40">{active.catalog}</h3>
            <Button
              type="button"
              variant="outlined"
              on:click={routerHelper.redirect(active.link)}
            >
              <Label class="text-button2">Explore Now</Label>
            </Button>
          </div>
        {/if}
      </Cell>
      <Cell spanDevices={{ desktop: 5, mobile: 12 }}>
        {#if active && active.image}
          <div class="image" style="background-image: url({active.image})" />
        {/if}
      </Cell>
    </LayoutGrid>
  {/if}
</div>
<div class="backdrop" on:click={handleCloseSubMenu} />

<style lang="scss">
  .sub-menu,
  .backdrop {
    opacity: 0;
    z-index: 99;
    position: absolute;
    top: -1000px;
    background: #fff;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
  }
  .sub-menu {
    --mdc-layout-grid-gutter-desktop: 0;
    &.open {
      top: 117px;
      opacity: 1;
      animation: fadeIn 1s ease;
      & ~ .backdrop {
        background-color: rgba(0, 0, 0, 0.55);
        top: 117px;
        opacity: 1;
        width: 100vw;
        height: 100vh;
        z-index: 0;
      }
    }
    :global(.mdc-tab-bar) {
      :global(.mdc-tab-scroller__scroll-content) {
        display: block;
      }
    }
  }
  .sub-menu :global(.tab-content) {
    background-color: #f0f7f8;
  }
  .mdc-tab {
    padding-left: 0;
    justify-content: left;
  }
  .image {
    position: relative;
    width: 100%;
    padding-bottom: 64.31%;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    @media (max-width: 1631px) {
      height: 100%;
      background-position: bottom;
      padding-bottom: 0;;
    }
  }
</style>
