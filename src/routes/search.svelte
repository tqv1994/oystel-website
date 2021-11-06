<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { ExperienceSearchResultItem, experienceStore } from '$lib/store/experience';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { DestinationSearchResultItem, destinationStore } from '$lib/store/destination';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { countryStore } from '$lib/store/country';
  import { onMount } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { goto } from '$app/navigation';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import Svg from '@smui/common/Svg.svelte';
  import { stringHelper } from '$lib/helpers';
  import Layout from '$lib/components/common/Layout.svelte';
  import { authStore } from '$lib/store/auth';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Experience } from '$lib/store/experience';
  import { Country } from '$lib/store/country';
  import { Destination } from '$lib/store/destination';
  import { get } from 'svelte/store';
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
    EXPERIENCE_TYPE,
    DESTINATION_TYPE,
    SearchResultGroup,
  } from '$lib/store/search';
import { Category } from '$lib/store/category';
import SearchResult from '$lib/components/search-result.svelte';
import { makeLink } from '$lib/utils/link';
import { sortByName } from '$lib/utils/sort';
import { Nameable } from '$lib/store/types';
const Orderings: Nameable[] = [
    ORDER_BY_NAME_ASC,
    ORDER_BY_NAME_DESC,
    ORDER_BY_PUBLISH_DATE_ASC,
    ORDER_BY_PUBLISH_DATE_DESC,
  ];
  export const load: Load = async ({ fetch, page }) => {
    page.query.set(LIMIT, '10');
    const res = await fetch(`/search.json?${page.query.toString()}`);
    if (res.ok) {
      const searchData: SearchResultGroup<ExperienceSearchResultItem|DestinationSearchResultItem> = await res.json();
      const searchResult: (Experience|Destination)[] = [];
      const countries = get(countryStore);
      const experienceTypes = get(experienceTypeStore);
      const destinationTypes = get(destinationTypeStore);
      for (const k in searchData) {
        for (const item of searchData.items) {
          searchResult.push({
            id: item.id,
            name: item.name,
            description: item.description,
            intro: item.intro,
            gallery: item.gallery,
            videos: item.videos,
            looks: item.looks,
            pack: item.pack,
            destinations: [],
            experiences:[],
            country: countries.items[item.country],
            type: item.__typename == 'Destination' ? destinationTypes.items[item.type] : experienceTypes.items[item.type],
            created_at: item.created_at,
            updated_at: item.updated_at,
            published_at: item.published_at,
            __typename: item.__typename
          });
        }
      }
      return {
        props: {
          searchResult,
          query: page.query.get(QUERY),
          experience_type: get(experienceStore).items[page.query.get(EXPERIENCE_TYPE) || ''],
          destination_type: get(destinationStore).items[page.query.get(DESTINATION_TYPE) || ''],
          country: get(countryStore).items[page.query.get(COUNTRY) || ''],
          ordering:
            orderings[page.query.get(ORDERING) || ''] || ORDER_BY_NAME_ASC,
        },
      };
    }
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
  export let searchResult: (Experience | Destination)[];
  console.log(searchResult);
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

  function onDestinationTypeChange(event: CustomEvent<DropdownValue<Category>>) {
    goSlow({ d: event.detail.value.id });
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    goSlow({ c: event.detail.value.id });
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    goSlow({ s: event.detail.value.key });
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
<Layout config={configPage}>
  <div class="content">
    <section class="header-title d-pt-120 d-pb-55 m-pt-90 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container m-none">
          <form
            class="search-form-experiences"
            action="/"
            method="GET"
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
              {#each (searchResult || []) as item, i}
                <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                  <div class="experience-item">
                    <div class="thumbnail">
                      <a href={makeLink(item.__typename == 'Destination' ? '/destination' : '/experience',item)}>
                        <div
                          class="image-cover"
                          style="padding-top: calc(410 / 315 * 100%)"
                        >
                          <BlurImage data={item.gallery[0]} />
                        </div>
                      </a>
                      <IconButton
                        class="btn-favorite {item.liked ? 'liked' : ''}"
                        on:click={likeItem(item)}
                      >
                        <Icon
                          class="like"
                          component={Svg}
                          viewBox="-4 -4 24 24"
                        >
                          <path
                            d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                            transform="translate(0.001)"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                        </Icon>
                        <Icon
                          class="liked"
                          component={Svg}
                          viewBox="-4 -4 24 24"
                        >
                          <path
                            d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                            transform="translate(0)"
                            fill="#fff"
                            fill-rule="evenodd"
                          />
                        </Icon>
                      </IconButton>
                    </div>
                    <a href={makeLink(item.__typename == 'Destination' ? '/destination' : '/experience',item)}>
                      <LayoutGrid class="p-0 d-block m-none">
                        <Cell spanDevices={{ desktop: 6, phone: 2 }}
                          ><p class="text-eyebrow text-left">
                            {item.country ? item.country.name : 'Country'}
                          </p></Cell
                        >
                        <Cell spanDevices={{ desktop: 6, phone: 2 }}
                          ><p class="text-eyebrow text-right">
                            {item.type?.name || ''}
                          </p></Cell
                        >
                      </LayoutGrid>
                      <LayoutGrid class="p-0 d-none m-block">
                        <Cell spanDevices={{ desktop: 6, phone: 2 }}
                          ><p class="text-eyebrow text-left">
                            {item.type?.name || ''}
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h2 title">{item.name}</h4>
                      <p class="short-text m-none">{(item.intro || '').substring(0,80)}</p>
                    </a>
                  </div>
                </Cell>
              {/each}
          </LayoutGrid>
        </div>
      </div>
    </section>
  </div>
</Layout>
<!-- <HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  bind:searchModel
  bind:types={experienceTypes}
  bind:destination_types={destinationTypes}
  bind:countries
  on:close={onSearchSubmit}
/> -->
<OyNotification />

<style>
  .header-title {
    background-color: #f0f7f8;
  }
  .header-title:global(.is_sticky) {
    padding-bottom: 55px !important;
  }
  .search-form-experiences :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
    --mdc-select-idle-line-color: #000;
    --mdc-select-hover-line-color: #000;
  }
  .search-form-experiences :global(.mdc-text-field),
  .search-form-experiences :global(.mdc-select) {
    height: 35px;
    width: 100%;
    padding-right: 15px;
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
  .search-form-experiences :global(.mdc-text-field img) {
    filter: brightness(0.1);
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

  .experience-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
  }
  .experience-item .divider::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .experience-item .title {
    height: 50px;
    overflow: hidden;
  }
  .experience-item .thumbnail {
    position: relative;
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
</style>
