<script lang="ts" context="module">
  import { browser } from '$app/env';
  import type { Load } from '@sveltejs/kit';
  import authStore from '../stores/auth';

  export const load: Load = async ({ fetch, session, context }) => {
    console.log('load -', browser ? 'in browser' : 'ssr');
    authStore.set({ user: session.user });
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import {
    getAuth,
    getRedirectResult,
    inMemoryPersistence,
  } from 'firebase/auth';
  import '../firebase';
  import { goto } from '$app/navigation';
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import Button, {Label} from '@smui/button';
  import Tooltip, { Wrapper } from '@smui/tooltip';
  import Textfield from '@smui/textfield';
  import { Icon } from '@smui/common';
  import A from '@smui/common/A.svelte';
  import Svg from '@smui/common/Svg.svelte';
  import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount, afterUpdate } from 'svelte';
  import OySubMenu  from './../shared/components/common/OySubMenu.svelte';

  if (browser) {
    const auth = getAuth();
    auth.setPersistence(inMemoryPersistence).then(() => {
      getRedirectResult(auth).then(async (cred) => {
        if (!cred) {
          return;
        }
        try {
          const token = await cred.user.getIdToken();
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            const user = await res.json();
            authStore.set({ user });
            auth.signOut();
            return goto('/me');
          }
          console.error('Error authenticating', res);
        } catch (error) {
          console.error('Create/update user failure', error);
        }
      });
    });
  }

  let miniWindow = false;
  let searchResult = '';
  let openSubMenu = false;
  let menuItemActive;
  let emailSubscribe = '';
  let page = '';
  function setMiniWindow() {
    if (typeof window !== 'undefined') {
      miniWindow = window.innerWidth < 768;
    }
    page = location.pathname;
    page = page.replace('/','');
    if(page == ''){
      page = 'home';
    }
    document.documentElement.style.setProperty('--wrap-width',(window.innerWidth > 1440 ? 1440 : window.innerWidth)+'');
  }

  let lightTheme =
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-color-scheme: light)').matches;
  function switchTheme() {
    lightTheme = !lightTheme;
    let themeLink = document.head.querySelector('#theme');
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = 'theme';
    }
    themeLink.href = `smui${lightTheme ? '' : '-dark'}.css`;
    document.head
      .querySelector('link[href="smui-dark.css"]')
      .insertAdjacentElement('afterend', themeLink);
    let siteLink = document.head.querySelector('#site');
    if (!siteLink) {
      siteLink = document.createElement('link');
      siteLink.rel = 'stylesheet';
      siteLink.id = 'site';
    }
    siteLink.href = `site${lightTheme ? '' : '-dark'}.css`;
    document.head
      .querySelector('link[href="site-dark.css"]')
      .insertAdjacentElement('afterend', siteLink);
  }

  // onMount(setMiniWindow);
  afterUpdate(setMiniWindow);
</script>
<div class="content-wrap page page-{page}">
  <header>
    <TopAppBar variant="static" class="demo-top-app-bar {page == 'home' ? 'dark header-transparent' : 'light' }">
      <Row>
        <Section>
          <Title
                  id="logo"
            component={A}
            href="/"
            class="mdc-theme--primary"
            style={miniWindow ? 'padding-left: 0;' : ''}
          >
            <img src="./img/logo.svg" />
          </Title>
        </Section>
        <Section class="m-none" toolbar align="center" style="z-index: 2">
          <ul id="main-menu">
            <li id="menu-item-1" on:mousemove={()=>{openSubMenu=true; menuItemActive = 'menu-item-1'}} on:mouseleave={()=>{openSubMenu=false;}}>
              <a href="#">Travel Advisors</a>
            </li>
            <li id="menu-item-2" on:mousemove={()=>{openSubMenu=true; menuItemActive = 'menu-item-2'}} on:mouseleave={()=>{openSubMenu=false;}}>
              <a href="#">Destinations</a>
            </li>
            <li id="menu-item-3" on:mousemove={()=>{openSubMenu=true; menuItemActive = 'menu-item-3'}} on:mouseleave={()=>{openSubMenu=false;}}>
              <a href="#">Experiences</a>
            </li>
            <li id="menu-item-4">
              <a href="#">Shop</a>
            </li>
          </ul>
          <OySubMenu bind:open={openSubMenu} bind:menuId={menuItemActive}/>
        </Section>
        <Section class="m-none" align="end" toolbar style="color: var(--mdc-on-surface, #000);">
          <Wrapper>
            <Button class="btn-plan-your-trip mr-30" type="button"  variant="outlined">
              <Label>Plan Your Trip</Label>
            </Button>
            <a href="#" class="favorite mr-30">
              <Icon>
                  <img src="./img/icons/icon-heart.svg"/>
              </Icon>
            </a>
            <a href="#" class="profile mr-30">
              <Icon>
                <img src="./img/icons/icon-profile.svg"/>
              </Icon>
            </a>
            <a href="#" class="search">
              <Icon>
                <img src="./img/icons/icon-search.svg"/>
              </Icon>
            </a>
          </Wrapper>
        </Section>
      </Row>
      <div class="container">
          <div class="divider"></div>
      </div>
      <Row>
        <Section align="start">
          <form class="search-form">
            <div class="form-control">
              <Textfield variant="outlined" bind:value={searchResult} label="Start with a search" withTrailingIcon={false}>
                <Icon slot="trailingIcon"><img src="./img/icons/icon-search.svg"></Icon>
              </Textfield>
            </div>
          </form>
        </Section>
        <Section align="end" class="list-tags-wrap">
          <div class="list-tags">
            <Button variant="unelevated"><Label>Beach with Friends</Label></Button>
            <Button variant="unelevated"><Label>Destinations - Sea</Label></Button>
            <Button variant="unelevated"><Label>Beach with Friends</Label></Button>
            <Button variant="unelevated"><Label>Destinations - Sea</Label></Button>
            <Button variant="unelevated"><Label>Beach with Friends</Label></Button>
            <Button variant="unelevated"><Label>Destinations - Sea</Label></Button>
          </div>
        </Section>
      </Row>
      <div class="container">
        <div class="divider"></div>
      </div>
    </TopAppBar>
  </header>
  <slot />
  <footer class="dark">
    <LayoutGrid>
      <Cell span="6" class="m-block d-none">
        <div class="widget">
          <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
          <div class="widget-content">
            <p>Exclusive content and special rewards from our travel and fashion partners.</p>
          </div>
          <form>
            <div class="form-control mb-40">
              <Textfield style="width: 100%;" bind:value={emailSubscribe} label="Email Address" type="email"></Textfield>
            </div>
            <div class="form-control mb-10 m-mb-30">
              <Button  variant="outlined">
                <Label>Submit</Label>
              </Button>
            </div>
          </form>
        </div>
      </Cell>
      <Cell span="6">
        <LayoutGrid>
          <Cell span="5">
            <div class="widget">
              <h4 class="mt-0 widget-title">Explore Oysteo</h4>
              <div class="widget-content">
                <ul>
                  <li><a href="#">About Us</a> </li>
                  <li><a href="#">Careers</a> </li>
                  <li><a href="#">Terms + Conditions</a> </li>
                  <li><a href="#">Privacy Policy</a> </li>
                </ul>
              </div>
            </div>
          </Cell>
          <Cell span="5">
            <div class="widget">
              <h4 class="mt-0 widget-title">Contact Oysteo</h4>
              <div class="widget-content">
                <ul>
                  <li><a href="#">Advisor Log In</a> </li>
                  <li><a href="#">Affiliate Program</a> </li>
                </ul>
              </div>
            </div>
            <div class="widget mb-0">
              <h4 class="mt-0 widget-title">Follow Oysteo</h4>
              <div class="widget-content button-socials">
                <a href="#" class="mr-20" target="_blank"><img src="./img/icons/icon-instagram.svg" alt=""/> </a>
                <a href="#" class="mr-20" target="_blank"><img src="./img/icons/icon-facebook2.svg" alt=""/> </a>
                <a href="#" target="_blank"><img src="./img/icons/icon-twitter.svg" alt=""/> </a>
              </div>
            </div>
          </Cell>
        </LayoutGrid>

      </Cell>
      <Cell span="6" class="m-none">
        <div class="widget pl-50">
          <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
          <div class="widget-content">
            <p>Exclusive content and special rewards from our travel and fashion partners.</p>
          </div>
          <form>
            <div class="form-control mb-40">
              <Textfield style="width: 100%;" bind:value={emailSubscribe} label="Email Address" type="email"></Textfield>
            </div>
            <div class="form-control mb-10 m-mb-30">
              <Button  variant="outlined">
                <Label>Submit</Label>
              </Button>
            </div>
          </form>
        </div>
      </Cell>
    </LayoutGrid>
  </footer>
</div>