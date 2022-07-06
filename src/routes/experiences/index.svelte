<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { type Country } from '$lib/store/country';
  import type { Experience } from '$lib/store/experience';
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
  import { NAME_ASC, orderingTypes, type OrderingKey } from '$lib/store/order';
  import type { SearchResultGroup } from '$lib/store/search';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { session } from '$app/stores';
  import OySelect from '$lib/components/common/OySelect.svelte';

  type SearchParams = {
    q?: string;
    countryIds: string[];
    typeId?: string | null;
    orderingTypeIds: OrderingKey[];
    types: Kind[];
  };

  export const load: Load = async ({ fetch, url }) => {
    const types = await getCollection(fetch, 'experience-type');
    const countries = await getCollection(fetch, 'country');
    const typeId = url.searchParams.get(TYPE) || undefined;
    const countryIds = url.searchParams.getAll(COUNTRY);
    const cities = await getCollection<Kind>(fetch, 'city');
    const orderingTypeIds =
      (url.searchParams.getAll(ORDERING) as OrderingKey[]) || NAME_ASC;
    const q = url.searchParams.get(QUERY) || undefined;

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
        countries,
        typeId,
        countryIds,
        orderingTypeIds,
        searchResults,
        cities,
      },
    };
  };

  async function _search(
    fetch: SvelteFetch,
    { q, countryIds, typeId, orderingTypeIds, types }: SearchParams,
  ): Promise<SearchResultGroup<Experience>[]> {
    const countryFilter = countryIds.map((id) => `country = ${id}`);
    const results: SearchResultGroup<Experience>[] = [];
    if (typeId) {
      const kindFilter: string[] = [];
      buildKindFilter({
        acc: kindFilter,
        id: typeId,
        n: 3,
      });
      results.push({
        kind: mustFindKind(types, typeId),
        result: await trySearch<Experience>(fetch, 'experience', {
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
          result: await trySearch<Experience>(fetch, 'experience', {
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
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import { getCollection, getCollectionAsMap } from '$lib/store/collection';
  import type { SvelteFetch } from '$lib/utils/fetch';
  import Icon from '@smui/textfield/icon';

  export let types: Kind[];
  export let countries: Kind[];
  export let q: string | undefined = '';
  export let typeId: string | undefined;
  export let countryIds: string[];
  export let orderingTypeIds: OrderingKey[];
  export let searchResults: SearchResultGroup<Experience>[];
  export let cities: Kind[];

  let contentHeaderActionMobile = '';
  let stickyShow = false;

  async function go() {
    searchResults = await _search(fetch, {
      q,
      typeId,
      countryIds,
      types,
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

  function onSortChange(event: CustomEvent<DropdownValue<Kind>>) {
    orderingTypeIds = [event.detail.value?.id as OrderingKey];
    go();
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    typeId = event.detail.experience_type || '';
    countryIds = event.detail.countries || null;
    orderingTypeIds = event.detail.ordering || '';
    go();
  }

  const onResize = (event: Event) => {
    if (window.scrollY < 180) {
      stickyShow = false;
    } else {
      stickyShow = false;
    }
  };

  const adjustNav = () => {
    if (window.scrollY < 180) {
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
<div class="content experiences-listing-content">
  <section class="header-title d-pb-0 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container margin-auto add-padding">
        <LayoutGrid class="p-0 d-mb-50 m-mb-20">
          <Cell span={12}>
            <h1 class="text-center d-mb-20 m-mb-10 header-title-mainText">
              Curate Your Experiences
            </h1>
            <p class="text-center m-0  header-title-tagline">
              Bespoke experiences created by our leading tastemakers.
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
                    value={q}
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
                    placeholder="By Experience Type"
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
                    placeholder="Sort By"
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
              }}><Label>Start Your Search</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </div>
  </section>
  <OyDeviceDetector showInDesktop={true} showInMobile={false}>
    <section
      class={`header-title d-pt-150 d-pb-60 m-pt-80 m-pb-25 full-width is_sticky fixed ${
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
                      on:select={onTypeChange}
                      on:clear={onTypeChange}
                      placeholder="By Experience"
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
                      placeholder="Sort By"
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
  </OyDeviceDetector>
  {#if types.length > 0}
    <section>
      <SearchResult pathPrefix="/experiences" groups={searchResults} {cities} />
    </section>
  {/if}
</div>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{
    experience_type: typeId,
    ordering: orderingTypeIds,
    countries,
  }}
  experience_types={types}
  orderings={orderingTypes}
  on:close={onSearchSubmitMobile}
/>
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  .experiences-listing-content {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky.scss';
    @import './src/style/partial/experiences-search-form.scss';

    .header-title {
      background-color: #fff;
    }
    .header-title.is_sticky {
      box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
      z-index: 4 !important;
      @include mixins.desktop {
        padding-bottom: 55px !important;
      }
    }
    .header-title-mainText {
      margin-bottom: 16px !important;
    }

    .header-title-tagline {
      margin-bottom: 8px !important;
    }
  }
</style>
