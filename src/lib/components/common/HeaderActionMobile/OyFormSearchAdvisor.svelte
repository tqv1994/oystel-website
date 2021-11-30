<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher } from 'svelte';
  import { Country } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import Dropdown from '$lib/components/Dropdown.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel: {
    type: Category | undefined;
    country: Country | undefined;
  } = {
    type: undefined,
    country: undefined,
  };
  export let locations: Country[];
  export let advisorTypes: Category[];
  let country: Country | undefined = searchModel.country;
  let type: Category | undefined = searchModel.type;
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', { country, type });
    }, 0);
  }
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
        blankItem="All"
        items={advisorTypes}
        value={type}
      />
    </div>
    <div class="form-control mb-40">
      <Dropdown
        label="By Location"
        blankItem="All"
        items={locations}
        bind:value={country}
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
