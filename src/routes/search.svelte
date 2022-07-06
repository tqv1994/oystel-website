<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { session } from '$app/stores';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import type { Experience } from '$lib/store/experience';
  import type { Country } from '$lib/store/country';
  import type { Destination } from '$lib/store/destination';
  import type {
    DropdownMultiValues,
    DropdownValue,
  } from '$lib/components/Dropdown.svelte';
  import { orderingTypes, type OrderingKey } from '$lib/store/order';
  import _ from 'lodash';
  import {
    COUNTRY,
    LIMIT,
    ORDERING,
    QUERY,
    EXPERIENCE_TYPE,
    DESTINATION_TYPE,
    trySearch,
    type SearchResultCollections,
    type SearchResultGroup,
    buildKindFilter,
  } from '$lib/store/search';
  import { mustFindKind, type Kind } from '$lib/store/category';
  import type { SvelteFetch } from '$lib/utils/fetch';
  import Item from '$lib/components/Item.svelte';
  import OySelect from '$lib/components/common/OySelect.svelte';
  import { getCollection } from '$lib/store/collection';
  import Icon from '@smui/textfield/icon';

  export const load: Load = async ({ fetch, url: { searchParams } }) => {
    const q = searchParams.get(QUERY) || '';
    const limit = parseInt(searchParams.get(LIMIT) || '20', 10);
    const experienceTypeId = searchParams.get(EXPERIENCE_TYPE) || undefined;
    const destinationTypeId = searchParams.get(DESTINATION_TYPE) || undefined;
    const countryIds = searchParams.getAll(COUNTRY);
    const orderingTypeIds = searchParams.getAll(ORDERING) as OrderingKey[];

    const countries = await getCollection<Country>(fetch, 'country');
    const experienceTypes = await getCollection(fetch, 'experience-type');
    const destinationTypes = await getCollection(fetch, 'destination-type');
    const cities = await getCollection(fetch, 'city');

    const searchResult = await _search(fetch, {
      q,
      countryIds,
      experienceTypeId,
      destinationTypeId,
      experienceTypes,
      destinationTypes,
      orderingTypeIds,
    });

    return {
      props: {
        q,
        destinationTypes,
        experienceTypes,
        countries,
        countryIds,
        limit,
        orderingTypeIds,
        searchResult,
        cities,
      },
    };
  };

  type SearchParams = {
    q?: string;
    countryIds: string[];
    experienceTypeId?: string;
    destinationTypeId?: string;
    orderingTypeIds: string[];
    experienceTypes: Kind[];
    destinationTypes: Kind[];
  };

  async function _search(
    fetch: SvelteFetch,
    {
      q,
      countryIds,
      experienceTypeId,
      destinationTypeId,
      orderingTypeIds,
      experienceTypes,
      destinationTypes,
    }: SearchParams,
  ): Promise<SearchResultCollections> {
    const countryFilter = countryIds.map((id) => `country = ${id}`);

    let expResults: SearchResultGroup<Experience>[] = [];
    let desResults: SearchResultGroup<Destination>[] = [];
    const kindFilter: string[] = [];

    if (experienceTypeId) {
      buildKindFilter({
        acc: kindFilter,
        id: experienceTypeId,
        n: 3,
      });
      expResults.push({
        kind: mustFindKind(experienceTypes, experienceTypeId),
        result: await trySearch<Experience>(fetch, 'experience', {
          q,
          limit: 999,
          filter: [countryFilter, kindFilter],
          sort: orderingTypeIds,
        }),
      });
    } else {
      expResults.push({
        result: await trySearch<Experience>(fetch, 'experience', {
          q,
          limit: 999,
          filter: [countryFilter, kindFilter],
          sort: orderingTypeIds,
        }),
      });
    }

    if (destinationTypeId) {
      buildKindFilter({
        acc: kindFilter,
        id: destinationTypeId,
        n: 5,
      });
      desResults.push({
        kind: mustFindKind(destinationTypes, destinationTypeId),
        result: await trySearch<Destination>(fetch, 'destination', {
          q,
          limit: 999,
          filter: [countryFilter, kindFilter],
          sort: orderingTypeIds,
        }),
      });
    } else {
      desResults.push({
        result: await trySearch<Destination>(fetch, 'destination', {
          q,
          limit: 999,
          filter: [countryFilter, kindFilter],
          sort: orderingTypeIds,
        }),
      });
    }

    return {
      experiences: expResults,
      destinations: desResults,
    };
  }
</script>

<script type="ts">
  import SearchIcon from '$lib/icons/SearchIcon.svelte';

  export let destinationTypes: Kind[];
  export let experienceTypes: Kind[];
  export let countries: Country[];
  export let searchResult: SearchResultCollections;
  export let destinationTypeId: string;
  export let experienceTypeId: string;
  export let q: string;
  export let countryIds: string[];
  export let orderingTypeIds: string[];
  export let cities: Kind[];

  let contentHeaderActionMobile = '';

  async function go() {
    searchResult = await _search(fetch, {
      q,
      countryIds,
      experienceTypeId,
      destinationTypeId,
      experienceTypes,
      destinationTypes,
      orderingTypeIds,
    });
  }
  const goSlow = _.debounce(go, 1000);

  function onQueryInput(event: CustomEvent) {
    const q = (event.target as HTMLInputElement).value.trim();
    if (!q || q.length > 2) {
      goSlow();
    }
  }

  function onExperienceTypeChange(event: CustomEvent<DropdownValue<Kind>>) {
    experienceTypeId = event.detail.value?.id || '';
    goSlow();
  }

  function onDestinationTypeChange(event: CustomEvent<DropdownValue<Kind>>) {
    destinationTypeId = event.detail.value?.id || '';
    goSlow();
  }

  function onCountryChange(event: CustomEvent<DropdownMultiValues<Country>>) {
    if (event.detail.value) {
      countryIds = event.detail.value.map((c) => c.id);
    } else {
      countryIds = [];
    }
    goSlow();
  }

  function onSortChange(event: CustomEvent<DropdownValue<Kind>>) {
    orderingTypeIds = event.detail.value?.id ? [event.detail.value.id] : [];
    goSlow();
  }

  function onScrollFixedHeader() {
    // if (document.documentElement.clientWidth > 949) {
    //   if (
    //     document.body.scrollTop > 50 ||
    //     document.documentElement.scrollTop > 50
    //   ) {
    //     document.getElementById('header').classList.add('fixed');
    //     document.querySelector('header').style.zIndex = 8;
    //     document.querySelector('header').style.position = 'relative';
    //     document
    //       .querySelector('.header-title')
    //       .classList.add('fixed', 'is_sticky');
    //   } else {
    //     document.getElementById('header').classList.remove('fixed');
    //     document.querySelector('header').style.zIndex = 'auto';
    //     document.querySelector('header').style.position = 'static';
    //     document
    //       .querySelector('.header-title')
    //       .classList.remove('fixed', 'is_sticky');
    //   }
    // }
  }

  onMount(async () => {});
</script>

<svelte:window
  on:load={() => {
    onScrollFixedHeader();
  }}
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<div class="content search-page-content">
  <section class="header-title d-pb-55 m-pt-40 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container m-none">
        <form
          class="search-form-experiences"
          method="GET"
          on:submit|preventDefault={go}
        >
          <LayoutGrid class="p-0">
            <Cell span={4}>
              <div class="form-control">
                <Textfield
                  variant="outlined"
                  bind:value={q}
                  label="Start with a search"
                  withTrailingIcon={false}
                  on:input={onQueryInput}
                >
                  <Icon slot="trailingIcon"><SearchIcon /></Icon>
                </Textfield>
              </div>
            </Cell>
            <Cell span={2}>
              <div class="form-control">
                <OySelect
                  items={experienceTypes}
                  placeholder="By Experience Type"
                  on:select={onExperienceTypeChange}
                  on:clear={onExperienceTypeChange}
                  value={experienceTypeId}
                />
              </div>
            </Cell>
            <Cell span={2}>
              <div class="form-control">
                <OySelect
                  items={destinationTypes}
                  placeholder="By Destination Type"
                  on:select={onDestinationTypeChange}
                  on:clear={onDestinationTypeChange}
                  value={destinationTypeId}
                />
              </div>
            </Cell>
            <Cell span={2}>
              <div class="form-control">
                <OySelect
                  items={countries}
                  placeholder="By Country"
                  on:select={onCountryChange}
                  on:clear={onCountryChange}
                  value={countryIds}
                  isMulti={true}
                />
              </div>
            </Cell>
            <Cell span={2}>
              <div class="form-control">
                <OySelect
                  items={orderingTypes}
                  placeholder="Sort By"
                  on:select={onSortChange}
                  on:clear={onSortChange}
                  value={orderingTypeIds[0]}
                />
              </div>
            </Cell>
          </LayoutGrid>
        </form>
      </div>
      <div class="container m-block d-none">
        <LayoutGrid class="p-0">
          <Cell span={12}>
            <Button
              on:click={() => {
                contentHeaderActionMobile = 'experience-search';
              }}
              style="width: 100%"
              variant="outlined"><Label>Filter Your Results</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </div>
  </section>
  <section class="d-pt-85 d-pb-95 m-pt-50 m-pb-70">
    <div class="container">
      <div class="section-content">
        <LayoutGrid class="p-0">
          {#each searchResult.destinations as group}
            {#each group.result.hits as item}
              <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                <Item introShow={true} pathPrefix="/destinations" bind:item {cities} />
              </Cell>
            {/each}
          {/each}
          {#each searchResult.experiences as group}
            {#each group.result.hits as item}
              <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                <Item introShow={true} pathPrefix="/experiences" bind:item {cities} />
              </Cell>
            {/each}
          {/each}
        </LayoutGrid>
      </div>
    </div>
  </section>
</div>
<!-- <HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ experienceTypes, destinationType, ordering, countries }}
  experience_types={experienceTypes}
  {destinationTypes}
  orderings={Orderings}
  on:close={onSearchSubmitMobile}
/> -->
<OyNotification />

<style lang="scss" global>
  .search-page-content {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/experiences-search-form.scss';
    .header-title {
      background-color: #f0f7f8;
    }
    .header-title:global(.is_sticky) {
      padding-bottom: 55px !important;
    }

    /* Section title */
    .section-title .title {
      position: relative;
      overflow: hidden;
    }
    .section-title .title:after {
      content: '';
      display: inline-block;
      border-top: 1px solid;
      border-color: #000;
      vertical-align: middle;
      width: 100%;
      margin-right: -100%;
      margin-left: 40px;
    }

    .item-read-more {
      background-color: #f0f7f8;
      position: relative;
    }
    .item-read-more .label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .item-read-more .label .material-icons {
      position: relative;
      top: 5px;
    }

    @media screen and (max-width: 768px) {
      .section-title .title:after {
        margin-left: 20px;
      }
    }
  }
</style>
