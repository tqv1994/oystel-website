<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher, tick } from 'svelte';
  import type { Kind } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import OySelect from '../OySelect.svelte';
  import type { DropdownValue } from '$lib/components/Dropdown.svelte';
  import type { SearchParams } from '$lib/components/ProductSearchForm.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';

  export let productTypes: Kind[];
  export let productDesigners: Kind[];
  export let productColours: Kind[];
  export let productPatterns: Kind[];
  export let vacationStyles: Kind[];
  export let searchModel: SearchParams;
  let {
    query = '',
    typeId,
    designerId,
    patternIds,
    colourIds,
    vacationStyleId,
  } = searchModel;
  const dispatch = createEventDispatcher();
  async function onSearchSubmit() {
    tick();
    dispatch('close', {
      typeId,
      designerId,
      patternIds,
      vacationStyleId,
      colourIds,
    });
  }

  function onTypeChange(event: CustomEvent<DropdownValue<Kind>>) {
    typeId = event.detail.value?.id;
  }

  function onDesignerChange(event: CustomEvent<DropdownValue<Kind>>) {
    designerId = event.detail.value?.id;
  }

  function onColourChange(event: CustomEvent<DropdownValue<Kind>>) {
    if (Array.isArray(event.detail.value)) {
      colourIds = (event.detail.value || []).map((item: Kind) => item?.id);
    } else {
      colourIds = undefined;
    }
  }

  function onPatternChange(event: CustomEvent<DropdownValue<Kind>>) {
    if (Array.isArray(event.detail.value)) {
      patternIds = (event.detail.value || []).map((item: Kind) => item?.id);
    } else {
      patternIds = undefined;
    }
  }

  function onVacationStyleChange(event: CustomEvent<DropdownValue<Kind>>) {
    vacationStyleId = event.detail.value?.id;
  }
</script>

<div id="form-search-experience-wrap">
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
        <Icon slot="trailingIcon"><SearchIcon /></Icon>
      </Textfield>
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={productTypes}
        placeholder="Category"
        on:select={onTypeChange}
        on:clear={onTypeChange}
        value={typeId}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={productDesigners}
        placeholder="Designer"
        on:select={onDesignerChange}
        on:clear={onDesignerChange}
        value={designerId}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={productColours}
        placeholder="Colours"
        on:select={onColourChange}
        on:clear={onColourChange}
        value={colourIds}
        isMulti={true}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={productPatterns}
        placeholder="Patterns"
        on:select={onPatternChange}
        on:clear={onPatternChange}
        value={patternIds}
        isMulti={true}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={vacationStyles}
        placeholder="Vacation Style"
        on:select={onVacationStyleChange}
        on:clear={onVacationStyleChange}
        value={vacationStyleId}
      />
    </div>
    <div class="form-control btn-submit-wrap">
      <Button variant="unelevated" style="width: 100%;" type="submit"
        ><Label>Filter Your Results</Label></Button
      >
    </div>
  </form>
</div>

<style lang="scss">
  @use '../../../../theme/mixins';
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
  :global(.product-listing-page) {
    #form-search-experience-wrap {
      @include mixins.mobile {
        margin-top: 32px !important;
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

  .search-form-experiences {
    :global(.mdc-text-field__icon) {
      padding: 0;
      margin-top: 4px;
    }
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
