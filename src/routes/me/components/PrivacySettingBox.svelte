<script lang="ts">
import Title from "./Title.svelte";

  export let title: string = '';
  let classNames: string = '';
  export { classNames as class };
</script>

<section class={`${classNames}`}>
  <div class="section--title mb-25">
    <svelte:component this={Title} class="large">{title}</svelte:component>
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
          width: 80%;
        }
      }
      .section---content-actions{
          margin-top: 30px;
      }
    }
  }

  * {
    --mdc-theme-primary: #000;
  }
</style>
