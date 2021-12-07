<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import MyStyleMySizesForm from './_form/my-style-my-sizes-form.svelte';
  import Text from './components/Text.svelte';
  import MyStylePreference from './_form/my-style-preference.svelte';
  import { goto } from '$app/navigation';

  export type MySizeSelected = {
    topSize: string;
    dressSize: string;
    jeanPantSize: string;
    braSize: string;
    shoeSize: string;
    bodyStyle: string;
    gender: string;
    weightUnit: string;
    weight: string;
    heightUnit: string;
    height: string;
  };

  export type MySize = {
    topSize: string[];
    dressSize: string[];
    jeanPantSize: string[];
    braSize: string[];
    shoeSize: string[];
    bodyStyle: string[];
    gender: string[];
    weightUnit: string[];
    heightUnit: string[];
  };

  export const load: Load = async ({ fetch }) => {
    let me: User | undefined;
    authStore.subscribe(({ user }) => (me = user));
    if (me?.travellerMe) {
      let mySizeSelected = {
        topSize: me.travellerMe.topSize,
        dressSize: me.travellerMe.dressSize,
        jeanPantSize: me.travellerMe.jeanPantSize,
        braSize: me.travellerMe.braSize,
        shoeSize: me.travellerMe.shoeSize,
        weightUnit: me.travellerMe.weightUnit,
        weight: me.travellerMe.weight,
        heightUnit: me.travellerMe.heightUnit,
        height: me.travellerMe.height,
        gender: me.travellerMe.gender,
        bodyStyle: me.travellerMe.bodyStyle,
      };
      return {
        props: {
          me,
          mySizeSelected,
          myStylePreferenceSelected: me.travellerMe.stylePreferences
            ? me.travellerMe.stylePreferences.split(',')
            : [],
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
  let mySizesEdit: boolean = false;
  let stylePreferencesEdit: boolean = false;

  export let me: User | undefined = $authStore.user;
  export let mySizeSelected: MySizeSelected;
  export let myStylePreferenceSelected: string[];

  let tmpStylePreferenceSelected: string[] = [...myStylePreferenceSelected];
  let tmpMySizeSelected: MySizeSelected = {...mySizeSelected};
  const mySizeData: MySize = {
    topSize: ['US 6', 'US 7', 'US 8', 'US 9'],
    dressSize: ['US 6', 'US 7', 'US 8', 'US 9'],
    jeanPantSize: ['US 6', 'US 7', 'US 8', 'US 9'],
    braSize: ['US 6', 'US 7', 'US 8', 'US 9'],
    shoeSize: ['US 6', 'US 7', 'US 8', 'US 9'],
    bodyStyle: [
      'Apple',
      'Pear',
      'Hourglass',
      'Invert Triangle',
      'Regtangle',
      'Trapezoid',
      'Oval',
    ],
    gender: ['Female', 'Male', 'Others'],
    weightUnit: ['kgs', 'lb', 'oz'],
    heightUnit: ['cms', 'ms', 'inch', 'feet'],
  };

  const myStylePreferenceData = [
    {
      name: 'COLOURS',
      preferences: ['Black', 'Brown', 'Cream', 'White'],
    },
    {
      name: 'CLOTHING Styles',
      preferences: ['Coordinated Neutrals', 'Tailored', 'Pop Color'],
    },
  ];

  const handleDisplayMySize = (mySize: string | undefined) => {
    if (mySize && (typeof mySize === 'string' || typeof mySize === 'number')) {
      return mySize;
    }
    return '';
  };

  const handleDisplayPreference = (
    selected: string[],
    preferenceByType: string[],
  ) => {
    let result = 'No Preferences';
    const selectedByType = selected.filter((preference) =>
      preferenceByType.includes(preference),
    );
    if (selectedByType.length > 0) {
      result = selectedByType.join(', ');
    }
    return result;
  };

  const myStyleSubmit = async () => {
    try {
      for (const [key, value] of Object.entries(mySizeSelected)) {
        mySizeSelected[key] = handleDisplayMySize(value);
      }
      const res = await fetch('/me/my-style/my-size.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: me?.travellerMe.id,
          mySize: mySizeSelected,
        }),
      });
      if (res.ok) {
        mySizesEdit = false;
        let data: any = { ...me?.travellerMe };
        for (const [key, value] of Object.entries(mySizeSelected)) {
          data[key] = value;
        }
        me.travellerMe = data;
        tmpMySizeSelected = {...mySizeSelected};
      }
    } catch (error) {
      console.log(error);
    }
  };

  const myStylePreferenceSubmit = async () => {
    try {
      const dataSubmit = [...myStylePreferenceSelected];
      const res = await fetch('/me/my-style/preference.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: me?.travellerMe.id,
          stylePreferences: dataSubmit.join(','),
        }),
      });
      if (res.ok) {
        me.travellerMe.stylePreferences = dataSubmit.join(',');
        stylePreferencesEdit = false;
        tmpStylePreferenceSelected = [...myStylePreferenceSelected];
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<div class="content my-style-content">
  <LayoutAccount currentPage="my-style">
    {#if me}
      <svelte:component this={ButtonBack} label="My Style" link="/me" />
      {#if !mySizesEdit}
        <svelte:component
          this={Box}
          title="My Sizes"
          bind:is_edit={mySizesEdit}
        >
          <svelte:component
            this={Field}
            label="DRESS SIZE"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.dressSize)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="JEAN / PANT SIZE"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(
                tmpMySizeSelected.jeanPantSize,
              )}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="TOP SIZE"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.topSize)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="BRA SIZE"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.braSize)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Shoe Size"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.shoeSize)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Weight"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.weight)}
              {handleDisplayMySize(tmpMySizeSelected.weightUnit)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Height"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.height)}
              {handleDisplayMySize(tmpMySizeSelected.heightUnit)}</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Body Style"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >{handleDisplayMySize(tmpMySizeSelected.bodyStyle)}</svelte:component
            ></svelte:component
          >
        </svelte:component>
      {:else}
        <svelte:component
          this={MyStyleMySizesForm}
          data={mySizeData}
          bind:selected={mySizeSelected}
          bind:is_edit={mySizesEdit}
          on:submit={myStyleSubmit}
        />
      {/if}

      {#if !stylePreferencesEdit}
        <Box
          title="Style Preferences"
          bind:is_edit={stylePreferencesEdit}
          class=""
        >
          {#each myStylePreferenceData as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text
                >{handleDisplayPreference(
                  tmpStylePreferenceSelected,
                  type.preferences,
                )}</Text
              >
            </Field>
          {/each}
        </Box>
      {:else}
        <svelte:component
          this={MyStylePreference}
          data={myStylePreferenceData}
          selected={myStylePreferenceSelected}
          bind:is_edit={stylePreferencesEdit}
          on:submit={myStylePreferenceSubmit}
        />
      {/if}
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .trips-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
  }
</style>
