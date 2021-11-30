<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import ImageWithCheckBox from '../ImageWithCheckBox.svelte';
  let selected: string[] = [];
</script>

<Step
  title="Room style"
  subtitle="Check as many as you wish."
  class="room-style-content"
>
  <div class="row">
    <div class="d-col-3 m-col-6">
      <h3 class="mdc-typography--headline1 m-0 mb-15">Traditional</h3>
      <div class="options">
        <ImageWithCheckBox bind:selected value={'room-1'} image="./img/rooms/room-1.jpg" />
        <ImageWithCheckBox bind:selected value={'room-2'} image="./img/rooms/room-2.jpg" />
      </div>
    </div>
    <div class="d-col-3 m-col-6">
      <h3 class="mdc-typography--headline1 m-0 mb-15">Modern</h3>
      <div class="options">
        <ImageWithCheckBox bind:selected value={'room-3'} image="./img/rooms/room-3.jpg" />
        <ImageWithCheckBox bind:selected value={'room-4'} image="./img/rooms/room-4.jpg" />
      </div>
    </div>
    <div class="d-col-3 m-col-6">
      <h3 class="mdc-typography--headline1 m-0 mb-15">Country Chic</h3>
      <div class="options">
        <ImageWithCheckBox bind:selected value={'room-5'} image="./img/rooms/room-5.jpg" />
        <ImageWithCheckBox bind:selected value={'room-6'} image="./img/rooms/room-6.jpg" />
      </div>
    </div>
    <div class="d-col-3 m-col-6">
      <h3 class="mdc-typography--headline1 m-0 mb-15">Boutique</h3>
      <div class="options">
        <ImageWithCheckBox bind:selected value={'room-7'} image="./img/rooms/room-7.jpg" />
        <ImageWithCheckBox bind:selected value={'room-8'} image="./img/rooms/room-8.jpg" />
      </div>
    </div>
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  * {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile{
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  :global(.root.room-style-content) {
    :global(.content) {
      max-width: 75em;
    }
  }
  h3{
    @include mixins.mobile{
      height: 38px;
      overflow: hidden;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 2em;
  }
  :global(.preferred) {
    margin-top: 2em;
  }
</style>
