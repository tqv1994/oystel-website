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
  import { experienceTypeStore } from '$lib/store/experience-type';
  import {
    Experience,
    ExperienceBase,
    ExperienceSearchResultItem,
    experienceStore,
  } from '$lib/store/experience';
  import SearchResult from '$lib/components/search-result.svelte';
  import { get } from 'svelte/store';
  import { Category } from '$lib/store/category';
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
    TYPE,
    SearchResultGroup,
DESTINATION_TYPE,
  } from '$lib/store/search';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { destinationStore } from '$lib/store/destination';
  import { authStore } from '$lib/store/auth';
  import { ExperienceLikeData } from './like.json';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';
  import OySelect from '$lib/components/common/OySelect.svelte';

  const experienceOrderings: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];

  type ExperienceGroups = Record<string, SearchResultGroup<Experience>>;

  export const load: Load = async ({ fetch, session, url }) => {
    url.searchParams.set(LIMIT, url.searchParams.get(TYPE) ? '20' : '3');
    const res = await fetch(`/experience.json?${url.searchParams.toString()}`);
    if (res.ok) {
      const searchData: Record<
        string,
        SearchResultGroup<ExperienceSearchResultItem>
      > = await res.json();
      const experiences: ExperienceGroups = {};
      const countries = get(countryStore);
      const types = get(experienceTypeStore);
      const destinations = get(destinationTypeStore);
      for (const k in searchData) {
        const items: Experience[] = [];
        for (const item of searchData[k].items) {
          let liked = false;
          let indexLiked = (session.user?.experienceLikes || []).findIndex(
            (experience: Experience) => experience.id == item.id,
          );
          if (indexLiked >= 0) {
            liked = true;
          }
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
            type1: types.items[item.type1],
            type2: types.items[item.type2],
            type3: types.items[item.type3],
            created_at: item.created_at,
            updated_at: item.updated_at,
            published_at: item.published_at,
            liked: liked,
          });
        }
        experiences[k] = { hasMore: searchData[k].hasMore, items };
      }
      return {
        props: {
          experiences,
          query: url.searchParams.get(QUERY) || '',
          type: url.searchParams.get(TYPE) || '',
          countries: (url.searchParams.get(COUNTRY) || '').split(","),
          ordering:
            orderings[url.searchParams.get(ORDERING) || '']?.key ||
            ORDER_BY_NAME_ASC.key,
          destination: url.searchParams.get(DESTINATION_TYPE) || ''
        },
      };
    } else {
      return {
        props: {},
      };
    }
  };
</script>

<script lang="ts">
import OyDeviceDetector from "$lib/components/common/OyDeviceDetector.svelte";
import { destinationTypeStore } from '$lib/store/destination-type';

  export let experiences: ExperienceGroups = {};
  export let query: string = '';
  export let type: string;
  export let countries: string[];
  export let ordering: string;
  export let destination: string;
  let contentHeaderActionMobile: string = '';
  let stickyShow: boolean = false;

  const experienceTypes = sortByName(Object.values($experienceTypeStore.items));
  const destinationTypes = sortByName(Object.values($destinationTypeStore.items));

  let countryOptions: Country[];
  countryStore.subscribe((store) => {
    countryOptions = sortByName(Object.values(store.items));
  });

  function go(params: SearchParams) {
    search({
      [QUERY]: query,
      [TYPE]: type,
      [COUNTRY]: countries,
      [ORDERING]: ordering?.key,
      [DESTINATION_TYPE]: destination,
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
    if(type !== event.detail.value?.id){
      type = event.detail.value?.id || '';
      go({ [TYPE]: type });
    }
  }

  function onDestinationChange(event: CustomEvent<DropdownValue<Category>>) {
    if(destination !== event.detail.value?.id){
      destination = event.detail.value?.id || '';
      go({ [DESTINATION_TYPE]: destination });
    }
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    if (event.detail.value) {
      const isEqual = event.detail.value.reduce((acc : boolean, item: Country)=>{
          if(acc){
            const indexExist = countries.findIndex((idCountry)=> idCountry == item.id);
            if(indexExist >= 0){
              acc = true;
            }else{
              acc = false;
            }
          }
          return acc;
        }, true);
      if(!isEqual){
        go({
          [COUNTRY]: event.detail.value.map((item: Country)=>item.id),
        });
      }
      
    } else {
      go({ [COUNTRY]: null });
    }
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    if(ordering !== event.detail.value?.key){
      ordering = event.detail.value?.key || '';
      go({ [ORDERING]: event.detail.value.key });
    }
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      [COUNTRY]: event.detail.countries || '',
      [TYPE]: event.detail.experience_type || '',
      [ORDERING]: event.detail.ordering || '',
      [DESTINATION_TYPE]: event.detail.destination_type || ''
    });
  }

  async function likeExperience(event: CustomEvent) {
    let liked: boolean;
    let group_id = event.detail.group_id;
    let indexExperience = event.detail.key;
    let experience = experiences[group_id].items[indexExperience];
    if (!$authStore.user) {
      window.pushToast('Please login to use this feature');
      return;
    }
    if (group_id && experience) {
      let experienceLikedIds: string[] = (
        $authStore.user?.experienceLikes || []
      ).map((item: Experience) => item.id);
      let indexLikeExist = experienceLikedIds.findIndex(
        (id: number | string) => id == experience.id,
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
        experiences[group_id].items = experiences[group_id].items.map(
          (item: Experience, index: number) => {
            if (index == indexExperience) {
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
  <section class="header-title d-pt-150 d-pb-0 m-pt-80 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container">
        <LayoutGrid class="p-0 d-mb-50 m-mb-20">
          <Cell span="12">
            <h2 class="text-center d-mb-20 m-mb-10">Curate Your Experience</h2>
            <p class="text-center m-0">
              Bespoke experiences created by our leading tastemakers.
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
            <Cell span="4">
              <div class="form-control">
                <Textfield
                  variant="outlined"
                  value={query}
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
                items={experienceTypes}
                optionIdentifier="id"
                labelIdentifier="name"
                placeholder="By Experience Type"
                on:select={onTypeChange}
                on:clear={onTypeChange}
                value={type}
              />
              </div>
            </Cell>
            <Cell span="2">
              <div class="form-control">
                <OySelect
                items={destinationTypes}
                optionIdentifier="id"
                labelIdentifier="name"
                placeholder="By Destination"
                on:select={onDestinationChange}
                on:clear={onDestinationChange}
                value={destination}
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
                  items={experienceOrderings}
                  optionIdentifier="key"
                  labelIdentifier="name"
                  placeholder="Sort By"
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
  <OyDeviceDetector showInDesktop={true} showInMobile={false} >
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
          on:submit|preventDefault={() => {
            go({});
          }}
        >
        {#if stickyShow}
          <LayoutGrid class="p-0">
            <Cell span="4">
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
                    items={experienceTypes}
                    optionIdentifier="id"
                    labelIdentifier="name"
                    on:select={onTypeChange}
                    on:clear={onTypeChange}
                    placeholder="By Experience"
                    value={type}
                  />
              </div>
            </Cell>
            <Cell span="2">
              <div class="form-control">
                <OySelect
                items={destinationTypes}
                optionIdentifier="id"
                labelIdentifier="name"
                placeholder="By Destination"
                on:select={onDestinationChange}
                on:clear={onDestinationChange}
                value={destination}
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
                  items={experienceOrderings}
                  optionIdentifier="key"
                  labelIdentifier="name"
                  placeholder="Sort By"
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
  </OyDeviceDetector>
  {#if experienceTypes.length > 0}
    <section>
      <SearchResult
        pathPrefix="/experience"
        categories={experienceTypes}
        groups={experiences}
        showHeadings={!type}
        on:likeItem={likeExperience}
      />
    </section>
  {/if}
</div>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  searchModel={{ experience_type: type, ordering, countries, destination_type: destination }}
  experience_types={experienceTypes}
  destination_types={destinationTypes}
  orderings={experienceOrderings}
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
  }
</style>
