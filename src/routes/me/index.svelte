<script lang="ts">
  import { session } from '$app/stores';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import type { User } from '$lib/store/auth';
  import Title from './components/Title.svelte';
  import Text from './components/Text.svelte';
  import FeaturedImage from '$lib/components/FeaturedImage.svelte';
  import Avatar from '$lib/components/Avatar.svelte';

  const pages = [
    {
      url: '/me/my-account',
      title: 'My Account',
      description: 'View or change your sign-in information.',
    },
    {
      url: '/me/trips',
      title: 'Trips',
      description: 'View all your upcoming trips.',
    },
    {
      url: '/me/wishlist',
      title: 'Wishlist',
      description: 'Add your favorite items to keep track of them.',
    },
    {
      url: '/me/travel-advisors',
      title: 'Travel Advisors',
      description: 'Manage and communicate with your travel advisors.',
    },
    {
      url: '/me/travel-preferences',
      title: 'Travel Preferences',
      description: 'Add and view your travel choices.',
    },
    {
      url: '/me/my-style',
      title: 'My Style',
      description: 'Add and view your style preferences.',
    },
    {
      url: '/me/interests',
      title: 'Interests',
      description:
        'Add and view your interests, so we can tailor experiences to your liking.',
    },
    {
      url: '/me/privacy-setting',
      title: 'Customer Care',
      description: 'View and manage your privacy settings.',
    },
  ];
</script>

{#if $session.user}
  <div class="content account-dashboard-content">
    <section id="header-banner" class="full-width dark">
      <div class="content-wrap">
        <div class="container margin-auto medium-max-width">
          <div class="info">
            {#if $session.travellerMe?.avatar}
              <div class="thumbnail d-mr-20">
                <Avatar
                  avatar={$session.travellerMe.avatar}
                  style="padding-top: 100%"
                />
              </div>
            {/if}
            <div class="meta">
              <p class="m-0">Welcome to Your Oysteo Account</p>
              <h1 class="m-0 d-mt-20 account-dashboard-h1">
                Hello, {$session.travellerMe?.forename || ''}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="dashboard-menu" class="d-pt-60 m-pt-35">
      <div class="container margin-auto medium-max-width">
        <LayoutGrid class="menus-list pt-0 pb-0">
          {#each pages as page}
            <Cell
              spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
              class="menu-item"
            >
              <div class="menu-item-link-wrapper">
                <a href={page.url}>
                  <Title class="large">{page.title}</Title>
                  <Text class="d-mt-20 m-mt-10 large">{page.description}</Text>
                </a>
              </div>
            </Cell>
          {/each}
        </LayoutGrid>
      </div>
    </section>
  </div>
{/if}

<style lang="scss" global>
  @use '../../theme/mixins';
  .account-dashboard-content {
    @import '../../style/partial/thumbnail.scss';

    :global(.menus-list.mdc-layout-grid) {
      padding: 0 !important;
    }

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
      height: 297px;
      background-color: #000;
      background-image: url(/img/profile/banner-me.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
      @include mixins.mobile {
        height: 262px;
      }
      .container {
        position: relative;
        height: 100%;
      }
      .info {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
        padding-bottom: 32px;
        @include mixins.mobile {
        }

        .account-dashboard-h1 {
          font-size: 45px;
          margin-top: 8px !important;
          @include mixins.mobile {
            font-size: 32px;
            line-height: 40px;
          }
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
      padding-bottom: 104px;
      @include mixins.mobile {
        padding-bottom: 44px;
      }
      .menus-list .menu-item {
        border: 1px solid #000;
        padding: 24px 40px;
        min-height: 173px;
        @include mixins.mobile {
          padding: 16px 16px;
          min-height: 159px;
        }

        .menu-item-link-wrapper {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
        }
      }
      .divider:after {
        background-color: #9d9d9d;
      }
    }
  }
</style>
