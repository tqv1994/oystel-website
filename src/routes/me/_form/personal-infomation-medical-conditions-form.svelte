<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { updateTravellerMeStore, type Traveller } from '$lib/store/traveller';
  import { ppatch } from '$lib/utils/fetch';
  export let travellerMe: Traveller;
  let medicalCondition: string = travellerMe.medicalCondition;

  export let is_edit = true;

  async function handleSubmitForm() {
    window.openLoading();
    try {
      const res = await ppatch('travellers/me', {
        medicalCondition,
      });
      if (res.ok) {
        travellerMe = await res.json();
        updateTravellerMeStore(travellerMe);
        is_edit = false;
      }
    } catch (error) {
      window.pushToast('An error occurred');
    }
    window.closeLoading();
  }
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <FormToggle title="" bind:is_edit>
    <Field label="Medical Conditions" column_1={4} column_2={6}>
      <Textfield bind:value={medicalCondition} type="text" textarea />
    </Field>
    <div class="text-right">
      <Button variant="unelevated" type="submit">Save Changes</Button>
    </div>
  </FormToggle>
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
