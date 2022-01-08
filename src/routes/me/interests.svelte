<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './components/Field.svelte';
  import InterestsForm from './_form/interests-form.svelte';
  import Text from './components/Text.svelte';
  import { Interest, InterestType } from '$lib/store/interest';
  import AlertBox from './components/AlertBox.svelte';
  import { goto } from '$app/navigation';
  import { interestTypeStore } from '$lib/store/interest';
  import { get } from 'svelte/store';

  export const load: Load = async ({ fetch }) => {
    let me: User | undefined;
    authStore.subscribe(({ user }) => (me = user));
    if (me?.travellerMe) {
      const interestTypes = Object.values(get(interestTypeStore).items);
      return {
        props: {
          me,
          data: interestTypes,
          dataSelected: me?.travellerMe.interests.map((item) => item.id),
        },
      };
    }

    return {
      props: { me },
    };
  };
</script>

<script lang="ts">
  import ButtonUnderline from './components/ButtonUnderline.svelte';

  let is_edit: boolean = false;

  export let me: User;
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
      const res = await fetch('/me/interests/update.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSelected),
      });
      if (res.ok) {
        handleClose();
        const interestList = data.map((item) => item.interests);
        me.travellerMe.interests = []
          .concat(...interestList)
          .filter((item) => dataSelected.includes(item.id));
        tempSelected = [...dataSelected];
      }
    } catch (error) {
      console.log(error);
    }
    window.closeLoading();
  };

  const handleDisplay = (selected: string[], type: InterestType) => {
    let result: string = 'No Preferences';
    const cloneSelected = [...selected];
    const interestSelectedByType = type.interests.filter((item) =>
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
    <svelte:component this={ButtonBack} label="Interests" link="/me" />
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
      {#if !is_edit}
        <Box bind:is_edit title="My Interests" class="">
          {#each data as type}
            <Field label={type.name} column_1={4} column_2={8} class="">
              <Text>{handleDisplay(tempSelected, type)}</Text>
            </Field>
          {/each}
        </Box>
      {:else}
        <svelte:component
          this={InterestsForm}
          bind:me
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
