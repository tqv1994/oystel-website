<script lang="ts">
  import authStore from '$lib/api/auth/store';
  import { onMount, afterUpdate } from 'svelte';
  import Button, { Label, Icon } from '@smui/button';
  import Checkbox from '@smui/checkbox';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import IconButton from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  import { User } from '$lib/api/auth/type';
  import { goto } from '$app/navigation';
  import { stringHelper } from '$lib/helpers';
import { dateTimeHelper } from '$lib/helpers/datetime';

  let me: User | undefined = $authStore.user;
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let isEditProfile = false;

  async function onSubmitProfile() {
    // await userAPIService.update(userModel).then((res)=>{
    //     console.log(res);
    // });
    // try {
    //   const res = await fetch('/api/auth/update', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       token: localStorage.getItem('token'),
    //       data: me,
    //     }),
    //   });
    //   if (res.ok) {
    //     isEditProfile = false;
    //     return;
    //   }
    //   console.error('Error authenticating', res);
    // } catch (error) {
    //   console.error('Create/update user failure', error);
    // }
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
        goto('/');
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }
</script>

{#if me}
  <LayoutGrid class="p-0">
    <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
      <div class="thumbnail user-profile-image dark">
        <div class="image-cover" style="padding-top: 100%">
          <BlurhashImage
            src={stringHelper.getFullUrlImage(me.avatar?.url)}
            hash={me.avatar?.blurHash}
            fadeDuration="1000"
            alt=""
          />
        </div>

        <IconButton class="btn-update-avatar">
          <Icon class="like" component={Svg} viewBox="0 0 40 40">
            <g
              id="Icon_-_Edit"
              data-name="Icon - Edit"
              transform="translate(13.624 32.383) rotate(-135)"
            >
              <circle
                id="Ellipse_43"
                data-name="Ellipse 43"
                cx="20"
                cy="20"
                r="20"
                transform="translate(32.532 13.264) rotate(135)"
                fill="#91421c"
              />
              <path
                id="Polygon_1"
                data-name="Polygon 1"
                d="M3.921,0,7.842,6.535H0Z"
                transform="translate(0.132)"
                fill="#fff"
              />
              <path
                id="Path_312"
                data-name="Path 312"
                d="M0,.018,7.973,0V12.278L0,12.3Z"
                transform="translate(0 7.846)"
                fill="#fff"
              />
              <path
                id="Rectangle_121"
                data-name="Rectangle 121"
                d="M0,0H7.973a0,0,0,0,1,0,0V.987a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V0A0,0,0,0,1,0,0Z"
                transform="translate(0 21.327)"
                fill="#fff"
              />
            </g>
          </Icon>
        </IconButton>
      </div>
    </Cell>
    <Cell
      class="personal-info"
      spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}
    >
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
        {#if me.displayName != '' && me.displayName != null}
          <LayoutGrid class="p-0 pb-15">
            <Cell span="12"
              ><h1 class="mt-0 mb-10">
                {me.displayName}
              </h1></Cell
            >
          </LayoutGrid>
        {/if}
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0 font-weight-bold">Email</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >{me.email || 'Please update'}</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0 font-weight-bold">Birthdate</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >{dateTimeHelper.formatDate(me.birthday) || 'Please update'}</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0 font-weight-bold">Phone</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >{me.phoneNumber || 'Please update'}</Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}
            ><h5 class="mt-0 mb-0 font-weight-bold">Location</h5></Cell
          >
          <Cell spanDevices={{ desktop: 9, phone: 4, tablet: 8 }}
            >{me.location || 'Please update'}</Cell
          >
        </LayoutGrid>
      {/if}
      {#if isEditProfile}
        <p>Update Profile</p>
        <form
          action="/update-profile"
          on:submit|preventDefault={onSubmitProfile}
        >
          <div class="form-control mb-8">
            <Textfield
              style="width: 100%;"
              bind:value={me.displayName}
              label="Full name"
              type="text"
            />
          </div>
          <div class="form-control mb-8">
            <Textfield
              style="width: 100%;"
              bind:value={me.email}
              label="Email address"
              type="email"
            />
          </div>
          <div class="form-control mb-8">
            <Textfield
              style="width: 100%;"
              bind:value={me.birthday}
              label="Birthday"
              type="date"
            />
          </div>
          <div class="form-control mb-8">
            <Textfield
              style="width: 100%;"
              bind:value={me.phoneNumber}
              label="Phone number"
              type="phone"
            />
          </div>
          <div class="form-control mb-20">
            <Textfield
              style="width: 100%;"
              bind:value={me.location}
              label="Location"
              type="text"
            />
          </div>
          <div class="form-control">
            <Button type="submit" variant="outlined">Submit</Button>
          </div>
        </form>
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
          <Cell span="12">Travel Details</Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12"
            ><h5 class="font-weight-bold">
              Medical Conditions & Dietary requirements
            </h5></Cell
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
          <Cell spanDevices={{ desktop: 2, phone: 2, tablet: 4 }}
            ><h5 class="font-weight-bold">Height</h5></Cell
          >
          <Cell spanDevices={{ desktop: 2, phone: 2, tablet: 4 }}
            ><h5 class="font-weight-bold">Weight</h5></Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell spanDevices={{ desktop: 2, phone: 2, tablet: 4 }}>5',7''</Cell>
          <Cell spanDevices={{ desktop: 2, phone: 2, tablet: 4 }}>128 lbs</Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12"
            ><h5 class="font-weight-bold">Assistant Infomation</h5></Cell
          >
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-15">
          <Cell span="12">Full Name, Email, Phone Number</Cell>
        </LayoutGrid>
      </div>
    </Cell>
  </LayoutGrid>
  <LayoutGrid class="p-0 pt-30">
    <Cell span="12">
      <div class="email-preferences">
        <LayoutGrid class="p-0 pb-40">
          <Cell span="12">Email Preferences</Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-35">
          <Cell spanDevices={{ desktop: 1, phone: 1, tablet: 1 }}>
            <Checkbox bind:check={modelEmailPreferences.neverMissADrop} />
          </Cell>
          <Cell spanDevices={{ desktop: 11, phone: 3, tablet: 7 }}>
            <h5 class="mb-15 mt-0 font-weight-bold">Never Miss a Drop</h5>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0 pb-0">
          <Cell spanDevices={{ desktop: 1, phone: 1, tablet: 1 }}>
            <Checkbox bind:check={modelEmailPreferences.curatedForYou} />
          </Cell>
          <Cell spanDevices={{ desktop: 11, phone: 3, tablet: 7 }}>
            <h5 class="mb-15 mt-0 font-weight-bold">Curated For You</h5>
            <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </Cell>
        </LayoutGrid>
      </div>
    </Cell>
  </LayoutGrid>
{/if}

<style lang="scss">
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

  .user-profile-image {
    img,
    div {
      border-radius: 100%;
    }
  }

  @media screen and (max-width: 949px) {
    .user-profile-image {
      max-width: 120px;
      margin: 0 auto;
    }

    .user-profile-image :global(.btn-update-avatar) {
      top: -5px;
      right: -10px;
    }
    :global(.personal-info .mdc-layout-grid) {
      --mdc-layout-grid-gutter-phone: 5px;
    }
  }
</style>
