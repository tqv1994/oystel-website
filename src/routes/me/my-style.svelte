<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import MyStyleMySizesForm from './_form/my-style-my-sizes-form.svelte';
  import Text from './components/Text.svelte';
  import MyStylePreference from './_form/my-style-preference.svelte';
  import { goto } from '$app/navigation';
  import AlertBox from './components/AlertBox.svelte';
  import ButtonUnderline from './components/ButtonUnderline.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  import { updateTravellerMeStore } from '$lib/store/traveller';
  import { get } from 'svelte/store';
  import { ppatch } from '$lib/utils/fetch';
  import { session } from '$app/stores';

  export type MySizeSelected = {
    topSize: string;
    dressSize: string;
    jeanPantSize: string;
    braSize: string;
    shoeSize: string;
    bodyStyle: string;
    gender: string;
    weightUnit: string;
    weight: number;
    heightUnit: string;
    height: number;
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

  export const load: Load = async ({ fetch, session }) => {
    const productColours = await getCollection(fetch, 'product-colours');
    const productPatterns = await getCollection(fetch, 'product-patterns');

    const travellerMe = session.travellerMe;
    if (travellerMe) {
      let mySizeSelected = {
        topSize: travellerMe.topSize,
        dressSize: travellerMe.dressSize,
        jeanPantSize: travellerMe.jeanPantSize,
        braSize: travellerMe.braSize,
        shoeSize: travellerMe.shoeSize,
        weightUnit: travellerMe.weightUnit,
        weight: travellerMe.weight,
        heightUnit: travellerMe.heightUnit,
        height: travellerMe.height,
        gender: travellerMe.gender,
        bodyStyle: travellerMe.bodyStyle,
      };
      return {
        props: {
          mySizeSelected,
          myStylePreferenceSelected: travellerMe.stylePreferences
            ? travellerMe.stylePreferences.split(',')
            : [],
          productColours,
          productPatterns,
        },
      };
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  let mySizesEdit = false;
  let stylePreferencesEdit = false;

  export let mySizeSelected: MySizeSelected;
  export let myStylePreferenceSelected: string[];
  export let productColours: Kind[];
  export let productPatterns: Kind[];

  let tmpStylePreferenceSelected: string[] = [
    ...(myStylePreferenceSelected || []),
  ];
  let tmpMySizeSelected: MySizeSelected = { ...(mySizeSelected || null) };
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
      preferences: productColours.map((item) => item.name),
    },
    {
      name: 'FIT',
      preferences: ['Loose fitting', 'Fitted', 'Bodycon'],
    },
    {
      name: 'PATTERNS',
      preferences: productPatterns.map((item) => item.name),
    },
  ];

  const handleDisplayMySize = (mySize: string | number | undefined) => {
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
    window.openLoading();
    try {
      for (const [key, value] of Object.entries(mySizeSelected)) {
        mySizeSelected[key] = handleDisplayMySize(value);
      }
      const res = await ppatch('travellers/me', {
        ...mySizeSelected,
        gender: mySizeSelected.gender || 'Others',
        weight: mySizeSelected.weight || null,
        height: mySizeSelected.height || null,
      });
      if (res.ok) {
        mySizesEdit = false;
        updateTravellerMeStore(await res.json());
        tmpMySizeSelected = { ...mySizeSelected };
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };

  const myStylePreferenceSubmit = async () => {
    window.openLoading();
    try {
      const dataSubmit = [...myStylePreferenceSelected];
      const res = await ppatch('travellers/me', {
        stylePreferences: dataSubmit.join(','),
      });
      if (res.ok) {
        updateTravellerMeStore(await res.json());
        stylePreferencesEdit = false;
        tmpStylePreferenceSelected = [...myStylePreferenceSelected];
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };
</script>

<div class="content my-style-content">
  <LayoutAccount currentPage="my-style">
    <ButtonBack label="My Style" link="/me" />
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
      {#if !mySizesEdit}
        <Box title="My Sizes" bind:is_edit={mySizesEdit}>
          <Field label="Gender" column_1={4} column_2={8}
            ><Text>{mySizeSelected.gender || ''}</Text
            ></Field
          >
          <Field label="DRESS SIZE" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.dressSize)}</Text
            ></Field
          >
          <Field label="JEAN / PANT SIZE" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.jeanPantSize)}</Text
            ></Field
          >
          <Field label="TOP SIZE" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.topSize)}</Text
            ></Field
          >
          <Field label="BRA SIZE" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.braSize)}</Text
            ></Field
          >
          <Field label="Shoe Size" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.shoeSize)}</Text
            ></Field
          >
          <Field label="Weight" column_1={4} column_2={8}
            ><Text
              >{handleDisplayMySize(tmpMySizeSelected.weight)}
              {handleDisplayMySize(tmpMySizeSelected.weightUnit)}</Text
            ></Field
          >
          <Field label="Height" column_1={4} column_2={8}
            ><Text
              >{handleDisplayMySize(tmpMySizeSelected.height)}
              {handleDisplayMySize(tmpMySizeSelected.heightUnit)}</Text
            ></Field
          >
          <Field label="Body Style" column_1={4} column_2={8}
            ><Text>{handleDisplayMySize(tmpMySizeSelected.bodyStyle)}</Text
            ></Field
          >
        </Box>
      {:else}
        <MyStyleMySizesForm
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
        <MyStylePreference
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
