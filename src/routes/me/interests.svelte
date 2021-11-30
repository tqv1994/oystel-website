<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './Field.svelte';
  import InterestsForm from './_form/interests-form.svelte';
  import Text from './components/Text.svelte';

  let me: User | undefined = $authStore.user;
  let edit: boolean = false;
</script>

<div class="content interests-content">
  <LayoutAccount currentPage="interests">
    {#if me}
      <svelte:component this={ButtonBack} label="Interests" link="/me" />
      {#if !edit}
        <svelte:component this={Box} title="My Interests" bind:is_edit={edit}>
          <svelte:component
            this={Field}
            label="Leisure"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >Family Time, Painting / Drawing, Shopping, Working out,
              Meditation</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Places"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >Mountains, Modern, Boutique</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Activities"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >Sailing, Tennis, Yoga, Skiing</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Culture"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}
              >Contemporary Art, Architecture, Live Music</svelte:component
            ></svelte:component
          >
          <svelte:component
            this={Field}
            label="Passions"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}>No Selections</svelte:component
            ></svelte:component
          >
        </svelte:component>
      {/if}
      {#if edit}
        <svelte:component this={InterestsForm} bind:me bind:is_edit={edit} />
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
