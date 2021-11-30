<script lang="ts">
  import { InlineCalendar } from 'svelte-calendar';
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';

  let numOfNights: number = 1;
</script>

<Step title="When would you like to go?">
  <div class="calendar d-mb-25 m-mb-20">
    <InlineCalendar
      theme={{
        calendar: {
          width: '20em',
          shadow: 'none',
          legend: {
            height: '20px',
          },
          grid: {
            disabledOpacity: '.35',
            outsiderOpacity: '.6',
          },
        },
      }}
    />
  </div>
  <Textfield
    bind:value={numOfNights}
    min={1}
    label="Number of nights away"
    type="number"
  />
</Step>

<style lang="scss">
</style>
