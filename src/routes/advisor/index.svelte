<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { countryStore } from '$lib/store/country';
  import { advisorTypeStore } from '$lib/store/advisor-type';
  import { AdvisorBase } from '$lib/store/advisor';
  import { Country } from '$lib/store/country';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/icon-button';
  import DataTable, {
    Head,
    Body,
    Row,
    Cell as CellTable,
  } from '@smui/data-table';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Advisor } from '$lib/store/advisor';
  import { get } from 'svelte/store';
  import { SearchResultGroup } from '$lib/store/search';
  import _ from 'lodash';
  import { Ordering, orderings, ORDER_BY_NAME_ASC } from '$lib/store/order';
  import {
    COUNTRY,
    DESTINATION_TYPE,
    EXPERIENCE_TYPE,
    LANGUAGE,
    LIMIT,
    ORDERING,
    QUERY,
    search,
    SearchParams,
    TYPE,
  } from '$lib/store/search';
  import Dropdown, { DropdownValue } from '$lib/components/Dropdown.svelte';
  import { sortByName } from '$lib/utils/sort';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { Language, languageStore } from '$lib/store/language';
  import { Category } from '$lib/store/category';
  import { makeLink } from '$lib/utils/link';
  import { implodeString } from '$lib/utils/string';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import OyAutocomplete from '$lib/components/common/OyAutocomplete.svelte';

  type SearchResultItem = AdvisorBase & {
    country: string;
    destinationType1: string;
    destinationType2: string;
    destinationType3: string;
    experienceType1: string;
    experienceType2: string;
    experienceType3: string;
    type1: string;
    type2: string;
    type3: string;
    language1: string;
    language2: string;
    language3: string;
  };

  export const load: Load = async ({ fetch, url }) => {
    url.searchParams.set(LIMIT, '20');
    const res = await fetch(`/advisor.json?${url.searchParams.toString()}`);
    let advisors: {hasMore: boolean, items: Advisor[]} = {
      hasMore: false,
      items: []
    };
    const destinationTypes = get(destinationTypeStore);
    const experienceTypes = get(experienceTypeStore);
    const countries = get(countryStore);
    const advisorTypes = get(advisorTypeStore);
    const languages = get(languageStore);
    if (res.ok) {
      const searchData: SearchResultGroup<SearchResultItem> = await res.json();
      const items: Advisor[] = [];
      for (const item of searchData.items) {
        items.push({
          id: item.id,
          name: item.name,
          description: item.description,
          accept: item.accept,
          planningFee: item.planningFee,
          instagram: item.instagram,
          twitter: item.twitter,
          facebook: item.facebook,
          linkedin: item.linkedin,
          pinterest: item.pinterest,
          website: item.website,
          timezone: item.timezone,
          created_at: item.created_at,
          updated_at: item.updated_at,
          published_at: item.published_at,
          country: countries.items[item.country],
          avatar: item.avatar,
          gallery: item.gallery,
          experienceType1: experienceTypes.items[item.experienceType1],
          experienceType2: experienceTypes.items[item.experienceType2],
          experienceType3: experienceTypes.items[item.experienceType3],
          destinationType1: destinationTypes.items[item.destinationType1],
          destinationType2: destinationTypes.items[item.destinationType2],
          destinationType3: destinationTypes.items[item.destinationType3],
          type1: advisorTypes.items[item.type1],
          type2: advisorTypes.items[item.type2],
          type3: advisorTypes.items[item.type3],
          language1: languages.items[item.language1],
          language2: languages.items[item.language2],
          language3: languages.items[item.language3],
        });
      }
      advisors = {
        hasMore: searchData.hasMore,
        items
      };
    }
    return {
        props: {
          advisors,
          query: url.searchParams.get(QUERY) || '',
          experiencetype: url.searchParams.get(EXPERIENCE_TYPE) || '',
          destinationtype: url.searchParams.get(DESTINATION_TYPE) || '',
          type: url.searchParams.get(TYPE) || '',
          language: languages.items[url.searchParams.get(LANGUAGE) || ''],
          country: url.searchParams.get(COUNTRY) || '',
          ordering:
            orderings[url.searchParams.get(ORDERING) || ''] ||
            ORDER_BY_NAME_ASC,
        },
      };
  };
</script>

<script lang="ts">
import { experienceTypeStore } from "$lib/store/experience-type";

  export let advisors: SearchResultGroup<Advisor> = {
    hasMore: true,
    items: [],
  };
  export let query: string = '';
  export let experiencetype: string ;
  export let destinationtype: string;
  export let type: string;
  export let language: Language | undefined;
  export let country: string;
  export let ordering: Ordering;
  let contentHeaderActionMobile: string = '';
  console.log(experiencetype);

  const experienceTypes = sortByName(Object.values($experienceTypeStore.items));
  experienceTypes.unshift({ id: '', name: 'All' });
  // let experienceTypes: Category[];
  // experienceTypeStore.subscribe(
  //   (store) => (experienceTypes = sortByName(Object.values(store.items))),
  // );

  let countries: Country[];
  countryStore.subscribe((store) => {
    countries = sortByName(Object.values(store.items));
    countries.unshift({ id: '', name: 'All' });
  });

  function go(params: SearchParams) {
    search({
      [QUERY]: query,
      [TYPE]: type,
      [DESTINATION_TYPE]: destinationtype,
      [EXPERIENCE_TYPE]: experiencetype,
      [LANGUAGE]: language?.id,
      [COUNTRY]: country,
      [ORDERING]: ordering.key,
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
    go({ [EXPERIENCE_TYPE]: event.detail.value.id });
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    go({ [COUNTRY]: event.detail.value.id });
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    go({ o: event.detail.value.key });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    go({
      [COUNTRY]: event.detail.country || '',
      [EXPERIENCE_TYPE]: event.detail.experiencetype || '',
    });
  }

  function onScrollFixedHeader() {
    let eleHeader = document.getElementById('header');
    let eleHeaderTitle = document.querySelector('.header-title.is_sticky');
    if (eleHeader && eleHeaderTitle) {
      if (document.documentElement.clientWidth < 950) {
        if (
          document.body.scrollTop > 250 ||
          document.documentElement.scrollTop > 250
        ) {
          eleHeader.classList.add('fixed');
          eleHeader.style.setProperty('z-index', '100', 'important');
          eleHeaderTitle.classList.add('show');
        } else {
          eleHeader.classList.remove('fixed');
          eleHeader.style.setProperty('z-index', 'auto');
          eleHeaderTitle.classList.remove('show');
        }
      } else {
        eleHeader.classList.remove('fixed');
        eleHeader.style.setProperty('z-index', 'auto');
        eleHeaderTitle.classList.remove('show');
      }
    }
  }

  // onMount(async () => {});
</script>

<svelte:window
  on:load={() => {
    onScrollFixedHeader();
  }}
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<div class="content advisor-listing-page">
  <section class="header-title d-pt-120 d-pb-95 m-pt-100 m-pb-25 full-width">
    <div class="content-wrap">
      <div class="container">
        <h2 class="text-center mb-20 m-mt-0 d-mt-70 hidden-on-sticky">
          Crafted from Experience
        </h2>
        <p
          class="text-center mt-0 m-pl-40 m-pr-40 m-mb-40 d-mb-0 hidden-on-sticky"
        >
          First hand experience, ready to craft your perfect vacation.
        </p>
        <div class="d-none m-block">
          <Button
            on:click={() => {
              contentHeaderActionMobile = 'advisor-search';
            }}
            type="button"
            style="width: 100%"
            variant="outlined"><Label>Filter Your Results</Label></Button
          >
        </div>
      </div>
    </div>
  </section>
  <section
    class="header-title d-pt-120 d-pb-95 m-pt-100 m-pb-25 full-width is_sticky fixed"
  >
    <div class="content-wrap">
      <div class="container">
        <div class="d-none m-block">
          <Button
            on:click={() => {
              contentHeaderActionMobile = 'advisor-search';
            }}
            type="button"
            style="width: 100%"
            variant="outlined"><Label>Filter Your Results</Label></Button
          >
        </div>
      </div>
    </div>
  </section>
  <section class="d-pt-80 d-pb-200 m-pt-40 m-pb-95">
    <div class="container">
      <form
        class="m-none search-form-advisor mb-50 d-pl-100 d-pr-100"
        on:submit|preventDefault={() => {
          go({});
        }}
      >
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 4 }}>
            <div class="form-control">
              <Textfield
                variant="outlined"
                bind:value={query}
                on:input={onQueryInput}
                label="Search by name"
                withTrailingIcon={false}
              >
                <Icon slot="trailingIcon"
                  ><img src="/img/icons/icon-search.svg" /></Icon
                >
              </Textfield>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 8 }}
            class="form-inline d-desktop text-right"
          >
            <div>
              <div class="form-control text-left">
                <label class="text-h5">Speciality</label>
                <div class="display-inline">
                  <OyAutocomplete
                    getOptionLabel={(option) =>
                      option ? `${option.name}` : ''}
                    bind:value={experiencetype}
                    options={experienceTypes}
                    key={'id'}
                    on:SMUIAutocomplete:change={onTypeChange}
                  />
                </div>
              </div>
              <div class="form-control text-left">
                <label class="text-h5">Location</label>
                <div class="display-inline">
                  <OyAutocomplete
                    getOptionLabel={(option) =>
                      option ? `${option.name}` : ''}
                    bind:value={country}
                    options={countries}
                    key={'id'}
                    on:SMUIAutocomplete:change={onCountryChange}
                  />
                </div>
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 4 }}
            class="form-inline d-tablet text-right"
          >
            <div>
              <div class="form-control text-left">
                <OyAutocomplete
                  getOptionLabel={(option) => (option ? `${option.name}` : '')}
                  bind:value={experiencetype}
                  options={experienceTypes}
                  key={'id'}
                  on:SMUIAutocomplete:change={onTypeChange}
                />
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 4 }}
            class="form-inline d-tablet text-right"
          >
            <div>
              <div class="form-control text-left">
                <OyAutocomplete
                  getOptionLabel={(option) => (option ? `${option.name}` : '')}
                  bind:value={country}
                  options={countries}
                  key={'id'}
                  on:SMUIAutocomplete:change={onCountryChange}
                />
              </div>
            </div>
          </Cell>
        </LayoutGrid>
      </form>
      <div class="d-pl-100 d-pr-100 m-d-0 m-none">
        <DataTable style="width: 100%;">
          <Head>
            <Row>
              <CellTable style="width: 10%" />
              <CellTable style="width: 25%;"
                ><h6 class="m-0 mb-10">Name</h6></CellTable
              >
              <CellTable style="width: 45%;"
                ><h6 class="m-0 mb-10">Specialties</h6></CellTable
              >
              <CellTable style="width: 20%;"
                ><h6 class="m-0 mb-10">Location</h6></CellTable
              >
            </Row>
          </Head>
          <Body>
            {#if advisors && advisors.items.length}
              {#each advisors.items as item}
                <Row class="item-advisor">
                  <CellTable style="width: 10%"
                    ><a href={makeLink('/advisor', item)}
                      ><div
                        class="image-cover"
                        style="width: 100px;padding-top: 0; height: 100px"
                      >
                        {#if item.avatar}
                          <BlurImage {...item.avatar} />
                        {:else}
                          <BlurImage />
                          <!-- TODO: Display placeholder avatar -->
                        {/if}
                      </div></a
                    ></CellTable
                  >
                  <CellTable style="width: 25%;"
                    ><a href={makeLink('/advisor', item)}
                      ><p class="name text-h4">
                        {item.name}
                      </p></a
                    ></CellTable
                  >
                  <CellTable style="width: 45%;"
                    ><p>
                      {implodeString(
                        [
                          $experienceTypeStore.items[item.experienceTypes1]?.name,
                          $experienceTypeStore.items[item.experienceTypes2]?.name,
                          $experienceTypeStore.items[item.experienceTypes3]?.name,
                          item.experienceTypes4?.name,
                          item.experienceTypes5?.name,
                        ],
                        ', ',
                      )}
                    </p></CellTable
                  >
                  <CellTable style="width: 20%;"
                    ><p>
                      {$countryStore.items[item.country]?.name || ''}
                    </p></CellTable
                  >
                </Row>
              {/each}
            {/if}
          </Body>
        </DataTable>
      </div>
      <div class="d-none m-block">
        <div class="advisors-list">
          <LayoutGrid class="p-0">
            <Cell span={12}>
              {#if advisors && advisors.items.length}
                {#each advisors.items as item}
                  <div class="item-advisor">
                    <a href={makeLink('/advisor', item)}>
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ phone: 1, tablet: 2, desktop: 4 }}>
                          <div class="thumbnail">
                            <div
                              class="image-cover"
                              style="width:100%; padding-top: 100%"
                            >
                              {#if item.avatar}
                                <BlurImage {...item.avatar} />
                              {:else}
                                <BlurImage />
                              {/if}
                            </div>
                          </div>
                        </Cell>
                        <Cell spanDevices={{ phone: 3, tablet: 6, desktop: 8 }}>
                          <h4 class="mt-0 mb-15">
                            {item.name}
                          </h4>
                          <p class="mt-0 mb-30">
                            {$countryStore.items[item.country]?.name || ''}
                          </p>
                          <p class="m-0">
                            {implodeString(
                              [
                                $experienceTypeStore.items[item.experienceTypes1]?.name,
                                $experienceTypeStore.items[item.experienceTypes2]?.name,
                                $experienceTypeStore.items[item.experienceTypes3]?.name,
                                item.experienceTypes4?.name,
                                item.experienceTypes5?.name,
                              ],
                              ', ',
                            ).substr(0, 80)}
                          </p>
                        </Cell>
                      </LayoutGrid>
                    </a>
                  </div>
                {/each}
              {/if}
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </div>
  </section>
</div>

<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  on:close={onSearchSubmitMobile}
  searchModel={{ experiencetype, country }}
/>

<style lang="scss" global>
  @use '../../theme/mixins';
  .advisor-listing-page {
    @import './src/style/partial/thumbnail.scss';
    @import './src/style/partial/sticky.scss';
    @import './src/style/partial/form.scss';
    --mdc-typography-headline6-text-transform: none;
    --mdc-typography-body1-font-size: 16px;
    --mdc-typography-body1-font-weight: 400;
    --mdc-typography-body1-line-height: 29px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 14px;
      --mdc-typography-body1-font-weight: 400;
      --mdc-typography-body1-line-height: 27px;

      --mdc-typography-headline6-text-transform: none;

      --mdc-typography-headline4-font-size: 20px;
      --mdc-typography-headline4-font-weight: 400;
      --mdc-typography-headline4-line-height: 24px;
    }
    .item-advisor .image-cover{
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }
    .header-title {
      background-color: #f2f2f2;
    }
    .is_sticky .hidden-on-sticky {
      display: none;
    }
    .header-title.is_sticky {
      padding-bottom: 24px !important;
      padding-top: 70px !important;
    }
    .search-form-advisor .mdc-layout-grid {
      --mdc-select-idle-line-color: #000;
      --mdc-select-hover-line-color: #000;
    }
    .search-form-advisor .mdc-text-field {
      height: 35px;
      width: 100%;
      padding-right: 15px;
    }
    /*.search-form-advisor :global(.smui-select--standard .mdc-floating-label){*/
    /*    max-width: calc(100% - 35px);*/
    /*}*/
    .search-form-advisor .mdc-select.mdc-select .mdc-select__anchor {
      height: 35px;
    }
    .search-form-advisor {
      .mdc-select.mdc-select {
        .mdc-select__anchor:before {
          height: 20px;
        }
      }
      .mdc-text-field,
      .mdc-select.mdc-select {
        .mdc-notched-outline__leading,
        .mdc-notched-outline__notch,
        .mdc-notched-outline__trailing {
          border-color: #000;
        }
      }
      .mdc-select {
        .mdc-notched-outline__notch {
          border-top: 0;
        }
        .mdc-notched-outline__leading {
          border-top: 0;
          border-left: 0;
        }
        .mdc-notched-outline__trailing {
          border-top: 0;
          border-right: 0;
        }
      }
      .mdc-text-field img {
        filter: brightness(0.1);
      }
      .form-inline .form-control {
        display: inline-block;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
      }
      label {
        margin-right: 25px;
      }
      .mdc-select__selected-text {
        text-transform: uppercase;
      }
    }

    .item-advisor {
      padding-top: 30px;
      padding-bottom: 30px;
      .image-cover {
        border-radius: 50%;
        vertical-align: middle;
      }
      .name {
        vertical-align: middle;
      }
      .thumbnail {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .mdc-data-table {
      border: 0;
      thead {
        text-transform: uppercase;
      }
      tr td {
        padding-top: 50px;
        padding-bottom: 30px;
      }
      tr:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
    }

    .header-title {
      top: -200px;
      transition: top 2s ease;
    }
    // #header.fixed {
    //   animation: fadeIn 2s ease;
    // }
    @media screen and (min-width: 1259px) {
      :global(.d-tablet) {
        display: none;
      }
      .d-desktop {
        display: block;
      }
    }
    @media screen and (max-width: 1258px) {
      .d-desktop {
        display: none;
      }
      .d-tablet {
        display: block;
      }
    }
    @media screen and (min-width: 950px) {
      .advisors-list
        :global(.mdc-layout-grid .mdc-layout-grid__cell .item-advisor) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
    @media screen and (max-width: 949px) {
      .advisors-list .mdc-layout-grid {
        --mdc-layout-grid-gutter-phone: 0;
        --mdc-layout-grid-gutter-tablet: 0;
        --mdc-layout-grid-gutter-desktop: 0;
      }

      .advisors-list .mdc-layout-grid .mdc-layout-grid {
        --mdc-layout-grid-gutter-tablet: 20px;
        --mdc-layout-grid-gutter-desktop: 30px;
        --mdc-layout-grid-gutter-phone: 20px;
      }

      .advisors-list
        .mdc-layout-grid
        .mdc-layout-grid__cell:last-child
        .item-advisor {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
  .display-inline {
    display: inline-block;
  }
</style>
