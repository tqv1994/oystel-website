<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher } from 'svelte';
  import { type Country, countryStore } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  import type { Nameable } from '$lib/store/types';
  import type { DropdownValue } from '$lib/components/Dropdown.svelte';
  import OySelect from '../OySelect.svelte';
  import { sortByName } from '$lib/utils/sort';
  import type { Kind } from '$lib/store/order';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel: {
    experience_type: string;
    destination_type: string;
    countries: string[] | undefined;
    ordering: string;
  };
  let { experience_type, destination_type, countries, ordering } = searchModel;
  export let destinationTypeOptions: Kind[] = [];
  export let experienceTypeOptions: Kind[] = [];
  export let countryOptions: Country[] = [];
  export let orderingTypeOptions: Kind[] = [];
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', {
        destination_type,
        experience_type,
        countries,
        ordering,
      });
    }, 0);
  }

  const onExperienceTypeChange = (event: CustomEvent<DropdownValue<Kind>>) => {
    experience_type = event.detail.value?.id || '';
  };

  const onDestinationTypeChange = (event: CustomEvent<DropdownValue<Kind>>) => {
    destination_type = event.detail.value?.id || '';
  };

  function onCountryChange(event: CustomEvent<DropdownValue<Country[]>>) {
    if (event.detail.value) {
      const isEqual = (event.detail.value || []).reduce(
        (acc: boolean, item: Country) => {
          if (acc) {
            const indexExist = (countries || []).findIndex(
              (idCountry) => idCountry == item.id,
            );
            if (indexExist >= 0) {
              acc = true;
            } else {
              acc = false;
            }
          }
          return acc;
        },
        true,
      );
      if (!isEqual) {
        countries = (event.detail.value || []).map((item: Country) => item.id);
      }
    } else {
      countries = undefined;
    }
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    ordering = event.detail.value?.id || '';
  }
</script>

<div id="form-search-experience-wrap" class="mt-40">
  <form
    class="search-form-experiences"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    {#if experienceTypeOptions.length > 0}
      <div class="form-control mb-40">
        <OySelect
          items={experienceTypeOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="By Experience Type"
          on:select={onExperienceTypeChange}
          on:clear={onExperienceTypeChange}
          value={experience_type}
        />
      </div>
    {/if}
    {#if destinationTypeOptions.length > 0}
      <div class="form-control mb-40">
        <OySelect
          items={destinationTypeOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="By Destination Type"
          on:select={onDestinationTypeChange}
          on:clear={onDestinationTypeChange}
          value={destination_type}
        />
      </div>
    {/if}
    {#if countryOptions.length > 0}
      <div class="form-control mb-40">
        <OySelect
          items={countryOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="By Country"
          on:select={onCountryChange}
          on:clear={onCountryChange}
          value={countries}
          isMulti={true}
        />
      </div>
    {/if}
    {#if orderingTypeOptions.length > 0}
      <div class="form-control mb-80">
        <OySelect
          items={orderingTypeOptions}
          optionIdentifier="key"
          labelIdentifier="name"
          placeholder="Order By"
          on:select={onSortChange}
          on:clear={onSortChange}
          value={ordering}
        />
      </div>
    {/if}
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
