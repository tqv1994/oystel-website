<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Country, countryStore } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';
import { sortByName } from '$lib/utils/sort';
import { experienceTypeStore } from '$lib/store/experience-type';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  export let searchModel: {
    experiencetype: string;
    country: string;
  };
  let experienceTypeData: Category | undefined;
  let countryData: Country | undefined;
  let { country, experiencetype } = searchModel;
  const experienceTypes = sortByName(Object.values($experienceTypeStore.items));
  experienceTypes.unshift({ id: '', name: 'All' });
  // let experienceTypes: Category[];
  // experienceTypeStore.subscribe(
  //   (store) => (experienceTypes = sortByName(Object.values(store.items))),
  // );

  let locations: Country[];
  countryStore.subscribe((store) => {
    locations = sortByName(Object.values(store.items));
    locations.unshift({ id: '', name: 'All' });
  });
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', { country, experiencetype });
    }, 0);
  }
  onMount(()=>{
    experienceTypeData = experienceTypes.find((item)=>item.id+"" === experiencetype+"");
    countryData = locations.find((item)=>item.id+"" === country+"");
  });

  const onAdvisorTypeChange = (event: CustomEvent<DropdownValue<Category>>) => {
    experiencetype = event.detail.value.id;
  };

  const onCountryChange = (event: CustomEvent<DropdownValue<Country>>) => {
    country = event.detail.value.id;
  };
</script>

<div id="form-search-advisor-wrap" class="mt-40">
  <form
    class="search-form-advisor"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    <div class="form-control mb-40">
      <Dropdown
        label="By Speciality"
        items={experienceTypes}
        bind:value={experienceTypeData}
        on:MDCSelect:change={onAdvisorTypeChange}
      />
    </div>
    <div class="form-control mb-40">
      <Dropdown
        label="By Location"
        items={locations}
        bind:value={countryData}
        on:MDCSelect:change={onCountryChange}
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
