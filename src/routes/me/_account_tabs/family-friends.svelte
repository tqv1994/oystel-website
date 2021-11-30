<script lang="ts">
  import { User } from '$lib/store/auth';
  import Button, { Label } from '@smui/button';
  import FamilyFriendItem from '../components/FamilyFriendItem.svelte';
  import Modal from '../components/Modal.svelte';
  import FamilyFriendForm from '../_form/family-friend-form.svelte';
  export let me: User;
  let openForm: boolean = false;
</script>

<div class="row">
  <div class="d-col-4 m-col-12">
    <FamilyFriendItem
      name="Mr. John Doe"
      relationship="Husband"
      birthday="XX/XX/XXXX"
    />
  </div>
  <div class="d-col-4 m-col-12">
    <FamilyFriendItem
      name="Mrs. John Doe"
      relationship="Mother-in-Law"
      birthday="XX/XX/XXXX"
    />
  </div>
  <div class="d-col-4 m-col-12">
    <FamilyFriendItem
      name="Mr. James Dear"
      relationship="Father"
      birthday="XX/XX/XXXX"
    />
  </div>
  <div class="d-col-4 m-col-12">
    <FamilyFriendItem
      name="Mr. James Dear"
      relationship="Father"
      birthday="XX/XX/XXXX"
    />
  </div>
  <div class="d-col-4 m-col-12">
    <div class="box box-add-item">
      <Button
        class="m-0"
        on:click={() => {
          openForm = true;
        }}><Label class="text-button2">Add Relationship +</Label></Button
      >
    </div>
  </div>
</div>

<svelte:component this={Modal} title="Add Friends & Family" bind:open={openForm}>
  <svelte:component this={FamilyFriendForm} />
</svelte:component>

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
      }
    }
  }
</style>
