<script lang="ts">
  import Dialog, { Header, Content } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Title from './Title.svelte';

  export let open = false;
  export let title: string | undefined;
  export let style = 'width: 935px; max-width: calc(100vw - 32px);';
</script>

<div>
  <Dialog bind:open fullscreen surface$style={style}>
    {#if title || title == ''}
      <Header>
        <Title class="d-mt-25 m-mt-20">{title || ''}</Title>
        <IconButton action="close" class="material-icons">close</IconButton>
      </Header>
    {/if}
    <Content><slot /></Content>
  </Dialog>
</div>

<style lang="scss">
  @use '../../../theme/mixins';
  div :global(.mdc-dialog) {
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
    :global(.mdc-dialog__header button) {
      top: -5px;
    }
    :global(.mdc-dialog__title) {
      text-transform: uppercase;
    }
    :global(.mdc-dialog__header) {
      border-bottom: 1px solid #000;
    }
    :global(.mdc-dialog__content) {
      color: rgba(0, 0, 0, 1);
    }
  }
</style>
