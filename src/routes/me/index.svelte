<script lang="ts">
  import { authStore } from '$lib/store/auth';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { User } from '$lib/store/auth';
  import Title from './components/Title.svelte';
  import Text from './components/Text.svelte';

  let me: User | undefined = $authStore.user;
  const pages = [
    {
      url:'/me/my-account',
      title:'My Account',
      description:'Edit your personal information and update travel documents.'
    },
    {
      url:'/me/trips',
      title:'Trips',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/wishlist',
      title:'Wishlist',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/travel-advisors',
      title:'Travel Advisors',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/travel-preferences',
      title:'Travel Preferences',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/my-style',
      title:'My Style',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/interests',
      title:'Interests',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
    {
      url:'/me/privacy-setting',
      title:'Privacy Settings',
      description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
    },
  ];
</script>

{#if me}
  <div class="content account-dashboard-content">
    <section id="header-banner" class="full-width dark">
      <div class="content-wrap">
        <div class="container">
          <div class="info">
            <div class="thumbnail d-mr-20">
              <div class="image-cover" style="padding-top: 100%">
                {#if me.avatar}
                <BlurImage {...me.avatar} />
                {/if}
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
        {#each pages as page}
        <Cell
          spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}
          class="menu-item"
        >
          <a href={page.url}>
            <Title class="mb-10 large">{page.title}</Title>
            <div class="divider" />
            <Text class="d-mt-30 m-mt-20 large">{page.description}</Text>
          </a>
        </Cell>
        {/each}
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
      background-image: url(/img/profile/banner-me.jpg);
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
