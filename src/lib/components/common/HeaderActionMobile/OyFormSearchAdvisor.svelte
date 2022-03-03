<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Country, countryStore } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';
import { sortByName } from '$lib/utils/sort';
import { experienceTypeStore } from '$lib/store/experience-type';
import OySelect from '../OySelect.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  export let searchModel: {
    experiencetype: string;
    countries: string[];
  };
  let experienceTypeData: Category | undefined;
  let countryData: Country | undefined;
  let { countries, experiencetype } = searchModel;
  const experienceTypes = sortByName(Object.values($experienceTypeStore.items));
  // let experienceTypes: Category[];
  // experienceTypeStore.subscribe(
  //   (store) => (experienceTypes = sortByName(Object.values(store.items))),
  // );

  let locations: Country[];
  countryStore.subscribe((store) => {
    locations = sortByName(Object.values(store.items));
  });
  function onSearchSubmit() {
    console.log('experiencetype',experiencetype);
    setTimeout(() => {
      dispatch('close', { countries, experiencetype });
    }, 0);
  }

  const onAdvisorTypeChange = (event: CustomEvent<DropdownValue<Category>>) => {
    experiencetype = event.detail.value?.id || null;
  };

  const onCountryChange = (event: CustomEvent<DropdownValue<Country>>) => {
    if (event.detail.value) {
      countries = event.detail.value.map((item: Category) => item.id);
    } else {
      countries = null
    }
  };
</script>

<div id="form-search-advisor-wrap" class="mt-40">
  <form
    class="search-form-advisor"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    <div class="form-control mb-40">
      <OySelect
        items={experienceTypes}
        optionIdentifier="id"
        labelIdentifier="name"
        placeholder="By Speciality"
        on:select={onAdvisorTypeChange}
        on:clear={onAdvisorTypeChange}
        value={experiencetype}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
          items={locations}
          optionIdentifier="id"
          labelIdentifier="name"
          on:select={onCountryChange}
          on:clear={onCountryChange}
          placeholder="Location"
          value={countries}
          isMulti={true}
      />
    </div>
    <div class="form-control btn-submit-wrap">
      <Button variant="outlined" style="width: 100%;" type="submit"
        ><Label>Show Results</Label></Button
      >
    </div>
  </form>
</div>

<style>
  .search-form-advisor :global(.mdc-select) {
    width: 100%;
  }
  .search-form-advisor
    :global(.mdc-select.mdc-select--outlined .mdc-select__anchor) {
    height: 35px;
  }
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__leading),
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__notch),
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__trailing),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__leading),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__notch),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__trailing) {
    border-color: #000;
  }
  .search-form-advisor {
    position: relative;
    height: calc(100vh - 206px);
  }
  .search-form-advisor .btn-submit-wrap {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
</style>
