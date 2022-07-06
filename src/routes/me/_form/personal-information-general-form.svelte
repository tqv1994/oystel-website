<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import {
    convertTravellerToInput,
    ENUM_TRAVELLER_GENDER,
    TravellerInput,
    updateTravellerMeStore,
    type Traveller,
  } from '$lib/store/traveller';
  import * as yup from 'yup';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  import { ppatch } from '$lib/utils/fetch';
  import type { Country } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  export let travellerMe: Traveller;
  export let countries: Country[], languages: Kind[];
  let travellerInput: TravellerInput;
  let errors: any = {};

  const schemaValidator = yup.object().shape({
    country: yup
      .number()
      .typeError("Country is a required field")
      .required('Country is a required field'),
  });

  travellerInput = convertTravellerToInput(travellerMe);
  let homePhoneCode: string =
    (travellerInput.homePhone || '').match(
      createPatternPhoneCode(countries || []),
    ) + '';
  travellerInput.homePhone =
    travellerInput.homePhone?.replace(homePhoneCode, '') || '';
  homePhoneCode = homePhoneCode.replace('+', '');

  let workPhoneCode: string =
    (travellerInput.workPhone || '').match(
      createPatternPhoneCode(countries || []),
    ) + '';
  travellerInput.workPhone =
    travellerInput.workPhone?.replace(workPhoneCode, '') || '';
  workPhoneCode = workPhoneCode.replace('+', '');

  let whatsAppCode: string =
    (travellerInput.whatsapp || '').match(
      createPatternPhoneCode(countries || []),
    ) + '';
  travellerInput.whatsapp =
    travellerInput.whatsapp?.replace(whatsAppCode, '') || '';
  whatsAppCode = whatsAppCode.replace('+', '');

  export let is_edit = true;

  async function handleSubmitForm() {
    window.openLoading();
    errors = {};
    try {
      await schemaValidator.validate(
        { ...travellerInput.address },
        { abortEarly: false },
      );
      const res = await ppatch('travellers/me', {
        gender: travellerInput.gender,
        nationality: travellerInput.nationality,
        passportNumber: travellerInput.passportNumber,
        passportExpiryDate: travellerInput.passportExpiryDate,
        passportPlaceOfIssue: travellerInput.passportPlaceOfIssue,
        instagram: travellerInput.instagram,
        facebook: travellerInput.facebook,
        messenger: travellerInput.messenger,
        whatsapp:
          whatsAppCode && travellerInput.whatsapp
            ? (whatsAppCode ? '+' + whatsAppCode : '') + travellerInput.whatsapp
            : null,
        language: travellerInput.language,
        address: travellerInput.address,
        homePhone:
          homePhoneCode && travellerInput.homePhone
            ? (homePhoneCode ? '+' + homePhoneCode : '') +
              travellerInput.homePhone
            : null,
        workPhone:
          workPhoneCode && travellerInput.workPhone
            ? (workPhoneCode ? '+' + workPhoneCode : '') +
              travellerInput.workPhone
            : null,
      });
      if (res.ok) {
        travellerMe = await res.json();
        updateTravellerMeStore(travellerMe);
        is_edit = false;
      } else {
        window.pushToast('An error occurred');
      }
    } catch (error) {
      if (error.inner) {
        errors = error.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {});
      }else{
        console.log(error);
        window.pushToast('An error occurred');
      }
    }

    window.closeLoading();
  }

  async function handleUpdateTraveller() {}
</script>

{#if travellerInput}
  <form on:submit={handleSubmitForm} action="javascript:void(0);">
    <FormToggle title="" bind:is_edit>
      <Field label="Home Phone" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-4 m-col-3 mb-0">
            <OyAutocomplete
              key="phone"
              options={countries || []}
              getOptionLabel={(option) =>
                option ? `${option.name} +${option.phone}` : ''}
              bind:value={homePhoneCode}
            />
          </div>
          <div class="d-col-8 m-col-9 mb-0">
            <Textfield
              bind:value={travellerInput.homePhone}
              label=""
              type="phone"
            />
          </div>
        </div>
      </Field>
      <Field label="Office Phone" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-4 m-col-3 mb-0">
            <OyAutocomplete
              key="phone"
              options={countries || []}
              getOptionLabel={(option) =>
                option ? `${option.name} +${option.phone}` : ''}
              bind:value={workPhoneCode}
            />
          </div>
          <div class="d-col-8 m-col-9 mb-0">
            <Textfield
              bind:value={travellerInput.workPhone}
              label=""
              type="phone"
            />
          </div>
        </div>
      </Field>
      <Field label="Address Line 1" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.address.line1}
          label=""
          type="text"
        />
      </Field>
      <Field label="Address Line 2" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.address.line2}
          label=""
          type="text"
        />
      </Field>
      <Field label="City" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.address.city}
          label=""
          type="text"
        />
      </Field>
      <Field label="State / Zip Code" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-3 m-col-3 mb-0">
            <Textfield
              bind:value={travellerInput.address.locality}
              label="State"
              type="text"
            />
          </div>
          <div class="d-col-9 m-col-9 mb-0">
            <Textfield
              bind:value={travellerInput.address.postcode}
              label="Zip Code"
              type="text"
            />
          </div>
        </div>
      </Field>
      <Field label="Province" column_1={4} column_2={6}>
        <Textfield bind:value={travellerInput.address.province} type="text" />
      </Field>
      <Field label="Country*" column_1={4} column_2={6}>
        <OyAutocomplete
          invalid={errors?.country ? true : false}
          key="id"
          options={countries || []}
          bind:value={travellerInput.address.country}
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
        >
          {errors?.country || ""}
        </OyAutocomplete>
      </Field>
      <Field label="Language" column_1={4} column_2={6}>
        <OyAutocomplete
          options={(languages || []).map((item) => item.name)}
          bind:value={travellerInput.language}
        />
      </Field>
      <Field label="Gender" column_1={4} column_2={6}>
        <Select bind:value={travellerInput.gender} label="">
          <Option value={ENUM_TRAVELLER_GENDER.Female}
            >{ENUM_TRAVELLER_GENDER.Female}</Option
          >
          <Option value={ENUM_TRAVELLER_GENDER.Male}
            >{ENUM_TRAVELLER_GENDER.Male}</Option
          >
          <Option value={ENUM_TRAVELLER_GENDER.Others}
            >{ENUM_TRAVELLER_GENDER.Others}</Option
          >
        </Select>
      </Field>
      <Field label="Nationality" column_1={4} column_2={6}>
        <OyAutocomplete
          key="id"
          options={countries}
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={travellerInput.nationality}
        />
      </Field>
      <Field label="Passport Number" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.passportNumber}
          label=""
          type="text"
        />
      </Field>
      <Field label="Expiry Date" column_1={4} column_2={6}>
        <OyDatepicker
          bind:value={travellerInput.passportExpiryDate}
          max={new Date(new Date().setFullYear(new Date().getFullYear() + 10))}
        />
      </Field>
      <Field label="Place of Issue" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.passportPlaceOfIssue}
          label=""
          type="text"
        />
      </Field>
      <Field label="Instagram" column_1={4} column_2={6}>
        <Textfield bind:value={travellerInput.instagram} label="" type="text" />
      </Field>
      <Field label="Facebook Username" column_1={4} column_2={6}>
        <Textfield bind:value={travellerInput.facebook} label="" type="text" />
      </Field>
      <Field label="Facebook Messenger" column_1={4} column_2={6}>
        <Textfield bind:value={travellerInput.messenger} label="" type="text" />
      </Field>
      <Field label="WhatsApp Number" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-4 m-col-3 mb-0">
            <OyAutocomplete
              key="phone"
              options={countries || []}
              getOptionLabel={(option) =>
                option ? `${option.name} +${option.phone}` : ''}
              bind:value={whatsAppCode}
            />
          </div>
          <div class="d-col-8 m-col-9 mb-0">
            <Textfield
              bind:value={travellerInput.whatsapp}
              label=""
              type="phone"
            />
          </div>
        </div>
      </Field>
      <div class="d-block m-none text-right">
        <Button variant="unelevated" type="submit">Save Changes</Button>
      </div>
      <div class="d-none m-block text-center">
        <Button variant="unelevated" type="submit">Save Changes</Button>
      </div>
    </FormToggle>
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
