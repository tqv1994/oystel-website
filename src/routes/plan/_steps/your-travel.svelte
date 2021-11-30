<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Textfield from '@smui/textfield';
  import Select from '@smui/select';
  import { Option } from '@smui/select';

  let flights: string = '';
</script>

<Step title="Your travel" subtitle="">
  <div class="row mt-20">
    <div class="d-col-7 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0">Do you need Flights?</label>
    </div>
    <div class="d-col-5 m-col-12">
      <Select label="Select" bind:value={flights}>
        <Option value={''} />
      </Select>
    </div>
  </div>
  <div class="row">
    <div class="d-col-7 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0"
        >If yes, how would you like to travel?</label
      >
    </div>
    <div class="d-col-5 m-col-12">
      <Select label="Select" bind:value={flights}>
        <Option value={''} />
      </Select>
    </div>
  </div>
  <div class="row">
    <div class="d-col-7 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0"
        >Do you prefer to travel another way?</label
      >
    </div>
    <div class="d-col-5 m-col-12">
      <Select label="Select" bind:value={flights}>
        <Option value={''} />
      </Select>
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
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0;
  }
  .row {
    margin-bottom: 20px;
    @include mixins.mobile{
      --mdc-layout-grid-gutter-mobile: 0;
    }
    :global(.mdc-select) {
      width: 100%;
    }
  }
</style>
