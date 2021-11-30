<script lang="ts">
    let classNames: string = '';
    export { classNames as class };
  </script>
  
  <p class={`m-0 ${classNames}`}><slot /></p>
  
  <style lang="scss">
    @use '../../../theme/mixins';
    p {
      --mdc-typography-body1-font-size: 14px;
      &.large{
          --mdc-typography-body1-font-size: 16px;
      }
      @include mixins.mobile {
        --mdc-typography-body1-font-size: 12px;
        &.large{
            --mdc-typography-body1-font-size: 14px;
        }
      }
    }
  </style>
  