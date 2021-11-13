<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import Textfield from '@smui/textfield/Textfield.svelte';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import { Icon } from '@smui/icon-button';
  import Layout from '$lib/components/common/Layout.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { Nameable } from '$lib/store/types';
  import { sortByName } from '$lib/utils/sort';
  import { Country, countryStore } from '$lib/store/country';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import {
    Destination,
    DestinationSearchResultItem,
  } from '$lib/store/destination';
  import SearchResult from '$lib/components/search-result.svelte';
  import { get } from 'svelte/store';
  import { Category } from '$lib/store/category';
  import Dropdown, { DropdownValue } from '$lib/components/dropdown.svelte';
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
  import {
    Ordering,
    orderings,
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  } from '$lib/store/order';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { authStore } from '$lib/store/auth';
  import { DestinationLikeData } from './like.json';
  import { contains } from '$lib/utils/array';
  import type { Rec } from '@sveltejs/kit/types/helper';

  const orderingOptions: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];

  type DestinationGroups = Rec<SearchResultGroup<Destination>>;

  export const load: Load = async ({ fetch, session, page }) => {
    page.query.set(LIMIT, page.query.get(TYPE) ? '20' : '3');
    const res = await fetch(`/destination.json?${page.query.toString()}`);
    if (res.ok) {
      const searchData: Record<
        string,
        SearchResultGroup<DestinationSearchResultItem>
      > = await res.json();
      const destinations: DestinationGroups = {};
      const countries = get(countryStore);
      const types = get(destinationTypeStore);
      for (const k in searchData) {
        const items: Destination[] = [];
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
            experiences: item.experiences,
            accommodations: item.accommodations,
            restaurants: item.restaurants,
            attractions: item.attractions,
            country: countries.items[item.country],
            type: types.items[item.type],
            created_at: item.created_at,
            updated_at: item.updated_at,
            published_at: item.published_at,
            liked: contains(
              session.user?.destinationLikes || [],
              'id',
              item.id,
            ),
          });
        }
        destinations[k] = { hasMore: searchData[k].hasMore, items };
      }

      return {
        props: {
          destinations,
          query: page.query.get(QUERY) || '',
          type: get(destinationTypeStore).items[page.query.get(TYPE) || ''],
          country: get(countryStore).items[page.query.get(COUNTRY) || ''],
          ordering:
            orderings[page.query.get(ORDERING) || ''] || ORDER_BY_NAME_ASC,
        },
      };
    }
  };
</script>

<script lang="ts">
  export let destinations: DestinationGroups = {};
  export let query: string = '';
  export let category: Category | undefined;
  export let country: Country | undefined;
  export let ordering: Ordering;
  let contentHeaderActionMobile: string = '';

  let configPage = {
    header: {
      page: 'destinations',
      transparent: true,
      theme: 'light',
      currentMenu: 'destinations',
    },
  };

  let destinationTypes: Category[];
  destinationTypeStore.subscribe((store) => {
    destinationTypes = sortByName(Object.values(store.items));
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
    go({ o: event.detail.value.key });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      c: event.detail.country?.id || '',
      t: event.detail.destination_type?.id || '',
      o: event.detail.ordering?.key || '',
    });
  }

  async function likeDestination(event: CustomEvent) {
    let liked: boolean;
    let group_id = event.detail.group_id;
    let indexDestination = event.detail.key;
    let destination = destinations[group_id].items[indexDestination];
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    if (group_id && destination) {
      let destinationLikedIds: string[] = (
        $authStore.user?.destinationLikes || []
      ).map((item: Destination) => item.id);
      let indexLikeExist = destinationLikedIds.findIndex(
        (id: string) => id == destination.id,
      );
      if (indexLikeExist < 0) {
        destinationLikedIds.push(destination.id);
        liked = true;
      } else {
        destinationLikedIds.splice(indexLikeExist, 1);
        liked = false;
      }
      const res = await fetch(`/destination/like.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(destinationLikedIds),
      });

      if (res.ok) {
        const data: DestinationLikeData = await res.json();
        $authStore.user.destinationLikes =
          data.updateUser.user.destinationLikes;
        authStore.set({ user: $authStore.user });
        destination.liked = liked;
        destinations[group_id].items = destinations[group_id].items.map(
          (item: Destination, index: number) => {
            if (index == indexDestination) {
              item = destination;
            }
            return item;
          },
        );
      } else {
        const error = await res.json();
        console.error(error);
      }
    }
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
      document.querySelector('.header-title.is_sticky').classList.add('show');
    } else {
      document.getElementById('header').classList.remove('fixed');
      document.querySelector('header').style.zIndex = 'auto';
      document.querySelector('header').style.position = 'relative';
      document
        .querySelector('.header-title.is_sticky')
        .classList.remove('show');
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
    <section class="header-title d-pt-130 d-pb-95 m-pt-80 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container m-none">
          <form
            class="search-form-experiences"
            method="GET"
            on:submit|preventDefault={() => {
              go({});
            }}
          >
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
                    label="By Destination"
                    blankItem="All"
                    items={destinationTypes}
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
                    items={orderingOptions}
                    value={ordering}
                    on:MDCSelect:change={onSortChange}
                  />
                </div>
              </Cell>
            </LayoutGrid>
          </form>
          <LayoutGrid class="p-0">
            <Cell span="12">
              <h1 class="text-center d-mt-115 d-mb-20">
                Choose Your Destination
              </h1>
              <p class="text-center m-0">
                Bespoke destinations created by our leading tastemakers.
              </p>
            </Cell>
          </LayoutGrid>
        </div>
        <div class="container m-block d-none">
          <LayoutGrid class="p-0">
            <Cell span="12">
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
    <section
      class="header-title d-pt-130 d-pb-95 m-pt-80 m-pb-25 full-width fixed is_sticky"
    >
      <div class="content-wrap">
        <div class="container m-none">
          <form
            class="search-form-experiences"
            method="GET"
            on:submit|preventDefault={() => {
              go({});
            }}
          >
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
                    label="By Destination"
                    blankItem="All"
                    items={destinationTypes}
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
                    items={orderingOptions}
                    value={ordering}
                    on:MDCSelect:change={onSortChange}
                  />
                </div>
              </Cell>
            </LayoutGrid>
          </form>
        </div>
        <div class="container m-block d-none">
          <LayoutGrid class="p-0">
            <Cell span="12">
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
    {#if destinationTypes.length > 0}
      <section class="d-pt-85 d-pb-95 m-pt-50 m-pb-70">
        <SearchResult
          pathPrefix="/destination"
          categories={destinationTypes}
          bind:groups={destinations}
          showHeadings={!category}
          on:likeItem={likeDestination}
        />
      </section>
    {/if}
  </div>
</Layout>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ destination_type: category, ordering, country }}
  bind:destination_types={destinationTypes}
  experience_types={sortByName(Object.values($experienceTypeStore.items))}
  bind:countries
  orderings={orderingOptions}
  on:close={onSearchSubmitMobile}
/>
<OyNotification />

<style lang="scss" global>
  $desktop-width: 950px;
  @mixin desktop {
    @media (min-width: #{$desktop-width}) {
      @content;
    }
  }
  .page-destinations {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky';
    @import './src/style/partial/experiences-search-form.scss';
    .header-title {
      background-color: #f0f7f8;
    }
    .header-title.is_sticky {
      @include desktop {
        padding-bottom: 55px !important;
      }
    }
  }
</style>
