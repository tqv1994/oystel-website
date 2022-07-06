<script lang="ts">
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { session } from '$app/stores';
  import Button from '@smui/button';
  import Note from '../components/Note.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import {
    convertTravellerToInput,
    TravellerInput,
    updateTravellerMeStore,
  } from '$lib/store/traveller';
  import type { Traveller } from '$lib/store/traveller';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import * as yup from 'yup';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  import HelperText from '@smui/textfield/helper-text';
  import { ppatchWithFile, ppostWithFile } from '$lib/utils/fetch';
  import type { Country } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  export let travellerMe: Traveller;
  export let countries: Country[], salutationTypes: Kind[];
  let travellerInput: TravellerInput;
  let phone_code: string;
  let oysteo_id_number: string = $session.user?.id || '';
  let errors: any = {};
  let avatarInput: FileList;
  const schemaValidator = yup.object().shape({
    mobilePhone: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .required('Phone number is a required field'),
    phone_code: yup.string().required('Phone code is a required field'),
    birthday: yup
      .string()
      .typeError('Birthday is a required field')
      .required('Birthday is a required field'),
    residence: yup
      .string()
      .typeError('Residence is a required field')
      .required('Residence is a required field'),
    forename: yup
      .string()
      .typeError('Forename is a required field')
      .required('Forename is a required field'),
    surname: yup
      .string()
      .typeError('Surname is a required field')
      .required('Surname is a required field'),
    email: yup
      .string()
      .typeError('Email is a required field')
      .email("Email is not valid")
      .required('Email is a required field'),
  });

  if (travellerMe) {
    travellerInput = convertTravellerToInput(travellerMe);
    travellerInput.email = travellerInput?.email || '';
    travellerMe = travellerMe;
    phone_code =
      (travellerInput?.mobilePhone || '').match(
        createPatternPhoneCode(countries || []),
      ) + '';
    phone_code = phone_code.replace('+', '');
    travellerInput.mobilePhone =
      travellerInput.mobilePhone?.replace('+' + phone_code, '') || '';
  } else {
    travellerInput = new TravellerInput();
    travellerInput.email = $session.user?.email || '';
    travellerInput.mobilePhone = '';
    travellerInput.birthday = '';
    travellerInput.residence = '';
    travellerInput.salutationType = '';
    travellerInput.forename = '';
    travellerInput.surname = '';
  }

  export let is_edit = true;

  async function handleSubmitForm() {
    window.openLoading();
    errors = {};
    try {
      await schemaValidator.validate(
        { ...travellerInput, phone_code },
        { abortEarly: false },
      );
      const formData = new FormData();
      if (avatarInput) {
        let file = avatarInput[0];
        formData.append('files.avatar', file);
      }
      formData.append(
        'data',
        JSON.stringify({
          salutationType: travellerInput.salutationType,
          email: travellerInput.email,
          birthday: travellerInput.birthday,
          forename: travellerInput.forename,
          surname: travellerInput.surname,
          mobilePhone:
            (phone_code ? '+' + phone_code : '') + travellerInput.mobilePhone,
          residence: travellerInput.residence,
        }),
      );
      let res;
      if (travellerMe) {
        res = await ppatchWithFile('travellers/me', formData);
      } else {
        res = await ppostWithFile('travellers/me', formData);
      }
      if (res.ok) {
        travellerMe = await res.json();
        updateTravellerMeStore(travellerMe);
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
    window.closeLoading();
  }
</script>

{#if travellerInput}
  <form on:submit|preventDefault={handleSubmitForm}>
    <FormToggle title="" bind:is_edit>
      <LayoutGrid class="p-0">
        <Cell spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}>
          <Field label="Name*" column_1={4} column_2={8}>
            <div class="row">
              <div class="d-col-4 m-col-4 mb-0">
                <Textfield
                  invalid={errors.forename ? true : false}
                  bind:value={travellerInput.forename}
                  label="Forename"
                  type="text"
                >
                  <HelperText validationMsg slot="helper">
                    {errors?.forename || ''}
                  </HelperText>
                </Textfield>
              </div>
              <div class="d-col-4 m-col-4 mb-0">
                <Textfield
                  invalid={errors.surname ? true : false}
                  bind:value={travellerInput.surname}
                  label="Surname"
                  type="text"
                >
                  <HelperText validationMsg slot="helper">
                    {errors?.surname || ''}
                  </HelperText>
                </Textfield>
              </div>
              <div class="d-col-4 m-col-4 mb-0">
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
          </Field>
          <Field label="Email*" column_1={4} column_2={8}>
            <Textfield
              invalid={errors?.email ? true : false}
              bind:value={travellerInput.email}
              label=""
              type="text"
            >
              <HelperText validationMsg slot="helper">
                {errors?.email || ''}
              </HelperText>
            </Textfield>
          </Field>
          <Field label="Cell Phone*" column_1={4} column_2={8}>
            <div class="row">
              <div class="d-col-4 m-col-3 mb-0">
                <OyAutocomplete
                  key="phone"
                  invalid={errors?.phone_code ? true : false}
                  options={countries}
                  getOptionLabel={(option) =>
                    option ? `${option.name} +${option.phone}` : ''}
                  bind:value={phone_code}
                >
                  {errors?.phone_code || ''}
                </OyAutocomplete>
              </div>
              <div class="d-col-8 m-col-9 mb-0">
                <Textfield
                  invalid={errors?.mobilePhone ? true : false}
                  bind:value={travellerInput.mobilePhone}
                  label=""
                  type="phone"
                >
                  <HelperText validationMsg slot="helper">
                    {errors?.mobilePhone || ''}
                  </HelperText>
                </Textfield>
              </div>
            </div>
          </Field>
          <Field label="Birth date*" column_1={4} column_2={8}>
            <OyDatepicker
              bind:value={travellerInput.birthday}
              invalid={errors?.birthday ? true : false}
            >
              {errors?.birthday || ''}
            </OyDatepicker>
          </Field>
          <Field label="Country of Residence*" column_1={4} column_2={8}>
            <OyAutocomplete
              invalid={errors?.residence ? true : false}
              options={countries}
              getOptionLabel={(option) => (option ? `${option.name}` : '')}
              key="id"
              bind:value={travellerInput.residence}
            >
              {#if errors.residence}
                {errors.residence}
              {/if}
            </OyAutocomplete>
          </Field>
          <Field label="OYSTEO ID NUMBER" column_1={4} column_2={8}>
            <Textfield
              bind:value={oysteo_id_number}
              label=""
              type="text"
              disabled
            />
          </Field>
        </Cell>
        <Cell spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
          <div class="row mb-20">
            <div class="d-col-12 m-col-3">
              <div class="thumbnail user-profile-image dark mb-45">
                <div class="image-cover" style="padding-top: 100%">
                  {#if travellerMe?.avatar}
                    <BlurImage {...travellerMe.avatar} />
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
          <Note />
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
