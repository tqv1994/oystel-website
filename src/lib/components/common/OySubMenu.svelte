<script lang="ts">
  import Button from '@smui/button';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Tab from '@smui/tab';
  import { Label } from '@smui/common';
  import TabBar from '@smui/tab-bar';
  import { afterUpdate, onDestroy } from 'svelte';
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
    active = null;
    if (tabs) {
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
      if (tabs) {
        const indexTabLast = tabs.findIndex(
          (item) => typeof item.is_last == 'boolean',
        );
        if (indexTabLast < 0) {
          tabs.push({ title: 'View All', is_last: true });
        }
      }
      document.documentElement.style.overflow = 'hidden';
      if (menuId) {
        let menuActive = document.querySelector(
          'header #main-menu li#' + menuId,
        );
        if (typeof menuActive != 'undefined' && menuActive != null) {
          menuActive.classList.add('active');
        }
      }
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  });

  onDestroy(() => {
    active = null;
    document.documentElement.style.overflow = 'auto';
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
      <Cell spanDevices={{ desktop: 3, phone: 12 }} class="p-40 pt-50">
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
              on:mouseenter={() => {
                active = null;
              }}
            >
              <span class="mdc-tab__content">
                <span class="mdc-tab__text-label">View All</span>
              </span>
            </button>
          {/if}
          {#if typeof tab.is_last == 'undefined'}
            <Tab
              on:mouseenter={() => {
                active = tab;
              }}
              {tab}
              class="mb-10"
            >
              <Label>{tab.name}</Label>
            </Tab>
          {/if}
        </TabBar>
      </Cell>
      <Cell
        spanDevices={{ desktop: 4, mobile: 12 }}
        class="tab-content light pl-50 pr-50"
      >
        {#if active && active.name}
          <div class="">
            <div class="post-type mb-15 text-eyebrow">Most Popular</div>
            <h3 class="mb-40">{active.catalog}</h3>
            <Button
              type="button"
              variant="outlined"
              class="hover-affect"
              on:click={goto(active.link)}
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
<div class="backdrop" on:mouseenter={handleCloseSubMenu} />

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
      top: 115px;
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
    :global(.mdc-button) {
      height: 40px;
    }
    :global(.hover-affect:hover) {
      background: #000;
    }
  }
  .sub-menu :global(.tab-content) {
    background-color: #f0f7f8;
    position: relative;
    > :global(div) {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
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
      padding-bottom: 0;
    }
  }
</style>
