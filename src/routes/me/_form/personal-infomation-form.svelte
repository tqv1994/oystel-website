<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import Autocomplete from '@smui-extra/autocomplete';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { authStore, User } from '$lib/store/auth';
  import Button from '@smui/button';
  import Note from '../components/Note.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { salutationTypeStore } from '$lib/store/salutation-type';
  import { get } from 'svelte/store';
  import { updateTravellerData } from '../../traveller/update-me.json';
  import { Country, countryStore } from '$lib/store/country';
  import {
    convertTravellerToInput,
    Traveller,
    TravellerInput,
  } from '$lib/store/traveller';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import * as yup from 'yup';
  import { onMount } from 'svelte';
  import { UpdateUserData } from '../../auth/update.json';
  import { createTravellerData } from '../../traveller/create.json';
  import { cmsUrlPrefix } from '$lib/env';
  import { UploadFile } from '$lib/store/upload-file';
  import { sortByName } from '$lib/utils/sort';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  export let me: User;
  const travellerMe: Traveller = me.travellerMe;
  const salutationTypes = Object.values(get(salutationTypeStore).items);
  const countries = sortByName(Object.values(get(countryStore).items));
  let travellerInput: TravellerInput;
  let name: string;
  let phone_code: string;
  let oysteo_id_number: string = me.id;
  let errors: any = {};
  let avatarInput: FileList;
  const schemaValidator = yup.object().shape({
    mobilePhone: yup.number().required(),
    birthday: yup.string().required(),
    nationality: yup.string().required(),
  });

  onMount(async () => {
    if (me.travellerMe) {
      travellerInput = convertTravellerToInput(travellerMe);
      travellerInput.email = travellerInput.email || me?.email || '';
      me.travellerMe = travellerMe;
      phone_code =
        travellerInput?.mobilePhone?.match(createPatternPhoneCode(countries)) +
        '';
      phone_code = phone_code.replace('+', '');
      name = travellerInput.forename + ' ' + travellerInput.surname;
      travellerInput.mobilePhone =
        travellerInput.mobilePhone?.replace('+' + phone_code, '') || '';
    } else {
      travellerInput = new TravellerInput();
      name = '';
      travellerInput.email = me?.email || '';
      travellerInput.mobilePhone = '';
      travellerInput.birthday = '';
      travellerInput.nationality = '';
      travellerInput.salutationType = '';
    }
  });

  export let is_edit: boolean = true;

  async function handleSubmitForm() {
    window.openLoading();
    let apiUrl: string = 'create.json';
    let method: string = 'POST';
    if (me.travellerMe) {
      apiUrl = 'update-me.json';
      method = 'PUT';
    }
    errors = {};
    try {
      await schemaValidator.validate(travellerInput, { abortEarly: false });
      const res = await fetch(`/traveller/${apiUrl}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salutationType: travellerInput.salutationType,
          email: travellerInput.email,
          birthday: travellerInput.birthday,
          forename: name.split(' ')[0],
          surname: name.split(' ')[1] || '',
          mobilePhone:
            (phone_code ? '+' + phone_code : '') + travellerInput.mobilePhone,
          residence: travellerInput.residence,
        }),
      });
      if (res.ok) {
        if (me.travellerMe) {
          const data: updateTravellerData = await res.json();
          me.travellerMe = data.updateTraveller.traveller;
          if (avatarInput) {
            handleUploadAvatar(avatarInput[0]);
          } else {
            is_edit = false;
          }
        } else {
          const data: createTravellerData = await res.json();
          me.travellerMe = data.createTraveller.traveller;
          handleUpdateMe();
        }
      } else {
        window.pushToast('An error occurred');
      }
    } catch (err) {
      if (err.inner) {
        errors = err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {});
      }
    }
    window.closeLoading();
  }

  async function handleUpdateMe() {
    const res = await fetch(`/auth/update.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        travellerMe: me.travellerMe.id,
      }),
    });
    if (res.ok) {
      const data: UpdateUserData = await res.json();
      me = data.updateUser.user;
      if (avatarInput) {
        handleUploadAvatar(avatarInput[0]);
      } else {
        authStore.set({ user: me });
        is_edit = false;
      }
    } else {
      window.pushToast('An error occurred');
    }
  }

  async function handleUploadAvatar(file: File) {
    const dataArray = new FormData();
    dataArray.append('files', file);
    dataArray.append('ref', 'user');
    dataArray.append('source', 'users-permissions');
    dataArray.append('refId', me.id + '');
    dataArray.append('field', 'avatar');
    const res = await fetch(`${cmsUrlPrefix}/upload`, {
      method: 'POST',
      body: dataArray,
    });
    if (res.ok) {
      const data: UploadFile[] = await res.json();
      console.log(data);
      me.avatar = data[0];
      authStore.set({ user: me });
      is_edit = false;
    } else {
      window.pushToast('An error occurred');
    }
  }
</script>

{#if travellerInput}
  <form on:submit|preventDefault={handleSubmitForm}>
    <svelte:component this={FormToggle} title="" bind:is_edit>
      <LayoutGrid class="p-0">
        <Cell spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}>
          <svelte:component
            this={Field}
            label="Name*"
            column_1={4}
            column_2={8}
          >
            <div class="row">
              <div class="d-col-7 m-col-7 mb-0">
                <Textfield bind:value={name} label="Name" type="text" />
              </div>
              <div class="d-col-5 m-col-5 mb-0">
                <Select
                  bind:value={travellerInput.salutationType}
                  label="Salutation"
                >
                  {#each salutationTypes || [] as item}
                    <Option value={item.id}>{item.name}</Option>
                  {/each}
                </Select>
              </div>
            </div>
          </svelte:component>
          <svelte:component
            this={Field}
            label="Email*"
            column_1={4}
            column_2={8}
          >
            <Textfield bind:value={me.email} label="" type="email" />
          </svelte:component>
          <svelte:component
            this={Field}
            label="Cell Phone*"
            column_1={4}
            column_2={8}
          >
            <div class="row">
              <div class="d-col-4 m-col-3 mb-0">
                <OyAutocomplete
                  key="phone"
                  options={countries}
                  getOptionLabel={(option) =>
                    option ? `${option.name} +${option.phone}` : ''}
                  bind:value={phone_code}
                />
              </div>
              <div class="d-col-8 m-col-9 mb-0">
                <Textfield
                  bind:value={travellerInput.mobilePhone}
                  label=""
                  type="phone"
                />
                {#if errors.mobilePhone}
                  <span class="text-danger text-eyebrow"
                    >{errors.mobilePhone}</span
                  >
                {/if}
              </div>
            </div>
          </svelte:component>
          <svelte:component
            this={Field}
            label="Birth date*"
            column_1={4}
            column_2={8}
          >
            <OyDatepicker bind:value={travellerInput.birthday} />
            {#if errors.birthday}
              <span class="text-danger text-eyebrow">{errors.birthday}</span>
            {/if}
          </svelte:component>
          <svelte:component
            this={Field}
            label="Country of Residence*"
            column_1={4}
            column_2={8}
          >
            <OyAutocomplete
              options={countries}
              getOptionLabel={(option) => (option ? `${option.name}` : '')}
              key="id"
              bind:value={travellerInput.residence}
            />
            {#if errors.residence}
              <span class="text-danger text-eyebrow">{errors.residence}</span>
            {/if}
          </svelte:component>
          <svelte:component
            this={Field}
            label="OYSTEO ID NUMBER"
            column_1={4}
            column_2={8}
          >
            <Textfield
              bind:value={oysteo_id_number}
              label=""
              type="text"
              disabled
            />
          </svelte:component>
        </Cell>
        <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
          <div class="row mb-20">
            <div class="d-col-12 m-col-3">
              <div class="thumbnail user-profile-image dark mb-45">
                <div class="image-cover" style="padding-top: 100%">
                  {#if me.avatar}
                    <BlurImage {...me.avatar} />
                  {:else}
                    <BlurImage url={'/img/me/avatar-default.png'} blurHash="" />
                  {/if}
                </div>
              </div>
            </div>
            <div class="d-col-12 m-col-9">
              <Textfield
                value=""
                label=""
                type="file"
                bind:files={avatarInput}
              />
            </div>
          </div>
        </Cell>
      </LayoutGrid>
      <div class="row">
        <div class="d-col-6 m-col-12 m-mb-15">
          <svelte:component this={Note} />
        </div>
        <div class="d-col-6 m-col-12">
          <div class="d-block m-none text-right">
            <Button variant="unelevated" type="submit">Save Changes</Button>
          </div>
          <div class="text-center d-none m-block">
            <Button variant="unelevated" type="submit">Save Changes</Button>
          </div>
        </div>
      </div>
    </svelte:component>
  </form>
{/if}
<OyNotification />

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  .user-profile-image {
    :global(img),
    :global(div) {
      border-radius: 100%;
    }
    @include mixins.mobile {
      padding: 0;
      max-width: 120px;
    }
  }
</style>
