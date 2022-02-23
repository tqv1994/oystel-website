<script lang="ts">
  import { Category } from '$lib/store/category';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import {
    productColourStore,
    productDesignerStore,
    productPattnerStore,
    productTypeStore,
  } from '$lib/store/product';
  import {
    PRODUCT_COLOUR,
    PRODUCT_DESIGNER,
    PRODUCT_PATTERN,
    QUERY,
    search,
    SearchParams,
    TYPE,
  } from '$lib/store/search';
  import { sortByName } from '$lib/utils/sort';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import OyAutocomplete from './common/OyAutocomplete.svelte';
  import Dropdown, { DropdownValue } from './Dropdown.svelte';
  import _ from 'lodash';
  import Button from '@smui/button/src/Button.svelte';
  import Label from '@smui/list/src/Label.svelte';

  export let query: string = '';
  export let type: string = '';
  export let designer: string = '';
  export let colour: string = '';
  export let pattern: string = '';
  export let vacationStyle: string = '';

  let contentHeaderActionMobile: string = '';
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
  productPattnerStore.subscribe((store) => {
    patterns = sortByName(Object.values(store.items));
    patterns.unshift({ id: '', name: 'All' });
  });

  function go(params: SearchParams) {
    search({
      [QUERY]: query,
      [TYPE]: type,
      [PRODUCT_DESIGNER]: designer,
      [PRODUCT_COLOUR]: colour,
      [PRODUCT_PATTERN]: pattern,
      ...params,
    });
  }
  const goSlow = _.debounce(go, 1000);

  function onQueryInput(event: InputEvent) {
    const q = (event.target as HTMLInputElement).value.trim();
    if (q.length > 2) {
      goSlow({ q });
    }
  }

  function onTypeChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ [TYPE]: event.detail.value?.id });
  }

  function onDesignerChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ [PRODUCT_DESIGNER]: event.detail.value?.id });
  }

  function onColourChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ [PRODUCT_COLOUR]: event.detail.value?.id });
  }

  function onPatternChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ [PRODUCT_PATTERN]: event.detail.value?.id });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      [QUERY]: event.detail.query || '',
      [TYPE]: event.detail.type || '',
      [PRODUCT_DESIGNER]: event.detail.designer || '',
      [PRODUCT_PATTERN]: event.detail.pattern || '',
      [PRODUCT_COLOUR]: event.detail.colour || '',
    });
  }
</script>

<form
  class="search-form m-none"
  method="GET"
  on:submit|preventDefault={() => {
    go({});
  }}
>
  <LayoutGrid class="p-0">
    <Cell span="2">
      <div class="form-control">
        <Textfield
          variant="outlined"
          bind:value={query}
          on:input={onQueryInput}
          label="Start with a search"
          withTrailingIcon={false}
        >
          <Icon slot="trailingIcon"
            ><img src="/img/icons/icon-search.svg" /></Icon
          >
        </Textfield>
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={type}
          options={types}
          key={'id'}
          label="Category"
          variant="outlined"
          on:SMUIAutocomplete:change={onTypeChange}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={designer}
          options={designers}
          key={'id'}
          label="Designer"
          variant="outlined"
          on:SMUIAutocomplete:change={onDesignerChange}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={colour}
          options={colours}
          key={'id'}
          label="Colour"
          variant="outlined"
          on:SMUIAutocomplete:change={onColourChange}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={pattern}
          options={[]}
          key={'id'}
          label="Pattern"
          variant="outlined"
          on:SMUIAutocomplete:change={onPatternChange}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OyAutocomplete
          getOptionLabel={(option) => (option ? `${option.name}` : '')}
          bind:value={pattern}
          options={[]}
          key={'id'}
          label="Vacation Style"
          variant="outlined"
        />
      </div>
    </Cell>
  </LayoutGrid>
</form>
<div class="button-show-search-form-wrap d-none m-block">
  <Button
    variant="outlined"
    on:click={() => {
      contentHeaderActionMobile = 'product-search-form';
    }}><Label>Start your Search</Label></Button
  >
</div>

<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ type, designer, colour, pattern, query }}
  on:close={onSearchSubmitMobile}
/>

<style lang="scss">
  .search-form {
    :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 0;
      --mdc-select-idle-line-color: #000;
      --mdc-select-hover-line-color: #000;
    }
  }
  .search-form {
    :global(.mdc-text-field),
    :global(.mdc-select) {
      height: 35px;
      width: 100%;
      padding-right: 15px;
    }
    :global(.mdc-select.mdc-select--outlined .mdc-select__anchor) {
      height: 35px;
    }
    :global(.mdc-text-field .mdc-notched-outline__leading),
    :global(.mdc-text-field .mdc-notched-outline__notch),
    :global(.mdc-text-field .mdc-notched-outline__trailing),
    :global(.mdc-select .mdc-notched-outline__leading),
    :global(.mdc-select .mdc-notched-outline__notch),
    :global(.mdc-select .mdc-notched-outline__trailing) {
      border-color: #000;
    }

    :global(.mdc-text-field img) {
      filter: brightness(0.1);
    }
  }

  .button-show-search-form-wrap :global(.mdc-button) {
    width: 100%;
  }
</style>
