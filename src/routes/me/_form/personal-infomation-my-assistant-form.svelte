<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Select, { Option } from '@smui/select';
  import { authStore, User } from '$lib/store/auth';
  import Button from '@smui/button';
  import Note from '../components/Note.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { salutationTypeStore } from '$lib/store/salutation-type';
  import { get } from 'svelte/store';
  import { countryStore } from '$lib/store/country';
  import { convertTravellerToInput, Traveller, TravellerInput } from '$lib/store/traveller';
  import * as yup from 'yup';
  import { sortByName } from '$lib/utils/sort';
import { languageStore } from '$lib/store/language';
import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
import { onMount } from 'svelte';
import { createPatternPhoneCode } from '$lib/utils/string';
import { updateTravellerMeService } from '$lib/services/traveller.service';
  export let me: User;
  const travellerMe: Traveller = me.travellerMe;
  const salutationTypes = Object.values(get(salutationTypeStore).items);
  const countries = sortByName(Object.values(get(countryStore).items));
  const languages = sortByName(Object.values(get(languageStore).items));
  let travellerInput: TravellerInput;
  let phone_code: string = '1';
  onMount(async()=>{
    
  });

  if(me.travellerMe){
    travellerInput = convertTravellerToInput(me.travellerMe);
    phone_code =
        travellerInput?.myAssistantPhone?.match(createPatternPhoneCode(countries)) +
        '';
      travellerInput.myAssistantPhone =
        travellerInput.myAssistantPhone?.replace(phone_code, '') || '';
      phone_code = phone_code.replace("+","");
  }else{
    travellerInput = new TravellerInput();
    travellerInput.myAssistantSalutationType = "1";
    travellerInput.myAssistantLanguage = "1";
  }
  

  let errors: any = {};

  export let is_edit: boolean = true;

  async function handleSubmitForm() {
    window.openLoading();
    await updateTravellerMeService({
      ...travellerInput,
      myAssistantPhone: (phone_code ? `+${phone_code}` : '') + travellerInput.myAssistantPhone 
    }).then((output: Traveller)=>{
      console.log(output);
      me.travellerMe = output;
      authStore.set({user: me});
      is_edit = false;
    }).catch(error=>{
      console.error({error});
      window.pushToast('An error occurred');
    });
    window.closeLoading();
  }
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <svelte:component this={FormToggle} title="" bind:is_edit>
    <svelte:component this={Field} label="Name" column_1={4} column_2={6}>
      <div class="row">
        <div class="d-col-7 m-col-7">
          <Textfield bind:value={travellerInput.myAssistantName} label="Name" type="text" />
        </div>
        <div class="d-col-5 m-col-5">
          <Select bind:value={travellerInput.myAssistantSalutationType} label="Salutation">
            {#each salutationTypes || [] as item}
              <Option value={item.id}>{item.name}</Option>
            {/each}
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={6}>
      <OyAutocomplete options={languages} getOptionLabel={(option)=>option?.name || ''} key="id" bind:value={travellerInput.myAssistantLanguage} />
    </svelte:component>
    <svelte:component this={Field} label="Phone" column_1={4} column_2={6}>
      <div class="row">
        <div class="d-col-4 m-col-3">
          <OyAutocomplete options={countries} key="phone" getOptionLabel={(option)=> option ? `${option.name} +${option.phone}` : ''} bind:value={phone_code} />
        </div>
        <div class="d-col-8 m-col-9">
          <Textfield bind:value={travellerInput.myAssistantPhone} label="" type="phone" />
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
      <Textfield bind:value={travellerInput.myAssistantContactNotes} type="text" textarea />
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
