<script lang="ts">
  import { authStore } from '$lib/store/auth';
  import { goto } from '$app/navigation';
  import TopAppBar from '@smui/top-app-bar/TopAppBar.svelte';
  import Row from '@smui/top-app-bar/Row';
  import Section from '@smui/top-app-bar/Section.svelte';
  import Title from '@smui/top-app-bar/Title';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import Wrapper from '@smui/tooltip/Wrapper.svelte';
  import Textfield from '@smui/textfield/Textfield.svelte';
  import A from '@smui/common/elements/A.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
  import OySubMenu from '$lib/components/common/OySubMenu.svelte';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import BottomAppBar from '$lib/components/common/BottomAppBar/index.svelte';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import OySearchModal from '$lib/components/modals/OySearchModal.svelte';
  import { menus } from '$lib/const';
  import { documentHelper } from '$lib/helpers/document';
  import '/src/style/partial/footer.scss';
  import '/src/style/partial/form.scss';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';

  let miniWindow = false;
  let searchResult = '';
  let openSubMenu = false;
  let menuItemActive: string;
  let urlViewAllSubmenu: string;
  let emailSubscribe = '';
  let page = '';
  let userModel = $authStore.user;
  export let openSignupModal = false;
  export let openSigninModal = false;
  let openSearchResult = false;
  let contentHeaderAction = '';
  let tabsSubMenu: any[];
  const dispatch = createEventDispatcher();
  let openSearch: boolean = false;
  let outerWidth: number;

  export let refreshPage: boolean = false;
  export let config = {
    header: {
      page: '',
      transparent: false,
      theme: 'light',
      currentMenu: '',
    },
  };

  function setMiniWindow() {
    page = location.pathname;
    page = page.replace('/', '');
    if (page == '') {
      page = 'home';
    }
    onResize();
  }

  function onResize() {
    if (typeof window !== 'undefined') {
      miniWindow = outerWidth < 768;
    }
    document.documentElement.style.setProperty(
      '--wrap-width',
      outerWidth + 'px',
    );
  }

  function callOpenSignupModal(event: any) {
    userModel = $authStore.user;
    if (!userModel) {
      openSignupModal = true;
      openSigninModal = false;
    } else {
      if (event.detail.type && event.detail.type == 'refresh') {
        dispatch('refreshPage');
      } else {
        goto('/me');
      }
    }
  }

  function callOpenSigninModal(event: any) {
    userModel = $authStore.user;
    if (!userModel) {
      openSignupModal = false;
      openSigninModal = true;
    } else {
      if (event.detail.type && event.detail.type == 'refresh') {
        dispatch('refreshPage');
      } else {
        goto('/me');
      }
    }
  }

  onMount(async () => {
    onResize();
  });

  afterUpdate(setMiniWindow);

  function handleOpenSubMenu(menuItem: Menu) {
    if (menuItem.submenu.length > 0) {
      if (!openSubMenu) {
        documentHelper.changeBackgroundHeader('#000');
        openSubMenu = true;
        menuItemActive = 'menu-item-' + menuItem.slug;
        tabsSubMenu = menuItem.submenu;
        urlViewAllSubmenu = menuItem.link;
      }
    }
  }

  function handleGotoPlanTrip() {
    userModel = $authStore.user;
    if (!userModel) {
      openSignupModal = false;
      openSigninModal = true;
    } else {
      goto('/plan');
    }
  }
</script>

<svelte:window on:resize={onResize} bind:outerWidth />
<div class="content-wrap page page-{config.header.page}">
  <header class="full-width" style="position: relative">
    <TopAppBar
      variant="static"
      class="demo-top-app-bar {config.header.transparent
        ? 'header-transparent'
        : ''} {config.header.theme}"
      id="header"
    >
      <div class="content-wrap">
        <div class="container">
          <Row>
            <Section class="pl-0">
              <Title
                id="logo"
                component={A}
                href="/"
                class="mdc-theme--primary"
                style={miniWindow ? 'padding-left: 0;' : ''}
              >
                <OysteoLogo />
              </Title>
            </Section>
            <Section
              class="m-none pt-0 pb-0"
              toolbar
              align="center"
              style="z-index: 2"
            >
              <ul id="main-menu" class="m-0">
                {#if typeof menus != 'undefined' && menus.length > 0}
                  {#each menus as item, i}
                    <li
                      class={(config.header.currentMenu == item.slug
                        ? 'active-static'
                        : '') +
                        ' ' +
                        (item.submenu.length > 0 ? 'has-submenu' : '')}
                      id="menu-item-{item.slug}"
                      on:click={() => {
                        handleOpenSubMenu(item);
                      }}
                    >
                      <a
                        href={item.submenu.length
                          ? 'javascript:void(0)'
                          : item.link}>{item.name}</a
                      >
                    </li>
                  {/each}
                {/if}
              </ul>
              {#if tabsSubMenu}
                <OySubMenu
                  bind:open={openSubMenu}
                  bind:menuId={menuItemActive}
                  tabs={tabsSubMenu}
                  active={tabsSubMenu[0]}
                  urlViewAll={urlViewAllSubmenu}
                />
              {/if}
            </Section>
            <Section class="d-none m-block pr-0" align="end" toolbar>
              <Wrapper>
                <div class="wrap-menu-mobile">
                  <IconButton
                    class="material-icons"
                    on:click={() => {
                      contentHeaderAction = 'menu';
                    }}>menu</IconButton
                  >
                </div>
              </Wrapper>
            </Section>
            <Section
              class="m-none"
              align="end"
              toolbar
              style="color: var(--mdc-on-surface, #000);"
            >
              <Wrapper>
                <Button
                  class="btn-plan-your-trip mr-10"
                  type="button"
                  variant="outlined"
                  on:click={() => {
                    handleGotoPlanTrip();
                  }}
                >
                  <Label class="text-button2">Plan Your Trip</Label>
                </Button>
                <div class="button-actions">
                  <IconButton
                    unbounded="false"
                    on:click={() => {
                      openSearch = true;
                    }}
                  >
                    <Icon component={Svg} viewBox="-4 -4 24 24">
                      <path
                        d="M6.684 0C3.786 0 1.218 1.867.325 4.623s.091 5.775 2.438 7.474 5.522 1.693 7.862-.016l.283-.207 3.958 3.827c.558.563 1.525-.406.965-.965l-3.956-3.83.207-.283a6.6 6.6 0 0 0 1.285-3.939h0C13.364 2.995 10.374.004 6.684 0zm0 12a5.32 5.32 0 1 1 0-10.64 5.32 5.32 0 0 1 5.32 5.32c-.003 2.937-2.383 5.317-5.32 5.32z"
                      />
                    </Icon>
                  </IconButton>
                  <IconButton>
                    <Icon component={Svg} viewBox="-4 -4 24 24">
                      <path
                        id="Heart"
                        d="M10.341,0c-.11,0-.221,0-.33.013a4.358,4.358,0,0,0-2.84,1.545A4.36,4.36,0,0,0,4.267.128H4.134A4.042,4.042,0,0,0,0,4.032c-.08,2.021,1.3,3.73,2.343,4.839a23.091,23.091,0,0,0,4.678,3.664.715.715,0,0,0,.727-.019A23.081,23.081,0,0,0,12.28,8.67c1-1.152,2.309-2.917,2.152-4.931A4.054,4.054,0,0,0,10.341,0"
                        transform="translate(0.625 0.625)"
                        fill="none"
                        stroke="#fff"
                        stroke-width="1.25"
                        fill-rule="evenodd"
                      />
                    </Icon>
                  </IconButton>
                  <IconButton
                    href={$authStore.user ? '/me' : ''}
                    on:click={$authStore.user ? () => {} : callOpenSigninModal}
                  >
                    <Icon component={Svg} viewBox="-4 -4 24 24">
                      <g
                        id="Icon_-_Profile"
                        data-name="Icon - Profile"
                        transform="translate(0.625 0.625)"
                      >
                        <path
                          id="Path_306"
                          data-name="Path 306"
                          d="M32.867,10.434a3.434,3.434,0,1,0-3.434,3.434A3.444,3.444,0,0,0,32.867,10.434Z"
                          transform="translate(-22.152 -7)"
                          fill="none"
                          stroke="#fff"
                          stroke-width="1.25"
                        />
                        <path
                          id="Path_307"
                          data-name="Path 307"
                          d="M16.9,54.617a5.067,5.067,0,0,1-3.179,0,4.086,4.086,0,0,0-4.458,1.206,6.908,6.908,0,0,0-1.234,3.983c0,.749.485.914,1.234.914h12.1c.749,0,1.288-.165,1.288-.914a6.951,6.951,0,0,0-1.288-3.983A4.1,4.1,0,0,0,16.9,54.617Z"
                          transform="translate(-8.029 -45.737)"
                          fill="none"
                          stroke="#fff"
                          stroke-width="1.25"
                        />
                      </g>
                    </Icon>
                  </IconButton>
                </div>
                <OySearchModal bind:openSearch />
              </Wrapper>
            </Section>
          </Row>
        </div>
      </div>
    </TopAppBar>
  </header>
  <slot />
  <footer class="dark full-width t-pb-50">
    <div class="content-wrap">
      <LayoutGrid>
        <Cell
          spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
          class="m-block d-none"
        >
          <div class="widget">
            <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
            <div class="widget-content">
              <p>
                Exclusive content and special rewards from our travel and
                fashion partners.
              </p>
            </div>
            <form>
              <div class="form-control mb-40">
                <Textfield
                  style="width: 100%;"
                  bind:value={emailSubscribe}
                  label="Email Address"
                  type="email"
                />
              </div>
              <div class="form-control mb-10 m-mb-30">
                <Button variant="outlined">
                  <Label>Submit</Label>
                </Button>
              </div>
            </form>
          </div>

          <div class="widget mb-20 m-block d-none">
            <h4 class="mt-0 widget-title">Follow Oysteo</h4>
            <div class="widget-content button-socials">
              <a href="#" class="mr-20" target="_blank"
                ><img src="/img/icons/icon-instagram.svg" alt="" />
              </a>
              <a href="#" class="mr-20" target="_blank"
                ><img src="/img/icons/icon-facebook2.svg" alt="" />
              </a>
              <a href="#" target="_blank"
                ><img src="/img/icons/icon-twitter.svg" alt="" />
              </a>
            </div>
          </div>
        </Cell>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
          <LayoutGrid>
            <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
              <div class="widget">
                <h4 class="mt-0 widget-title">Explore Oysteo</h4>
                <div class="widget-content">
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="#">Terms + Conditions</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
              <div class="widget">
                <h4 class="mt-0 widget-title">Contact Oysteo</h4>
                <div class="widget-content">
                  <ul>
                    <li><a href="#">Advisor Log In</a></li>
                    <li><a href="#">Affiliate Program</a></li>
                  </ul>
                </div>
              </div>
              <div class="widget mb-0 m-none">
                <h4 class="mt-0 widget-title">Follow Oysteo</h4>
                <div class="widget-content button-socials">
                  <a href="#" class="mr-20" target="_blank"
                    ><img src="/img/icons/icon-instagram.svg" alt="" />
                  </a>
                  <a href="#" class="mr-20" target="_blank"
                    ><img src="/img/icons/icon-facebook2.svg" alt="" />
                  </a>
                  <a href="#" target="_blank"
                    ><img src="/img/icons/icon-twitter.svg" alt="" />
                  </a>
                </div>
              </div>
            </Cell>
          </LayoutGrid>
        </Cell>
        <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }} class="m-none">
          <div class="widget pl-50">
            <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
            <div class="widget-content">
              <p>
                Exclusive content and special rewards from our travel and
                fashion partners.
              </p>
            </div>
            <form>
              <div class="form-control mb-40">
                <Textfield
                  style="width: 100%;"
                  bind:value={emailSubscribe}
                  label="Email Address"
                  type="email"
                />
              </div>
              <div class="form-control mb-10 m-mb-30">
                <Button variant="outlined" class="d-pl-60 d-pr-60">
                  <Label class="text-button2">Submit</Label>
                </Button>
              </div>
            </form>
          </div>
        </Cell>
      </LayoutGrid>
    </div>
  </footer>
</div>
<SignupModal
  bind:open={openSignupModal}
  bind:authModel={userModel}
  on:close={callOpenSigninModal}
/>
<SigninModal
  bind:open={openSigninModal}
  bind:authModel={userModel}
  on:close={callOpenSignupModal}
/>
<BottomAppBar
  on:openHeaderActionMobile={(event) => {
    contentHeaderAction = event.detail.content;
  }}
  bind:openSigninModal>no content</BottomAppBar
>
<HeaderActionMobile bind:content={contentHeaderAction} />

<style lang="scss" global>
  @import './src/style/partial/header.scss';
  @import './src/style/partial/form.scss';
  header {
    .wrap-menu-mobile {
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: nowrap;
    }
    .wrap-menu-mobile .mdc-icon-button {
      --mdc-ripple-color: tranparent;
      padding: 12px 0;
      width: auto;
      height: auto;
    }
    @media screen and (max-width: 949px) {
      .search-form,
      .search-form .mdc-text-field {
        width: 100%;
      }
    }
    .mdc-icon-buttob {
      min-width: auto;
    }
  }
  #logo {
    line-height: 0;
  }

  footer {
    .widget-title {
      font-size: 16px;
      line-height: 34px;
      font-weight: 300;
    }
    .widget-content {
      --mdc-typography-button-font-size: 13px;
      --mdc-typography-button-line-height: 30px;
      --mdc-typography-button-letter-spacing: 0.2;
    }
  }

  @media screen and (max-width: 949px) {
    footer {
      --mdc-typography-form-font-size: 12px;
      --mdc-typography-form-line-height: 17px;
      --mdc-typography-form-letter-spacing: 0.05;
      .widget-title {
        font-size: 14px;
        line-height: 23px;
        letter-spacing: 0;
      }
      .widget-content {
        --mdc-typography-button-font-size: 14px;
        --mdc-typography-button-line-height: 40px;
        --mdc-typography-button-letter-spacing: 0.2;
        p {
          font-size: 16px;
          line-height: 29px;
          letter-spacing: 0;
        }
      }
    }
    footer :global(.mdc-button) {
      width: 170px;
    }
    .button-socials a {
      padding: 10px;
      margin-right: 30px !important;
    }
    .button-socials img {
      width: 24px;
    }
  }
</style>
