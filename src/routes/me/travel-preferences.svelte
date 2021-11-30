<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './Field.svelte';
  import TravelPreferenceTravelForm from './_form/travel-preference-travel-form.svelte';
  import TravelPreferencePersonalForm from './_form/travel-preference-personal-form.svelte';
import Text from './components/Text.svelte';

  let me: User | undefined = $authStore.user;
  let travelEdit: boolean = false;
  let personalEdit: boolean = false;
</script>

<div class="content travel-preferences-content">
  <LayoutAccount currentPage="travel-preferences">
    {#if me}
      <svelte:component
        this={ButtonBack}
        label="Travel Preferences"
        link="/me"
      />
      {#if !travelEdit}
        <svelte:component this={Box} title="Travel" bind:is_edit={travelEdit}>
          <svelte:component
            this={Field}
            label="Flights"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Private - own</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Hotels"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Lodge, Modern, Quiet location</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Accommodations"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Suite - Open Plan, High Floor</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Hotel Amenities"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Pool, Other - Spa</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Ground Transportation"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Town Car</svelte:component></svelte:component
          >
        </svelte:component>
      {/if}
      {#if travelEdit}
        <svelte:component
          this={TravelPreferenceTravelForm}
          bind:is_edit={travelEdit}
        />
      {/if}

      {#if !personalEdit}
        <svelte:component
          this={Box}
          title="Personal"
          bind:is_edit={personalEdit}
        >
          <svelte:component this={Field} label="Diet" column_1={4} column_2={8}
            ><svelte:component this={Text}>No Prefrences</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Allergies"
            column_1={4}
            column_2={8}
            >Pollen, Lactose intolerant, Sulphites
          </svelte:component>
          <svelte:component this={Field} label="Other" column_1={4} column_2={8}
            ><svelte:component this={Text}>No Alcohol</svelte:component></svelte:component
          >
        </svelte:component>
      {/if}
      {#if personalEdit}
        <svelte:component
          this={TravelPreferencePersonalForm}
          bind:is_edit={personalEdit}
        />
      {/if}
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .travel-preferences-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
  }
</style>
