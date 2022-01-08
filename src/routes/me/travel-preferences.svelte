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
    }
    return {
      props: { me },
    };
  };
</script>

<script lang="ts">
  import AlertBox from './components/AlertBox.svelte';
  import ButtonUnderline from './components/ButtonUnderline.svelte';

  export let me: User;
  export let otherPreference: TravelPreference;
  let travelEdit: boolean = false;
  let personalEdit: boolean = false;
  export let travelPreferenceData: TravelPreferenceType[];
  export let personalPreferenceData: PersonalPreferenceType[];
  export let travelPreferenceSelected: string[];
  export let personalPreferenceSelected: string[];

  let tmpTravelSelected: string[] = [...(travelPreferenceSelected || [])];
  let tmpPersonalSelected: string[] = [...(personalPreferenceSelected || [])];
  const handleTravelSubmit = async () => {
    window.openLoading();
    try {
      const res = await fetch('/me/preference/update-travel.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelPreferenceSelected),
      });
      if (res.ok) {
        travelEdit = false;
        const preferenceList = travelPreferenceData.map(
          (item) => item.preferences,
        );
        me.travellerMe.travelPreferences = []
          .concat(...preferenceList)
          .filter((item) => travelPreferenceSelected.includes(item.id));
        tmpTravelSelected = [...travelPreferenceSelected];
        updateOther();
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
      const res = await fetch('/me/preference/update-personal.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personalPreferenceSelected),
      });
      if (res.ok) {
        personalEdit = false;
        const preferenceList = personalPreferenceData.map(
          (item) => item.preferences,
        );
        me.travellerMe.personalPreferences = []
          .concat(...preferenceList)
          .filter((item) => personalPreferenceSelected.includes(item.id));
        tmpPersonalSelected = [...personalPreferenceSelected];
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
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
    <svelte:component this={ButtonBack} label="Travel Preferences" link="/me" />
    {#if !me.travellerMe}
      <svelte:component this={AlertBox}>
        Before doing this. Please tell us your first and last name. <svelte:component
          this={ButtonUnderline}
          on:click={() => {
            goto('/me/my-account');
          }}
          label="Update them here"
        />
      </svelte:component>
    {/if}
    {#if me.travellerMe}
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
              <Text>{handleDisplay(tmpPersonalSelected, type)}</Text>
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
