<script lang="ts">
  import {
    RELATIVES,
    RELATIVE_LABELS,
    type Traveller,
  } from '$lib/store/traveller';
  import Button, { Label } from '@smui/button';
  import FamilyFriendItem from '../components/FamilyFriendItem.svelte';
  import Modal from '../components/Modal.svelte';
  import FamilyFriendForm from '../_form/family-friend-form.svelte';
  import type { Kind } from '$lib/store/category';
  import { session } from '$app/stores';
  export let travellerMe: Traveller;
  let travellerSelected: Traveller | null;
  let relationshipSelected: string;
  let openForm = false;
  export let salutationTypes: Kind[];
  function handleOpenForm(traveller: Traveller | null, relationship: string) {
    travellerSelected = traveller;
    relationshipSelected = relationship;
    setTimeout(() => {
      openForm = true;
    }, 0);
  }

  function afterSubmit(event: CustomEvent) {
    if ($session.travellerMe) {
      travellerMe = $session.travellerMe;
      openForm = false;
    }
  }
</script>

<div class="row">
  {#each travellerMe.parents || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship={RELATIVE_LABELS.parents}
        on:click={() => {
          handleOpenForm(item, RELATIVES.parents);
        }}
      />
    </div>
  {/each}
  {#each travellerMe.spouse || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship={RELATIVE_LABELS.spouse}
        on:click={() => {
          handleOpenForm(item, RELATIVES.spouse);
        }}
      />
    </div>
  {/each}
  {#if travellerMe.children}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={travellerMe.children}
        relationship={RELATIVE_LABELS.children}
        on:click={() => {
          handleOpenForm(travellerMe.children, RELATIVES.children);
        }}
      />
    </div>
  {/if}
  {#each travellerMe.relatives || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship={RELATIVE_LABELS.relatives}
        on:click={() => {
          handleOpenForm(item, RELATIVES.relatives);
        }}
      />
    </div>
  {/each}
  {#each travellerMe.partners || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship={RELATIVE_LABELS.partners}
        on:click={() => {
          handleOpenForm(item, RELATIVES.partners);
        }}
      />
    </div>
  {/each}
  {#each travellerMe.otherRelations || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship={RELATIVE_LABELS.otherRelations}
        on:click={() => {
          handleOpenForm(item, RELATIVES.otherRelations);
        }}
      />
    </div>
  {/each}
  <div class="d-col-4 m-col-12">
    <div class="box box-add-item">
      <Button
        class="m-0"
        on:click={() => {
          handleOpenForm(null, '');
        }}><Label class="text-button2">Add Relationship +</Label></Button
      >
    </div>
  </div>
</div>
{#if openForm == true}
  <Modal
    title={`${travellerSelected == null ? 'Add' : 'Edit'} Friends & Family`}
    bind:open={openForm}
  >
    <FamilyFriendForm
      bind:traveller={travellerSelected}
      relationship={relationshipSelected}
      on:afterSubmit={afterSubmit}
      {salutationTypes}
    />
  </Modal>
{/if}

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  .row {
    grid-auto-rows: 1fr;
    padding: 30px 0;
    .box {
      width: 100%;
      height: 100%;
      &.box-add-item {
        border: 1px dashed #000;
        position: relative;
        :global(.mdc-button) {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 100%;
        }
        &:first-child {
          min-height: 134px;
        }
      }
    }
  }
</style>
