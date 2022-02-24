<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Category } from '$lib/store/category';
  import {
    productColourStore,
    productDesignerStore,
    productPattnerStore,
    productTypeStore,
vacationStyleStore,
  } from '$lib/store/product';
  import { sortByName } from '$lib/utils/sort';
  import OyAutocomplete from '../OyAutocomplete.svelte';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import OySelect from '../OySelect.svelte';
  import { DropdownValue } from '$lib/components/Dropdown.svelte';

  const dispatch = createEventDispatcher();
  export let searchModel: {
    query: string;
    type: string;
    designer: string;
    patterns: string[];
    colours: string[];
    vacationStyle: string;
  };
  let { type, designer, patterns, colours, query, vacationStyle } = searchModel;
  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', {
        query,
        type,
        designer,
        patterns,
        colours,
        vacationStyle
      });
    }, 0);
  }

  let typeOptions: Category[] = [];
  productTypeStore.subscribe((store) => {
    typeOptions = sortByName(Object.values(store.items));
  });
  let designerOptions: Category[] = [];
  productDesignerStore.subscribe((store) => {
    designerOptions = sortByName(Object.values(store.items));
  });
  let colourOptions: Category[] = [];
  productColourStore.subscribe((store) => {
    colourOptions = sortByName(Object.values(store.items));
  });
  let patternOptions: Category[] = [];
  productPattnerStore.subscribe((store) => {
    patternOptions = sortByName(Object.values(store.items));
  });
  let vacationStyleOptions: Category[] = [];
  vacationStyleStore.subscribe((store) => {
    vacationStyleOptions = sortByName(Object.values(store.items));
  });

  function onTypeChange(event: CustomEvent<DropdownValue<Category>>) {
    type = event.detail.value?.id;
  }

  function onDesignerChange(event: CustomEvent<DropdownValue<Category>>) {
    designer = event.detail.value?.id;
  }

  function onColourChange(event: CustomEvent<DropdownValue<Category>>) {
    if(Array.isArray(event.detail.value)){
      colours = (event.detail.value || []).map((item: Category)=>item?.id);
    }else{
      colours = null
    }
  }

  function onPatternChange(event: CustomEvent<DropdownValue<Category>>) {
    if(Array.isArray(event.detail.value)){
      patterns = (event.detail.value || []).map((item: Category)=>item?.id);
    }else{
      patterns = null
    }
  }

  function onVacationStyleChange(event: CustomEvent<DropdownValue<Category>>) {
    vacationStyle = event.detail.value?.id;
  }
</script>

<div id="form-search-experience-wrap" class="mt-40">
  <form
    class="search-form-experiences"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    <div class="form-control mb-40">
      <Textfield
        variant="outlined"
        bind:value={query}
        label="Start with a search"
        withTrailingIcon={false}
      >
        <Icon slot="trailingIcon"><img src="/img/icons/icon-search.svg" /></Icon
        >
      </Textfield>
    </div>
    <div class="form-control mb-40">
      <OySelect items={typeOptions} optionIdentifier="id" labelIdentifier="name" placeholder="Category" on:select={onTypeChange} on:clear={onTypeChange} value={type} />
    </div>
    <div class="form-control mb-40">
      <OySelect items={designerOptions} optionIdentifier="id" labelIdentifier="name" placeholder="Designer" on:select={onDesignerChange} on:clear={onDesignerChange} value={designer} />
    </div>
    <div class="form-control mb-40">
      <OySelect items={colourOptions} optionIdentifier="id" labelIdentifier="name" placeholder="Colours" on:select={onColourChange} on:clear={onColourChange} value={colours} isMulti={true} />
    </div>
    <div class="form-control mb-40">
      <OySelect items={patternOptions} optionIdentifier="id" labelIdentifier="name" placeholder="Patterns" on:select={onPatternChange} on:clear={onPatternChange} value={patterns} isMulti={true} />
    </div>
    <div class="form-control mb-40">
      <OySelect items={vacationStyleOptions} optionIdentifier="id" labelIdentifier="name" placeholder="Vacation Style" on:select={onVacationStyleChange} on:clear={onVacationStyleChange} value={vacationStyle} />
    </div>
    <div class="form-control btn-submit-wrap">
      <Button variant="unelevated" style="width: 100%;" type="submit"
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
  .search-form-experiences :global(.mdc-select),
  .search-form-experiences :global(.mdc-text-field) {
    width: 100%;
  }
  .search-form-experiences
    :global(.mdc-select.mdc-select--outlined .mdc-select__anchor) {
    height: 35px;
  }

  .search-form-experiences :global(.mdc-text-field--outlined) {
    height: 40px;
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
  .search-form-experiences :global(.mdc-text-field__icon img) {
    filter: brightness(0%);
  }
</style>
