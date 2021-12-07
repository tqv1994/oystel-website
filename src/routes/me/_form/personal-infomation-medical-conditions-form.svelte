<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { updateTravellerData } from '../../traveller/update-me.json';
  export let me: User;
  let medicalCondition: string = me.travellerMe?.medicalCondition;

  export let is_edit: boolean = true;

  async function handleSubmitForm() {
    const res = await fetch(`/traveller/update-me.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        medicalCondition
      }),
    });
    if (res.ok) {
      const data: updateTravellerData = await res.json();
      me.travellerMe = data.updateTraveller.traveller;
      is_edit = false;
    } else {
      window.pushToast('An error occurred');
    }
  }
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <svelte:component this={FormToggle} title="" bind:is_edit>
    <svelte:component
      this={Field}
      label="Medical Conditions"
      column_1={4}
      column_2={8}
    >
      <Textfield bind:value={medicalCondition} label="" type="text" textarea />
    </svelte:component>
    <div class="text-right">
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
