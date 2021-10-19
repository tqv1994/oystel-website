<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { countryStore } from '$lib/api/country/store';
  import { specialityStore } from '$lib/api/specialty/store';
  import { advisorStore, updateAdvisorStore } from '$lib/api/advisor/store';
  import { Country } from '$lib/api/country/type';
  import { Speciality } from '$lib/api/specialty/type';
  import { onMount } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { goto } from '$app/navigation';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import { Icon } from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import DataTable, {
    Head,
    Body,
    Row,
    Cell as CellTable,
  } from '@smui/data-table';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { stringHelper, routerHelper } from '$lib/helpers';
  import Layout from '$lib/components/common/Layout.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  import { Advisor } from '$lib/api/advisor/type';
  import { AdvisorsPageData } from '$lib/api/pages/type';

  export const load: Load = async ({ fetch, session, page }) => {
    advisorStore.set({items:{}});
    let searchModel = {
      name: page.query.get('name'),
      specialty: page.query.get('specialty'),
      location: page.query.get('location'),
    };
    let searchParams: any = {};
    if (searchModel.name && searchModel.name != '') {
      searchParams['userMe.displayName_contains'] = searchModel.name;
    }
    if (searchModel.specialty && searchModel.specialty != '') {
      searchParams['specialities.name_eq'] = searchModel.specialty;
    }
    if (searchModel.location && searchModel.location != '') {
      searchParams['countries.name_eq'] = searchModel.location;
    }
    const res = await fetch(`/api/pages/advisor?${stringHelper.objectToQueryString(searchParams)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data: AdvisorsPageData = await res.json();
      updateAdvisorStore(data.advisors);
    } else {
      const error = await res.json();
      console.log(error);
    }
    return {
      props: {searchModel},
    };
  };
</script>

<script lang="ts">
  export let searchModel = {
    name: '',
    specialty: '',
    location: '',
  };
  let contentHeaderActionMobile = '';
  let configPage = {
    header: {
      page: 'advisors',
      transparent: true,
      theme: 'light',
      currentMenu: 'travel-advisors',
    },
  };
  let advisors: Advisor[];
  let specialities: Speciality[];
  let countries: Country[];

  countryStore.subscribe(({ items }) => {
    countries = Object.values(items);
  });

  specialityStore.subscribe(({ items }) => {
    specialities = Object.values(items);
  });

  advisorStore.subscribe(({ items }) => {
    advisors = Object.values(items);
  });

  function onSearchSubmit() {
    setTimeout(()=>{
      let queryString = stringHelper.objectToQueryString(searchModel);
      goto('/advisor?' + queryString);
    },0);
  }

  function onScrollFixedHeader() {
    /*if(document.documentElement.clientWidth < 839) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                document.getElementById("header").classList.add("fixed");
                document.querySelector('header').style.zIndex = 7;
                document.querySelector('header').style.position = 'relative';
                document.querySelector('.header-title').classList.add('fixed', 'is_sticky');
            } else {
                document.getElementById("header").classList.remove("fixed");
                document.querySelector('header').style.zIndex = 'auto';
                document.querySelector('header').style.position = 'static';
                document.querySelector('.header-title').classList.remove('fixed', 'is_sticky');
            }
        }*/
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
    <section class="header-title d-pt-120 d-pb-95 m-pt-100 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container">
          <h1 class="text-center d-mb-30 m-mb-25 mt-0">
            Crafted from Experience
          </h1>
          <p class="text-center mt-0 m-pl-40 m-pr-40 m-mb-45">
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
          action="/"
          on:submit|preventDefault={onSearchSubmit}
        >
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 4 }}>
              <div class="form-control">
                <Textfield
                  variant="outlined"
                  bind:value={searchModel.name}
                  label="Search by name"
                  withTrailingIcon={false}
                  on:change={onSearchSubmit}
                >
                  <Icon slot="trailingIcon"
                    ><img src="/img/icons/icon-search.svg" /></Icon
                  >
                </Textfield>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 8 }} class="form-inline text-right">
              <div class="form-control">
                <label class="text-h3">Filter by Speciality</label>
                <Select
                  bind:value={searchModel.specialty}
                  label=""
                  naturalMenuWidth="300px"
                  class="text-left"
                >
                  <Option on:click={onSearchSubmit}>All</Option>
                  {#if specialities && specialities.length > 0}
                    {#each specialities as specialty}
                      <Option on:click={onSearchSubmit} value={specialty.name}
                        >{specialty.name}</Option
                      >
                    {/each}
                  {/if}
                </Select>
              </div>
              <div class="form-control">
                <label class="text-h3">Location</label>
                <Select
                  bind:value={searchModel.location}
                  label=""
                  class="text-left"
                >
                  <Option on:click={onSearchSubmit} value="">All</Option>
                  {#if countries && countries.length > 0}
                    {#each countries as country}
                      <Option on:click={onSearchSubmit} value={country.name}
                        >{country.name}</Option
                      >
                    {/each}
                  {/if}
                </Select>
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
              {#if advisors && advisors.length > 0}
                {#each advisors as item}
                  <Row class="item-advisor">
                    <CellTable
                      ><a href={routerHelper.getUrl('advisor', '', item.id)}
                        ><BlurhashImage
                          class="avatar"
                          src={stringHelper.getFullUrlImage(
                            item.userMe.avatar?.url,
                          )}
                          fadeDuration="1000"
                        /></a
                      ></CellTable
                    >
                    <CellTable
                      ><a href={routerHelper.getUrl('advisor', '', item.id)}
                        ><p class="name text-h2">
                          {item.userMe?.displayName
                            ? item.userMe.displayName
                            : item.userMe.email}
                        </p></a
                      ></CellTable
                    >
                    <CellTable
                      ><p>
                        {item.specialitiesString}
                      </p></CellTable
                    >
                    <CellTable
                      ><p>
                        {item.countriesString}
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
                {#if advisors && advisors.length > 0}
                  {#each advisors as item}
                    <div class="item-advisor">
                      <a href={item.url}>
                        <LayoutGrid class="p-0">
                          <Cell
                            spanDevices={{ phone: 1, tablet: 2, desktop: 4 }}
                          >
                            <div class="thumbnail">
                              <BlurhashImage
                                class="avatar"
                                src={stringHelper.getFullUrlImage(
                                  item.userMe.avatar?.url,
                                )}
                                fadeDuration="1000"
                              />
                            </div>
                          </Cell>
                          <Cell
                            spanDevices={{ phone: 3, tablet: 6, desktop: 8 }}
                          >
                            <h2 class="mt-0 mb-15">
                              {item.userMe.displayName}
                            </h2>
                            <p class="mt-0 mb-30">
                              {item.countriesString}
                            </p>
                            <p class="m-0">
                              {item.specialitiesString}
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
  bind:searchModel
  bind:countries
  bind:specialities
  on:close={onSearchSubmit}
/>

<style>
  .header-title {
    background-color: #f0f7f8;
  }
  :global(.is_sticky .hidden-on-sticky) {
    display: none;
  }
  .header-title:global(.is_sticky) {
    padding-bottom: 55px !important;
  }
  .search-form-advisor :global(.mdc-layout-grid) {
    --mdc-select-idle-line-color: #000;
    --mdc-select-hover-line-color: #000;
  }
  .search-form-advisor :global(.mdc-text-field) {
    height: 35px;
    width: 100%;
    padding-right: 15px;
  }
  /*.search-form-advisor :global(.smui-select--standard .mdc-floating-label){*/
  /*    max-width: calc(100% - 35px);*/
  /*}*/
  .search-form-advisor :global(.mdc-select.mdc-select .mdc-select__anchor) {
    height: 35px;
  }
  .search-form-advisor
    :global(.mdc-select.mdc-select .mdc-select__anchor:before) {
    height: 20px;
  }
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__leading),
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__notch),
  .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__trailing),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__leading),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__notch),
  .search-form-advisor :global(.mdc-select .mdc-notched-outline__trailing) {
    border-color: #000;
  }
  .search-form-advisor :global(.mdc-text-field img) {
    filter: brightness(0.1);
  }

  :global(.form-inline .form-control) {
    display: inline-block;
    margin-right: 30px;
  }
  :global(.form-inline .form-control:last-child) {
    margin-right: 0;
  }
  form label {
    margin-right: 25px;
  }

  form :global(.mdc-select__selected-text) {
    text-transform: uppercase;
  }

  :global(.page-advisors .item-advisor img) {
    border-radius: 50%;
    vertical-align: middle;
  }
  :global(.item-advisor .name) {
    vertical-align: middle;
  }
  :global(.mdc-data-table) {
    border: 0;
  }
  :global(.mdc-data-table tr td) {
    padding-top: 50px;
    padding-bottom: 30px;
  }
  :global(.mdc-data-table tr:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  :global(.header-title) {
    top: -200px;
    transition: top 2s ease;
  }
  :global(#header.fixed) {
    animation: fadeIn 2s ease;
  }

  @media screen and (min-width: 950px) {
    .advisors-list
      :global(.mdc-layout-grid .mdc-layout-grid__cell .item-advisor) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
  @media screen and (max-width: 949px) {
    .advisors-list :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-phone: 0;
      --mdc-layout-grid-gutter-tablet: 0;
      --mdc-layout-grid-gutter-desktop: 0;
    }

    .advisors-list :global(.mdc-layout-grid .mdc-layout-grid) {
      --mdc-layout-grid-gutter-tablet: 20px;
      --mdc-layout-grid-gutter-desktop: 30px;
      --mdc-layout-grid-gutter-phone: 20px;
    }
    .advisors-list
      :global(.mdc-layout-grid .mdc-layout-grid__cell .item-advisor) {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }
    .advisors-list
      :global(.mdc-layout-grid
        .mdc-layout-grid__cell:last-child
        .item-advisor) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }

  .item-advisor {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .item-advisor .thumbnail {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  :global(.page-advisors .mdc-data-table__header-cell) {
    text-transform: uppercase;
  }
</style>
