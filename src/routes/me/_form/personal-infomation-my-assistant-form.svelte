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
  export let me: User;
  const travellerMe: Traveller = me.travellerMe;
  const salutationTypes = Object.values(get(salutationTypeStore).items);
  const countries = Object.values(get(countryStore).items);
  let name: string = 'Jennifer Doe';
  let phone: string = 'XXXXXXXXXXX';
  let phone_code: string = '+90';
  let language: string = 'English';
  let contactNotes: string = '';
  let salutationType: string = '';
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
    <svelte:component this={Field} label="Name*" column_1={4} column_2={8}>
      <div class="row">
        <div class="d-col-7 m-col-7">
          <Textfield bind:value={name} label="Name" type="text" />
        </div>
        <div class="d-col-5 m-col-5">
          <Select bind:value={salutationType} label="">
            {#each salutationTypes || [] as item}
              <Option value={item.id}>{item.name}</Option>
            {/each}
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
      <Textfield bind:value={language} label="" type="text" />
    </svelte:component>
    <svelte:component this={Field} label="Phone*" column_1={4} column_2={8}>
      <div class="row">
        <div class="d-col-3 m-col-3">
          <Select bind:value={phone_code} label="">
            {#each countries as item}
              <Option value={`+${item.phone}`}>{`+${item.phone}`}</Option>
            {/each}
          </Select>
        </div>
        <div class="d-col-9 m-col-9">
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
      column_2={8}
    >
      <Textfield bind:value={contactNotes} label="" type="text" textarea />
    </svelte:component>
    <div class="text-right">
      <Button variant="unelevated" type="submit">Save Changes</Button>
    </div>
    <svelte:component this={Note} />
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
