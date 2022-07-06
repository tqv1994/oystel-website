<script lang="ts">
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import type { Currency } from '$lib/store/currency';
  import { TripInput } from '$lib/store/trip';
  import { onMount } from 'svelte';

  const options = [
    'Solo',
    'A friend',
    'Adult couple(s)',
    'Family with young children (under 12 yrs)',
    'Family with teenage children',
    'Multi generational adults',
    'Large group of adults',
  ];
  export let currencies: Currency[] = [];
  export let tripInput: TripInput = new TripInput();
  let autofocusRef: any = null;
  tripInput.budget = tripInput.budget || 0;
  //tripInput.numberOfRoom = tripInput.numberOfRoom || 1;
  tripInput.nightlyBudget = tripInput.nightlyBudget || 0;
  onMount(() => {
    let currency = currencies.find(
      (item) => item.id.toString() === (tripInput.currency || '').toString(),
    );
    if (!currency) {
      currency = currencies.find((item) => item.name === 'US Dollar');
      if (currency) {
        tripInput.currency = currency.id;
        tripInput.budget = 35000;
        tripInput.nightlyBudget = 600;
      }
    }
    autofocusRef.focus();
  });
</script>

<Step
  title="Do you have a budget in mind?"
  subtitle="Providing this information will help our advisors plan the best vacation to suit you best. Please provide either the overall or accommodation budget. Both are not needed."
>
  <div class="row">
    <div class="d-col-6 m-col-12">
      <label class="mdc-typography--headline3" for="budget-currency"
        >Currency</label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <Select id="budget-currency" noLabel bind:value={tripInput.currency}>
        {#each currencies as currency}
          <Option value={currency.id}>{currency.name}</Option>
        {/each}
      </Select>
    </div>
  </div>
  <div class="row">
    <div class="d-col-6 m-col-12">
      <label class="mdc-typography--headline3" for="budget-budget"
        >Overall trip budget</label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <Textfield
        id="budget-budget"
        bind:value={tripInput.budget}
        input$min={1}
        label="E.g 30000"
        type="number"
        bind:this={autofocusRef}
      />
    </div>
  </div>
  <div class="row">
    <div class="d-col-6 m-col-12">
      <label class="mdc-typography--headline3" for="budget-accommodation"
        >Accommodation <small>(per room / night)</small></label
      >
    </div>
    <div class="d-col-6 m-col-12">
      <Textfield
        id="budget-accommodation"
        bind:value={tripInput.nightlyBudget}
        input$min={1}
        label="E.g 1250"
        type="number"
      />
      <!--<Select id="budget-accommodation" noLabel bind:value={tripInput.numberOfRoom}>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
      </Select>-->
    </div>
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  * {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  .row {
    align-items: center;
    text-align: left;
    margin-bottom: 20px;
    @include mixins.mobile {
      --mdc-layout-grid-gutter-mobile: 0;
    }
  }
  :global(.mdc-text-field),
  :global(.mdc-select) {
    width: 100%;
  }
  // .row {
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   width: 30em;
  //   margin: 0 auto;
  // }
</style>
