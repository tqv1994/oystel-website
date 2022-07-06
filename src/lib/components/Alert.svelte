<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { onMount } from 'svelte';
  enum Type {
    success = 'success',
    warning = 'warning',
    error = 'error',
  }
  type Config = {
    type: Type;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    handleConfirm?: any;
    handleCancel?: any;
  };
  let type: Type;
  let message: string;
  let confirmLabel = 'Yes';
  let cancelLabel = 'Cancel';
  let handleConfirm: any;
  let handleCancel: any;
  let open = false;
  onMount(() => {
    window.onAlert = (config: Config) => {
      open = true;
      let {
        type,
        message,
        confirmLabel,
        cancelLabel,
        handleConfirm,
        handleCancel,
      } = config;
    };
  });
</script>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <Title id="simple-title">{type}</Title>
  <Content id="simple-content">{message}</Content>
  <Actions>
    {#if handleCancel}
      <Button on:click={handleCancel}>
        <Label>{cancelLabel}</Label>
      </Button>
    {/if}
    {#if handleConfirm}
      <Button on:click={handleConfirm}>
        <Label>{confirmLabel}</Label>
      </Button>
    {/if}
  </Actions>
</Dialog>

<style lang="scss">
</style>
