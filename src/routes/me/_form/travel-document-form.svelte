<script lang="ts">
  import Field from '../components/Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import {
    convertIdentificationToInput,
    type Identification,
    IdentificationInput,
    typeOptions,
  } from '$lib/store/identification';
  import { get } from 'svelte/store';
  import { countryStore, type Country } from '$lib/store/country';
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import {
    RELATIVES,
    RELATIVE_LABELS,
    updateIdentificationToTravellerMe,
    type Traveller,
  } from '$lib/store/traveller';
  import { cmsUrlPrefix } from '$lib/env';
  import type { UploadFile } from '$lib/store/upload-file';
  import Text from '../components/Text.svelte';
  import IconButton from '@smui/icon-button';
  import * as yup from 'yup';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import { pdelete, ppatchWithFile, ppostWithFile } from '$lib/utils/fetch';
  type TravellerRelative = Traveller & {
    relativeType: string;
  };
  export let identification: Identification | undefined;
  export let travellerMe: Traveller;
  export let countries: Country[];
  export let open = false;
  let identificationInput: IdentificationInput;
  if (identification?.id) {
    identificationInput = convertIdentificationToInput(identification);
    if (identificationInput.back.length == 0) {
    }
  } else {
    identificationInput = new IdentificationInput();
    identificationInput.traveller = travellerMe.id + '' || '';
    identificationInput.documentId = '';
  }
  let travellerOptions: TravellerRelative[];
  let imageFront: FileList;
  let imageBack: FileList;
  let imageFrontInput = '';
  let imageBackInput = '';
  let errors: any = {};
  const schemaValidator = yup.object().shape({
    traveller: yup.number().required(),
    type: yup.string().required(),
    documentId: yup.string().required(),
    country: yup.string().required(),
  });

  getTravellerOptions();

  function getTravellerOptions() {
    travellerOptions = [];
    if (travellerMe) {
      travellerOptions.push({ ...travellerMe, relativeType: 'Me' });
      const data: any = travellerMe;
      for (let relativeType in RELATIVES) {
        if (data[relativeType] && relativeType === 'children') {
          travellerOptions.push({ ...data[relativeType], relativeType });
        } else {
          if (data[relativeType]) {
            data[relativeType].map((traveller: Traveller) => {
              travellerOptions.push({ ...traveller, relativeType });
            });
          }
        }
      }
    }
  }

  async function handleSubmitForm() {
    window.openLoading();
    errors = {};
    try {
      await schemaValidator.validate(identificationInput, {
        abortEarly: false,
      });
      const formData = new FormData();
      if (imageFront) {
        let file = imageFront[0];
        formData.append('files.front', file);
      }
      if (imageBack) {
        let file = imageBack[0];
        formData.append('files.back', file);
      }
      formData.append('data', JSON.stringify(identificationInput));
      let res;
      if (identification?.id) {
        res = await ppatchWithFile(
          `identifications/${identification.id}`,
          formData,
        );
      } else {
        res = await ppostWithFile(`identifications`, formData);
      }
      if (res.ok) {
        updateIdentificationToTravellerMe(await res.json());
        open = false;
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

  const handleClearImage = (field: string) => {
    const data: any = null;
    if (field == 'front') {
      identification.front = data;
    }
    if (field == 'back') {
      identification.back = [];
    }
  };

  const handleRemoveIdentification = async () => {
    window.openLoading();
    const res = await pdelete(`identifications/${identification.id}`);
    if (res.ok) {
      updateIdentificationToTravellerMe(await res.json(), true);
      open = false;
    } else {
      window.pushToast('An error occurred');
    }
    window.closeLoading();
  };
</script>

<form on:submit|preventDefault={handleSubmitForm} class="form pt-20">
  <Field label="Traveler Name*" column_1={4} column_2={8}>
    <OyAutocomplete
      options={travellerOptions}
      key="id"
      bind:value={identificationInput.traveller}
      getOptionLabel={(option) =>
        option
          ? `${option.forename || ''} ${option.surname || ''} - ${
              RELATIVE_LABELS[option.relativeType] || option.relativeType
            }`
          : ''}
    />
    {#if errors.traveller}
      <Text class="text-danger text-eyebrow">{errors.traveller}</Text>
    {/if}
  </Field>
  <Field label="Document Type*" column_1={4} column_2={8}>
    <Select bind:value={identificationInput.type} label="">
      {#each typeOptions as item}
        <Option value={item.key}>{item.label}</Option>
      {/each}
    </Select>
    {#if errors.type}
      <Text class="text-danger text-eyebrow">{errors.type}</Text>
    {/if}
  </Field>
  <Field label="Document ID*" column_1={4} column_2={8}>
    <Textfield
      bind:value={identificationInput.documentId}
      type="text"
      label=""
    />
    {#if errors.documentId}
      <Text class="text-danger text-eyebrow">{errors.documentId}</Text>
    {/if}
  </Field>
  <Field label="Country*" column_1={4} column_2={8}>
    <OyAutocomplete
      key="id"
      options={countries}
      getOptionLabel={(option) => (option ? `${option.name}` : '')}
      bind:value={identificationInput.country}
    />
    {#if errors.country}
      <Text class="text-danger text-eyebrow">{errors.country}</Text>
    {/if}
  </Field>
  <Field label="Upload New File Front" column_1={4} column_2={8}>
    {#if !identification?.front}
      <Textfield
        bind:value={imageFrontInput}
        label=""
        type="file"
        bind:files={imageFront}
      />
    {/if}
    {#if identification?.front}
      <Text>
        <ButtonUnderline
          label="See detail"
          href={identification.front.url}
          target="_blank"
        />
        <IconButton
          class="material-icons p-0"
          type="button"
          on:click={() => {
            handleClearImage('front');
          }}>close</IconButton
        >
      </Text>
    {/if}
  </Field>
  <Field label="Upload New File Back" column_1={4} column_2={8}>
    {#if !identification?.back || identification?.back?.length == 0}
      <Textfield
        bind:value={imageBackInput}
        label=""
        type="file"
        bind:files={imageBack}
      />
    {/if}
    {#if identification?.back?.length > 0}
      <Text>
        <ButtonUnderline
          label="See detail"
          href={identification.back[0]?.url}
          target="_blank"
        />
        <IconButton
          class="material-icons p-0"
          type="button"
          on:click={() => {
            handleClearImage('back');
          }}>close</IconButton
        >
      </Text>
    {/if}
  </Field>
  <div class="row mt-30 m-none">
    <div class="d-col-4 m-col-12">
      <Note />
    </div>
    <div class="d-col-8 m-col-12">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
      <ButtonUnderline
        class="btn-delete pl-20 pr-20"
        label="Delete Record"
        type="button"
        on:click={handleRemoveIdentification}
      />
    </div>
  </div>
  <div class="row d-none m-block text-center mt-20">
    <div class="m-col-12 mb-30">
      <Note />
    </div>
    <div class="m-col-12 mb-10">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
    </div>
    <div class="m-col-12">
      <ButtonUnderline
        class="btn-delete"
        type="button"
        label="Delete Record"
        on:click={handleRemoveIdentification}
      />
    </div>
  </div>
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  @use '../../../theme/colors';
  form {
    :global(.mdc-text-field),
    :global(.mdc-select) {
      width: 100%;
    }
    :global(.mdc-button.btn-delete) {
      text-decoration: underline;
    }
    :global(input[type='file']::file-selector-button) {
      padding: 7px;
      background-color: #9d9d9d;
      color: #fff;
      border: none;
    }
    :global(input[type='file']::file-selector-button:active) {
      padding: 7px;
      background-color: #{colors.$black};
      color: #fff;
      border: none;
    }
    :global(.mdc-icon-button) {
      position: relative;
      top: 10px;
    }
  }
</style>
