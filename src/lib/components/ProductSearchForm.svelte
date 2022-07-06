<script lang="ts">
  import type { Kind } from '$lib/store/category';
  import {
    buildKindFilter,
    searchProducts,
    trySearch,
    type ProductSearchParams,
  } from '$lib/store/search';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import type { DropdownValue } from '$lib/components/Dropdown.svelte';
  import _ from 'lodash';
  import Button from '@smui/button/src/Button.svelte';
  import Label from '@smui/list/src/Label.svelte';
  import OySelect from './common/OySelect.svelte';
  import type { Product } from '$lib/store/product';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  export let params: ProductSearchParams;
  let {
    q = '',
    colourIds,
    patternIds,
    designerId,
    vacationStyleId,
    typeId,
  } = params;
  export let types: Kind[];
  export let patterns: Kind[];
  export let designers: Kind[];
  export let colours: Kind[];
  export let vacationStyles: Kind[];
  let contentHeaderActionMobile = '';
  export let searchResult: Product[];

  async function go() {
    searchResult = await searchProducts({
      q,
      typeId,
      colourIds,
      patternIds,
      designerId,
      vacationStyleId,
    });
  }
  const goSlow = _.debounce(go, 1000);

  function onQueryInput(event: CustomEvent) {
    const q = (event.target as HTMLInputElement).value.trim();
    if (!q || q.length > 1) {
      goSlow();
    }
  }

  function onTypeChange(event: CustomEvent<DropdownValue<Kind>>) {
    typeId = event.detail.value?.id;
    go();
  }

  function onDesignerChange(event: CustomEvent<DropdownValue<Kind>>) {
    designerId = event.detail.value?.id;
    go();
  }

  function onColourChange(event: CustomEvent<DropdownValue<Kind[]>>) {
    if (event.detail.value) {
      colourIds = event.detail.value.map((item: Kind) => item.id);
    } else {
      colourIds = undefined;
    }
    go();
  }

  function onPatternChange(event: CustomEvent<DropdownValue<Kind>>) {
    if (event.detail.value) {
      patternIds = event.detail.value.map((item: Kind) => item.id);
    } else {
      patternIds = undefined;
    }
    go();
  }

  function onVacationStyleChange(event: CustomEvent<DropdownValue<Kind>>) {
    vacationStyleId = event.detail.value?.id;
    go();
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    q = event.detail.query;
    designerId = event.detail.designerId;
    typeId = event.detail.typeId;
    colourIds = event.detail.colourIds;
    patternIds = event.detail.patternIds;
    vacationStyleId = event.detail.vacationStyleId;
    go();
  }
</script>

<form class="search-form m-none" method="GET" on:submit|preventDefault={go}>
  <LayoutGrid class="p-0">
    <Cell span={2}>
      <div class="form-control">
        <Textfield
          variant="outlined"
          bind:value={q}
          on:input={onQueryInput}
          label="Start with a search"
          withTrailingIcon={false}
        >
          <Icon slot="trailingIcon"><SearchIcon /></Icon>
        </Textfield>
      </div>
    </Cell>
    <Cell span={2}>
      <div class="form-control">
        <OySelect
          items={types}
          placeholder="Category"
          on:select={onTypeChange}
          on:clear={onTypeChange}
          value={typeId}
        />
      </div>
    </Cell>
    <Cell span={2}>
      <div class="form-control">
        <OySelect
          items={designers}
          placeholder="Designer"
          on:select={onDesignerChange}
          on:clear={onDesignerChange}
          value={designerId}
        />
      </div>
    </Cell>
    <Cell span={2}>
      <div class="form-control">
        <OySelect
          items={colours}
          placeholder="Colours"
          on:select={onColourChange}
          on:clear={onColourChange}
          value={colourIds}
          isMulti={true}
        />
      </div>
    </Cell>
    <Cell span={2}>
      <div class="form-control">
        <OySelect
          items={patterns}
          placeholder="Patterns"
          on:select={onPatternChange}
          on:clear={onPatternChange}
          value={patternIds}
          isMulti={true}
        />
      </div>
    </Cell>
    <Cell span={2}>
      <div class="form-control">
        <OySelect
          items={vacationStyles}
          placeholder="Vacation Style"
          on:select={onVacationStyleChange}
          on:clear={onVacationStyleChange}
          value={vacationStyleId}
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
  productTypes={types}
  productColours={colours}
  productDesigners={designers}
  productPatterns={patterns}
  {vacationStyles}
  searchModel={{
    typeId,
    designerId,
    colourIds,
    patternIds,
    query : q,
    vacationStyleId,
  }}
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
