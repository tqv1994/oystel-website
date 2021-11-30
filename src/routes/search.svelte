<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import {
    ExperienceSearchResultItem,
    experienceStore,
  } from '$lib/store/experience';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import {
    DestinationSearchResultItem,
    destinationStore,
  } from '$lib/store/destination';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { countryStore } from '$lib/store/country';
  import { onMount } from 'svelte';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { goto } from '$app/navigation';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import { stringHelper } from '$lib/helpers';
  import Layout from '$lib/components/common/Layout.svelte';
  import { authStore } from '$lib/store/auth';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Experience } from '$lib/store/experience';
  import { Country } from '$lib/store/country';
  import { Destination } from '$lib/store/destination';
  import { get } from 'svelte/store';
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';
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
    EXPERIENCE_TYPE,
    DESTINATION_TYPE,
    SearchResultGroup,
  } from '$lib/store/search';
  import { Category } from '$lib/store/category';
  import SearchResult from '$lib/components/search-result.svelte';
  import { makeLink } from '$lib/utils/link';
  import { sortByName } from '$lib/utils/sort';
  import { Nameable } from '$lib/store/types';
  import { contains } from '$lib/utils/array';
  import { ExperienceLikeData } from './experience/like.json';
  import { DestinationLikeData } from './destination/like.json';
  import Item from '$lib/components/Item.svelte';
  const Orderings: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];
  export const load: Load = async ({ fetch, session, page }) => {
    page.query.set(LIMIT, '10');
    const searchResultExperience: Experience[] = [];
    const searchResultDestination: Destination[] = [];
    const countries = get(countryStore);
    const experienceTypes = get(experienceTypeStore);
    const destinationTypes = get(destinationTypeStore);
    const resExperience = await fetch(
      `/experience/search.json?${page.query.toString()}`,
    );
    if (resExperience.ok) {
      const searchDataExperience: SearchResultGroup<ExperienceSearchResultItem> =
        await resExperience.json();
      for (const item of searchDataExperience.items) {
        searchResultExperience.push({
          id: item.id,
          name: item.name,
          description: item.description,
          intro: item.intro,
          gallery: item.gallery,
          videos: item.videos,
          looks: item.looks,
          pack: item.pack,
          destinations: [],
          country: countries.items[item.country],
          created_at: item.created_at,
          updated_at: item.updated_at,
          published_at: item.published_at,
          type1: experienceTypes.items[item.type1],
          type2: experienceTypes.items[item.type2],
          type3: experienceTypes.items[item.type3],
          liked: contains(session.user?.experienceLikes || [], 'id', item.id),
        });
      }
    }

    const resDestination = await fetch(
      `/destination/search.json?${page.query.toString()}`,
    );
    if (resDestination.ok) {
      const searchDataDestination: SearchResultGroup<DestinationSearchResultItem> =
        await resDestination.json();
      for (const item of searchDataDestination.items) {
        searchResultDestination.push({
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
          type1: destinationTypes.items[item.type1],
          type2: destinationTypes.items[item.type2],
          type3: destinationTypes.items[item.type3],
          created_at: item.created_at,
          updated_at: item.updated_at,
          published_at: item.published_at,
          liked: contains(session.user?.destinationLikes || [], 'id', item.id),
        });
      }
    }
    return {
      props: {
        searchResultExperience,
        searchResultDestination,
        query: page.query.get(QUERY) || '',
        experience_type:
          get(experienceTypeStore).items[page.query.get(EXPERIENCE_TYPE) || ''],
        destination_type:
          get(destinationTypeStore).items[
            page.query.get(DESTINATION_TYPE) || ''
          ],
        country: get(countryStore).items[page.query.get(COUNTRY) || ''],
        ordering:
          orderings[page.query.get(ORDERING) || ''] || ORDER_BY_NAME_ASC,
      },
    };
  };
</script>

<script type="ts">
  export let query: string = '';
  export let destination_type: Category | undefined;
  export let experience_type: Category | undefined;
  export let country: Country | undefined;
  export let ordering: Ordering;
  let searchModel: any = {
    query: query,
    destination_type: destination_type,
    experience_type: experience_type,
    country: country,
    ordering: ordering,
  };
  let contentHeaderActionMobile = '';
  let configPage = {
    header: {
      page: 'search',
      transparent: true,
      theme: 'light',
      currentMenu: '',
    },
  };
  export let searchResultDestination: Destination[];
  export let searchResultExperience: Experience[];
  let experienceTypes: Category[];
  experienceTypeStore.subscribe((store) => {
    experienceTypes = sortByName(Object.values(store.items));
  });

  let destinationTypes: Category[];
  destinationTypeStore.subscribe(
    (store) => (destinationTypes = sortByName(Object.values(store.items))),
  );

  let countries: Country[];
  countryStore.subscribe((store) => {
    countries = sortByName(Object.values(store.items));
  });

  function go(params: SearchParams) {
    search({
      q: query,
      x: experience_type?.id,
      d: destination_type?.id,
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

  function onExperienceTypeChange(event: CustomEvent<DropdownValue<Category>>) {
    goSlow({ x: event.detail.value.id });
  }

  function onDestinationTypeChange(
    event: CustomEvent<DropdownValue<Category>>,
  ) {
    goSlow({ d: event.detail.value.id });
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    goSlow({ c: event.detail.value.id });
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    goSlow({ o: event.detail.value.key });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      c: event.detail.country?.id || '',
      t: event.detail.experience_type?.id || '',
      x: event.detail.destination_type?.id || '',
      o: event.detail.ordering?.key || '',
    });
  }

  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let experience = event.detail.item;
    let experienceLikedIds: string[] = (
      $authStore.user?.experienceLikes || []
    ).map((item: Experience) => item.id);
    let indexLikeExist = experienceLikedIds.findIndex(
      (id: string) => id == experience.id,
    );
    if (indexLikeExist < 0) {
      experienceLikedIds.push(experience.id);
      liked = true;
    } else {
      experienceLikedIds.splice(indexLikeExist, 1);
      liked = false;
    }
    const res = await fetch(`/experience/like.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceLikedIds),
    });

    if (res.ok) {
      const data: ExperienceLikeData = await res.json();
      $authStore.user.experienceLikes = data.updateUser.user.experienceLikes;
      authStore.set({ user: $authStore.user });
      experience.liked = liked;
      searchResultExperience = searchResultExperience.map(
        (item: Experience) => {
          if (item.id == experience.id) {
            item = experience;
          }
          return item;
        },
      );
    } else {
      const error = await res.json();
      console.error(error);
    }
  }

  async function likeDestination(event: CustomEvent) {
    let liked: boolean;
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    let destination = event.detail.item;
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
      $authStore.user.destinationLikes = data.updateUser.user.destinationLikes;
      authStore.set({ user: $authStore.user });
      destination.liked = liked;
      searchResultDestination = searchResultDestination.map(
        (item: Destination) => {
          if (item.id == destination.id) {
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
  <section class="header-title d-pt-120 d-pb-55 m-pt-90 m-pb-25 full-width">
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
            <Cell span="4">
              <div class="form-control">
                <Textfield
                  variant="outlined"
                  bind:value={query}
                  label="Start with a search"
                  withTrailingIcon={false}
                  on:input={onQueryInput}
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
                  label="By Experience Type"
                  blankItem="All"
                  items={experienceTypes}
                  value={experience_type}
                  on:MDCSelect:change={onExperienceTypeChange}
                />
              </div>
            </Cell>
            <Cell span="2">
              <div class="form-control">
                <Dropdown
                  label="By Destination Type"
                  blankItem="All"
                  items={destinationTypes}
                  value={destination_type}
                  on:MDCSelect:change={onDestinationTypeChange}
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
                  label="Short By"
                  blankItem="All"
                  items={Orderings}
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
          {#each searchResultDestination || [] as item, i}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <Item
                pathPrefix="/destination"
                bind:item
                on:likeItem={likeDestination}
              />
            </Cell>
          {/each}
          {#each searchResultExperience || [] as item, i}
            <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
              <Item
                pathPrefix="/experience"
                bind:item
                on:likeItem={likeExperience}
              />
            </Cell>
          {/each}
        </LayoutGrid>
      </div>
    </div>
  </section>
</div>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ experience_type, destination_type, ordering, country }}
  bind:experience_types={experienceTypes}
  bind:destination_types={destinationTypes}
  bind:countries
  orderings={Orderings}
  on:close={onSearchSubmitMobile}
/>
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
