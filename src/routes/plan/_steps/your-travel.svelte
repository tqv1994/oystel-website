<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Textfield from '@smui/textfield';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
import { TripInput } from '$lib/store/trip';

  let flights: string = '';
  export let tripInput: TripInput = new TripInput();
  let needFlights = tripInput.needFlights ? 'yes' : 'no';
  tripInput.travelByFlight ||= '';
  tripInput.travelAnotherWay ||= '';
</script>

<Step title="Your travel" subtitle="">
  <div class="row mt-20">
    <div class="d-col-7 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0">Do you need Flights?</label>
    </div>
    <div class="d-col-5 m-col-12">
      <Select label="Select" bind:value={needFlights} on:SMUI:select:value={(e)=>{ tripInput.needFlights = e.detail == 'yes' ? true : false}}>
        <Option value={'yes'} >No</Option>
        <Option value={'no'}>Yes</Option>
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
      <Textfield bind:value={tripInput.travelByFlight}/>
    </div>
  </div>
  <div class="row">
    <div class="d-col-7 m-col-12 text-left">
      <label class="mdc-typography--headline1 m-0"
        >Do you prefer to travel another way?</label
      >
    </div>
    <div class="d-col-5 m-col-12">
      <Textfield bind:value={tripInput.travelAnotherWay}/>
    </div>
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  label{
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
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
