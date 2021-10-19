<script lang="ts">
  import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
  import Button, { Icon, Label } from '@smui/button';
  import Svg from '@smui/common/Svg.svelte';
  import IconButton from '@smui/icon-button';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import { createEventDispatcher, afterUpdate } from 'svelte';
  import { goto } from '$app/navigation';
  import { Destination } from '$lib/api/destination/type';
  import { Experience } from '$lib/api/experience/type';
  import { Country } from '$lib/api/country/type';

  const dispatch = createEventDispatcher();
  export let showSubmenu = false;
  let menuActive;
  export let searchModel = {
    name: '',
    type: '',
    destination: '',
    country: '',
    sort_by: '',
  };
  export let destination_types: Destination[];
  export let experience_types: Experience[];
  export let countries: Country[];
  function onSearchSubmit() {
    dispatch('close');
  }
</script>

<div id="form-search-experience-wrap" class="mt-40">
  <form
    class="search-form-experiences"
    action="/"
    on:submit|preventDefault={onSearchSubmit}
  >
    <div class="form-control mb-40">
      <Select
        variant="outlined"
        bind:value={searchModel.type}
        label="By Experience Type"
      >
        <Option value="" />
        {#if experience_types}
          {#each experience_types as item}
            <Option value={item.name}>{item.name}</Option>
          {/each}
        {/if}
      </Select>
    </div>
    <div class="form-control mb-40">
      <Select
        variant="outlined"
        bind:value={searchModel.destination}
        label="By Destination"
      >
        <Option value="" />
        {#if destination_types}
          {#each destination_types as item}
            <Option value={item.name}>{item.name}</Option>
          {/each}
        {/if}
      </Select>
    </div>
    <div class="form-control mb-40">
      <Select
        variant="outlined"
        bind:value={searchModel.country}
        label="By Country"
      >
        <Option value="" />
        {#if countries}
          {#each countries as item}
            <Option value={item.name}>{item.name}</Option>
          {/each}
        {/if}
      </Select>
    </div>
    <div class="form-control mb-80">
      <Select
        variant="outlined"
        bind:value={searchModel.sort_by}
        label="Sort By"
      >
        <Option value="" />
      </Select>
    </div>
    <div class="form-control">
      <Button variant="outlined" style="width: 100%;" type="submit"
        ><Label>Filter Your Results</Label></Button
      >
    </div>
  </form>
</div>

<style>
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
