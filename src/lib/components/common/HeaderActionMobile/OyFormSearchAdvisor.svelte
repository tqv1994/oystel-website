<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { createEventDispatcher } from 'svelte';
  import { type Country, countryStore } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  import type { DropdownValue } from '$lib/components/Dropdown.svelte';
  import OySelect from '../OySelect.svelte';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  export let countryOptions: Kind[];
  export let experienceTypeOptions: Kind[];
  export let searchModel: {
    countryIds: string[] | undefined;
    typeId: string | undefined;
    experienceTypeOptions: Kind[];
    countryOptions: Country[];
  };
  let { countryIds, typeId } = searchModel;

  function onSearchSubmit() {
    setTimeout(() => {
      dispatch('close', { countryIds, typeId });
    }, 0);
  }

  const onExperienceTypeChange = (event: CustomEvent<DropdownValue<Kind>>) => {
    typeId = event.detail.value?.id || undefined;
  };

  const onCountryChange = (event: CustomEvent<DropdownValue<Country[]>>) => {
    if (event.detail.value) {
      const isEqual = (event.detail.value || []).reduce(
        (acc: boolean, item: Country) => {
          if (acc) {
            const indexExist = (countryIds || []).findIndex(
              (idCountry) => idCountry == item.id,
            );
            if (indexExist >= 0) {
              acc = true;
            } else {
              acc = false;
            }
          }
          return acc;
        },
        true,
      );
      if (!isEqual) {
        countryIds = event.detail.value.map((item: Country) => item.id);
      }
    } else {
      countryIds = undefined;
    }
  };
</script>

<div id="form-search-advisor-wrap" class="mt-40">
  <form class="search-form-advisor" on:submit|preventDefault={onSearchSubmit}>
    <div class="form-control mb-40">
      <OySelect
        items={experienceTypeOptions}
        optionIdentifier="id"
        labelIdentifier="name"
        placeholder="By Speciality"
        on:select={onExperienceTypeChange}
        on:clear={onExperienceTypeChange}
        value={typeId}
      />
    </div>
    <div class="form-control mb-40">
      <OySelect
        items={countryOptions}
        optionIdentifier="id"
        labelIdentifier="name"
        on:select={onCountryChange}
        on:clear={onCountryChange}
        placeholder="Location"
        value={countryIds}
        isMulti={true}
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
