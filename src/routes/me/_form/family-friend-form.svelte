<script lang="ts">
  import Field from '../components/Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  import {
    convertTravellerToInput,
    RELATIVES,
    RELATIVE_LABELS,
    TravellerInput,
    updateRelationshipToTravellerMe,
  } from '$lib/store/traveller';
  import type { Traveller } from '$lib/store/traveller';
  import * as yup from 'yup';
  import { createEventDispatcher } from 'svelte';
  import Text from '../components/Text.svelte';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  import HelperText from '@smui/textfield/helper-text';
  import { pdelete, ppatch, ppost } from '$lib/utils/fetch';
  import type { Kind } from '$lib/store/category';

  export var traveller: Traveller | null;
  export let relationship = '';
  export let salutationTypes: Kind[];
  let travellerInput: TravellerInput;
  let errors: any = {};
  const dispatch = createEventDispatcher();
  console.log(relationship);
  const schemaValidator = yup.object().shape({
    surname: yup.string().required(),
    forename: yup.string().required(),
    birthday: yup.string().required(),
  });
  if (traveller == null) {
    travellerInput = new TravellerInput();
    travellerInput.forename = '';
    travellerInput.surname = '';
  } else {
    travellerInput = convertTravellerToInput(traveller);
  }
  travellerInput.birthday = travellerInput.birthday || '';

  async function handleSubmitForm() {
    window.openLoading();
    errors = {};
    try {
      await schemaValidator.validate(travellerInput, { abortEarly: false });
      let res;
      const formData = {
        surname: travellerInput.surname,
        forename: travellerInput.forename,
        salutationType: travellerInput.salutationType,
        birthday: travellerInput.birthday,
        relationship,
      };
      if (traveller) {
        res = await ppatch(`travellers/${traveller.id}`, formData);
      } else {
        res = await ppost(`travellers`, formData);
      }

      if (res.ok) {
        traveller = await res.json();
        if (traveller) {
          updateRelationshipToTravellerMe(traveller, relationship);
        }
        dispatch('afterSubmit');
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

  async function handleDeleteTraveller() {
    window.openLoading();
    const res = await pdelete(`travellers/${traveller?.id}`);
    if (res.ok) {
      if (traveller) {
        updateRelationshipToTravellerMe(traveller, relationship, true);
      }
      traveller = null;
      dispatch('afterSubmit');
    } else {
      window.pushToast('An error occurred');
    }
    window.closeLoading();
  }
</script>

<form on:submit|preventDefault={handleSubmitForm} class="form pt-20">
  <Field label="Forename*" column_1={4} column_2={8}
    ><div class="row">
      <div class="d-col-4 m-col-6 d-mb-0 m-mb-15">
        <Textfield
          invalid={errors?.forename ? true : false}
          bind:value={travellerInput.forename}
          label="Forename"
          type="text"
        >
          <HelperText validationMsg slot="helper">
            {errors?.forename || ''}
          </HelperText>
        </Textfield>
      </div>
      <div class="d-col-4 m-col-6 d-mb-0 m-mb-15">
        <Textfield
          invalid={errors?.surname ? true : false}
          bind:value={travellerInput.surname}
          label="Surname"
          type="text"
        >
          <HelperText validationMsg slot="helper">
            {errors?.surname || ''}
          </HelperText>
        </Textfield>
      </div>
      <div class="d-col-4 m-col-12 d-mb-0 m-mb-0">
        <Select bind:value={travellerInput.salutationType} label="Salutation">
          {#each salutationTypes as item}
            <Option value={item.id}>{item.name}</Option>
          {/each}
        </Select>
      </div>
    </div>
  </Field>
  <Field label="Relationship*" column_1={4} column_2={8}>
    <Select
      bind:value={relationship}
      label=""
      disabled={traveller?.id ? true : false}
    >
      <Option value={RELATIVES.parents}>{RELATIVE_LABELS.parents}</Option>
      <Option value={RELATIVES.spouse}>{RELATIVE_LABELS.spouse}</Option>
      <Option value={RELATIVES.children}>{RELATIVE_LABELS.children}</Option>
      <Option value={RELATIVES.relatives}>{RELATIVE_LABELS.relatives}</Option>
      <Option value={RELATIVES.partners}>{RELATIVE_LABELS.partners}</Option>
      <Option value={RELATIVES.otherRelations}
        >{RELATIVE_LABELS.otherRelations}</Option
      >
    </Select>
  </Field>
  <Field label="Date of Birth" column_1={4} column_2={8}>
    <OyDatepicker bind:value={travellerInput.birthday} />
    {#if errors.birthday}
      <Text class="text-danger text-eyebrow">{errors.birthday}</Text>
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
      <Button class="btn-delete" type="button" on:click={handleDeleteTraveller}
        ><Label class="text-button2">Delete Record</Label></Button
      >
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
      <Button class="btn-delete" type="button" on:click={handleDeleteTraveller}
        ><Label class="text-button2">Delete Record</Label></Button
      >
    </div>
  </div>
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  form {
    :global(.mdc-text-field),
    :global(.mdc-select) {
      width: 100%;
    }
    :global(.mdc-button.btn-delete) {
      text-decoration: underline;
    }
  }
</style>
