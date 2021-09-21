<script lang="ts">
  import authStore from '$lib/stores/auth';
  import { onMount, afterUpdate } from 'svelte';
  import Button, { Label, Icon } from '@smui/button';
  import Checkbox from '@smui/checkbox';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import Textfield from '@smui/textfield';
  import CreateAgencyModal from '$lib/components/modals/CreateAgencyModal.svelte';
  import Drawer, { AppContent, Content } from '@smui/drawer';
  import List, { Item, Text } from '@smui/list';
  import Select, { Option } from '@smui/select';
  import Layout from '$lib/components/common/Layout.svelte';
import { UserModel } from '$lib/models/user';
import { goto } from '$app/navigation';

  let active = 'Account Details';
  let userModel: UserModel;
  let openCreateAgencyModal = false;
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let isEditProfile = false;
  let currentPage = ''
  afterUpdate(() => {
    // console.log($authStore.user);
    // if (!$authStore.user) {
    //   window.location.href = '/';
    // }
    currentPage = location.pathname;
  });

  onMount(async()=>{
    await getData();
  })

  async function getData(){
    const res = await fetch('/api/users/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      if (res.ok) {
        const content = await res.json();
        userModel = new UserModel(content);
        authStore.set({ user:userModel });

        // authModel = authStore.user;
        // doAfterSignup(user);
        return;
        // return goto('/me').then(auth.signOut);
      }else{
        const error = await res.json();
        if(error.statusCode == 401){
            localStorage.setItem('token','');
            authStore.set({ user: undefined });
        }
        goto('/');
      }
  }

  async function onSubmitProfile() {
    // await userAPIService.update(userModel).then((res)=>{
    //     console.log(res);
    // });
    try {
      const res = await fetch('/api/auth/update', {
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
      const res = await fetch('/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      if (res.ok) {
        authStore.set({ user: undefined });
        localStorage.setItem('token', '');
        location.href = '/';
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>
{#if userModel}
  <Layout>
  <div class="content user-dashboard light">
    <div class="container">
      <section class="pt-20 pb-40">
        <LayoutGrid class="p-0">
          <Cell span="12">
            <div class="section-header">
              <p>Welcome to Your Oysteo Account</p>
              <h1 class="mb-0">
                Good afternoon, {userModel.displayName || 'there'}.
              </h1>
              <a
                      href="javascript:void(0)"
                      on:click={signOut}
                      class="btn-sign-out text-input">Sign Out</a
              >
            </div>
            <div class="divider"></div>
          </Cell>
        </LayoutGrid>
        <div class="section-body">
          <LayoutGrid class="pl-0 pr-0 d-pt-90">
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
              <Drawer class="m-none">
                <Content>
                  <List>
                    <Item href="/me" class="{currentPage == '/me' ? 'active' : ''}"><Text>Account Details</Text></Item>
                    <Item href="/me"><Text>Trips</Text></Item>
                    <Item href="/me"><Text>My Advisors</Text></Item>
                    <Item href="/me"><Text>Wishlishs</Text></Item>
                    <Item href="/me"><Text>Preferences</Text></Item>
                    <Item href="/me"><Text>Family & Friends</Text></Item>
                    <Item href="/me"><Text>Support</Text></Item>
                    <Item href="/my-agency"><Text>For advisors</Text></Item>
                  </List></Content
                ></Drawer>
              <div class="d-none m-block text-center mb-35">
                <Select
                        bind:value={currentPage}
                        label=""
                >
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

  .mdc-deprecated-list-item.active{
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
