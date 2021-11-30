<script lang="ts">
  import Layout from '$lib/components/common/Layout.svelte';
  import { authStore } from '$lib/store/auth';
  import Button from '@smui/button';
  import { Icon } from '@smui/common';
  import Checkbox from '@smui/checkbox';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import IconButton from '@smui/icon-button';
  import Svg from '@smui/common/elements/Svg.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { User } from '$lib/store/auth';
  import { goto } from '$app/navigation';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import Title from './components/Title.svelte';
  import Text from './components/Text.svelte';

  let me: User | undefined = $authStore.user;
  let configPage = {
    header: {
      page: 'me-dashboard',
      transparent: true,
      theme: 'dark',
    },
  };
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
</script>

{#if me}
  <div class="content account-dashboard-content">
    <section id="header-banner" class="full-width dark">
      <div class="content-wrap">
        <div class="container">
          <div class="info">
            <div class="thumbnail d-mr-20">
              <div class="image-cover" style="padding-top: 100%">
                <BlurImage {...me.avatar} />
              </div>
            </div>
            <div class="meta">
              <p class="m-0">Welcome to Your Oysteo Account</p>
              <h1 class="m-0 d-mt-20">Hello, {me.name || me.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="dashboard-menu" class="d-pt-60 d-pb-90 m-pt-35 m-pb-60">
      <LayoutGrid class="menus-list pt-0 pb-0">
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/my-account">
            <svelte:component this={Title} class="mb-10 large"
              >My Account</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Edit your personal information and update travel documents
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/trips">
            <svelte:component this={Title} class="mb-10 large"
              >Trips</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/wishlist">
            <svelte:component this={Title} class="mb-10 large"
              >Wishlist</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/travel-advisors">
            <svelte:component this={Title} class="mb-10 large"
              >Travel Advisors</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/travel-preferences">
            <svelte:component this={Title} class="mb-10 large"
              >Travel Preferences</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/my-style">
            <svelte:component this={Title} class="mb-10 large"
              >My Style</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/interests">
            <svelte:component this={Title} class="mb-10 large"
              >Interests</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href="/me/privacy-setting">
            <svelte:component this={Title} class="mb-10 large"
              >Privacy Settings</svelte:component
            >
            <div class="divider" />
            <svelte:component this={Text} class="d-mt-30 m-mt-20 large">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </svelte:component>
          </a>
        </Cell>
      </LayoutGrid>
    </section>
  </div>
{/if}

<style lang="scss" global>
  @use '../../theme/mixins';
  .account-dashboard-content {
    @import '../../style/partial/thumbnail.scss';

    .filter-color {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 253px;
      @include mixins.mobile {
        height: 100px;
      }
      z-index: 2;
      background: #181919;
      background: linear-gradient(180deg, #181919 0%, rgba(0, 0, 0, 0) 100%);
    }
    #header-banner {
      --mdc-typography-headline1-line-height: 60px;
      height: 385px;
      background-color: #000;
      background-image: url(./img/profile/banner-me.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
      .container {
        position: relative;
        height: 100%;
      }
      .info {
        position: absolute;
        bottom: 40px;
        @include mixins.mobile {
          bottom: 15px;
        }
        .thumbnail {
          display: inline-block;
          .image-cover {
            width: 123px;
            @include mixins.mobile {
              width: 63px;
            }
            border-radius: 50%;
          }
        }
        .meta {
          @include mixins.desktop {
            display: inline-block;
          }
        }
      }
    }
    #dashboard-menu {
      --mdc-layout-grid-margin-desktop: 124px;
      --mdc-layout-grid-gutter-phone: 20px;
      .menus-list .menu-item {
        border: 1px solid #000;
        padding: 20px 40px 35px;
        @include mixins.mobile {
          padding: 20px;
        }
      }
      .menus-list .menu-item {
        p {
          @include mixins.desktop {
            width: 90%;
          }
        }
      }
      .divider:after {
        background-color: #9d9d9d;
      }
    }
  }
</style>
