<script lang="ts">
    import {
        getAuth,
        getRedirectResult,
        inMemoryPersistence,
    } from 'firebase/auth';
    import authStore from '$lib/stores/auth';
    import '$lib/firebase';
    import { goto } from '$app/navigation';
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton, { Icon } from '@smui/icon-button';
    import { mdiHeart, mdiMagnify } from '@mdi/js';
    import Button, { Label } from '@smui/button';
    import Tooltip, { Wrapper } from '@smui/tooltip';
    import Textfield from '@smui/textfield';
    import A from '@smui/common/A.svelte';
    import Svg from '@smui/common/Svg.svelte';
    import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import { onMount, afterUpdate } from 'svelte';
    import OySubMenu from '$lib/components/common/OySubMenu.svelte';
    import SignupModal from '$lib/components/modals/SignupModal.svelte';
    import SigninModal from '$lib/components/modals/SigninModal.svelte';
    import BottomAppBar from '$lib/components/common/BottomAppBar/index.svelte';
    import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';

    let miniWindow = false;
    let searchResult = '';
    let openSubMenu = false;
    let menuItemActive;
    let emailSubscribe = '';
    let page = '';
    let userModel = $authStore.user;
    let openSignupModal = false;
    let openSigninModal = false;
    let openSearchResult = false;
    let contentHeaderAction = '';

    function setMiniWindow() {
        page = location.pathname;
        page = page.replace('/', '');
        if (page == '') {
            page = 'home';
        }
        onResize();
    }

    function onResize(){
        if(typeof window !== 'undefined') {
            miniWindow = window.innerWidth < 768;
        }
        document.documentElement.style.setProperty(
            '--wrap-width',
            window.innerWidth+"px",
        );
    }

    function callOpenSignupModal() {
        if (!userModel) {
            openSignupModal = true;
            openSigninModal = false;
        } else {
            goto('/me');
        }
    }

    function callOpenSigninModal() {
        if (!userModel) {
            openSignupModal = false;
            openSigninModal = true;
        } else {
            goto('/me');
        }
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

    onMount(onResize);
    afterUpdate(setMiniWindow);
</script>
<svelte:window on:resize={onResize}/>
<div class="content-wrap page page-{page}">
    <header >
        <TopAppBar
                variant="static"
                class="demo-top-app-bar {page == 'home'
        ? 'dark header-transparent'
        : 'light'}" id="header"
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
                            <img src="/img/logo.svg" />
                        </Title>
                    </Section>
                    <Section class="m-none" toolbar align="center" style="z-index: 2">
                        <ul id="main-menu">
                            <li
                                    id="menu-item-1"
                                    on:mousemove={() => {
                openSubMenu = true;
                menuItemActive = 'menu-item-1';
              }}
                                    on:mouseleave={() => {
                openSubMenu = false;
              }}
                            >
                                <a href="#">Travel Advisors</a>
                            </li>
                            <li
                                    id="menu-item-2"
                                    on:mousemove={() => {
                openSubMenu = true;
                menuItemActive = 'menu-item-2';
              }}
                                    on:mouseleave={() => {
                openSubMenu = false;
              }}
                            >
                                <a href="#">Destinations</a>
                            </li>
                            <li
                                    id="menu-item-3"
                                    on:mousemove={() => {
                openSubMenu = true;
                menuItemActive = 'menu-item-3';
              }}
                                    on:mouseleave={() => {
                openSubMenu = false;
              }}
                            >
                                <a href="/experiences-listing">Experiences</a>
                            </li>
                            <li id="menu-item-4">
                                <a href="#">Shop</a>
                            </li>
                        </ul>
                        <OySubMenu bind:open={openSubMenu} bind:menuId={menuItemActive} />
                    </Section>
                    <Section class="d-none m-block pr-0" align="end" toolbar>
                        <Wrapper>
                            <div class="wrap-menu-mobile">
                                <IconButton class="material-icons" on:click={()=>{contentHeaderAction='menu'}} >menu</IconButton>
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
                                    class="btn-plan-your-trip mr-30"
                                    type="button"
                                    variant="outlined"
                            >
                                <Label>Plan Your Trip</Label>
                            </Button>
                            <IconButton>
                                <Icon component={Svg} viewBox="-4 -4 24 24">
                                    <path
                                            d="M11.453 0l-.365.014C9.859.16 8.733.773 7.943 1.725A4.83 4.83 0 0 0 4.726.142h-.147A4.48 4.48 0 0 0 0 4.466C-.086 6.7 1.441 8.6 2.6 9.826c1.545 1.57 3.286 2.933 5.18 4.057a.79.79 0 0 0 .805-.021c1.848-1.199 3.534-2.631 5.015-4.262 1.107-1.276 2.558-3.231 2.384-5.462A4.49 4.49 0 0 0 11.453 0"
                                    />
                                </Icon>
                            </IconButton>
                            <IconButton
                                    href={$authStore.user ? '/me' : ''}
                                    on:click={$authStore.user ? () => {} : callOpenSigninModal}
                            >
                                <Icon component={Svg} viewBox="-4 -4 24 24">
                                    <path
                                            d="M12.371 4.4a4.4 4.4 0 1 0-4.4 4.4c2.427-.007 4.393-1.973 4.4-4.4zm-2.66 5.32a5.55 5.55 0 0 1-3.48 0 4.47 4.47 0 0 0-4.88 1.32A7.56 7.56 0 0 0 0 15.4c0 .82.531 1 1.351 1h13.24c.82 0 1.409-.18 1.409-1a7.61 7.61 0 0 0-1.409-4.36 4.48 4.48 0 0 0-4.88-1.32z"
                                    />
                                </Icon>
                            </IconButton>
                            <IconButton>
                                <Icon component={Svg} viewBox="-4 -4 24 24">
                                    <path
                                            d="M6.684 0C3.786 0 1.218 1.867.325 4.623s.091 5.775 2.438 7.474 5.522 1.693 7.862-.016l.283-.207 3.958 3.827c.558.563 1.525-.406.965-.965l-3.956-3.83.207-.283a6.6 6.6 0 0 0 1.285-3.939h0C13.364 2.995 10.374.004 6.684 0zm0 12a5.32 5.32 0 1 1 0-10.64 5.32 5.32 0 0 1 5.32 5.32c-.003 2.937-2.383 5.317-5.32 5.32z"
                                    />
                                </Icon>
                            </IconButton>
                        </Wrapper>
                    </Section>
                </Row>
                <div class="divider" />
                <Row>
                    <Section align="start" class="m-pl-0 m-pr-0">
                        <form class="search-form">
                            <div class="form-control">
                                <Textfield
                                        disabled
                                        variant="outlined"
                                        bind:value={searchResult}
                                        on:click={()=>{openSearchResult= !openSearchResult}}
                                        label="Start with a search"
                                        withTrailingIcon={false}
                                >
                                    <Icon slot="trailingIcon"
                                    ><img src="/img/icons/icon-search.svg" /></Icon
                                    >
                                </Textfield>
                            </div>
                        </form>
                    </Section>
                    <Section align="end" class="list-tags-wrap m-none">
                        <div class="list-tags {!openSearchResult ? '' : 'open'}" on:mouseout={()=>{openSearchResult=false}}>
                            <Button variant="unelevated"
                            ><Label>Beach with Friends</Label></Button
                            >
                            <Button variant="unelevated"
                            ><Label>Destinations - Sea</Label></Button
                            >
                            <Button variant="unelevated"
                            ><Label>Beach with Friends</Label></Button
                            >
                            <Button variant="unelevated"
                            ><Label>Destinations - Sea</Label></Button
                            >
                            <Button variant="unelevated"
                            ><Label>Beach with Friends</Label></Button
                            >
                            <Button variant="unelevated"
                            ><Label>Destinations - Sea</Label></Button
                            >
                        </div>
                    </Section>
                </Row>
                <div class="divider" />
            </div>
            </div>
        </TopAppBar>
    </header>
    <slot />
    <footer class="dark full-width">
        <div class="content-wrap">
            <LayoutGrid>
                <Cell span="6" class="m-block d-none">
                    <div class="widget">
                        <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
                        <div class="widget-content">
                            <p>
                                Exclusive content and special rewards from our travel and fashion
                                partners.
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
                <Cell span="6">
                    <LayoutGrid>
                        <Cell span="5">
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
                        <Cell span="5">
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
                <Cell span="6" class="m-none">
                    <div class="widget pl-50">
                        <h4 class="mt-0 widget-title">Sign Up for Updates</h4>
                        <div class="widget-content">
                            <p>
                                Exclusive content and special rewards from our travel and fashion
                                partners.
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
<BottomAppBar on:openHeaderActionMobile={(event)=>{contentHeaderAction = event.detail.content}}>no content</BottomAppBar>
<HeaderActionMobile bind:content={contentHeaderAction} ></HeaderActionMobile>
<style>
    .wrap-menu-mobile{
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
    }
    .wrap-menu-mobile :global(.mdc-icon-button){
        --mdc-ripple-color: tranparent;
        padding: 12px 0;
        width: auto;
        height: auto;
    }
    @media screen and (max-width: 768px) {
        header .search-form ,header .search-form :global(.mdc-text-field){
            width: 100%;
        }
    }

    :global(#logo){
        line-height: 0;
    }
</style>