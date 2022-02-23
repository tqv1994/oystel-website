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
import { productColourStore, productDesignerStore, productPattnerStore, productTypeStore } from '$lib/store/product';
import { sortByName } from '$lib/utils/sort';
import OyAutocomplete from '../OyAutocomplete.svelte';
  
    const dispatch = createEventDispatcher();
    export let searchModel: {
      query: string;
      type: string;
      designer: string;
      pattner: string;
      colour: string;
    };
    let { type, designer, pattner, colour, query } = searchModel;
    let experience: Experience | undefined;
    let destination: Destination | undefined;
    let countryData: Country | undefined;
    function onSearchSubmit() {
      setTimeout(() => {
        dispatch('close', {
          query,
          type,
          designer,
          pattner,
          colour
        });
      }, 0);
    }

    let types: Category[] = [];
    productTypeStore.subscribe((store) => {
        types = sortByName(Object.values(store.items));
        types.unshift({ id: '', name: 'All' });
    });
    let designers: Category[] = [];
    productDesignerStore.subscribe((store) => {
        designers = sortByName(Object.values(store.items));
        designers.unshift({ id: '', name: 'All' });
    });
    let colours: Category[] = [];
    productColourStore.subscribe((store) => {
        colours = sortByName(Object.values(store.items));
        colours.unshift({ id: '', name: 'All' });
    });
    let patterns: Category[] = [];
    productPattnerStore.subscribe((store)=>{
        patterns = sortByName(Object.values(store.items));
        patterns.unshift({id: "", name: "All"});
    });
    
  </script>
  
  <div id="form-search-experience-wrap" class="mt-40">
    <form
      class="search-form-experiences"
      action="/"
      on:submit|preventDefault={onSearchSubmit}
    >
      <div class="form-control mb-40">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={type}
          options={types}
          key={'id'}
          label="Category"
          variant="outlined"
        />
      </div>
      <div class="form-control mb-40">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={designer}
          options={designers}
          key={'id'}
          label="Designer"
          variant="outlined"
        />
      </div>
      <div class="form-control mb-40">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={pattner}
          options={patterns}
          key={'id'}
          label="Pattners"
          variant="outlined"
        />
      </div>
      <div class="form-control mb-80">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={colour}
          options={colours}
          key={'id'}
          label="Colours"
          variant="outlined"
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
  