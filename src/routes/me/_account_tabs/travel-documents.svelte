<script lang="ts">
  import Button, { Label } from '@smui/button';
  import DataTable, { Cell, Head, Body, Row } from '@smui/data-table';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import TravelDocumentForm from '../_form/travel-document-form.svelte';
  import Modal from '../components/Modal.svelte';
  import Text from '../components/Text.svelte';
  import {
    ENUM_IDENTIFICATION_TYPE_LABEL,
    type Identification,
  } from '$lib/store/identification';
  import { type Traveller } from '$lib/store/traveller';
  import type { Country } from '$lib/store/country';

  export let travellerMe: Traveller;
  export let countries: Country[];
  let openForm = false;
  let identificationSelected: Identification | undefined;

  const handleFormEditOpen = (identification: Identification) => {
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
        <Cell style="width: 20%"><Text>Document Type</Text></Cell>
        <Cell style="width: 80%"><Text>Traveler Name</Text></Cell>
        <Cell />
        <Cell />
      </Row>
    </Head>
    <Body>
      {#each travellerMe?.identifications || [] as identification}
        <Row>
          <Cell
            ><Text
              >{ENUM_IDENTIFICATION_TYPE_LABEL[identification.type] || ''}</Text
            ></Cell
          >
          <Cell
            ><Text
              >{`${identification.traveller?.forename || ''} ${
                identification.traveller?.surname
              }`}</Text
            ></Cell
          >
          <Cell
            ><ButtonUnderline
              label="Edit"
              on:click={() => {
                handleFormEditOpen(identification);
              }}
            /></Cell
          >
          <Cell><ButtonUnderline label="View Document" /></Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>

  <div class="d-none m-block">
    {#each travellerMe.identifications || [] as identification}
      <div class="row header">
        <div class="m-col-6">
          <Text
            >{ENUM_IDENTIFICATION_TYPE_LABEL[identification.type] || ''}</Text
          >
          <ButtonUnderline
            label="Edit"
            on:click={() => {
              handleFormEditOpen(identification);
            }}
          />
        </div>
        <div class="m-col-6">
          <Text
            >{`${identification.traveller?.forename || ''} ${
              identification.traveller?.surname
            }`}</Text
          >
          <ButtonUnderline label="View Document" />
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
  <Modal
    bind:open={openForm}
    title={`${identificationSelected ? 'Edit' : 'Add'} Travel Document`}
    surface$style="width: 850px; max-width: calc(100vw - 32px);"
  >
    <TravelDocumentForm
      bind:travellerMe
      identification={identificationSelected}
      bind:open={openForm}
      {countries}
    />
  </Modal>
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
