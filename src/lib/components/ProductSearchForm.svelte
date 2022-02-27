<script lang="ts">
  import { Category } from '$lib/store/category';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import {
    productColourStore,
    productDesignerStore,
    productPattnerStore,
    productTypeStore,
    vacationStyleStore,
  } from '$lib/store/product';
  import {
    PRODUCT_COLOUR,
    PRODUCT_DESIGNER,
    PRODUCT_PATTERN,
    QUERY,
    search,
    SearchParams,
    TYPE,
    VACATION_STYLE,
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
  import OySelect from './common/OySelect.svelte';

  export let query: string = '';
  export let type: string = '';
  export let designer: string = '';
  export let colours: string[] = [];
  export let patterns: string[] = [];
  export let vacationStyle: string = '';

  let contentHeaderActionMobile: string = '';
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

  function go(params: SearchParams) {
    search({
      [QUERY]: query,
      [TYPE]: type,
      [PRODUCT_DESIGNER]: designer,
      [PRODUCT_COLOUR]: colours,
      [PRODUCT_PATTERN]: patterns,
      [VACATION_STYLE]: vacationStyle,
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
    console.log('event value pd', event.detail);
    go({ [PRODUCT_DESIGNER]: event.detail.value?.id || null });
  }

  function onColourChange(event: CustomEvent<DropdownValue<Category>>) {
    console.log('event value', event.detail);
    if (event.detail.value) {
      go({
        [PRODUCT_COLOUR]: event.detail.value.map((item: Category) => item.id),
      });
    } else {
      go({ [PRODUCT_COLOUR]: null });
    }
  }

  function onPatternChange(event: CustomEvent<DropdownValue<Category>>) {
    console.log('event value', event.detail);
    if (event.detail.value) {
      go({
        [PRODUCT_PATTERN]: event.detail.value.map((item: Category) => item.id),
      });
    } else {
      go({ [PRODUCT_PATTERN]: null });
    }
  }

  function onVacationStyleChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ [VACATION_STYLE]: event.detail.value?.id });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      [QUERY]: event.detail.query || '',
      [TYPE]: event.detail.type || '',
      [PRODUCT_DESIGNER]: event.detail.designer || '',
      [PRODUCT_PATTERN]: event.detail.patterns || null,
      [PRODUCT_COLOUR]: event.detail.colours || null,
      [VACATION_STYLE]: event.detail.vacationStyle || '',
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
        <OySelect
          items={typeOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="Category"
          on:select={onTypeChange}
          on:clear={onTypeChange}
          value={type}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OySelect
          items={designerOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="Designer"
          on:select={onDesignerChange}
          on:clear={onDesignerChange}
          value={designer}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OySelect
          items={colourOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="Colours"
          on:select={onColourChange}
          on:clear={onColourChange}
          value={colours}
          isMulti={true}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OySelect
          items={patternOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="Patterns"
          on:select={onPatternChange}
          on:clear={onPatternChange}
          value={patterns}
          isMulti={true}
        />
      </div>
    </Cell>
    <Cell span="2">
      <div class="form-control">
        <OySelect
          items={vacationStyleOptions}
          optionIdentifier="id"
          labelIdentifier="name"
          placeholder="Vacation Style"
          on:select={onVacationStyleChange}
          on:clear={onVacationStyleChange}
          value={patterns}
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
  searchModel={{ type, designer, colours, patterns, query }}
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
