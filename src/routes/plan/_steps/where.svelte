<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import { TripInput } from '$lib/store/trip';

  export let destinationTypes: Category[];
  export let tripInput: TripInput = new TripInput();
  tripInput.destinationTypes = tripInput.destinationTypes || [];
  tripInput.desiredDestinations = tripInput.desiredDestinations || '';
</script>

<Step title="Where would you like to travel?" subtitle="Check all that apply">
  <div class="options">
    {#each destinationTypes as option}
      <FormField>
        <Checkbox bind:group={tripInput.destinationTypes} value={option.id} />
        <span slot="label">{option.name}</span>
      </FormField>
    {/each}
  </div>
  <Textfield
    textarea
    class="preferred"
    bind:value={tripInput.desiredDestinations}
    label="List your preferred destination if you have one"
  />
</Step>

<style lang="scss">
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    @include mixins.mobile {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field) {
      margin-bottom: 17px;
      text-align: left;
    }
  }
  :global(.preferred) {
    margin-top: 2em;
    height: 300px;
    @include mixins.mobile {
      min-height: 133px;
    }
  }
</style>
