<script lang="ts">
  import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
  import Button, { Icon, Label } from '@smui/button';
  import Svg from '@smui/common/Svg.svelte';
  import IconButton from '@smui/icon-button';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';
  import { Country } from '$lib/store/country';
import { Category } from '$lib/store/category';
import { Nameable } from '$lib/store/types';
import Dropdown from '$lib/components/dropdown.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel: {
    experience_type: Category | undefined,
    destination_type: Category | undefined,
    country: Country | undefined,
    ordering: Nameable | undefined
  };
  let { experience_type, 
    destination_type, 
    country, 
    ordering } = searchModel;
  export let destination_types: Destination[];
  export let experience_types: Experience[];
  export let countries: Country[];
  export let orderings: Nameable[] = [];
  function onSearchSubmit() {
    setTimeout(()=>{
      dispatch('close',{destination_type, experience_type, country, ordering});
    },0);
    
  }
</script>

<div id="form-search-experience-wrap" class="mt-40">
  <form
    class="search-form-experiences"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    <div class="form-control mb-40">
      <Dropdown
                    label="By Experience Type"
                    blankItem="All"
                    items={experience_types}
                    bind:value={experience_type}
                  />
    </div>
    <div class="form-control mb-40">
      <Dropdown
        label="By Destination Type"
        blankItem="All"
        items={destination_types}
        bind:value={destination_type}
      />
    </div>
    <div class="form-control mb-40">
      <Dropdown
        label="By Country"
        blankItem="All"
        items={countries}
        bind:value={country}
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
