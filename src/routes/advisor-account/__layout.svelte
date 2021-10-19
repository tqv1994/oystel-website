<script>
  import authStore from '$lib/api/auth/store';
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

  let active = 'Account Details';
  let userModel = $authStore.user;
  let openCreateAgencyModal = false;
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let isEditProfile = false;
  let currentPage = '';
  let configPage = {
    header: {
      page: 'advisor-account',
      transparent: false,
      theme: 'light',
    },
  };
  afterUpdate(() => {
    // console.log($authStore.user);
    // if (!$authStore.user) {
    //   window.location.href = '/';
    // }
    currentPage = location.pathname;
  });

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
        location.href = '/';
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>

<Layout config={configPage}>
  <div class="content user-dashboard light">
    <div class="container">
      <section class="pt-20 pb-40">
        <LayoutGrid class="p-0">
          <Cell span="12">
            <div class="section-header">
              <p>Welcome to Your Oysteo Account</p>
              <h1 class="mb-0">Good afternoon, Aureta.</h1>
              <a
                href="javascript:void(0)"
                on:click={signOut}
                class="btn-sign-out text-input">Sign Out</a
              >
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
                      href="/advisor-account"
                      class={currentPage == '/advisor-account' ? 'active' : ''}
                      ><Text>Account Details</Text></Item
                    >
                    <Item href="/advisor-account"
                      ><Text>Destinations</Text></Item
                    >
                    <Item href="/advisor-account"><Text>Experiences</Text></Item
                    >
                    <Item href="/advisor-account"><Text>Travellers</Text></Item>
                    <Item href="/advisor-account"><Text>Documents</Text></Item>
                    <Item href="/advisor-account"><Text>Support</Text></Item>
                  </List></Content
                ></Drawer
              >
              <div class="d-none m-block text-center mb-35">
                <Select bind:value={currentPage} label="">
                  <Option value="/advisor-account" selected
                    >Account Details</Option
                  >
                  <Option value="/destinations">Destinations</Option>
                  <Option value="/experiences">Experiences</Option>
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
