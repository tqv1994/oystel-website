<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import { onMount, afterUpdate } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import Select, { Option } from '@smui/select';
  import { goto } from '$app/navigation';

  let me: User | undefined = $authStore.user;
  export let currentPage: string;
  afterUpdate(() => {
    // console.log($authStore.user);
    // if (!$authStore.user) {
    //   window.location.href = '/';
    // }
  });

  onMount(async () => {});

  async function signOut() {
    try {
      const res = await fetch('/api/auth/sign-out', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        authStore.set({ user: undefined });
        goto('/');
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>

{#if me}
  <div class="container">
    <section class="pb-40">
      <div class="section-body">
        <LayoutGrid class="pl-0 pr-0 d-pt-150 m-pt-100">
          <Cell
            spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            class="m-none"
          >
            <Drawer class="m-none">
              <Content>
                <List>
                  <Item
                    href="/me/my-account"
                    class={currentPage == 'my-account' ? 'active' : ''}
                    ><Text>My Account</Text></Item
                  >
                  <Item
                    href="/me/trips"
                    class={currentPage == 'trips' ? 'active' : ''}
                    ><Text>Trips</Text></Item
                  >
                  <Item
                    href="/me/wishlist"
                    class={currentPage == 'wishlist' ? 'active' : ''}
                    ><Text>Wishlist</Text></Item
                  >
                  <Item
                    href="/me/travel-advisors"
                    class={currentPage == 'travel-advisors' ? 'active' : ''}
                    ><Text>Travel Advisors</Text></Item
                  >
                  <Item
                    href="/me/travel-preferences"
                    class={currentPage == 'travel-preferences' ? 'active' : ''}
                    ><Text>Travel Preferences</Text></Item
                  >
                  <Item
                    href="/me/my-style"
                    class={currentPage == 'my-style' ? 'active' : ''}
                    ><Text>My Style</Text></Item
                  >
                  <Item
                    href="/me/interests"
                    class={currentPage == 'interests' ? 'active' : ''}
                    ><Text>Interests</Text></Item
                  >
                  <Item
                    href="/me/privacy-setting"
                    class={currentPage == 'privacy-setting' ? 'active' : ''}
                    ><Text>Privacy Setting</Text></Item
                  >
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
