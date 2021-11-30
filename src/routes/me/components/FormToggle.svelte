<script lang="ts">
    import ButtonUnderline from '../components/ButtonUnderline.svelte';
    export let is_edit: boolean = true;
    export let title: string = '';
    function handleCancelClick() {
      is_edit = false;
    }
  </script>
  
  <div class="form">
    <div class="form-header">
      <h3 class="mdc-typography--headline1 m-0">{title}</h3>
      <svelte:component
        this={ButtonUnderline}
        class="btn-cancel"
        on:click={handleCancelClick}
        label="Cancel"
      />
    </div>
    <slot />
  </div>
  
  <style lang="scss">
    @use '../../../style/include/_grid.scss';
    @use '../../../theme/mixins';
    .form {
      --mdc-typography-headline1-font-size: 32px;
      margin-top: 18px;
      padding: 20px 30px;
      border: 1px solid #000;
      .form-header {
        min-height: 30px;
        position: relative;
        margin-bottom: 20px;
      }
      :global(.btn-cancel) {
        text-decoration: underline;
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
      }
      :global(.mdc-text-field),
      :global(.mdc-select) {
        width: 100%;
      }
    }
  </style>
