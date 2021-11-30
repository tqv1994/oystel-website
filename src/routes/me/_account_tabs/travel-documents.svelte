<script lang="ts">
  import { User } from '$lib/store/auth';
  import Button, { Label } from '@smui/button';
  import DataTable, { Cell, Head, Body, Row } from '@smui/data-table';
  import Dialog, { Title, Content, Header } from '@smui/dialog';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import TravelDocumentForm from '../_form/travel-document-form.svelte';
  import Modal from '../components/Modal.svelte';
import Text from '../components/Text.svelte';

  export let me: User;
  let openForm: boolean = false;
</script>

<div class="pt-30">
  <DataTable
    table$aria-label="Documents"
    style="width: 100%;"
    class="d-block m-none"
  >
    <Head>
      <Row>
        <Cell style="width: 20%"><svelte:component this={Text}>Document Type</svelte:component></Cell>
        <Cell style="width: 80%"><svelte:component this={Text}>Traveler Name</svelte:component></Cell>
        <Cell />
        <Cell />
      </Row>
    </Head>
    <Body>
      <Row>
        <Cell><svelte:component this={Text}>Passport</svelte:component></Cell>
        <Cell><svelte:component this={Text}>Jane Doe</svelte:component></Cell>
        <Cell
          ><svelte:component
            this={ButtonUnderline}
            label="Edit"
            on:click={() => {
              openForm = true;
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
      <Row>
        <Cell><svelte:component this={Text}>Passport</svelte:component></Cell>
        <Cell><svelte:component this={Text}>Jane Doe</svelte:component></Cell>
        <Cell
          ><svelte:component
            this={ButtonUnderline}
            label="Edit"
            on:click={() => {
              openForm = true;
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
      <Row>
        <Cell><svelte:component this={Text}>Driver’s License</svelte:component></Cell>
        <Cell><svelte:component this={Text}>Jane Doe</svelte:component></Cell>
        <Cell
          ><svelte:component
            this={ButtonUnderline}
            label="Edit"
            on:click={() => {
              openForm = true;
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
      <Row>
        <Cell><svelte:component this={Text}>Driver’s License</svelte:component></Cell>
        <Cell><svelte:component this={Text}>Jane Doe</svelte:component></Cell>
        <Cell
          ><svelte:component
            this={ButtonUnderline}
            label="Edit"
            on:click={() => {
              openForm = true;
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
      <Row>
        <Cell><svelte:component this={Text}>ID Card</svelte:component></Cell>
        <Cell><svelte:component this={Text}>Jane Doe</svelte:component></Cell>
        <Cell
          ><svelte:component
            this={ButtonUnderline}
            label="Edit"
            on:click={() => {
              openForm = true;
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
    </Body>
  </DataTable>

  <div class="d-none m-block">
    <div class="row header">
      <div class="m-col-6"><svelte:component this={Text}>Document</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Traveler Name</svelte:component></div>
    </div>
    <div class="row">
      <div class="m-col-6"><svelte:component this={Text}>Passport</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Jane Doe</svelte:component></div>
      <div class="m-col-6">
        <svelte:component
          this={ButtonUnderline}
          label="Edit"
          on:click={() => {
            openForm = true;
          }}
        />
      </div>
      <div class="m-col-6">
        <svelte:component this={ButtonUnderline} label="View Document" />
      </div>
    </div>
    <div class="row">
      <div class="m-col-6"><svelte:component this={Text}>Passport</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Jane Doe</svelte:component></div>
      <div class="m-col-6">
        <svelte:component
          this={ButtonUnderline}
          label="Edit"
          on:click={() => {
            openForm = true;
          }}
        />
      </div>
      <div class="m-col-6">
        <svelte:component this={ButtonUnderline} label="View Document" />
      </div>
    </div>
    <div class="row">
      <div class="m-col-6"><svelte:component this={Text}>Passport</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Jane Doe</svelte:component></div>
      <div class="m-col-6">
        <svelte:component
          this={ButtonUnderline}
          label="Edit"
          on:click={() => {
            openForm = true;
          }}
        />
      </div>
      <div class="m-col-6">
        <svelte:component this={ButtonUnderline} label="View Document" />
      </div>
    </div>
    <div class="row">
      <div class="m-col-6"><svelte:component this={Text}>Passport</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Jane Doe</svelte:component></div>
      <div class="m-col-6">
        <svelte:component
          this={ButtonUnderline}
          label="Edit"
          on:click={() => {
            openForm = true;
          }}
        />
      </div>
      <div class="m-col-6">
        <svelte:component this={ButtonUnderline} label="View Document" />
      </div>
    </div>
    <div class="row">
      <div class="m-col-6"><svelte:component this={Text}>Passport</svelte:component></div>
      <div class="m-col-6"><svelte:component this={Text}>Jane Doe</svelte:component></div>
      <div class="m-col-6">
        <svelte:component
          this={ButtonUnderline}
          label="Edit"
          on:click={() => {
            openForm = true;
          }}
        />
      </div>
      <div class="m-col-6">
        <svelte:component this={ButtonUnderline} label="View Document" />
      </div>
    </div>
  </div>
  <div class="action-button mt-25">
    <Button
      variant="unelevated"
      on:click={() => {
        openForm = true;
      }}><Label class="text-button2">Upload New Document</Label></Button
    >
  </div>
</div>

<svelte:component
  this={Modal}
  bind:open={openForm}
  title="Edit Travel Document"
  surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
  <svelte:component this={TravelDocumentForm} />
</svelte:component>

<style lang="scss">
  @use '../../../theme/mixins';
  @use '../../../style/include/grid';
  div :global(.mdc-data-table) {
    border: 0;
    :global(th p) {
      font-weight: bold;
    }
    :global(td p){
      font-style: oblique;
    }
    :global(tr:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
    :global(tr:nth-child(odd)) {
      background-color: #f7f7f7;
    }
  }
  .row{
    &:first-child{
      font-weight: bold;
    }
    padding: 20px 15px;
    &:nth-child(even){
      background-color: #f7f7f7;
    }
  }
  .action-button{
    text-align: right;
    @include mixins.mobile{
      text-align: center;
    }
  }
</style>
