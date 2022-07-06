<script lang="ts" context="module">
  export type TopItem = {
    name: string;
    item: Destination | Experience;
  };

  export type NavItem = {
    name: string;
    url: string;
  };

  export type NavChildItem = NavItem & {
    thumbnail: string;
  };

  export type MainNavItem = NavItem & {
    children?: TopItem[] | NavChildItem[];
  };
</script>

<script lang="ts">
  import { Section, type TopAppBarComponentDev } from '@smui/top-app-bar';
  import { AutoAdjust } from '@smui/top-app-bar';
  import TopAppBar from '@smui/top-app-bar';
  import { Row } from '@smui/top-app-bar';
  import { Title } from '@smui/top-app-bar';
  import TabBar from '@smui/tab-bar';
  import Tab from '@smui/tab';
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import { Label } from '@smui/common';
  import { A } from '@smui/common/elements';
  import { H4 } from '@smui/common/elements';
  import Drawer from '@smui/drawer';
  import { Content } from '@smui/drawer';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import UserIcon from '$lib/icons/UserIcon.svelte';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
  import { fly } from 'svelte/transition';
  import { makeLink } from '$lib/utils/link';
  import BlurImage from '../blur-image.svelte';
  import List from '@smui/list';
  import { Item } from '@smui/list';
  import { Graphic } from '@smui/list';
  import { Text } from '@smui/list';
  import { goto } from '$app/navigation';
  import { clickOutside } from '$lib/components/events/clickOutside';
  import { session } from '$app/stores';
  import OySearchModal from '../modals/OySearchModal.svelte';
  import Menu from '@smui/menu';
  import type { MenuComponentDev } from '@smui/menu';
  import Follow from '../common/Follow.svelte';
  import { page } from '$app/stores';
  import type { Destination } from '$lib/store/destination';
  import type { Experience } from '$lib/store/experience';
  import { TYPE } from '$lib/store/search';

  export let menu: MainNavItem[];

  let activeMain: MainNavItem | NavItem | undefined;
  let activeSubItems: TopItem[] | NavItem[] | undefined;
  let activeSubItem: TopItem | NavItem | undefined;
  export let topAppBar: TopAppBarComponentDev;
  export let drawerOpen = false;
  let scrollY = 0;
  let openSearch = false;

  $: for (const item of menu) {
    if ($page.url.pathname.startsWith(item.url)) {
      activeMain = item;
      break;
    }
  }

  // onMount(() => {
  // });

  function adjustNav() {
    if (window.innerWidth < 960) {
      // onMobile = true;
    } else {
      drawerOpen = false;
    }
  }

  let menuUser: MenuComponentDev;

  /*const handleChangeNavLightColor = () => {
    if(activeSubItems && activeSubItems.length > 0){
      navLightColor = false;
    }else if (window.scrollY < 64) {
      if(classNames && (classNames?.indexOf('header-transparent')) >= 0){
        navLightColor = false;
      }else{
        navLightColor = true;
      }
    }else{
      navLightColor = false
    }
  }*/

  /*afterUpdate(()=>{
    handleChangeNavLightColor();
  });*/

  function onResize(event: Event) {
    if (window.innerWidth < 960) {
      activeSubItems = [];
    } else {
      drawerOpen = false;
    }
  }

  function onScroll(event: Event) {
    if (window.innerWidth < 960 && activeMain) {
    } else if (activeSubItems && Math.abs(window.scrollY - scrollY) > 250) {
      activeSubItems = [];
      activeSubItem = undefined;
    }
    adjustNav();
  }

  function onStart(event: CustomEvent) {
    adjustNav();
  }

  function activateNavItem(item: MainNavItem) {
    activeMain = item;
    if (activeMain.children?.length) {
      activeSubItems = activeMain.children;
      activeSubItem = activeMain.children[0];
      scrollY = window.scrollY;
    } else {
      activeMain = undefined;
      activeSubItems = undefined;
      activeSubItem = undefined;
      scrollY = 0;
      // goto(activeMain.url);
    }
  }

  function onTabActivated(event: CustomEvent<{ index: number }>): void {
    activateNavItem(menu[event.detail.index]);
  }

  function onMobileMainNavAction(event: CustomEvent<{ index: number }>): void {
    activeMain = undefined;
    let item = menu[event.detail.index];
    if (item.children) {
      activeMain = item;
      activeSubItems = item.children;
    } else {
      drawerOpen = false;
    }
  }

  function onSubTabActivated(event: CustomEvent<{ index: number }>): void {
    showSubItemAt(event.detail.index);
  }

  function onCloseSubTabActived() {
    activeMain = undefined;
    activeSubItems = [];
    activeSubItem = undefined;
  }

  function showSubItemAt(index: number) {
    if (activeSubItems?.length && activeSubItems.length > index) {
      activeSubItem = activeSubItems[index];
    }
  }

  function onSubTabKeyDown(event: KeyboardEvent) {
    if (event.code === 'ArrowDown') {
      const evt = new KeyboardEvent(event.type, {
        ...event,
        code: 'ArrowRight',
        key: 'ArrowRight',
      });
      event.currentTarget?.dispatchEvent(evt);
    } else if (event.code === 'ArrowUp') {
      const evt = new KeyboardEvent(event.type, {
        ...event,
        code: 'ArrowLeft',
        key: 'ArrowLeft',
      });
      event.currentTarget?.dispatchEvent(evt);
    }
  }

  function onMenuClick() {
    drawerOpen = !drawerOpen;
    activeMain = undefined;
  }

  function onWindowClick() {
    if (window.innerWidth >= 960) {
      activeSubItems = undefined;
    }
  }

  const openSubMenuMobile = (item: TopItem) => {
    if (item.url) {
      goto(item.url);
    } else {
      if (item.item?.type1) {
        goto((activeMain?.url || '/search/') + `?${TYPE}=${item.item.type1}`);
      } else {
        goto(activeMain?.url || '/');
      }
    }
    drawerOpen = false;
  };
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:click={onWindowClick}
  on:sveltekit:start={onStart}
/>

<TopAppBar
  bind:this={topAppBar}
  variant="fixed"
  class={`${activeSubItem ? 'showing-top-app-bar' : ''}`}
>
  <Row class="top-app-bar__main-row">
    <Section class="logo">
      <Title
        component={A}
        href="/"
        on:mouseenter={() => {
          drawerOpen = false;
        }}
      >
        <OysteoLogo width={167.19} class="m-none" />
        <OysteoLogo width={130} class="d-none m-block" />
      </Title>
    </Section>
    <Section class="desktop nav">
      <TabBar
        tabs={menu}
        let:tab
        active={activeMain}
        on:MDCTabBar:activated={onTabActivated}
      >
        <Tab
          {tab}
          minWidth
          active={false}
          on:click={() => goto(tab.url)}
          on:mouseover={() => activateNavItem(tab)}
        >
          <Label>{tab.name}</Label>
        </Tab>
      </TabBar>
    </Section>
    <Section toolbar align="end" class="desktop actions m-pr-24">
      <Button
        type="button"
        variant="outlined"
        class="plan"
        on:click={() => {
          if ($session.travellerMe) {
            goto('/plan');
          } else if ($session.user) {
            window.pushToast('Please update the information before doing this');
            setTimeout(() => {
              goto('/me/my-account');
            }, 2000);
          } else {
            window.openSignInModal();
          }
        }}
      >
        <Label>Plan Your Trip</Label>
      </Button>
      <IconButton
        unbounded="false"
        on:click={() => {
          openSearch = true;
        }}
      >
        <SearchIcon />
      </IconButton>
      <OySearchModal bind:openSearch />
      <IconButton
        on:click={() => {
          $session.user ? goto('/me/wishlist') : window.openSignInModal();
        }}
      >
        <HeartIcon size="sm" />
      </IconButton>
      <div class="menu-user">
        <IconButton
          on:click={() => {
            $session.user ? menuUser.setOpen(true) : window.openSignInModal();
          }}
        >
          <UserIcon />
        </IconButton>
        <Menu bind:this={menuUser}>
          <List>
            <Item on:SMUI:action={() => goto('/me')}>
              <Text>Account info</Text>
            </Item>
            <Item on:SMUI:action={() => goto('/sign-out')}>
              <Text>Logout</Text>
            </Item>
          </List>
        </Menu>
      </div>
    </Section>
    <Section align="end" class="mobile actions">
      <IconButton class="material-icons nav" on:click={onMenuClick}
        >menu</IconButton
      >
      <IconButton class="close" on:click={() => (drawerOpen = false)}>
        <CloseIcon />
      </IconButton>
    </Section>
  </Row>
</TopAppBar>
{#if activeSubItems?.length}
  <div transition:fly={{ y: -50 }} class="feature-bar--holder" use:clickOutside>
    <AutoAdjust {topAppBar} class="desktop feature-bar">
      <div class="feature-bar__row">
        <Section class="nav">
          <main class="nav__main">
            <TabBar
              tabs={activeSubItems}
              let:tab={subTab}
              on:MDCTabBar:activated={onSubTabActivated}
              on:keydown={onSubTabKeyDown}
              bind:active={activeSubItem}
              class="feature-bar__link-group"
            >
              <Tab
                tab={subTab}
                indicatorSpanOnlyContent
                on:mouseenter={() => (activeSubItem = subTab)}
              >
                <Label>{subTab.name}</Label>
              </Tab>
            </TabBar>
          </main>
          <Button
            type="button"
            href={activeMain?.url}
            class="feature-bar__footer-link"
          >
            <Label>View all</Label>
          </Button>
        </Section>
        {#if activeSubItem}
          <Section class="intro">
            <div class="intro__wrap">
              <p class="text-eyebrow m-0">Most popular</p>
              <H4 class="mb-30 mt-20">{activeSubItem.name}</H4>
              {#if activeSubItem.item}
                <Button
                  variant="outlined"
                  href={makeLink(activeMain?.url || '/', activeSubItem.item)}
                  >Explore now</Button
                >
              {:else}
                <Button
                  variant="outlined"
                  href={activeSubItem.url || activeMain?.url}
                  >Explore now</Button
                >
              {/if}
            </div>
          </Section>
          <Section class="hero">
            {#if (activeSubItem.item?.gallery || []).length > 0}
              {#if activeSubItem.item?.gallery[0].formats?.small}
                <BlurImage
                  {...activeSubItem.item?.gallery[0]}
                  url={activeSubItem.item?.gallery[0].formats?.small.url}
                />
              {:else}
                <BlurImage {...activeSubItem.item?.gallery[0]} />
              {/if}
            {:else}
              <BlurImage alt={activeSubItem.item?.name || ''} />
            {/if}
          </Section>
        {/if}
      </div>
    </AutoAdjust>
  </div>
{/if}
<AutoAdjust {topAppBar}>
  <Drawer variant="modal" open={drawerOpen} class="mobile light">
    <Content>
      <div class="drawer-content-wrapper">
        {#if activeMain}
          <List class="drawer-content-nav">
            <Item on:SMUI:action={() => onCloseSubTabActived()}>
              <Graphic class="material-icons mr-5">chevron_left</Graphic>
              <Text>Back</Text>
            </Item>
            <Item>
              <Text class="make-bold">{activeMain.name}</Text>
            </Item>
            {#if activeSubItems?.length > 0}
              {#each activeSubItems as item}
                <Item
                  class="ml-25"
                  on:SMUI:action={() => openSubMenuMobile(item)}
                >
                  <Text>{item.name}</Text>
                </Item>
              {/each}
            {/if}
            <Item
              on:SMUI:action={() => {
                drawerOpen = false;
                goto(activeMain?.url);
              }}
              class="feature-bar__footer-link"
            >
              <Label>View all</Label>
            </Item>
          </List>
        {:else}
          <List
            class="drawer-content-nav"
            on:MDCList:action={onMobileMainNavAction}
          >
            {#each menu as item, index}
              {#if item.children?.length}
                <Item>
                  <Text class="mr-30">{item.name}</Text>
                  <Graphic class="material-icons">chevron_right</Graphic>
                </Item>
              {:else}
                <Item href={item.url}>
                  <Text>{item.name}</Text>
                </Item>
              {/if}
            {/each}
          </List>
        {/if}
        <Follow />
      </div>
    </Content>
  </Drawer>
  <slot />
</AutoAdjust>

<style lang="scss" global>
  @use './MainNav';
  .menu-user {
    display: inline-block;
    @import '../../../style/partial/menu.scss';
  }
  .make-bold {
    font-weight: 900;
  }
  .drawer-content-wrapper {
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    padding-bottom: 87px;
    overflow-y: auto;
  }

  .close {
    margin-right: 8px;
    margin-top: -2px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .feature-bar__link-group {
    padding-top: 36px;
  }
  .feature-bar__footer-link {
    height: 48px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    padding-left: 64px !important;
    border-top: 1px solid rgba(black, 0.1) !important;
  }
</style>
