<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { countryStore } from '$lib/store/country';
  import { specialityStore } from '$lib/store/speciality';
  import { AdvisorBase } from '$lib/store/advisor';
  import { Country } from '$lib/store/country';
  import { Speciality } from '$lib/store/speciality';
  import LayoutGrid from '@smui/layout-grid/LayoutGrid.svelte';
  import Cell from '@smui/layout-grid/Cell.svelte';
  import Textfield from '@smui/textfield/Textfield.svelte';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import { Icon } from '@smui/icon-button';
  import DataTable, {
    Head,
    Body,
    Row,
    Cell as CellTable,
  } from '@smui/data-table';
  import Layout from '$lib/components/common/Layout.svelte';
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
    SPECIALITY,
    TYPE,
  } from '$lib/store/search';
  import Dropdown, { DropdownValue } from '$lib/components/dropdown.svelte';
  import { sortByName } from '$lib/utils/sort';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { Language, languageStore } from '$lib/store/language';
  import { Category } from '$lib/store/category';
  import { makeLink } from '$lib/utils/link';
  import { implodeString } from '$lib/utils/string';
  import InviteMembersModal from '$lib/components/modals/InviteMembersModal.svelte';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';

  type SearchResultItem = AdvisorBase & {
    country: string;
    destinationType1: string;
    destinationType2: string;
    destinationType3: string;
    experienceType1: string;
    experienceType2: string;
    experienceType3: string;
    speciality1: string;
    speciality2: string;
    speciality3: string;
    language1: string;
    language2: string;
    language3: string;
  };

  export const load: Load = async ({ fetch, page }) => {
    page.query.set(LIMIT, '20');
    const res = await fetch(`/advisor.json?${page.query.toString()}`);
    if (res.ok) {
      const searchData: SearchResultGroup<SearchResultItem> = await res.json();
      const destinationTypes = get(destinationTypeStore);
      const experienceTypes = get(experienceTypeStore);
      const countries = get(countryStore);
      const specialities = get(specialityStore);
      const languages = get(languageStore);
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
          speciality1: specialities.items[item.speciality1],
          speciality2: specialities.items[item.speciality2],
          speciality3: specialities.items[item.speciality3],
          language1: languages.items[item.language1],
          language2: languages.items[item.language2],
          language3: languages.items[item.language3],
        });
      }
      return {
        props: {
          advisors: { hasMore: searchData.hasMore, items },
          query: page.query.get(QUERY) || '',
          experienceType:
            experienceTypes.items[page.query.get(EXPERIENCE_TYPE) || ''],
          destinationType:
            destinationTypes.items[page.query.get(DESTINATION_TYPE) || ''],
          speciality: specialities.items[page.query.get(SPECIALITY) || ''],
          language: languages.items[page.query.get(LANGUAGE) || ''],
          country: countries.items[page.query.get(COUNTRY) || ''],
          ordering:
            orderings[page.query.get(ORDERING) || ''] || ORDER_BY_NAME_ASC,
        },
      };
    }
  };
</script>

<script lang="ts">
  export let advisors: SearchResultGroup<Advisor> = {
    hasMore: true,
    items: [],
  };
  export let query: string = '';
  export let experiencetype: Category | undefined;
  export let destinationtype: Category | undefined;
  export let speciality: Speciality | undefined;
  export let language: Language | undefined;
  export let country: Country | undefined;
  export let ordering: Ordering;
  let contentHeaderActionMobile: string = '';

  const specialities = sortByName(Object.values($specialityStore.items));

  let configPage = {
    header: {
      page: 'advisors',
      transparent: true,
      theme: 'light',
      currentMenu: 'advisors',
    },
  };

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
      [QUERY]: query,
      [SPECIALITY]: speciality?.id,
      [DESTINATION_TYPE]: destinationtype?.id,
      [EXPERIENCE_TYPE]: experiencetype?.id,
      [LANGUAGE]: language?.id,
      [COUNTRY]: country?.id,
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

  function onSpecialityChange(event: CustomEvent<DropdownValue<Category>>) {
    go({ s: event.detail.value.id });
  }

  function onCountryChange(event: CustomEvent<DropdownValue<Country>>) {
    go({ c: event.detail.value.id });
  }

  function onSortChange(event: CustomEvent<DropdownValue<Ordering>>) {
    go({ o: event.detail.value.key });
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    console.log(event.detail);
    go({
      c: event.detail.country?.id || '',
      s: event.detail.speciality?.id || '',
    });
  }

  function onScrollFixedHeader() {
    // if (document.documentElement.clientWidth < 950) {
    //   if (
    //     document.body.scrollTop > 450 ||
    //     document.documentElement.scrollTop > 450
    //   ) {
    //     document.getElementById('header').classList.add('fixed');
    //     document.querySelector('header').style.zIndex = 7;
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
    // } else {
    //   document.getElementById('header').classList.remove('fixed');
    //   document.querySelector('header').style.zIndex = 'auto';
    //   document.querySelector('header').style.position = 'static';
    //   document
    //     .querySelector('.header-title')
    //     .classList.remove('fixed', 'is_sticky');
    // }
  }

  // onMount(async () => {});
</script>

<!-- <svelte:window
  on:load={() => {
    onScrollFixedHeader();
  }}
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/> -->
<Layout config={configPage}>
  <div class="content">
    <section class="header-title d-pt-120 d-pb-95 m-pt-100 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container">
          <h1 class="text-center mb-20 m-mt-0 d-mt-70 hidden-on-sticky">
            Crafted from Experience
          </h1>
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
    <section class="d-pt-80 d-pb-200 m-pt-40 m-pb-95">
      <div class="container">
        <form
          class="m-none search-form-advisor mb-50"
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
                  <Dropdown
                    label="Filter by Speciality"
                    blankItem="All"
                    items={specialities}
                    value={speciality}
                    on:MDCSelect:change={onSpecialityChange}
                  />
                </div>
                <div class="form-control text-left">
                  <Dropdown
                    label="By Country"
                    blankItem="All"
                    items={countries}
                    value={country}
                    on:MDCSelect:change={onCountryChange}
                  />
                </div>
              </div>
            </Cell>
            <Cell
              spanDevices={{ desktop: 4 }}
              class="form-inline d-tablet text-right"
            >
              <div>
                <div class="form-control">
                  <Dropdown
                    label="Filter by Speciality"
                    blankItem="All"
                    items={specialities}
                    value={speciality}
                    on:MDCSelect:change={onSpecialityChange}
                  />
                </div>
              </div>
            </Cell>
            <Cell
              spanDevices={{ desktop: 4 }}
              class="form-inline d-tablet text-right"
            >
              <div>
                <div class="form-control">
                  <Dropdown
                    label="By Country"
                    blankItem="All"
                    items={countries}
                    value={country}
                    on:MDCSelect:change={onCountryChange}
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
                <CellTable style="width: 35%;">Name</CellTable>
                <CellTable style="width: 35%;">Specialties</CellTable>
                <CellTable style="width: 20%;">Location</CellTable>
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
                          style="width: 100px;padding-top: 100%"
                        >
                          <BlurImage {...item.avatar} />
                        </div></a
                      ></CellTable
                    >
                    <CellTable style="width: 35%;"
                      ><a href={makeLink('/advisor', item)}
                        ><p class="name text-h2">
                          {item.name}
                        </p></a
                      ></CellTable
                    >
                    <CellTable style="width: 35%;"
                      ><p>
                        {implodeString(
                          [
                            item.speciality1?.name,
                            item.speciality2?.name,
                            item.speciality3?.name,
                          ],
                          ', ',
                        )}
                      </p></CellTable
                    >
                    <CellTable style="width: 20%;"
                      ><p>
                        {item.country?.name || ''}
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
                          <Cell
                            spanDevices={{ phone: 1, tablet: 2, desktop: 4 }}
                          >
                            <div class="thumbnail">
                              <div
                                class="image-cover"
                                style="width:100%; padding-top: 100%"
                              >
                                <BlurImage {...item.avatar} />
                              </div>
                            </div>
                          </Cell>
                          <Cell
                            spanDevices={{ phone: 3, tablet: 6, desktop: 8 }}
                          >
                            <h2 class="mt-0 mb-15">
                              {item.name}
                            </h2>
                            <p class="mt-0 mb-30">
                              {item.country?.name || ''}
                            </p>
                            <p class="m-0">
                              {implodeString(
                                [
                                  item.speciality1?.name,
                                  item.speciality2?.name,
                                  item.speciality3?.name,
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
</Layout>

<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  {specialities}
  countries={sortByName(Object.values($countryStore.items))}
  on:close={onSearchSubmitMobile}
  searchModel={{ speciality: speciality, country: country }}
/>

<style lang="scss" global>
  .page-advisors {
    @import './src/style/partial/thumbnail.scss';
    .header-title {
      background-color: #f0f7f8;
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
    @media screen and (min-width: 1223px) {
      :global(.d-tablet) {
        display: none;
      }
      .d-desktop {
        display: block;
      }
    }
    @media screen and (max-width: 1222px) {
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
      .advisors-list .mdc-layout-grid .mdc-layout-grid__cell .item-advisor {
        border-top: 1px solid rgba(0, 0, 0, 0.2);
      }
      .advisors-list
        .mdc-layout-grid
        .mdc-layout-grid__cell:last-child
        .item-advisor {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
