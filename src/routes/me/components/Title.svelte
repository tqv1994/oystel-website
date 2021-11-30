<script lang="ts">
  let classNames: string = '';
  export { classNames as class };
</script>

<h3 class={`mdc-typography--headline1 m-0 ${classNames}`}><slot /></h3>

<style lang="scss">
  @use '../../../theme/mixins';
  h3 {
    --mdc-typography-headline1-font-size: 22px;
    &.large{
        --mdc-typography-headline1-font-size: 32px;
    }
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 22px;
    }
  }
</style>
