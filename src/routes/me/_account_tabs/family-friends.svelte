<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import { Traveller } from '$lib/store/traveller';
  import Button, { Label } from '@smui/button';
  import FamilyFriendItem from '../components/FamilyFriendItem.svelte';
  import Modal from '../components/Modal.svelte';
  import FamilyFriendForm from '../_form/family-friend-form.svelte';
  export let me: User;
  let travellerSelected: Traveller | null;
  let relationshipSelected: string;
  let openForm: boolean = false;

  function handleOpenForm(traveller: Traveller | null, relationship: string) {
    travellerSelected = traveller;
    relationshipSelected = relationship;
    setTimeout(()=>{
      openForm = true;
    },0);
  }

  function afterSubmit(event: CustomEvent){
    if($authStore.user){
      me = $authStore.user;
      openForm = false;
    }
  }
</script>

<div class="row">
  {#each me.travellerMe.parents || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship="Parent"
        on:click={() => {
          handleOpenForm(item, 'Parent');
        }}
      />
    </div>
  {/each}
  {#each me.travellerMe.spouse || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship="Spouse"
        on:click={() => {
          handleOpenForm(item, 'Spouse');
        }}
      />
    </div>
  {/each}
  {#if me.travellerMe.children}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={me.travellerMe.children}
        relationship="Children"
        on:click={() => {
          handleOpenForm(me.travellerMe.children, 'Children');
        }}
      />
    </div>
  {/if}
  {#each me.travellerMe.relatives || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship="Relative"
        on:click={() => {
          handleOpenForm(item, 'Relative');
        }}
      />
    </div>
  {/each}
  {#each me.travellerMe.partners || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship="Partner"
        on:click={() => {
          handleOpenForm(item, 'Partner');
        }}
      />
    </div>
  {/each}
  {#each me.travellerMe.otherRelations || [] as item}
    <div class="d-col-4 m-col-12">
      <FamilyFriendItem
        traveller={item}
        relationship="Other"
        on:click={() => {
          handleOpenForm(item, 'Other Relative');
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
  <svelte:component
    this={Modal}
    title={`${travellerSelected == null ? 'Add' : 'Edit'} Friends & Family`}
    bind:open={openForm}
  >
    <svelte:component
      this={FamilyFriendForm}
      bind:traveller={travellerSelected}
      relationship={relationshipSelected}
      on:afterSubmit={afterSubmit}
    />
  </svelte:component>
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
