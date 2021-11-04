<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch, session, page }) => {
    let me: User | undefined;
    authStore.subscribe(({ user }) => {
      me = user;
    });
    if (typeof me === 'undefined') {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {
      props: { me },
    };
  };
</script>

<script lang="ts">
  import { authStore } from '$lib/store/auth';
  import { onMount, afterUpdate } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import CreateAgencyModal from '$lib/components/modals/CreateAgencyModal.svelte';
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import Select, { Option } from '@smui/select';
  import Layout from '$lib/components/common/Layout.svelte';
  import { goto } from '$app/navigation';
  import { User } from '$lib/store/auth';

  let active = 'Account Details';
  export let me: User;
  let openCreateAgencyModal = false;
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let isEditProfile = false;
  let currentPage = '';
  afterUpdate(() => {
    // console.log($authStore.user);
    // if (!$authStore.user) {
    //   window.location.href = '/';
    // }
    currentPage = location.pathname;
  });

  onMount(async () => {});

  // async function getData() {
  //   const res = await fetch('/users/me.json', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem('token'),
  //     }),
  //   });
  //   if (res.ok) {
  //     const content = await res.json();
  //     me = new UserModel(content);
  //     authStore.set({ user: userModel });

  //     // authModel = authStore.user;
  //     // doAfterSignup(user);
  //     return;
  //     // return goto('/me').then(auth.signOut);
  //   } else {
  //     const error = await res.json();
  //     if (error.statusCode == 401) {
  //       localStorage.setItem('token', '');
  //       authStore.set({ user: undefined });
  //     }
  //     goto('/');
  //   }
  // }

  async function onSubmitProfile() {
    // await userAPIService.update(userModel).then((res)=>{
    //     console.log(res);
    // });
    try {
      const res = await fetch('/auth/update.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          data: userModel,
        }),
      });
      if (res.ok) {
        isEditProfile = false;
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }

  async function signOut() {
    try {
      const res = await fetch('/auth/sign-out.json', {
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
  <Layout>
    <div class="content user-dashboard">
      <div class="container">
        <section class="pt-20 pb-40">
          <LayoutGrid class="p-0">
            <Cell span="12" class="light">
              <div class="section-header">
                <p class="mb-35">Welcome to Your Oysteo Account</p>
                <h1 class="mb-10 mt-0">
                  Good afternoon, {me.name || 'there'}.
                </h1>
                <a href="/sign-out" class="btn-sign-out text-input">Sign Out</a>
              </div>
              <div class="divider" />
            </Cell>
          </LayoutGrid>
          <div class="section-body">
            <LayoutGrid class="pl-0 pr-0 d-pt-90">
              <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
                <Drawer class="m-none">
                  <Content>
                    <List>
                      <Item
                        href="/me"
                        class={currentPage == '/me' ? 'active' : ''}
                        ><Text>Account Details</Text></Item
                      >
                      <Item href="/me"><Text>Trips</Text></Item>
                      <Item href="/me"><Text>My Advisors</Text></Item>
                      <Item href="/me"><Text>Wishlists</Text></Item>
                      <Item href="/me"><Text>Preferences</Text></Item>
                      <Item href="/me"><Text>Family & Friends</Text></Item>
                      <Item href="/me"><Text>Support</Text></Item>
                      <Item href="/my-agency"><Text>For advisors</Text></Item>
                    </List></Content
                  ></Drawer
                >
                <div class="d-none m-block text-center mb-35">
                  <Select bind:value={currentPage} label="">
                    <Option value="/me" selected>Account Details</Option>
                    <Option value="/trips">Trips</Option>
                    <Option value="/my-advisors">My Advisors</Option>
                  </Select>
                </div>
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
    </div>
    <CreateAgencyModal bind:open={openCreateAgencyModal} />
  </Layout>
{/if}

<style type="text/css">
  a.text-input {
    text-decoration: underline;
  }
  .user-dashboard .section-header {
    position: relative;
  }
  .user-dashboard .personal-info {
    position: relative;
    padding: 25px 30px;
    border: 1px solid #000;
  }
  .user-dashboard .section-header .btn-sign-out {
    position: absolute;
    right: 0;
    top: 30px;
  }
  .btn-edit {
    position: absolute;
    right: 40px;
    top: 25px;
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
    .user-dashboard .section-header .btn-sign-out {
      margin-top: 13px;
      position: static;
      margin-bottom: 20px;
      display: block;
    }
  }
</style>
