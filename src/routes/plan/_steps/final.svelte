<script lang="ts">
  import Step from '../Step.svelte';
  import type { Kind } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import { TripInput } from '$lib/store/trip';
  export let destinationTypes: Kind[];
  export let tripInput: TripInput = new TripInput();
  tripInput.numberOfTripsInSixMonths ||= 0;
</script>

<Step title="One final question..." subtitle="">
  <div class="row mt-20">
    <div class="d-col-6 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0"
        >Is everyone traveling fully vaccinated?</label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <Select
        label="Select"
        value={tripInput.vaccinated === true ? 'yes' : 'no'}
        on:SMUISelect:change={(e) => {
          tripInput.vaccinated = e.detail.value == 'yes' ? true : false;
        }}
      >
        <Option value="yes">Yes</Option>
        <Option value="no">No</Option>
      </Select>
    </div>
  </div>
  <div class="row">
    <div class="d-col-6 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0"
        >How many trips have you taken in the last 6 months?</label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <Textfield
        bind:value={tripInput.numberOfTripsInSixMonths}
        input$min={0}
        label="Enter Number"
        type="number"
      />
    </div>
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  div {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  label {
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
    @include mixins.mobile {
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
    :global(.mdc-select),
    :global(.mdc-text-field) {
      width: 100%;
    }
    @include mixins.mobile {
      --mdc-layout-grid-gutter-mobile: 0;
    }
    margin-bottom: 20px;
  }
</style>
