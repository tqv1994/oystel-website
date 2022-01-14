<script lang="ts">
  import { InlineCalendar } from 'svelte-calendar';
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';
  import { TripInput } from '$lib/store/trip';
  import { afterUpdate } from 'svelte';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  export let tripInput: TripInput = new TripInput();
  tripInput.numberOfNights = tripInput.numberOfNights || 1;
</script>

<Step title="When would you like to go?">
  <div class="plan-wrap-form">
    <div class="calendar d-mb-25 m-mb-20">
      <OyDatepicker bind:value={tripInput.depart_at} type="inline" options={{width: '30rem'}} />
    </div>
    <Textfield
      bind:value={tripInput.numberOfNights}
      min={1}
      label="Number of nights away"
      type="number"
    />
  </div>
</Step>

<style lang="scss">
  @use '../../../theme/mixins';
  @include mixins.mobile{
    .calendar{
      & > :global(div) {
        --sc-theme-calendar-maxWidth: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2) !important;
      }
      // :global(.grid){
      //   width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2); 
      //   max-width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2); 
      // }
    }
  }
  .plan-wrap-form{
    width: 30rem;
    @include mixins.mobile{
      width: 100%;
      max-width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2);
    }
    margin: auto;
  }
</style>
