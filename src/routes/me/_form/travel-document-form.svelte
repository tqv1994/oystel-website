<script lang="ts">
  import Field from '../components/Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import {
    convertIdentificationToInput,
    Identification,
    IdentificationInput,
    typeOptions,
  } from '$lib/store/identification';
  import { get } from 'svelte/store';
  import { countryStore } from '$lib/store/country';
  import { authStore, User } from '$lib/store/auth';
  import { RELATIVES, RELATIVE_LABELS, Traveller } from '$lib/store/traveller';
  import { cmsUrlPrefix } from '$lib/env';
  import { updateIdentificationData } from '../../identification/update-[id].json';
  import { createIdentificationData } from '../../identification/create.json';
  import { UploadFile } from '$lib/store/upload-file';
  import Text from '../components/Text.svelte';
  import IconButton from '@smui/icon-button';
  import * as yup from 'yup';
  import { sortByName } from '$lib/utils/sort';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  type TravellerRelative = Traveller & {
    relativeType: string;
  };
  export let identification: Identification;
  export let me: User;
  export let open: boolean = false;
  let identificationInput: IdentificationInput;
  if (identification?.id) {
    identificationInput = convertIdentificationToInput(identification);
    if (identificationInput.back.length == 0) {
    }
  } else {
    identificationInput = new IdentificationInput();
    identificationInput.traveller = me.travellerMe.id+"" || '';
    identificationInput.documentId = '';
  }
  const countries = sortByName(Object.values(get(countryStore).items));
  let travellerOptions: TravellerRelative[];
  let imageFront: FileList;
  let imageBack: FileList;
  let imageFrontInput: string = '';
  let imageBackInput: string = '';
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
    if (me.travellerMe) {
      travellerOptions.push({ ...me.travellerMe, relativeType: 'Me' });
      const data: any = me.travellerMe;
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
    errors = {};
    let apiUrl: string = 'create.json';
    let method: string = 'POST';
    if (identification?.id) {
      apiUrl = `update-${identification.id}.json`;
      method = 'PUT';
    }
    try {
      await schemaValidator.validate(identificationInput, {
        abortEarly: false,
      });
      const res = await fetch(`/identification/${apiUrl}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...identificationInput,
        }),
      });
      if (res.ok) {
        if (method == 'POST') {
          const data: createIdentificationData = await res.json();
          identification = data.createIdentification.identification;
        } else {
          const data: updateIdentificationData = await res.json();
          identification = data.updateIdentification.identification;
        }
        if (imageFront) {
          await handleUploadImage(imageFront[0], 'front');
        }
        if (imageBack) {
          await handleUploadImage(imageBack[0], 'back');
        }
        await getTraveller();
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

  async function handleUploadImage(file: File, field: string) {
    const dataArray = new FormData();
    dataArray.append('files', file);
    dataArray.append('ref', 'identification');
    dataArray.append('refId', identification.id + '');
    dataArray.append('field', field);
    const res = await fetch(`${cmsUrlPrefix}/upload`, {
      method: 'POST',
      body: dataArray,
    });
    if (res.ok) {
      const data: UploadFile = await res.json();
      if (field == 'front') {
        identification.front = data;
      }
      {
        identification.back = [data];
      }
    } else {
      window.pushToast('An error occurred');
    }
  }

  async function getTraveller() {
    const res = await fetch(
      `/traveller/${me.travellerMe.id}.json?_z=${Date.now()}`,
    );
    if (res.ok) {
      const data: Traveller = await res.json();
      me.travellerMe = data;
      authStore.set({ user: me });
      open = false;
    }
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
    const res = await fetch(
      `/identification/delete-${identification.id}.json`,
      {
        method: 'DELETE',
      },
    );
    if (res.ok) {
      await getTraveller();
    } else {
      window.pushToast('An error occurred');
    }
  };
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <svelte:component
    this={Field}
    label="Traveler Name*"
    column_1={4}
    column_2={8}
  >
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
      <svelte:component this={Text} class="text-danger text-eyebrow"
        >{errors.traveller}</svelte:component
      >
    {/if}
  </svelte:component>
  <svelte:component
    this={Field}
    label="Document Type*"
    column_1={4}
    column_2={8}
  >
    <Select bind:value={identificationInput.type} label="">
      {#each typeOptions as item}
        <Option value={item.key}>{item.label}</Option>
      {/each}
    </Select>
    {#if errors.type}
      <svelte:component this={Text} class="text-danger text-eyebrow"
        >{errors.type}</svelte:component
      >
    {/if}
  </svelte:component>
  <svelte:component this={Field} label="Document ID*" column_1={4} column_2={8}>
    <Textfield
      bind:value={identificationInput.documentId}
      type="text"
      label=""
    />
    {#if errors.documentId}
      <svelte:component this={Text} class="text-danger text-eyebrow"
        >{errors.documentId}</svelte:component
      >
    {/if}
  </svelte:component>
  <svelte:component this={Field} label="Country*" column_1={4} column_2={8}>
    <OyAutocomplete
      key="id"
      options={countries}
      getOptionLabel={(option) => (option ? `${option.name}` : '')}
      bind:value={identificationInput.country}
    />
    {#if errors.country}
      <svelte:component this={Text} class="text-danger text-eyebrow"
        >{errors.country}</svelte:component
      >
    {/if}
  </svelte:component>
  <svelte:component
    this={Field}
    label="Upload New File Front"
    column_1={4}
    column_2={8}
  >
    {#if !identification?.front}
      <Textfield
        bind:value={imageFrontInput}
        label=""
        type="file"
        bind:files={imageFront}
      />
    {/if}
    {#if identification?.front}
      <svelte:component this={Text}>
        <svelte:component
          this={ButtonUnderline}
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
      </svelte:component>
    {/if}
  </svelte:component>
  <svelte:component
    this={Field}
    label="Upload New File Back"
    column_1={4}
    column_2={8}
  >
    {#if !identification?.back || identification?.back?.length == 0}
      <Textfield
        bind:value={imageBackInput}
        label=""
        type="file"
        bind:files={imageBack}
      />
    {/if}
    {#if identification?.back?.length > 0}
      <svelte:component this={Text}>
        <svelte:component
          this={ButtonUnderline}
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
      </svelte:component>
    {/if}
  </svelte:component>
  <div class="row mt-30 m-none">
    <div class="d-col-4 m-col-12">
      <svelte:component this={Note} />
    </div>
    <div class="d-col-8 m-col-12">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
      <svelte:component
        this={ButtonUnderline}
        type="button"
        class="btn-delete pl-20 pr-20"
        label="Delete Record"
        on:click={handleRemoveIdentification}
      />
    </div>
  </div>
  <div class="row d-none m-block text-center mt-20">
    <div class="m-col-12 mb-30">
      <svelte:component this={Note} />
    </div>
    <div class="m-col-12 mb-10">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
    </div>
    <div class="m-col-12">
      <svelte:component
        this={ButtonUnderline}
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
