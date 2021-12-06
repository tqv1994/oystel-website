<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import Text from './components/Text.svelte';
  import {
    PersonalPreference,
    PersonalPreferenceType,
    personalPreferenceTypeStore,
    TravelPreference,
    TravelPreferenceType,
    travelPreferenceTypeStore,
  } from '$lib/store/preference';
  import TravelPreferenceForm from './_form/travel-preference-form.svelte';
  import { Interest } from '$lib/store/interest';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  export const load: Load = async ({ fetch }) => {
    let me: User | undefined;
    authStore.subscribe(({ user }) => (me = user));
    if (me?.travellerMe) {
      const travelPreferenceTypes = Object.values(
        get(travelPreferenceTypeStore).items,
      );
      const personalPreferenceTypes = Object.values(
        get(personalPreferenceTypeStore).items,
      );

      return {
        props: {
          me,
          travelPreferenceData: travelPreferenceTypes,
          travelPreferenceSelected: me?.travellerMe.travelPreferences.map(
            (item) => item.id,
          ),
          personalPreferenceData: personalPreferenceTypes,
          personalPreferenceSelected: me?.travellerMe.personalPreferences.map(
            (item) => item.id,
          ),
          otherPreference: travelPreferenceTypes
            .filter((item) => item.name == 'Hotel Amenities')[0]
            .preferences.filter((item) => item.name == 'Other')[0],
        },
      };
    } else {
      goto('/me/my-account');
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  export let me: User | undefined = $authStore.user;
  export let otherPreference: TravelPreference;
  let travelEdit: boolean = false;
  let personalEdit: boolean = false;
  export let travelPreferenceData: TravelPreferenceType[];
  export let personalPreferenceData: PersonalPreferenceType[];
  export let travelPreferenceSelected: string[];
  export let personalPreferenceSelected: string[];

  const handleTravelSubmit = async () => {
    try {
      const res = await fetch('/me/preference/travel.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: me?.travellerMe.id,
          travelPreferences: travelPreferenceSelected,
        }),
      });
      if (res.ok) {
        travelEdit = false;
        const preferenceList = travelPreferenceData.map(
          (item) => item.preferences,
        );
        me.travellerMe.travelPreferences = []
          .concat(...preferenceList)
          .filter((item) => travelPreferenceSelected.includes(item.id));
        updateOther();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateOther = async () => {
    try {
      const res = await fetch('/me/preference/update-other.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: otherPreference.id,
          other: otherPreference.other,
        }),
      });
      if (res.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePersonalSubmit = async () => {
    try {
      const res = await fetch('/me/preference/personal.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: me?.travellerMe.id,
          personalPreferences: personalPreferenceSelected,
        }),
      });
      if (res.ok) {
        personalEdit = false;
        const preferenceList = personalPreferenceData.map(
          (item) => item.preferences,
        );
        me.travellerMe.personalPreferences = []
          .concat(...preferenceList)
          .filter((item) => personalPreferenceSelected.includes(item.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisplay = (
    selected: string[],
    type: TravelPreferenceType | PersonalPreferenceType,
  ) => {
    let result: string = 'No Preferences';
    const cloneSelected = [...selected];
    const preferenceSelectedByType = type.preferences.filter((item) =>
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
    {#if me}
      <svelte:component
        this={ButtonBack}
        label="Travel Preferences"
        link="/me"
      />
      {#if !travelEdit}
        <Box title="Travel" bind:is_edit={travelEdit} class="">
          {#each travelPreferenceData as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text>{handleDisplay(travelPreferenceSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {/if}
      {#if travelEdit}
        <svelte:component
          this={TravelPreferenceForm}
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
              <Text>{handleDisplay(personalPreferenceSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {:else}
        <svelte:component
          this={TravelPreferenceForm}
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
