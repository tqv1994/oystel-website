<script lang="ts">
  import Text from './Text.svelte';
  export let type: string = 'warning';
</script>

<div class={`alert ${type}`}>
  <svelte:component this={Text} class="inner">
    <slot/>
  </svelte:component>
</div>

<style lang="scss">
  .alert {
    :global(.inner) {
      display: block;
      padding: 6px;
      margin: 6px;
      border-radius: 3px;
      border: 1px solid rgb(180, 180, 180);
      background-color: rgb(212, 212, 212);
      color: rgb(88, 88, 88);
    }
    &.error :global(.inner) {
      border: 1px solid rgb(238, 211, 215);
      background-color: rgb(242, 222, 222);
    }

    &.error :global(.inner),
    &.error .close {
      color: rgb(185, 74, 72);
    }

    &.success :global(.inner) {
      border: 1px solid rgb(214, 233, 198);
      background-color: rgb(223, 240, 216);
    }

    &.success :global(.inner),
    &.success .close {
      color: rgb(70, 136, 71);
    }

    &.info :global(.inner) {
      border: 1px solid rgb(188, 232, 241);
      background-color: rgb(217, 237, 247);
    }

    &.warning :global(.inner) {
      border: 1px solid rgb(251, 238, 213);
      background-color: rgb(252, 248, 227);
    }

    &.warning :global(.inner) {
      color: rgb(192, 152, 83);
    }
  }
</style>
