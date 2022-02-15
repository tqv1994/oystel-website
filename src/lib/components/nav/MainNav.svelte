<script lang="ts">
  import { Section } from '@smui/top-app-bar';
  import { AutoAdjust } from '@smui/top-app-bar';
  import { Exhibitable } from '$lib/store/types';
  import TopAppBar from '@smui/top-app-bar';
  import { Row } from '@smui/top-app-bar';
  import { Title } from '@smui/top-app-bar';
  import TabBar from '@smui/tab-bar';
  import Tab from '@smui/tab';
  import Button from '@smui/button';
  import IconButton from '@smui/icon-button';
  import { Label } from '@smui/common';
  import { A } from '@smui/common/elements';
  import { H2 } from '@smui/common/elements';
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
  import { MainNavItem, SubNavItem } from './types';
  import List from '@smui/list';
  import { Item } from '@smui/list';
  import { Graphic } from '@smui/list';
  import { Text } from '@smui/list';
  import { goto } from '$app/navigation';
  import { clickOutside } from '$lib/components/events/clickOutside';
  import { authStore } from '$lib/store/auth';
  import OySearchModal from '../modals/OySearchModal.svelte';
  import { afterUpdate } from 'svelte';
  import Menu, { MenuComponentDev } from '@smui/menu';
  import { Separator } from '@smui/list';
  export let items: MainNavItem[];
  export let active: MainNavItem | undefined = undefined;

  let topAppBar: typeof TopAppBar;
  let drawerOpen: boolean = false;
  let activeSubItem: Exhibitable | SubNavItem | undefined = undefined;
  let activeSubItems: Exhibitable[] | SubNavItem[] | undefined;
  let scrollY: number = 0;
  let classNames: string | undefined = undefined;
  export { classNames as class };
  let openSearch: boolean = false;
  let onMobile: boolean = false;
  export let navLightColor = true;
  function adjustNav() {
    if (window.innerWidth < 960) {
      onMobile = true;
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
    if (window.innerWidth < 960 && active) {
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
    active = item;
    console.log('activated', active.children?.length);
    if (active.children?.length) {
      activeSubItems = active.children;
      activeSubItem = active.children[0];
      scrollY = window.scrollY;
    } else {
      goto(active.url);
    }
  }

  function onTabActivated(event: CustomEvent<{ index: number }>): void {
    activateNavItem(items[event.detail.index]);
  }

  function onMobileMainNavAction(event: CustomEvent<{ index: number }>): void {
    const item = items[event.detail.index];
    if (item.children) {
      active = item;
    }
  }

  function onSubTabActivated(event: CustomEvent<{ index: number }>): void {
    showSubItemAt(event.detail.index);
  }

  function onCloseSubTabActived() {
    active = undefined;
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
    drawerOpen = true;
    active = undefined;
  }

  function onWindowClick() {
    activeSubItems = undefined;
  }
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:click={onWindowClick}
  on:sveltekit:start={onStart}
/>

<nav
  class={`top-app-bar--root ${classNames}`}
  class:drawer-open={drawerOpen}
  on:click|stopPropagation={() => {}}
  on:scroll|stopPropagation={() => {}}
>
  <TopAppBar
    bind:this={topAppBar}
    variant="fixed"
    class={`${activeSubItem ? 'showing-top-app-bar' : ''}`}
  >
    <Row class="top-app-bar__main-row">
      <Section class="logo d-pl-45 m-pl-24">
        <Title component={A} href="/">
          <OysteoLogo width={130} height={17.217} />
        </Title>
      </Section>
      <Section class="desktop nav">
        <TabBar
          tabs={items}
          let:tab
          bind:active
          on:MDCTabBar:activated={onTabActivated}
        >
          <Tab
            {tab}
            minWidth
            active={false}
            on:click={() => activateNavItem(tab)}
          >
            <Label>{tab.name}</Label>
          </Tab>
        </TabBar>
      </Section>
      <Section toolbar align="end" class="desktop actions d-pr-45 m-pr-24">
        <Button
          type="button"
          variant="outlined"
          class="plan"
          on:click={() => {
            if ($authStore.user?.travellerMe) {
              goto('/plan');
            } else if ($authStore.user) {
              window.pushToast(
                'Please update the information before doing this',
              );
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
            $authStore.user
              ? goto('/me/wishlist')
              : window.pushToast('Please login to use this feature');
          }}
        >
          <HeartIcon size="sm" />
        </IconButton>
        <div class="menu-user">
          <IconButton
            on:click={() => {
              $authStore.user
                ? menuUser.setOpen(true)
                : window.openSignInModal();
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
    <div
      transition:fly={{ y: -50 }}
      class="feature-bar--holder"
      use:clickOutside
      on:click_outside={() => {
        onCloseSubTabActived();
      }}
    >
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
            <Button type="button" href={active?.url} class="all">
              <Label>View all</Label>
            </Button>
          </Section>
          {#if activeSubItem}
            <Section class="intro">
              <H4>Most popular</H4>
              <H2>{activeSubItem.name}</H2>
              <Button
                variant="outlined"
                href={activeSubItem.id
                  ? makeLink(active?.url || '/', activeSubItem)
                  : activeSubItem.url}>Explore now</Button
              >
            </Section>
            <Section class="hero">
              <BlurImage {...activeSubItem.gallery[0]} />
            </Section>
          {/if}
        </div>
      </AutoAdjust>
    </div>
  {/if}
  <AutoAdjust {topAppBar}>
    <Drawer variant="modal" open={drawerOpen} class="mobile light">
      <Content>
        {#if active}
          <List>
            <Item on:SMUI:action={() => (active = undefined)}>
              <Graphic class="material-icons">chevron_left</Graphic>
              <Text>Back</Text>
            </Item>
            {#if activeSubItems?.length}
              {#each activeSubItems as item}
                <Item href={makeLink(active.url, item)}>
                  <Text>{item.name}</Text>
                </Item>
              {/each}
            {/if}
            <Item href={active?.url} class="all">
              <Label>View all</Label>
            </Item>
          </List>
        {:else}
          <List on:MDCList:action={onMobileMainNavAction}>
            {#each items as item, index}
              {#if item.children?.length}
                <Item>
                  <Text>{item.name}</Text>
                </Item>
              {:else}
                <Item href={item.url}>
                  <Text>{item.name}</Text>
                </Item>
              {/if}
            {/each}
          </List>
        {/if}
      </Content>
    </Drawer>
    <slot />
  </AutoAdjust>
</nav>

<style lang="scss" global>
  @use './MainNav';
  .menu-user {
    display: inline-block;
    @import '../../../style/partial/menu.scss';
  }
</style>
