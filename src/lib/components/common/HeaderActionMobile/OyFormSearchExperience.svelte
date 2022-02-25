<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';
  import { Country } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import { Nameable } from '$lib/store/types';
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel: {
    experience_type: string;
    destination_type: string;
    country: string;
    ordering: Nameable | undefined;
  };
  let { experience_type, destination_type, country, ordering } = searchModel;
  let experience: Experience | undefined;
  let destination: Destination | undefined;
  let countryData: Country | undefined;
  export let destination_types: Destination[];
  export let experience_types: Experience[];
  export let countries: Country[];
  export let orderings: Nameable[] = [];
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', {
        destination_type,
        experience_type,
        country,
        ordering,
      });
    }, 0);
  }

  onMount(() => {
    destination = destination_types.find(
      (item) => item.id + '' === destination_type,
    );
    experience = experience_types.find(
      (item) => item.id + '' === experience_type,
    );
    countryData = countries.find((item) => item.id + '' === country);
  });

  const onExperienceTypeChange = (
    event: CustomEvent<DropdownValue<Category>>,
  ) => {
    experience_type = event.detail.value.id;
  };

  const onDestinationTypeChange = (
    event: CustomEvent<DropdownValue<Category>>,
  ) => {
    destination_type = event.detail.value.id;
  };

  const onCountryChange = (event: CustomEvent<DropdownValue<Country>>) => {
    country = event.detail.value.id;
  };
</script>

<div id="form-search-experience-wrap" class="mt-40">
  <form
    class="search-form-experiences"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    {#if experience_types.length > 0 && experience_types[0].id === "" }
      <div class="form-control mb-40">
        <Dropdown
          label="By Experience Type"
          items={experience_types}
          bind:value={experience}
          on:MDCSelect:change={onExperienceTypeChange}
        />
      </div>
    {/if}
    {#if destination_types.length > 0 && destination_types[0].id === "" }
      <div class="form-control mb-40">
        <Dropdown
          label="By Destination Type"
          items={destination_types}
          bind:value={destination}
          on:MDCSelect:change={onDestinationTypeChange}
        />
      </div>
    {/if}
    <div class="form-control mb-40">
      <Dropdown
        label="By Country"
        items={countries}
        bind:value={countryData}
        on:MDCSelect:change={onCountryChange}
      />
    </div>
    <div class="form-control mb-80">
      <Dropdown
        label="Sort By"
        blankItem="All"
        items={orderings}
        bind:value={ordering}
      />
    </div>
    <div class="form-control btn-submit-wrap">
      <Button variant="outlined" style="width: 100%;" type="submit"
        ><Label>Filter Your Results</Label></Button
      >
    </div>
  </form>
</div>

<style lang="scss">
  :global(.page-destinations ~ #header-action-mobile),
  :global(.page-destinations-search ~ #header-action-mobile) {
    #form-search-experience-wrap {
      position: relative;
      height: calc(100vh - 206px);
      .btn-submit-wrap {
        position: absolute;
        bottom: 30px;
        width: 100%;
      }
    }
  }
  .search-form-experiences :global(.mdc-select) {
    width: 100%;
  }
  .search-form-experiences
    :global(.mdc-select.mdc-select--outlined .mdc-select__anchor) {
    height: 35px;
  }
  .search-form-experiences
    :global(.mdc-text-field .mdc-notched-outline__leading),
  .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__notch),
  .search-form-experiences
    :global(.mdc-text-field .mdc-notched-outline__trailing),
  .search-form-experiences :global(.mdc-select .mdc-notched-outline__leading),
  .search-form-experiences :global(.mdc-select .mdc-notched-outline__notch),
  .search-form-experiences :global(.mdc-select .mdc-notched-outline__trailing) {
    border-color: #000;
  }
</style>
