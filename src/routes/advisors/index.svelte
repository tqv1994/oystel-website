<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import type { Country } from '$lib/store/country';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import DataTable, {
    Head,
    Body,
    Row,
    Cell as CellTable,
  } from '@smui/data-table';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { getSpecialtiesString, type Advisor } from '$lib/store/advisor';
  import { DESTINATION_TYPE, trySearch } from '$lib/store/search';
  import _ from 'lodash';
  import { COUNTRY, QUERY, EXPERIENCE_TYPE } from '$lib/store/search';
  import type {
    DropdownValue,
    DropdownMultiValues,
  } from '$lib/components/Dropdown.svelte';
  import { makeLink } from '$lib/utils/link';
  import { implodeString } from '$lib/utils/string';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import OySelect from '$lib/components/common/OySelect.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  import Icon from '@smui/textfield/icon';

  type _SearchParams = {
    q?: string | null;
    limit: number;
    experienceTypeId?: string;
    destinationTypeId?: string;
    countryIds: string[];
    orderingTypeIds?: string[];
  };

  export const load: Load = async ({ fetch, url }) => {
    const experienceTypes = await getCollection(fetch, 'experience-type');
    const countries = await getCollection(fetch, 'country');
    const experienceTypeId = url.searchParams.get(EXPERIENCE_TYPE) || undefined;
    const destinationTypeId =
      url.searchParams.get(DESTINATION_TYPE) || undefined;
    const countryIds = url.searchParams.getAll(COUNTRY);
    const q = url.searchParams.get(QUERY);

    const advisors = await _search(fetch, {
      countryIds,
      experienceTypeId,
      destinationTypeId,
      limit: 999,
      q,
    });

    return {
      props: {
        experienceTypes,
        countries,
        q,
        experienceTypeId,
        countryIds,
        advisors,
      },
    };
  };

  export async function _search(
    fetch: SvelteFetch,
    {
      q,
      experienceTypeId,
      destinationTypeId,
      countryIds,
      orderingTypeIds,
      limit,
    }: _SearchParams,
  ): Promise<Advisor[]> {
    const countryFilter = countryIds.map((id) => `country = ${id}`);
    const eTypeFilter: string[] = [];
    if (experienceTypeId) {
      for (let i = 1; i <= 5; i++) {
        eTypeFilter.push(`experienceType${i} = ${experienceTypeId}`);
      }
    }
    const dTypeFilter: string[] = [];
    if (destinationTypeId) {
      for (let i = 1; i <= 3; i++) {
        dTypeFilter.push(`destinationType${i} = ${destinationTypeId}`);
      }
    }
    const data = await trySearch<Advisor>(fetch, 'advisor', {
      q,
      filter: [countryFilter, eTypeFilter, dTypeFilter],
      limit,
      sort: orderingTypeIds,
    });
    return data.hits;
  }
</script>

<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import { getKindById } from '$lib/utils/array';

  export let experienceTypes: Kind[];
  export let countries: Country[];
  export let q: string | undefined = '';
  export let experienceTypeId: string | undefined;
  export let destinationTypeId: string | undefined;
  export let countryIds: string[];
  export let advisors: Advisor[];

  let contentHeaderActionMobile = '';

  async function go() {
    advisors = await _search(fetch, {
      countryIds,
      experienceTypeId,
      destinationTypeId,
      limit: 999,
      q,
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
    experienceTypeId = event.detail.value?.id;
    go();
  }

  function onCountryChange(event: CustomEvent<DropdownMultiValues<Country>>) {
    countryIds = event.detail.value
      ? event.detail.value.map((item) => item.id)
      : [];
    go();
  }

  function onSearchSubmitMobile(event: CustomEvent) {
    contentHeaderActionMobile = '';
    experienceTypeId = event.detail.typeId || '';
    countryIds = event.detail.countryIds || '';
    go();
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
  <section class="header-title m-pt-40 m-pb-40 full-width">
    <div class="content-wrap">
      <div class="container margin-auto mobile-widths">
        <h1 class="text-h2 text-center mb-20 m-mt-0 d-mt-70 hidden-on-sticky">
          Crafted from Experience
        </h1>
        <p
          class="text-center mt-0 m-pl-40 m-pr-40 m-mb-15 d-mb-0 hidden-on-sticky"
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
    class="header-title d-pt-100 d-pb-95 m-pt-100 m-pb-40 full-width is_sticky fixed"
  >
    <div class="content-wrap">
      <div class="container margin-auto">
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
    <div class="container margin-auto">
      <form
        class="m-none search-form-advisor mb-50 advisor-list-container-width"
        on:submit|preventDefault={go}
      >
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 4 }}>
            <div class="form-control">
              <Textfield
                variant="outlined"
                bind:value={q}
                on:input={onQueryInput}
                label="Search by name"
                withTrailingIcon={false}
              >
                <Icon slot="trailingIcon"><SearchIcon /></Icon>
              </Textfield>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 8 }}
            class="form-inline d-desktop text-right"
          >
            <div class="form-wrap-right">
              <div class="form-control text-left">
                <label class="text-h5">Speciality</label>
                <div class="display-inline">
                  <OySelect
                    items={experienceTypes}
                    on:select={onTypeChange}
                    on:clear={onTypeChange}
                    value={experienceTypeId}
                    variant="standard"
                    placeholder="All"
                  />
                </div>
              </div>
              <div class="form-control text-left">
                <label class="text-h5">Location</label>
                <div class="display-inline">
                  <OySelect
                    items={countries}
                    on:select={onCountryChange}
                    on:clear={onCountryChange}
                    value={countryIds}
                    variant="standard"
                    isMulti={true}
                    placeholder="All"
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
                <OySelect
                  items={experienceTypes}
                  on:select={onTypeChange}
                  on:clear={onTypeChange}
                  placeholder="Speciality"
                  value={experienceTypeId}
                  variant="standard"
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
                <OySelect
                  items={countries}
                  on:select={onCountryChange}
                  on:clear={onCountryChange}
                  placeholder="Location"
                  value={countryIds}
                  variant="standard"
                  isMulti={true}
                />
              </div>
            </div>
          </Cell>
        </LayoutGrid>
      </form>
      <div class="advisor-list-container-width m-d-0 m-none">
        <DataTable style="width: 100%;">
          <Head>
            <Row>
              <CellTable style="width: 10%;" />
              <CellTable style="width: 29%;"
                ><h6 class="m-0 mb-10">Name</h6></CellTable
              >
              <CellTable style="width: 41%;"
                ><h6 class="m-0 mb-10">Specialties</h6></CellTable
              >
              <CellTable style="width: 20%;"
                ><h6 class="m-0 mb-10">Location</h6></CellTable
              >
            </Row>
          </Head>
          <Body>
            {#if advisors?.length}
              {#each advisors as advisor}
                <Row class="item-advisor">
                  <CellTable
                    style="width: 10%;  padding-left: 8px; padding-right: 16px;"
                    ><a href={makeLink('/advisors', advisor)}>
                      <Avatar
                        avatar={advisor.avatar}
                        alt={advisor?.name || ''}
                        style="width: 88px;padding-top: 0; height: 88px"
                      />
                    </a></CellTable
                  >
                  <CellTable style="width: 29%; padding-left: 0;"
                    ><a href={makeLink('/advisors', advisor)}
                      ><p class="name text-h4">
                        {advisor.name || ''}
                      </p></a
                    ></CellTable
                  >
                  <CellTable style="width: 41%;"
                    ><p>
                      {getSpecialtiesString(advisor, experienceTypes).substr(
                        0,
                        80,
                      )}
                    </p></CellTable
                  >
                  <CellTable style="width: 20%;"
                    ><p>
                      {getKindById(advisor?.country, countries)?.name || ''}
                    </p></CellTable
                  >
                </Row>
              {/each}
            {/if}
          </Body>
        </DataTable>
      </div>
      <div class="d-none m-block advisor-list-container-width">
        <div class="advisors-list">
          <LayoutGrid class="p-0">
            <Cell span={12}>
              {#if advisors?.length}
                {#each advisors as advisor}
                  <div class="item-advisor">
                    <a href={makeLink('/advisors', advisor)}>
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ phone: 1, tablet: 2, desktop: 4 }}>
                          <div class="thumbnail">
                            <Avatar avatar={advisor.avatar} alt={advisor?.name || ''} style="width:100%; padding-top: 100%"/>
                          </div>
                        </Cell>
                        <Cell spanDevices={{ phone: 3, tablet: 6, desktop: 8 }}>
                          <h4 class="mt-0 mb-5">
                            {advisor.name || ''}
                          </h4>
                          <p class="mt-0 mb-25">
                            {getKindById(advisor?.country, countries)?.name ||
                              ''}
                          </p>
                          <p class="m-0">
                            {getSpecialtiesString(
                              advisor,
                              experienceTypes,
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

<!-- 
  TODO: Fix this - I don't understand it -->

<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  on:close={onSearchSubmitMobile}
  experience_types={experienceTypes}
  {countries}
  searchModel={{
    countryIds,
    typeId: experienceTypeId,
  }}
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
    .item-advisor .image-cover {
      -webkit-filter: grayscale(1);
      filter: grayscale(1);
    }
    .header-title {
      background-color: #f2f2f2;
      padding-bottom: 80px;
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
      padding-top: 20px;

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
      .form-wrap-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .form-inline .form-control {
        display: flex;
        align-items: center;
        height: 35px;
        margin-right: 30px;
        &:last-child {
          margin-right: 0;
        }
        .oy-select {
          width: 200px;
          .multiSelectItem {
            width: 90px;
          }
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
      padding-top: 24px;
      padding-bottom: 24px;
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
        height: 168px;
        @include mixins.mobile {
          height: auto;
          padding: 24px 0;
        }
      }
      tr:last-child {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
    }

    .header-title {
      top: -200px;
      transition: top 2s ease;
      @include mixins.mobile {
        h2 {
          --mdc-typography-headline2-letter-spacing: -0.5px;
        }
      }
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
  .input-icon {
    vertical-align: middle;
    margin-top: -2px;
  }
  .advisor-list-container-width {
    width: 78.62371888%;
    margin: auto;
    @include mixins.mobile {
      width: 100%;
      padding: 0 24px;
    }
  }
  .mobile-widths {
    @include mixins.mobile {
      width: 100%;
      padding: 0 24px;
    }
  }
</style>
