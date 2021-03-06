<script lang="ts">
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import { onMount, afterUpdate } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Drawer, { Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import { goto } from '$app/navigation';

  let me: User | undefined = $session.user;
  const items = [
    {
      url: '/me/my-account',
      title: 'My Account',
      slug: 'my-account',
    },
    {
      url: '/me/trips',
      title: 'Trips',
      slug: 'trips',
    },
    {
      url: '/me/wishlist',
      title: 'Wishlist',
      slug: 'wishlist',
    },
    {
      url: '/me/travel-advisors',
      title: 'Travel Advisors',
      slug: 'travel-advisors',
    },
    {
      url: '/me/travel-preferences',
      title: 'Travel Preferences',
      slug: 'travel-preferences',
    },
    {
      url: '/me/my-style',
      title: 'My Style',
      slug: 'my-style',
    },
    {
      url: '/me/interests',
      title: 'Interests',
      slug: 'interests',
    },
    {
      url: '/me/privacy-setting',
      title: 'Customer Care',
      slug: 'privacy-setting',
    },
  ];
  export let currentPage: string;
  afterUpdate(() => {});

  onMount(async () => {});

  async function signOut() {
    try {
      const res = await fetch(`/api/auth/sign-out?_z=${Date.now()}`);
      if (res.ok) {
        session.set({ user: undefined });
        goto('/');
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>

{#if me}
  <div class="container margin-auto add-padding account-layout">
    <section class="pb-40 pt-0 account-layout-inner">
      <div class="section-body">
        <LayoutGrid class="pl-0 pr-0">
          <Cell
            spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            class="m-none"
          >
            <Drawer class="m-none">
              <Content>
                <List>
                  {#each items as item}
                    <Item
                      href={item.url}
                      class={currentPage == item.slug ? 'active' : ''}
                    >
                      <Text>{item.title}</Text>
                    </Item>
                  {/each}
                </List></Content
              ></Drawer
            >
          </Cell>
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}>
            <div class="tab-content">
              <slot />
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
  </div>
{/if}

<style lang="scss">
  @use '../../../theme/mixins';
  .account-layout {
    @include mixins.mobile {
      padding: 0 24px;
    }
    .section-body {
      padding-top: 16px;
    }

    &-inner {
      @include mixins.mobile {
        padding-top: 44px !important;
      }
    }
  }

  * :global(.mdc-drawer) {
    background-color: transparent;
  }
  a.text-input {
    text-decoration: underline;
  }
  .section-header {
    position: relative;
    .btn-sign-out {
      position: absolute;
      right: 0;
      top: 30px;
    }
    .btn-edit {
      position: absolute;
      right: 40px;
      top: 25px;
      @include mixins.mobile {
        right: 0;
      }
    }
  }

  .personal-info {
    position: relative;
    padding: 25px 30px;
    border: 1px solid #000;
  }

  * :global(.mdc-drawer .mdc-deprecated-list-item) {
    padding-left: 0;
    margin-left: 0;
    width: max-content;
  }

  * :global(.mdc-drawer) {
    border-color: transparent;
  }

  .travel-detais,
  .email-preferences,
  .section-setting {
    padding: 25px 30px;
    position: relative;
    border: 1px solid #000;
  }

  .mdc-deprecated-list-item.active {
    border-bottom: 1px solid #000;
  }
  @media screen and (max-width: 768px) {
    .user-my-account .section-header .btn-sign-out {
      margin-top: 13px;
      position: static;
      margin-bottom: 20px;
      display: block;
    }
  }
</style>
