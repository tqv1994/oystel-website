<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { type Country } from '$lib/store/country';
  import type { Destination } from '$lib/store/destination';
  import SearchResult from '$lib/components/search-result.svelte';
  import { mustFindKind, type Kind } from '$lib/store/category';
  import type {
    DropdownMultiValues,
    DropdownValue,
  } from '$lib/components/Dropdown.svelte';
  import _ from 'lodash';
  import {
    buildKindFilter,
    COUNTRY,
    ORDERING,
    QUERY,
    trySearch,
    TYPE,
  } from '$lib/store/search';
  import { orderingTypes, type OrderingKey } from '$lib/store/order';
  import type { SearchResultGroup } from '$lib/store/search';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { session } from '$app/stores';
  import OySelect from '$lib/components/common/OySelect.svelte';

  type SearchParams = {
    q?: string;
    countryIds: string[];
    typeId?: string;
    orderingTypeIds: OrderingKey[];
    types: Kind[];
  };

  export const load: Load = async ({ fetch, url }) => {
    const types = await getCollection(fetch, 'destination-type');
    const countries = await getCollection<Country>(fetch, 'country');
    const typeId = url.searchParams.get(TYPE) || undefined;
    const countryIds = url.searchParams.getAll(COUNTRY);
    const orderingTypeIds = url.searchParams.getAll(ORDERING) as OrderingKey[];
    const q = url.searchParams.get(QUERY) || undefined;
    const cities = await getCollection<Kind>(fetch, 'city');

    const searchResults = await _search(fetch, {
      q,
      typeId,
      countryIds,
      types,
      orderingTypeIds,
    });

    return {
      props: {
        q,
        types,
        typeId,
        countries,
        countryIds,
        orderingTypeIds,
        searchResults,
        cities
      },
    };
  };

  async function _search(
    fetch: SvelteFetch,
    { q, countryIds, typeId, orderingTypeIds, types }: SearchParams,
  ): Promise<SearchResultGroup<Destination>[]> {
    const countryFilter = countryIds.map((id) => `country = ${id}`);
    const results: SearchResultGroup<Destination>[] = [];
    if (typeId) {
      const kindFilter: string[] = [];
      buildKindFilter({
        acc: kindFilter,
        id: typeId,
        n: 5,
      });
      results.push({
        kind: mustFindKind(types, typeId),
        result: await trySearch<Destination>(fetch, 'destination', {
          q,
          limit: 999,
          filter: [countryFilter, kindFilter],
          sort: orderingTypeIds,
        }),
      });
    } else {
      for (const kind of types) {
        let kindFilter: string[] = [];
        buildKindFilter({
          acc: kindFilter,
          id: kind.id,
          n: 1,
        });
        results.push({
          kind,
          result: await trySearch<Destination>(fetch, 'destination', {
            q,
            limit: 3,
            filter: [countryFilter, kindFilter],
            sort: orderingTypeIds,
          }),
        });
      }
    }
    return results;
  }
</script>

<script lang="ts">
  import OyDeviceDetector from '$lib/components/common/OyDeviceDetector.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { SvelteFetch } from '$lib/utils/fetch';
  import Icon from '@smui/textfield/icon';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';

  export let types: Kind[];
  export let countries: Kind[];
  export let cities: Kind[];
  export let q: string | undefined = '';
  export let typeId: string | undefined;
  export let countryIds: string[];
  export let orderingTypeIds: OrderingKey[];
  export let searchResults: SearchResultGroup<Destination>[];

  let stickyShow = false;
  let contentHeaderActionMobile = '';

  async function go() {
    searchResults = await _search(fetch, {
      q,
      types,
      typeId,
      countryIds,
      orderingTypeIds,
    });
  }

  const goSlow = _.debounce(go, 1000);

  function onQueryInput(event: CustomEvent) {
    const query = (event.target as HTMLInputElement).value.trim();
    if (!query || query.length > 1) {
      q = query;
      goSlow();
    }
  }

  function onTypeChange(event: CustomEvent<DropdownValue<Kind>>) {
    typeId = event.detail.value?.id;
    go();
  }

  function onCountryChange(event: CustomEvent<DropdownMultiValues<Country>>) {
    countryIds = event.detail.value
      ? event.detail.value.map((item) => item.id)
      : [];
    go();
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    orderingTypeIds = event.detail.value?.id;
    go();
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    typeId = event.detail.destination_type || '';
    countryIds = event.detail.countries || null;
    orderingTypeIds = event.detail.ordering || '';
    go();
  }

  const onResize = (event: Event) => {
    if (window.scrollY < 64) {
      stickyShow = false;
    } else {
      stickyShow = false;
    }
  };

  const adjustNav = () => {
    if (window.scrollY < 64) {
      stickyShow = false;
    } else {
      stickyShow = true;
    }
  };

  const onScroll = (event: Event) => {
    adjustNav();
  };

  function onStart(event: CustomEvent) {
    adjustNav();
  }
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:sveltekit:start={onStart}
/>

<div class="content destinations-listing-content">
  <section class="header-title d-pb-0 m-pt-40 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container margin-auto add-padding">
        <LayoutGrid class="p-0 d-mb-50 m-mb-20">
          <Cell span={12}>
            <h1 class="text-h1 text-center d-mt-0 d-mb-20 m-mb-10">
              Choose Your Destination
            </h1>
            <p class="text-center m-0">
              Bespoke destinations created by our leading tastemakers.
            </p>
          </Cell>
        </LayoutGrid>
        <form
          class="search-form-experiences m-none"
          method="GET"
          on:submit|preventDefault={go}
        >
          {#if !stickyShow}
            <LayoutGrid class="p-0">
              <Cell span={6}>
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
                    placeholder="By Destination"
                    on:select={onTypeChange}
                    on:clear={onTypeChange}
                    value={typeId}
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
                    placeholder="Order By"
                    on:select={onSortChange}
                    on:clear={onSortChange}
                    value={orderingTypeIds}
                  />
                </div>
              </Cell>
            </LayoutGrid>
          {/if}
        </form>
      </div>
      <div class="container m-block d-none">
        <LayoutGrid class="p-0">
          <Cell span={12}>
            <Button
              style="width: 100%"
              variant="outlined"
              on:click={() => {
                contentHeaderActionMobile = 'experience-search';
              }}><Label>Filter Your Results</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </div>
  </section>
  <OyDeviceDetector showInDesktop={true} showInMobile={false}>
    <section
      class={`header-title d-pt-150 d-pb-95 m-pt-40 m-pb-25 full-width fixed is_sticky ${
        stickyShow ? 'show' : ''
      }`}
    >
      <div class="content-wrap">
        <div class="container m-none">
          <form
            class="search-form-experiences"
            method="GET"
            on:submit|preventDefault={go}
          >
            {#if stickyShow}
              <LayoutGrid class="p-0">
                <Cell span={6}>
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
                      placeholder="By Destination"
                      on:select={onTypeChange}
                      on:clear={onTypeChange}
                      value={typeId}
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
                    <div class="form-control">
                      <OySelect
                        items={orderingTypes}
                        placeholder="Order By"
                        on:select={onSortChange}
                        on:clear={onSortChange}
                        value={orderingTypeIds}
                      />
                    </div>
                  </div></Cell
                >
              </LayoutGrid>
            {/if}
          </form>
        </div>
        <div class="container m-block d-none">
          <LayoutGrid class="p-0">
            <Cell span={12}>
              <Button
                style="width: 100%"
                variant="outlined"
                on:click={() => {
                  contentHeaderActionMobile = 'experience-search';
                }}><Label>Filter Your Results</Label></Button
              >
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
  </OyDeviceDetector>
  {#if types.length > 0}
    <section>
      <SearchResult
        pathPrefix="/destinations"
        groups={searchResults}
        {cities}
      />
    </section>
  {/if}
</div>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{
    destination_type: typeId,
    ordering: orderingTypeIds,
    countries: countryIds,
  }}
  destination_types={types}
  orderings={orderingTypes}
  {countries}
  on:close={onSearchSubmitMobile}
/>
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  .destinations-listing-content {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky';
    @import './src/style/partial/experiences-search-form.scss';
    .header-title {
      background-color: #fff;
    }
    .header-title.is_sticky {
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      @include mixins.desktop {
        padding-bottom: 55px !important;
      }
      z-index: 4 !important;
    }
  }
</style>
