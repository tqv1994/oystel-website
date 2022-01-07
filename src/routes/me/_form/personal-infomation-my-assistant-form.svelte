<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button';
  import Note from '../components/Note.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { salutationTypeStore } from '$lib/store/salutation-type';
  import { get } from 'svelte/store';
  import { countryStore } from '$lib/store/country';
  import { Traveller } from '$lib/store/traveller';
  import * as yup from 'yup';
  import { sortByName } from '$lib/utils/sort';
import { languageStore } from '$lib/store/language';
import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  export let me: User;
  const travellerMe: Traveller = me.travellerMe;
  const salutationTypes = Object.values(get(salutationTypeStore).items);
  const countries = sortByName(Object.values(get(countryStore).items));
  const languages = sortByName(Object.values(get(languageStore).items));
  let name: string = '';
  let phone: string = '';
  let phone_code: string = '1';
  let language: string = 'English';
  let contactNotes: string = '';
  let salutationType: string = '1';
  let errors: any = {};
  const schemaValidator = yup.object().shape({
    surname: yup.number().required(),
    forename: yup.number().required(),
    phone: yup.string().required(),
    nationality: yup.string().required(),
  });

  export let is_edit: boolean = true;

  async function handleSubmitForm() {}
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <svelte:component this={FormToggle} title="" bind:is_edit>
    <svelte:component this={Field} label="Name" column_1={4} column_2={6}>
      <div class="row">
        <div class="d-col-7 m-col-7">
          <Textfield bind:value={name} label="Name" type="text" />
        </div>
        <div class="d-col-5 m-col-5">
          <Select bind:value={salutationType} label="Salutation">
            {#each salutationTypes || [] as item}
              <Option value={item.id}>{item.name}</Option>
            {/each}
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={6}>
      <OyAutocomplete options={languages.map((item)=>item.name)} bind:value={language} />
    </svelte:component>
    <svelte:component this={Field} label="Phone" column_1={4} column_2={6}>
      <div class="row">
        <div class="d-col-4 m-col-3">
          <OyAutocomplete options={countries} key="phone" getOptionLabel={(option)=> option ? `${option.name} +${option.phone}` : ''} bind:value={phone_code} />
        </div>
        <div class="d-col-8 m-col-9">
          <Textfield bind:value={phone} label="" type="phone" />
          {#if errors.phone}
            <span class="text-danger text-eyebrow">{errors.phone}</span>
          {/if}
        </div>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Contact Notes"
      column_1={4}
      column_2={6}
    >
      <Textfield bind:value={contactNotes} type="text" textarea />
    </svelte:component>
      <div class="d-block m-none text-right">
        <Button variant="unelevated" type="submit">Save Changes</Button>
      </div>
      <div class="m-block d-none text-center">
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
