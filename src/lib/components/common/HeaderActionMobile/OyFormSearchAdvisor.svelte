<script lang="ts">
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import { createEventDispatcher } from 'svelte';
  import { Country } from '$lib/store/country';
  import { Speciality } from '$lib/store/speciality';
  import Dropdown from '$lib/components/dropdown.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel: {
    speciality: Speciality | undefined;
    country: Country | undefined;
  } = {
    speciality: undefined,
    country: undefined,
  };
  export let locations: Country[];
  export let specialities: Speciality[];
  let country: Country | undefined = searchModel.country;
  let speciality: Speciality | undefined = searchModel.speciality;
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', { country, speciality });
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
        items={specialities}
        value={speciality}
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
