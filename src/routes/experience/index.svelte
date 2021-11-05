<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import { Icon } from '@smui/icon-button';
  import Layout from '$lib/components/common/Layout.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { Nameable } from '$lib/store/types';
  import { sortByName } from '$lib/utils/sort';
  import { Country, countryStore } from '$lib/store/country';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import {
    Experience,
    ExperienceBase,
    experienceStore,
  } from '$lib/store/experience';
  import SearchResult from '$lib/components/search-result.svelte';
  import { get } from 'svelte/store';
  import { Category } from '$lib/store/category';
  import Dropdown, { DropdownValue } from '$lib/components/dropdown.svelte';
  import {
    Ordering,
    orderings,
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  } from '$lib/store/order';
  import _ from 'lodash';
  import {
    COUNTRY,
    LIMIT,
    ORDERING,
    QUERY,
    search,
    SearchParams,
    TYPE,
    SearchResultGroup,
  } from '$lib/store/search';

  const experienceOrderings: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];

  type ExperienceGroups = Record<string, SearchResultGroup<Experience>>;
  type ExperienceSearchResultItem = ExperienceBase & {
    country: string;
    type: string;
  };

  export const load: Load = async ({ fetch, page }) => {
    page.query.set(LIMIT, page.query.get(TYPE) ? '20' : '3');
    const res = await fetch(`/experience.json?${page.query.toString()}`);
    if (res.ok) {
      const searchData: Record<
        string,
        SearchResultGroup<ExperienceSearchResultItem>
      > = await res.json();
      const experiences: ExperienceGroups = {};
      const countries = get(countryStore);
      const types = get(experienceTypeStore);
      for (const k in searchData) {
        const items: Experience[] = [];
        for (const item of searchData[k].items) {
          items.push({
            id: item.id,
            name: item.name,
            description: item.description,
            intro: item.intro,
            gallery: item.gallery,
            videos: item.videos,
            looks: item.looks,
            pack: item.pack,
            destinations: item.destinations,
            country: countries.items[item.country],
            type: types.items[item.type],
            created_at: item.created_at,
            updated_at: item.updated_at,
            published_at: item.published_at,
          });
        }
        experiences[k] = { hasMore: searchData[k].hasMore, items };
      }
      return {
        props: {
          experiences,
          query: page.query.get(QUERY),
          type: get(experienceStore).items[page.query.get(TYPE) || ''],
          country: get(countryStore).items[page.query.get(COUNTRY) || ''],
          ordering:
            orderings[page.query.get(ORDERING) || ''] || ORDER_BY_NAME_ASC,
        },
      };
    }
  };
</script>

<script lang="ts">
  export let experiences: ExperienceGroups = {};
  export let query: string = '';
  export let category: Category | undefined;
  export let country: Country | undefined;
  export let ordering: Ordering;

  let configPage = {
    header: {
      page: 'experiences',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };

  let experienceTypes: Category[];
  experienceTypeStore.subscribe((store) => {
    experienceTypes = sortByName(Object.values(store.items));
  });

  // let experienceTypes: Category[];
  // experienceTypeStore.subscribe(
  //   (store) => (experienceTypes = sortByName(Object.values(store.items))),
  // );

  let countries: Country[];
  countryStore.subscribe((store) => {
    countries = sortByName(Object.values(store.items));
  });

  function go(params: SearchParams) {
    search({
      q: query,
      t: category?.id,
      c: country?.id,
      o: ordering.key,
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
    go({ t: event.detail.value.id });
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    go({ c: event.detail.value.id });
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    go({ s: event.detail.value.key });
  }

  function onScrollFixedHeader() {
    let eleHiddenOnScrolls = document.querySelectorAll(
      '.header-title .hidden-on-sticky',
    );
    if (
      document.body.scrollTop > 450 ||
      document.documentElement.scrollTop > 450
    ) {
      document.getElementById('header').classList.add('fixed');
      document.querySelector('header').style.zIndex = 8;
      document.querySelector('header').style.position = 'relative';
      document
        .querySelector('.header-title')
        .classList.add('fixed', 'is_sticky');
    } else {
      document.getElementById('header').classList.remove('fixed');
      document.querySelector('header').style.zIndex = 'auto';
      document.querySelector('header').style.position = 'relative';
      document
        .querySelector('.header-title')
        .classList.remove('fixed', 'is_sticky');
    }
  }
</script>

<svelte:window
  on:load={() => {
    onScrollFixedHeader();
  }}
  on:resize={() => {}}
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<Layout config={configPage} on:refreshPage={() => {}}>
  <div class="content">
    <section class="header-title d-pt-120 d-pb-95 m-pt-80 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container m-none">
          <form class="search-form-experiences" method="GET">
            <LayoutGrid class="p-0">
              <Cell span="6">
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
                  <Dropdown
                    label="By Experience"
                    blankItem="All"
                    items={experienceTypes}
                    value={category}
                    on:MDCSelect:change={onTypeChange}
                  />
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <Dropdown
                    label="By Country"
                    blankItem="All"
                    items={countries}
                    value={country}
                    on:MDCSelect:change={onCountryChange}
                  />
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <Dropdown
                    label="Sort By"
                    items={experienceOrderings}
                    value={ordering}
                    on:MDCSelect:change={onSortChange}
                  />
                </div>
              </Cell>
            </LayoutGrid>
          </form>
          <LayoutGrid class="p-0 hidden-on-sticky">
            <Cell span="12">
              <h1 class="text-center d-mt-115 d-mb-20">
                Choose Your Experience
              </h1>
              <p class="text-center m-0">
                Bespoke experiences created by our leading tastemakers.
              </p>
            </Cell>
          </LayoutGrid>
        </div>
        <div class="container m-block d-none">
          <LayoutGrid class="p-0">
            <Cell span="12">
              <Button style="width: 100%" variant="outlined"
                ><Label>Filter Your Results</Label></Button
              >
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
    {#if experienceTypes.length > 0}
      <section class="d-pt-85 d-pb-95 m-pt-50 m-pb-70">
        <SearchResult
          pathPrefix="/experience"
          categories={experienceTypes}
          groups={experiences}
          showHeadings={!category}
        />
      </section>
    {/if}
  </div>
</Layout>
<!-- <HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  bind:searchModel
  bind:experience_types={experienceTypes}
  bind:types={experienceTypes}
  bind:countries
  on:close={onSearchSubmit}
/> -->
<OyNotification />

<style lang="scss">
  $desktop-width: 950px;
  @mixin desktop {
    @media (min-width: #{$desktop-width}) {
      @content;
    }
  }
  .header-title {
    background-color: #f0f7f8;
  }
  .header-title:global(.is_sticky) {
    @include desktop {
      padding-bottom: 55px !important;
    }
  }
</style>
