<script lang="ts">
  import Title from './Title.svelte';

  export let title = '';
  let classNames = '';
  export { classNames as class };
</script>

<section class={`${classNames} p-0`}>
  <div class="section--title mb-25">
    <Title class="large">{title}</Title>
    <div class="section--title-actions m-none">
      <slot name="actions" />
    </div>
  </div>
  <div class="section--content">
    <slot name="content" />

    <div class="section---content-actions m-block d-none">
      <slot name="actions" />
    </div>
  </div>
</section>

<style lang="scss">
  @use '../../../theme/mixins';
  section {
    .section--title {
      position: relative;
      .section--title-actions {
        position: absolute;
        right: 40px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .section--content {
      @include mixins.desktop {
        :global(p) {
          width: 100%;
        }
      }
      .section---content-actions {
        margin-top: 30px;
      }
    }
  }

  * {
    --mdc-theme-primary: #000;
  }
</style>
