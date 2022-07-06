<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ButtonUnderline from './ButtonUnderline.svelte';

  export let title = '';
  export let is_edit = false;
  let dispathcher = createEventDispatcher();
  function handleEditClick() {
    is_edit = true;
  }
  export let headlineTitle: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h3';
  let className: string | undefined = '';
  export { className as class };
</script>

<div class="section-content {className}">
  <div class="section-title mb-45">
    <span class="text-{headlineTitle}">{title}</span>
    <ButtonUnderline class="btn-edit" label="Edit" on:click={handleEditClick} />
  </div>
  <slot />
</div>

<style lang="scss">
  @use '../../../theme/mixins';
  a.text-input {
    text-decoration: underline;
  }
  div :global(.btn-edit) {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    @include mixins.mobile {
      right: 0;
    }
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
    @include mixins.mobile {
      padding: 0;
    }
    .section-title {
      position: relative;
    }
  }
  .btn-edit {
    text-decoration: underline;
  }
  @include mixins.desktop {
    h2 {
      font-size: 40px;
    }
  }
</style>
