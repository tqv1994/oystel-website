<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { TripInput } from '$lib/store/trip';
  import type { Kind } from '$lib/store/category';
  import type { Country } from '$lib/store/country';
  import OySelect from '$lib/components/common/OySelect.svelte';

  export let destinationTypes: Kind[];
  export let countries: Country[];
  export let tripInput: TripInput = new TripInput();
  export let desiredDestinationArr: string[] = [];
  tripInput.destinationTypes = tripInput.destinationTypes || [];
  tripInput.desiredDestinations = tripInput.desiredDestinations || '';
  $: if (tripInput.desiredDestinations) {
    const countryNames = tripInput.desiredDestinations.split(',');
    desiredDestinationArr = (countryNames || []).reduce(
      (acc: string[], item) => {
        const country = countries.find(
          (countryItem) => countryItem.name === item.trim(),
        );
        if (country) {
          acc.push(country.id);
        }
        return acc;
      },
      [],
    );
  }
  $: if (destinationTypes && destinationTypes.length > 0) {
    let typeOther: Kind;
    destinationTypes = destinationTypes.reduce((acc: Kind[], item, index) => {
      if (
        item.name.toLowerCase() === 'other' &&
        index + 1 < destinationTypes.length
      ) {
        typeOther = item;
      } else {
        acc.push(item);
      }
      if (index + 1 === destinationTypes.length && typeOther) {
        acc.push(typeOther);
      }
      return acc;
    }, []);
  }

  const onCountriesChange = (event: CustomEvent<{ value: Country[] }>) => {
    console.log(event);
    if (event.detail.value && event.detail.value.length) {
      if (event.detail.value.length > 3) {
        event.detail.value.splice(desiredDestinationArr.length - 1, 1);
        desiredDestinationArr = event.detail.value.map((item) => item.id);
        window.pushToast('You can only choose up to 3 destinations');
        return;
      }
      tripInput.desiredDestinations = event.detail.value.reduce(
        (acc: string, item, index) => {
          if (index === 0) {
            acc = item.name;
          } else {
            acc += `, ${item.name}`;
          }
          return acc;
        },
        '',
      );
    }
  };
</script>

<Step title="Where would you like to travel?" subtitle="Check all that apply">
  <div class="options">
    {#each destinationTypes || [] as option}
      <FormField>
        <Checkbox bind:group={tripInput.destinationTypes} value={option.id} />
        <span slot="label">{option.name || ''}</span>
      </FormField>
    {/each}
  </div>
  <div class="row mt-30">
    <div class="d-col-6 m-col-12">
      <label class="mdc-typography--headline3" for="budget-budget"
        >Choose up to three destinations</label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <OySelect
        items={countries}
        placeholder="Destinations"
        on:select={onCountriesChange}
        on:clear={onCountriesChange}
        value={desiredDestinationArr}
        isMulti={true}
        variant="standard"
        multiShowAll={true}
        class="text-left"
      />
    </div>
  </div>
</Step>

<style lang="scss">
  @use '../../../theme/mixins';
  @use '../../../style/include/grid';
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
  div :global(.oy-select .multiSelect) {
    height: auto;
  }
  :global(.preferred) {
    margin-top: 2em;
    height: 300px;
    @include mixins.mobile {
      min-height: 133px;
    }
  }
</style>
