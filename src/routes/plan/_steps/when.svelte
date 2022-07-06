<script lang="ts">
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';
  import { TripInput } from '$lib/store/trip';
  import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';
  export let tripInput: TripInput = new TripInput();
  tripInput.depart_at = tripInput.depart_at ? tripInput.depart_at : new Date();
  tripInput.numberOfNights = tripInput.numberOfNights || 1;
  const minDate = () => {
    let date = new Date();
    // add a day
    date.setDate(date.getDate() + 1);
    return date;
  };
</script>

<Step title="When would you like to travel?">
  <div class="plan-wrap-form">
    <div class="calendar d-mb-25 m-mb-20">
      <OyDatepicker
        bind:value={tripInput.depart_at}
        type="inline"
        options={{ width: '28rem', legend: {
          height: '-4.5em',
        }, }}
        min={minDate()}
      />
    </div>
    <Textfield
      bind:value={tripInput.numberOfNights}
      input$min={1}
      label="Number of nights away"
      type="number"
    />
  </div>
</Step>

<style lang="scss">
  @use '../../../theme/mixins';
  label {
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  @include mixins.mobile {
    .calendar {
      & > :global(div) {
        --sc-theme-calendar-maxWidth: calc(
          100vw - var(--mdc-layout-grid-margin-phone) * 2
        ) !important;
      }
      // :global(.grid){
      //   width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2);
      //   max-width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2);
      // }
    }
  }
  .plan-wrap-form {
    width: 30rem;
    @include mixins.mobile {
      width: 100%;
      max-width: calc(100vw - var(--mdc-layout-grid-margin-phone) * 2);
    }
    margin: auto;
  }
</style>
