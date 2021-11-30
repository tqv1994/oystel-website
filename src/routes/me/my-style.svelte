<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './LayoutAccount.svelte';
  import Box from './components/Box.svelte';
  import ButtonBack from './components/ButtonBack.svelte';
  import Field from './Field.svelte';
  import MyStyleMySizesForm from './_form/my-style-my-sizes-form.svelte';
import Text from './components/Text.svelte';

  let me: User | undefined = $authStore.user;
  let mySizesEdit: boolean = false;
  let stylePreferencesEdit: boolean = false;
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
            column_2={8}><svelte:component this={Text}>US 8</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="JEAN / PANT SIZE"
            column_1={4}
            column_2={8}><svelte:component this={Text}>US 7</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="TOP SIZE"
            column_1={4}
            column_2={8}><svelte:component this={Text}>US Medium</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="BRA SIZE"
            column_1={4}
            column_2={8}><svelte:component this={Text}>34C</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Shoe Size"
            column_1={4}
            column_2={8}><svelte:component this={Text}>US 5</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Weight"
            column_1={4}
            column_2={8}><svelte:component this={Text}>48 kgs</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Height"
            column_1={4}
            column_2={8}><svelte:component this={Text}>169 cms</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="Body Style"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Slim</svelte:component></svelte:component
          >
        </svelte:component>
      {/if}
      {#if mySizesEdit}
        <svelte:component
          this={MyStyleMySizesForm}
          {me}
          bind:is_edit={mySizesEdit}
        />
      {/if}

      {#if !stylePreferencesEdit}
        <svelte:component
          this={Box}
          title="Style Preferences"
          bind:is_edit={stylePreferencesEdit}
        >
          <svelte:component
            this={Field}
            label="COLOURS"
            column_1={4}
            column_2={8}><svelte:component this={Text}>Black, Brown, Cream, White</svelte:component></svelte:component
          >
          <svelte:component
            this={Field}
            label="CLOTHING Styles"
            column_1={4}
            column_2={8}
            ><svelte:component this={Text}>Coordinated Neutrals, Tailored, Pop Color</svelte:component></svelte:component
          >
        </svelte:component>
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
