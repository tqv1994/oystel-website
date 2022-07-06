<script lang="ts">
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { TripInput } from '$lib/store/trip';
  import type { Kind } from '$lib/store/category';
  export let travelGroupTypes: Kind[] = [];
  export let tripInput: TripInput = new TripInput();
  tripInput.numberOfAdults = tripInput.numberOfAdults || 1;
  tripInput.numberOfChildren = tripInput.numberOfChildren || 0;
  tripInput.travelGroupTypes = tripInput.travelGroupTypes || [];
</script>

<Step
  title="Who will be be traveling with you?"
  subtitle="Check as many as you wish"
>
  <div class="options">
    {#each travelGroupTypes || [] as option}
      <FormField>
        <Checkbox bind:group={tripInput.travelGroupTypes} value={option.id} />
        <span slot="label">{option.name}</span>
      </FormField>
    {/each}
  </div>
  <div class="inputs">
    <h3>Guests</h3>
    <Textfield
      class="num-adults"
      bind:value={tripInput.numberOfAdults}
      input$min={1}
      label="Number of adults"
      type="number"
    />
    <Textfield
      class="num-children"
      bind:value={tripInput.numberOfChildren}
      label="Number of children"
      type="number"
      input$min={0}
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
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include mixins.mobile {
      grid-template-columns: 1fr;
    }
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field) {
      margin-bottom: 17px;
      text-align: left;
    }
  }
  .inputs {
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
    margin-top: 2em;
  }
  * :global(.num-adults) {
    margin: 0 2em;
  }
</style>
