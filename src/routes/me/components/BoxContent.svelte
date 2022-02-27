<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ButtonUnderline from './ButtonUnderline.svelte';

  export let title: string = '';
  export let is_edit: boolean = false;
  let dispathcher = createEventDispatcher();
  function handleEditClick() {
    is_edit = true;
  }
</script>

<div class="section-content">
  <div class="section-title mb-45">
    <span class="text-h1">{title}</span>
    <svelte:component this={ButtonUnderline} class="btn-edit" label="Edit" on:click={handleEditClick} />
  </div>
  <slot/>
</div>

<style lang="scss">
  a.text-input {
    text-decoration: underline;
  }
  div :global(.btn-edit){
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
  }
  * {
    --mdc-theme-primary: #000;
  }
  .text-h1 {
    font-size: 32px;
  }
  .section-content {
    --mdc-typography-heading1-font-size: 32px;
    --mdc-typography-body1-font-size: 14px;
    padding: 0 25px;
    .section-title {
      position: relative;
    }
  }
  .btn-edit {
    text-decoration: underline;
  }
</style>
