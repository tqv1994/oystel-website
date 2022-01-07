<script lang="ts">
  import { User } from '$lib/store/auth';
  import Button, { Label } from '@smui/button';
  import DataTable, { Cell, Head, Body, Row } from '@smui/data-table';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import TravelDocumentForm from '../_form/travel-document-form.svelte';
  import Modal from '../components/Modal.svelte';
  import Text from '../components/Text.svelte';
  import {
    ENUM_IDENTIFICATION_TYPE_LABEL,
    Identification,
  } from '$lib/store/identification';
  import { getAllIdentifications } from '$lib/store/traveller';

  export let me: User;
  let openForm: boolean = false;
  let identificationSelected: Identification | undefined;

  const handleFormEditOpen = (
    identification: Identification,
  ) => {
    identificationSelected = identification;
    openForm = true;
  };
</script>

<div class="pt-30">
  <DataTable
    table$aria-label="Documents"
    style="width: 100%;"
    class="d-block m-none"
  >
    <Head>
      <Row>
        <Cell style="width: 20%"
          ><svelte:component this={Text}>Document Type</svelte:component></Cell
        >
        <Cell style="width: 80%"
          ><svelte:component this={Text}>Traveler Name</svelte:component></Cell
        >
        <Cell />
        <Cell />
      </Row>
    </Head>
    <Body>
      {#each getAllIdentifications(me.travellerMe) || [] as item}
        {#each item.items || [] as identication}
          <Row>
            <Cell
              ><svelte:component this={Text}
                >{ENUM_IDENTIFICATION_TYPE_LABEL[identication.type] ||
                  ''}</svelte:component
              ></Cell
            >
            <Cell
              ><svelte:component this={Text}
                >{`${identication.traveller?.forename || ''} ${
                  identication.traveller?.surname
                }`}</svelte:component
              ></Cell
            >
            <Cell
              ><svelte:component
                this={ButtonUnderline}
                label="Edit"
                on:click={() => {
                  handleFormEditOpen(identication);
                }}
              /></Cell
            >
            <Cell
              ><svelte:component
                this={ButtonUnderline}
                label="View Document"
              /></Cell
            >
          </Row>
        {/each}
      {/each}
    </Body>
  </DataTable>

  <div class="d-none m-block">
    {#each me.travellerMe.identifications || [] as item}
      <div class="row header">
        <div class="m-col-6">
          <svelte:component this={Text}
            >{ENUM_IDENTIFICATION_TYPE_LABEL[item.type] || ''}</svelte:component
          >
        </div>
        <div class="m-col-6">
          <svelte:component this={Text}
            >{`${me.travellerMe.forename} ${me.travellerMe.surname}`}</svelte:component
          >
        </div>
      </div>
    {/each}
  </div>
  <div class="action-button mt-25">
    <Button
      variant="unelevated"
      on:click={() => {
        identificationSelected = undefined;
        openForm = true;
      }}><Label class="text-button2">Upload New Document</Label></Button
    >
  </div>
</div>
{#if openForm}
  <svelte:component
    this={Modal}
    bind:open={openForm}
    title={`${identificationSelected ? 'Edit' : 'Add'} Travel Document`}
    surface$style="width: 850px; max-width: calc(100vw - 32px);"
  >
    <svelte:component
      this={TravelDocumentForm}
      bind:me
      identification={identificationSelected}
      bind:open={openForm}
    />
  </svelte:component>
{/if}

<style lang="scss">
  @use '../../../theme/mixins';
  @use '../../../style/include/grid';
  div :global(.mdc-data-table) {
    border: 0;
    :global(th p) {
      font-weight: bold;
    }
    :global(td p) {
      font-style: oblique;
    }
    :global(tr:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    :global(tr:nth-child(odd)) {
      background-color: #f7f7f7;
    }
  }
  .row {
    &:first-child {
      font-weight: bold;
    }
    padding: 20px 15px;
    &:nth-child(even) {
      background-color: #f7f7f7;
    }
  }
  .action-button {
    text-align: right;
    @include mixins.mobile {
      text-align: center;
    }
  }
</style>
