<script>
  import authStore from '$lib/stores/auth';
  import { onMount, afterUpdate } from 'svelte';
  import Button, { Label, Icon } from '@smui/button';
  import Checkbox from '@smui/checkbox';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import IconButton from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';

  let userModel = $authStore.user;
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let isEditProfile = false;
  afterUpdate(() => {
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

  <LayoutGrid class="p-0">
    <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
      <div class="thumbnail user-profile-image">
        <img src="./img/profile/profile-2.jpg" alt="" />
        <IconButton class="btn-update-avatar">
          <Icon  class="like"  component={Svg} viewBox="0 0 40 40">
              <g id="Icon_-_Edit" data-name="Icon - Edit" transform="translate(13.624 32.383) rotate(-135)">
                <circle id="Ellipse_43" data-name="Ellipse 43" cx="20" cy="20" r="20" transform="translate(32.532 13.264) rotate(135)" fill="#91421c"/>
                <path id="Polygon_1" data-name="Polygon 1" d="M3.921,0,7.842,6.535H0Z" transform="translate(0.132)" fill="#fff"/>
                <path id="Path_312" data-name="Path 312" d="M0,.018,7.973,0V12.278L0,12.3Z" transform="translate(0 7.846)" fill="#fff"/>
                <path id="Rectangle_121" data-name="Rectangle 121" d="M0,0H7.973a0,0,0,0,1,0,0V.987a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V0A0,0,0,0,1,0,0Z" transform="translate(0 21.327)" fill="#fff"/>
              </g>

          </Icon>
        </IconButton>
      </div>
    </Cell>
    <Cell class="personal-info" spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}>
      <a
        href="javascript:void(0)"
        class="btn btn-edit btn-edit-profile text-input"
        on:click={() => {
          isEditProfile = !isEditProfile;
        }}>{!isEditProfile ? 'Edit' : 'Done'}</a
      >
      {#if !isEditProfile}
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12">Personal Information</Cell>
        </LayoutGrid>
          <LayoutGrid class="p-0 pb-15">
            <Cell span="12"
              ><h1 class="mt-0 mb-10">Mrs. Jannice Wohl</h1></Cell
            >
          </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0">Email</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >emailaddress@email.com</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0">Birthdate</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >March 7, 1966</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0">Phone</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >1 555 555 5555</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0">Location</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >NY, USA</Cell
          >
        </LayoutGrid>
      {/if}
    </Cell>
  </LayoutGrid>
  <LayoutGrid class="p-0 pt-30">
    <Cell span="12">
      <div class="travel-detais">
        <a href="#" class="btn btn-edit btn-edit-travel-details text-input"
          >Edit</a
        >
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12">Qualifications</Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12"
            ><h5>Specialties</h5></Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12"><h5>Languages</h5></Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12">French, Italian, English</Cell>
        </LayoutGrid>
      </div>
    </Cell>
  </LayoutGrid>

<style type="text/css">
  a.text-input {
    text-decoration: underline;
  }
  .btn-edit {
    position: absolute;
    right: 40px;
    top: 25px;
  }

  .travel-detais,
  .email-preferences {
    padding: 25px 30px;
    position: relative;
    border: 1px solid #000;
  }
  @media screen and (max-width: 839px) {
    .user-profile-image {
      max-width: 120px;
      margin: 0 auto;
    }

    .user-profile-image :global(.btn-update-avatar) {
      top: -5px;
      right: -10px;
    }
    :global(.personal-info .mdc-layout-grid){
      --mdc-layout-grid-gutter-phone: 5px;
    }
  }
</style>
