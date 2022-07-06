<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import type { Country } from '$lib/store/country';
  import {
    convertTravellerToInput,
    TravellerInput,
    updateTravellerMeStore,
  } from '$lib/store/traveller';
  import type { Traveller } from '$lib/store/traveller';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import { createPatternPhoneCode } from '$lib/utils/string';
  import { ppatch } from '$lib/utils/fetch';
  import type { Kind } from '$lib/store/category';
  export let travellerMe: Traveller;
  export let countries: Country[], salutationTypes: Kind[], languages: Kind[];
  let travellerInput: TravellerInput;

  travellerInput = convertTravellerToInput(travellerMe);
  let phone_code: string =
    travellerInput?.myAssistantPhone?.match(
      createPatternPhoneCode(countries || []),
    ) + '';
  travellerInput.myAssistantPhone =
    travellerInput.myAssistantPhone?.replace(phone_code, '') || '';
  phone_code = phone_code.replace('+', '');

  let errors: any = {};

  export let is_edit = true;

  async function handleSubmitForm() {
    window.openLoading();
    try {
      const res = await ppatch('travellers/me', {
        myAssistantName: travellerInput.myAssistantName,
        myAssistantSalutationType: travellerInput.myAssistantSalutationType,
        myAssistantLanguage: travellerInput.myAssistantLanguage,
        myAssistantContactNotes: travellerInput.myAssistantContactNotes,
        myAssistantPhone:
          (phone_code ? `+${phone_code}` : '') +
          travellerInput.myAssistantPhone,
      });
      if (res.ok) {
        travellerMe = await res.json();
        updateTravellerMeStore(travellerMe);
        is_edit = false;
      } else {
        console.error({ error });
        window.pushToast('An error occurred');
      }
    } catch (error) {
      window.pushToast('An error occurred');
    }

    window.closeLoading();
  }
</script>

{#if travellerInput}
  <form on:submit|preventDefault={handleSubmitForm}>
    <FormToggle title="" bind:is_edit>
      <Field label="Name" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-7 m-col-7 mb-0">
            <Textfield
              bind:value={travellerInput.myAssistantName}
              label="Name"
              type="text"
            />
          </div>
          <div class="d-col-5 m-col-5 mb-0">
            <Select
              bind:value={travellerInput.myAssistantSalutationType}
              label="Salutation"
            >
              {#each salutationTypes || [] as item}
                <Option value={item.id}>{item.name}</Option>
              {/each}
            </Select>
          </div>
        </div>
      </Field>
      <Field label="Language" column_1={4} column_2={6}>
        <OyAutocomplete
          options={languages}
          getOptionLabel={(option) => option?.name || ''}
          key="id"
          bind:value={travellerInput.myAssistantLanguage}
        />
      </Field>
      <Field label="Phone" column_1={4} column_2={6}>
        <div class="row">
          <div class="d-col-4 m-col-3">
            <OyAutocomplete
              options={countries}
              key="phone"
              getOptionLabel={(option) =>
                option ? `${option.name} +${option.phone}` : ''}
              bind:value={phone_code}
            />
          </div>
          <div class="d-col-8 m-col-9">
            <Textfield
              bind:value={travellerInput.myAssistantPhone}
              label=""
              type="phone"
            />
            {#if errors.phone}
              <span class="text-danger text-eyebrow">{errors.phone}</span>
            {/if}
          </div>
        </div>
      </Field>
      <Field label="Contact Notes" column_1={4} column_2={6}>
        <Textfield
          bind:value={travellerInput.myAssistantContactNotes}
          type="text"
          textarea
        />
      </Field>
      <div class="d-block m-none text-right">
        <Button variant="unelevated" type="submit">Save Changes</Button>
      </div>
      <div class="m-block d-none text-center">
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
