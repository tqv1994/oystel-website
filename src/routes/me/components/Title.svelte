<script lang="ts">
  let classNames: string = '';
  export { classNames as class };
</script>

<h3 class={`m-0 ${classNames}`}><slot /></h3>

<style lang="scss">
  @use '../../../theme/mixins';
  h3 {
    &.large{
        --mdc-typography-headline1-font-size: 32px;
    }
  }
</style>
