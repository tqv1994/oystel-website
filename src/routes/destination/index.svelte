<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/icon-button';
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
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';
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
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import OySelect from '$lib/components/common/OySelect.svelte';

  const orderingOptions: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];

  type DestinationGroups = Record<string, SearchResultGroup<Destination>>;

  export const load: Load = async ({ fetch, session, url }) => {
    url.searchParams.set(LIMIT, url.searchParams.get(TYPE) ? '20' : '3');
    const res = await fetch(`/destination.json?${url.searchParams.toString()}`);
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
            type1: types.items[item.type1],
            type2: types.items[item.type2],
            type3: types.items[item.type3],
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
          query: url.searchParams.get(QUERY) || '',
          category: url.searchParams.get(TYPE) || '',
          countries: (url.searchParams.get(COUNTRY) || '').split(','),
          ordering:
            orderings[url.searchParams.get(ORDERING) || '']?.key ||
            ORDER_BY_NAME_ASC.key,
        },
      };
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  import OyDeviceDetector from '$lib/components/common/OyDeviceDetector.svelte';

  export let destinations: DestinationGroups = {};
  export let query: string = '';
  export let category: string = '';
  export let countries: string[];
  export let ordering: string;
  let stickyShow: boolean = false;
  let contentHeaderActionMobile: string = '';

  let destinationTypeOptions: Category[];
  destinationTypeStore.subscribe((store) => {
    destinationTypeOptions = sortByName(Object.values(store.items));
  });

  // let experienceTypes: Category[];
  // experienceTypeStore.subscribe(
  //   (store) => (experienceTypes = sortByName(Object.values(store.items))),
  // );

  let countryOptions: Country[];
  countryStore.subscribe((store) => {
    countryOptions = sortByName(Object.values(store.items));
  });

  function go(params: SearchParams) {
    search({
      q: query,
      t: category,
      c: countries,
      o: ordering,
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
    if (category !== event.detail.value?.id) {
      category = event.detail.value?.id || '';
      go({ [TYPE]: category });
    }
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    if (event.detail.value) {
      const isEqual = event.detail.value.reduce(
        (acc: boolean, item: Country) => {
          if (acc) {
            const indexExist = countries.findIndex(
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
        go({
          [COUNTRY]: event.detail.value.map((item: Country) => item.id),
        });
      }
    } else {
      go({ [COUNTRY]: null });
    }
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    if (ordering !== event.detail.value?.key) {
      ordering = event.detail.value?.key || '';
      go({ [ORDERING]: ordering });
    }
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      [COUNTRY]: event.detail.countries || '',
      [TYPE]: event.detail.destination_type || '',
      [ORDERING]: event.detail.ordering?.key || '',
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
  <section class="header-title d-pt-150 d-pb-0 m-pt-80 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container">
        <LayoutGrid class="p-0 d-mb-50 m-mb-20">
          <Cell span="12">
            <h2 class="text-center d-mt-0 d-mb-20 m-mb-10">
              Choose Your Destination
            </h2>
            <p class="text-center m-0">
              Bespoke destinations created by our leading tastemakers.
            </p>
          </Cell>
        </LayoutGrid>
        <form
          class="search-form-experiences m-none"
          method="GET"
          on:submit|preventDefault={() => {
            go({});
          }}
        >
          {#if !stickyShow}
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
                  <OySelect
                    items={destinationTypeOptions}
                    optionIdentifier="id"
                    labelIdentifier="name"
                    placeholder="By Destination"
                    on:select={onTypeChange}
                    on:clear={onTypeChange}
                    value={category}
                  />
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <OySelect
                    items={countryOptions}
                    optionIdentifier="id"
                    labelIdentifier="name"
                    placeholder="By Country"
                    on:select={onCountryChange}
                    on:clear={onCountryChange}
                    value={countries}
                    isMulti={true}
                  />
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <OySelect
                    items={orderingOptions}
                    optionIdentifier="key"
                    labelIdentifier="name"
                    placeholder="Order By"
                    on:select={onSortChange}
                    on:clear={onSortChange}
                    value={ordering}
                  />
                </div>
              </Cell>
            </LayoutGrid>
          {/if}
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
  <OyDeviceDetector showInDesktop={true} showInMobile={false}>
    <section
      class={`header-title d-pt-150 d-pb-95 m-pt-80 m-pb-25 full-width fixed is_sticky ${
        stickyShow ? 'show' : ''
      }`}
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
            {#if stickyShow}
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
                    <OySelect
                      items={destinationTypeOptions}
                      optionIdentifier="id"
                      labelIdentifier="name"
                      placeholder="By Destination"
                      on:select={onTypeChange}
                      on:clear={onTypeChange}
                      value={category}
                    />
                  </div>
                </Cell>
                <Cell span="2">
                  <div class="form-control">
                    <OySelect
                      items={countryOptions}
                      optionIdentifier="id"
                      labelIdentifier="name"
                      placeholder="By Country"
                      on:select={onCountryChange}
                      on:clear={onCountryChange}
                      value={countries}
                      isMulti={true}
                    />
                  </div>
                </Cell>
                <Cell span="2">
                  <div class="form-control">
                    <div class="form-control">
                      <OySelect
                        items={orderingOptions}
                        optionIdentifier="key"
                        labelIdentifier="name"
                        placeholder="Order By"
                        on:select={onSortChange}
                        on:clear={onSortChange}
                        value={ordering}
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
  </OyDeviceDetector>
  {#if destinationTypeOptions.length > 0}
    <section>
      <SearchResult
        pathPrefix="/destination"
        categories={destinationTypeOptions}
        bind:groups={destinations}
        showHeadings={!category}
        on:likeItem={likeDestination}
      />
    </section>
  {/if}
</div>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ destination_type: category, ordering, countries }}
  destination_types={destinationTypeOptions}
  orderings={orderingOptions}
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
