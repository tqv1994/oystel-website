<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { get } from 'svelte/store';
  import { updateTravellerData } from '../../traveller/update-me.json';
  import { countryStore } from '$lib/store/country';
  import {
    convertTravellerToInput,
    TravellerInput,
  } from '$lib/store/traveller';
  import { onMount } from 'svelte';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import { AddressInput, convertAddressToInput } from '$lib/store/address';
  import { createAddressData } from '../../address/create.json';
  export let me: User;
  const countries = Object.values(get(countryStore).items);
  const travellerInput: TravellerInput = convertTravellerToInput(
    me.travellerMe,
  );
  let homePhoneCode: string =
    travellerInput.homePhone?.match(createPatternPhoneCode(countries)) + '';
  travellerInput.homePhone =
    travellerInput.homePhone?.replace(homePhoneCode, '') || '';
  let workPhoneCode: string =
    travellerInput.workPhone?.match(createPatternPhoneCode(countries)) + '';
  travellerInput.workPhone =
    travellerInput.workPhone?.replace(workPhoneCode, '') || '';

  let addressInput: AddressInput;
  if (me.travellerMe?.addresses[0]) {
    addressInput = convertAddressToInput(me.travellerMe?.addresses[0]);
  } else {
    addressInput = {
      line1: '',
      line2: '',
      locality: '',
      zipcode: '',
      city: '',
      country: '',
      province: '',
    };
  }
  let gender: string = 'Female';
  let passportNumber: string = 'XXXXXXXX';
  let expiryDate: string = 'XX/XX/XXXX';
  let placeOfIssue: string = '';

  onMount(async () => {});

  export let is_edit: boolean = true;

  async function handleSubmitForm() {
    let apiUrl = `create.json`;
    let method = 'POST';
    if (travellerInput.addresses[0]) {
      apiUrl = `update-${travellerInput.addresses[0]}.json`;
      method = 'PUT';
    }
    const res = await fetch(`/address/${apiUrl}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...addressInput,
      }),
    });
    if (res.ok) {
      if (!travellerInput.addresses[0]) {
        const data: createAddressData = await res.json();
        travellerInput.addresses.push(data.createAddress.address.id);
      }
      await handleUpdateTraveller();
    } else {
      window.pushToast('An error occurred');
    }
  }

  async function handleUpdateTraveller() {
    const res = await fetch(`/traveller/update-me.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...travellerInput,
        homePhone: (homePhoneCode || '') + travellerInput.homePhone,
        workPhone: (workPhoneCode || '') + travellerInput.workPhone,
      }),
    });
    if (res.ok) {
      const data: updateTravellerData = await res.json();
      me.travellerMe = data.updateTraveller.traveller;
      is_edit = false;
    } else {
      window.pushToast('An error occurred');
    }
  }
</script>

<form on:submit={handleSubmitForm} action="javascript:void(0);">
  <svelte:component this={FormToggle} title="" bind:is_edit>
    <svelte:component
      this={Field}
      label="Home Phone*"
      column_1={4}
      column_2={8}
    >
      <div class="row">
        <div class="d-col-3 m-col-3">
          <Select bind:value={homePhoneCode} label="">
            {#each countries as item}
              <Option value={`+${item.phone}`}>{`+${item.phone}`}</Option>
            {/each}
          </Select>
        </div>
        <div class="d-col-9 m-col-9">
          <Textfield
            bind:value={travellerInput.homePhone}
            label=""
            type="phone"
          />
        </div>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Office Phone*"
      column_1={4}
      column_2={8}
    >
      <div class="row">
        <div class="d-col-3 m-col-3">
          <Select bind:value={workPhoneCode} label="">
            {#each countries as item}
              <Option value={`+${item.phone}`}>{`+${item.phone}`}</Option>
            {/each}
          </Select>
        </div>
        <div class="d-col-9 m-col-9">
          <Textfield
            bind:value={travellerInput.workPhone}
            label=""
            type="phone"
          />
        </div>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Address Line 1"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={addressInput.line1} label="" type="text" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="Address Line 2"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={addressInput.line2} label="" type="text" />
    </svelte:component>
    <svelte:component this={Field} label="City" column_1={4} column_2={8}>
      <Textfield bind:value={addressInput.city} label="" type="text" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="State / Zip Code"
      column_1={4}
      column_2={8}
    >
      <div class="row">
        <div class="d-col-3 m-col-3">
          <Textfield
            bind:value={addressInput.locality}
            label="State"
            type="text"
          />
        </div>
        <div class="d-col-9 m-col-9">
          <Textfield
            bind:value={addressInput.zipcode}
            label="Zip Code"
            type="text"
          />
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Province" column_1={4} column_2={8}>
      <Textfield bind:value={addressInput.province} type="text" />
    </svelte:component>
    <svelte:component this={Field} label="Country" column_1={4} column_2={8}>
      <Select bind:value={addressInput.country} label="">
        {#each countries as item}
          <Option value={item.id}>{item.name}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
      <Textfield bind:value={travellerInput.language} label="" type="text" />
    </svelte:component>
    <svelte:component this={Field} label="Gender" column_1={4} column_2={8}>
      <Select bind:value={gender} label="">
        <Option value="Female">Female</Option>
        <Option value="Male">Male</Option>
      </Select>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Nationality"
      column_1={4}
      column_2={8}
    >
      <Select bind:value={travellerInput.nationality} label="">
        {#each countries as item}
          <Option value={item.id}>{item.name}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Passport Number"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={passportNumber} label="" type="text" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="Expiry Date"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={expiryDate} label="" type="date" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="Place of Issue"
      column_1={4}
      column_2={8}
    >
      <Select bind:value={placeOfIssue} label="">
        {#each countries as item}
          <Option value={item.id}>{item.name}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="Instagram" column_1={4} column_2={8}>
      <Textfield bind:value={travellerInput.instagram} label="" type="text" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="Facebook Username"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={travellerInput.facebook} label="" type="text" />
    </svelte:component>
    <svelte:component
      this={Field}
      label="WhatsApp Number"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={travellerInput.whatsapp} label="" type="text" />
    </svelte:component>
    <div class="text-center">
      <Button variant="unelevated" type="submit">Save Changes</Button>
    </div>
  </svelte:component>
</form>
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
