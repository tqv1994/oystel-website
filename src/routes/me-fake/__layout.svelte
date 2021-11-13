<script>
  import { authStore } from '$lib/store/auth';
  import { afterUpdate } from 'svelte';
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import CreateAgencyModal from '$lib/components/modals/CreateAgencyModal.svelte';
  import Drawer from '@smui/drawer/Drawer.svelte';
  import Content from '@smui/drawer/Content';
  import List from '@smui/list/List.svelte';
  import Item from '@smui/list/Item.svelte';
  import Text from '@smui/list/Text';
  import Select from '@smui/select/Select.svelte';
  import Option from '@smui/select/Option.svelte';
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
  afterUpdate(() => {
    currentPage = location.pathname;
  });

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

<Layout>
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
                      href="/me-fake"
                      class={currentPage == '/me-fake' ? 'active' : ''}
                      ><Text>Account Details</Text></Item
                    >
                    <Item href="/me-fake"><Text>Trips</Text></Item>
                    <Item href="/me-fake"><Text>My Advisors</Text></Item>
                    <Item href="/me-fake"><Text>Wishlishs</Text></Item>
                    <Item href="/me-fake"><Text>Preferences</Text></Item>
                    <Item href="/me-fake"><Text>Family & Friends</Text></Item>
                    <Item href="/me-fake"><Text>Support</Text></Item>
                    <Item href="/my-agency"><Text>For advisors</Text></Item>
                  </List></Content
                ></Drawer
              >
              <div class="d-none m-block text-center mb-35">
                <Select bind:value={currentPage} label="">
                  <Option value="/me-fake" selected>Account Details</Option>
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
