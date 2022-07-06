<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import InterestsForm from './_form/interests-form.svelte';
  import Text from './components/Text.svelte';
  import type { InterestType } from '$lib/store/interest';
  import AlertBox from './components/AlertBox.svelte';
  import { goto } from '$app/navigation';
  import { interestTypeStore } from '$lib/store/interest';
  import { get } from 'svelte/store';

  export const load: Load = async ({ fetch, session }) => {
    const travellerMe = session.travellerMe;
    if (travellerMe) {
      const interestTypes = await getCollection(fetch, 'interest-type');
      return {
        props: {
          data: interestTypes,
          dataSelected: travellerMe.interests?.map((item) => item.id),
        },
      };
    }

    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import ButtonUnderline from './components/ButtonUnderline.svelte';
  import { updateTravellerMeStore } from '$lib/store/traveller';
  import { getCollection } from '$lib/store/collection';
  import { ppatch } from '$lib/utils/fetch';

  let is_edit = false;
  export let data: InterestType[];

  export let dataSelected: string[];
  export let haveTravellerMe: boolean;
  let tempSelected: string[] = [...(dataSelected || [])];

  const handleClose = () => {
    is_edit = false;
  };

  const handleSubmit = async () => {
    window.openLoading();
    try {
      const res = await ppatch('travellers/me', { interests: dataSelected });
      if (res.ok) {
        handleClose();
        updateTravellerMeStore(await res.json());
        tempSelected = [...dataSelected];
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };

  const handleDisplay = (selected: string[], type: InterestType) => {
    let result = 'No Preferences';
    const cloneSelected = [...selected];
    const interestSelectedByType = (type.interests || []).filter((item) =>
      cloneSelected.includes(item.id),
    );

    if (interestSelectedByType.length > 0) {
      result = interestSelectedByType.map((item) => item.name).join(', ');
    }
    return result;
  };
</script>

<div class="content interests-content">
  <LayoutAccount currentPage="interests">
    <ButtonBack label="Interests" link="/me" />
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
      {#if !is_edit}
        <Box bind:is_edit title="My Interests" class="">
          {#each data as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text>{handleDisplay(tempSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {:else}
        <InterestsForm
          bind:data
          bind:dataSelected
          bind:is_edit
          on:close={handleClose}
          on:submit={handleSubmit}
        />
      {/if}
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .interests-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
  }
</style>
