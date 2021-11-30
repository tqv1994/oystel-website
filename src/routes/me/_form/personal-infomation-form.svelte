<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Field from '../Field.svelte';
  import Select, { Option } from '@smui/select';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { authStore, User } from '$lib/store/auth';
  import Button from '@smui/button/Button.svelte';
  import Note from '../components/Note.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { salutationStore } from '$lib/store/salutation';
  import { get } from 'svelte/store';
  import { updateTravellerData } from '../../traveller/update.json';
  import { countryStore } from '$lib/store/country';
  import {
    convertTravellerToInput,
    Traveller,
    TravellerInput,
  } from '$lib/store/traveller';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import * as yup from 'yup';
  import { onMount } from 'svelte';
  export let me: User;
  const travellerMe: Traveller = me.travellerMe;
  const salutations = Object.values(get(salutationStore).items);
  const countries = Object.values(get(countryStore).items);
  let travellerInput: TravellerInput;
  let name: string;
  let phone_code: string;
  let oysteo_id_number: string = me.id;
  let errors: any = {};
  const schemaValidator = yup.object().shape({
    email: yup.string().required().email(),
    mobilePhone: yup.number().required(),
    birthday: yup.string().required(),
    nationality: yup.string().required(),
  });

  onMount(async () => {
    travellerInput = convertTravellerToInput(travellerMe);
    me.travellerMe = travellerMe;
    phone_code =
      travellerInput?.mobilePhone?.match(createPatternPhoneCode(countries)) +
      '';
    name = travellerInput.forename + ' ' + travellerInput.surname;
    travellerInput.mobilePhone =
      travellerInput.mobilePhone?.replace(phone_code, '') || '';
  });

  export let is_edit: boolean = true;

  async function handleSubmitForm() {
    errors = {};
    try {
      await schemaValidator.validate(travellerInput, { abortEarly: false });
      const res = await fetch(`/traveller/update.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...travellerInput,
          forename: name.split(' ')[0],
          surname: name.split(' ')[1] || '',
          mobilePhone: (phone_code || '') + travellerInput.mobilePhone,
        }),
      });
      if (res.ok) {
        const data: updateTravellerData = await res.json();
        me.travellerMe = data.updateTraveller.traveller;
        is_edit = false;
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
  }
</script>

{#if travellerInput}
  <form on:submit={handleSubmitForm} action="javascript:void(0);">
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
              <div class="d-col-7 m-col-7">
                <Textfield bind:value={name} label="Name" type="text" />
              </div>
              <div class="d-col-5 m-col-5">
                <Select bind:value={travellerInput.salutation} label="">
                  {#each salutations || [] as item}
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
            <Textfield
              bind:value={travellerInput.email}
              label=""
              type="email"
            />
            {#if errors.email}
              <span class="text-danger text-eyebrow">{errors.email}</span>
            {/if}
          </svelte:component>
          <svelte:component
            this={Field}
            label="Cell Phone*"
            column_1={4}
            column_2={8}
          >
            <div class="row">
              <div class="d-col-3 m-col-3">
                <Select bind:value={phone_code} label="">
                  {#each countries as item}
                    <Option value={`+${item.phone}`}>{`+${item.phone}`}</Option>
                  {/each}
                </Select>
              </div>
              <div class="d-col-9 m-col-9">
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
            <Textfield
              bind:value={travellerInput.birthday}
              label=""
              type="date"
            />
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
            <Select bind:value={travellerInput.nationality} label="">
              {#each countries as item}
                <Option value={item.id}>{item.name}</Option>
              {/each}
            </Select>
            {#if errors.nationality}
              <span class="text-danger text-eyebrow">{errors.nationality}</span>
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
          <div class="thumbnail user-profile-image dark mb-45">
            <div class="image-cover" style="padding-top: 100%">
              <BlurImage {...me.avatar} />
            </div>
          </div>
          <div class="text-right">
            <Button variant="unelevated" type="submit">Save Changes</Button>
          </div>
        </Cell>
      </LayoutGrid>
      <svelte:component this={Note} />
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
