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
  import { MainNavItem } from './types';
  import List from '@smui/list';
  import { Item } from '@smui/list';
  import { Graphic } from '@smui/list';
  import { Text } from '@smui/list';
  import { goto } from '$app/navigation';
  import { clickOutside } from '$lib/components/events/clickOutside';
  import { authStore } from '$lib/store/auth';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import SignupModal from '../modals/SignupModal.svelte';
  import OySearchModal from '../modals/OySearchModal.svelte';
  export let items: MainNavItem[];
  export let active: MainNavItem | undefined = undefined;

  let topAppBar: typeof TopAppBar;
  let drawerOpen: boolean = false;
  let activeSubItem: Exhibitable | undefined = undefined;
  let prominent: boolean = false;
  let activeSubItems: Exhibitable[] | undefined;
  let scrollY: number = 0;
  export let signinModalOpen: boolean = false;
  export let signupModalOpen: boolean = false;
  let openSearch: boolean = false;
  function adjustNav() {
    if (window.innerWidth < 960) {
      prominent = false;
    } else {
      drawerOpen = false;
      if (window.scrollY < 64) {
        prominent = true;
      } else {
        prominent = false;
      }
    }
  }

  function onResize(event: Event) {
    if (window.scrollY < 64) {
      prominent = true;
    } else {
      prominent = false;
    }
    if (window.innerWidth < 960) {
      prominent = false;
      activeSubItems = undefined;
    } else {
      drawerOpen = false;
    }
  }

  function onScroll(event: Event) {
    if (activeSubItems && Math.abs(window.scrollY - scrollY) > 250) {
      activeSubItems = undefined;
    }
    adjustNav();
  }

  function onStart(event: CustomEvent) {
    adjustNav();
  }

  function onTabActivated(event: CustomEvent<{ index: number }>): void {
    active = items[event.detail.index];
    console.log('activated', active.children?.length);
    if (active.children?.length) {
      activeSubItems = active.children;
      activeSubItem = active.children[0];
      scrollY = window.scrollY;
    } else {
      goto(active.url);
    }
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
    activeSubItems = [];
    active = undefined;
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

  function onSignUpModalClose(event: CustomEvent) {
    signupModalOpen = false;
    if (event.detail.type === 'open-signin') {
      signinModalOpen = true;
    }
  }
  function onSignInModalClose(event: CustomEvent) {
    signinModalOpen = false;
    if (event.detail.type === 'open-signup') {
      signupModalOpen = true;
    }
  }
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:click={onWindowClick}
  on:sveltekit:start={onStart}
/>

<nav
  class="top-app-bar--root"
  class:drawer-open={drawerOpen}
  on:click|stopPropagation={() => {}}
  on:scroll|stopPropagation={() => {}}
>
  <TopAppBar bind:this={topAppBar} variant="fixed" class={`${active ? 'showing-top-app-bar' : ''}`} {prominent}>
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
          <Tab {tab} minWidth active={false}>
            <Label>{tab.name}</Label>
          </Tab>
        </TabBar>
      </Section>
      <Section toolbar align="end" class="desktop actions d-pr-45 m-pr-24">
        <Button type="button" variant="outlined" class="plan" href="/plan">
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
        <IconButton
          on:click={() => {
            $authStore.user ? goto('/me') : (signinModalOpen = true);
          }}
        >
          <UserIcon />
        </IconButton>
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
        console.log('click_outside');
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
                href={makeLink(active?.url || '/', activeSubItem)}
                >Explore now</Button
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

<svelte:component
  this={SigninModal}
  bind:open={signinModalOpen}
  on:close={onSignInModalClose}
/>
<svelte:component
  this={SignupModal}
  bind:open={signupModalOpen}
  on:close={onSignUpModalClose}
/>

<style lang="scss" global>
  @use './MainNav';
</style>
