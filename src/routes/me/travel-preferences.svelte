<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import Text from './components/Text.svelte';
  import {
    type PersonalPreference,
    type TravelPreference,
  } from '$lib/store/preference';
  import TravelPreferenceForm from './_form/travel-preference-form.svelte';
  import { goto } from '$app/navigation';

  export const load: Load = async ({ fetch, session }) => {
    const travellerMe = session.travellerMe;
    if (travellerMe) {
      const travelPreferenceTypes = await getCollection(
        fetch,
        'travel-preference-type',
      );
      const personalPreferenceTypes = await getCollection(
        fetch,
        'personal-preference-type',
      );

      return {
        props: {
          travelPreferenceData: travelPreferenceTypes,
          travelPreferenceSelected: travellerMe.travelPreferences?.map(
            (item) => item.id,
          ),
          personalPreferenceData: personalPreferenceTypes,
          personalPreferenceSelected: travellerMe.personalPreferences?.map(
            (item) => item.id,
          ),
          otherPreference: travelPreferenceTypes
            ? (
                travelPreferenceTypes.filter(
                  (item) => item.name == 'Hotel Amenities',
                )[0]?.preferences || []
              ).filter((item) => item.name == 'Other')[0]
            : [],
        },
      };
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import AlertBox from './components/AlertBox.svelte';
  import ButtonUnderline from './components/ButtonUnderline.svelte';
  import { getCollection } from '$lib/store/collection';
  import { updateTravellerMeStore } from '$lib/store/traveller';
  import { ppatch } from '$lib/utils/fetch';
  import { session } from '$app/stores';

  export let otherPreference: TravelPreference;
  let travelEdit = false;
  let personalEdit = false;
  export let travelPreferenceData: TravelPreference[];
  export let personalPreferenceData: PersonalPreference[];
  export let travelPreferenceSelected: string[];
  export let personalPreferenceSelected: string[];

  let tmpTravelSelected: string[] = [...(travelPreferenceSelected || [])];
  let tmpPersonalSelected: string[] = [...(personalPreferenceSelected || [])];
  const handleTravelSubmit = async () => {
    window.openLoading();
    try {
      const res = await ppatch('travellers/me', {
        travelPreferences: travelPreferenceSelected,
      });
      if (res.ok) {
        travelEdit = false;
        updateTravellerMeStore(await res.json());
        tmpTravelSelected = [...travelPreferenceSelected];
        // updateOther();
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };

  const updateOther = async () => {
    try {
      const res = await fetch('/me/preference/update-other.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otherPreference.other),
      });
      if (res.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePersonalSubmit = async () => {
    window.openLoading();
    try {
      const res = await ppatch('travellers/me', {
        personalPreferences: personalPreferenceSelected,
      });
      if (res.ok) {
        updateTravellerMeStore(await res.json());
        personalEdit = false;
        tmpPersonalSelected = [...personalPreferenceSelected];
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };

  const handleDisplay = (
    selected: string[],
    type: TravelPreference | PersonalPreference,
  ) => {
    let result = 'No Preferences';
    const cloneSelected = [...selected];
    const preferenceSelectedByType = (type.preferences || []).filter((item) =>
      cloneSelected.includes(item.id),
    );

    if (preferenceSelectedByType.length > 0) {
      result = preferenceSelectedByType
        .map((item: TravelPreference | PersonalPreference) => {
          let itemDisplay = item.name;
          if (item.name == 'Other' && item.other != '') {
            itemDisplay += ' - ' + item.other;
            otherPreference = item;
          }
          return itemDisplay;
        })
        .join(', ');
    }
    return result;
  };
</script>

<div class="content travel-preferences-content">
  <LayoutAccount currentPage="travel-preferences">
    <ButtonBack label="Travel Preferences" link="/me" />
    {#if !$session.travellerMe}
      <AlertBox>
        Before doing this. Please tell us your first and last name. <ButtonUnderline
          on:click={() => {
            goto('/me/my-account');
          }}
          label="Update them here"
        />
      </AlertBox>
    {/if}
    {#if $session.travellerMe}
      {#if !travelEdit}
        <Box title="Travel" bind:is_edit={travelEdit} class="">
          {#each travelPreferenceData as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text>{handleDisplay(tmpTravelSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {/if}
      {#if travelEdit}
        <TravelPreferenceForm
          data={travelPreferenceData}
          bind:selected={travelPreferenceSelected}
          bind:is_edit={travelEdit}
          bind:otherPreference
          on:submit={handleTravelSubmit}
          title="Travel"
        />
      {/if}

      {#if !personalEdit}
        <Box title="Personal" bind:is_edit={personalEdit} class="">
          {#each personalPreferenceData as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text>{handleDisplay(tmpPersonalSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {:else}
        <TravelPreferenceForm
          data={personalPreferenceData}
          bind:selected={personalPreferenceSelected}
          bind:is_edit={personalEdit}
          on:submit={handlePersonalSubmit}
          title="Personal"
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
