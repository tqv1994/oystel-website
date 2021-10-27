<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import type { ExperiencesData, UpdateExperienceData } from '$lib/api/pages/type';
  import {
    experienceStore,
    updateExperienceStore,
  } from '$lib/api/experience/store';
  import {
    experienceTypeStore,
    updateExperienceTypeStore,
  } from '$lib/api/experience-type/store';
  import {
    destinationStore,
    updateDestinationStore,
  } from '$lib/api/destination/store';
  import {
    destinationTypeStore,
    updateDestinationTypeStore,
  } from '$lib/api/destination-type/store';
  import { countryStore, updateCountryStore } from '$lib/api/country/store';

  import { onMount, afterUpdate, beforeUpdate } from 'svelte';
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
  import { ExperienceTypeModel } from '$lib/models/experience_type';
  import { DestinationTypeModel } from '$lib/models/destination_type';
  import { DestinationModel } from '$lib/models/destination';
  import { ExperienceModel } from '$lib/models/experience';

  import { CountryModel } from '$lib/models/country';
  import authStore from '$lib/api/auth/store';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  import { HomePageData } from '$lib/api/pages/type';
  import { ExperienceType } from '$lib/api/experience-type/type';
  import { DestinationType } from '$lib/api/destination-type/type';
  import { Country } from '$lib/api/country/type';
  import { Experience } from '$lib/api/experience/type';

  export const load: Load = async ({ fetch, session, page }) => {
    let experienceTypes: ExperienceType[] = [];
    experienceTypeStore.subscribe(({items})=>{
      experienceTypes = Object.values(items);
    });
    const res = await fetch('/api/pages/experience', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experienceTypes)
    });

    if (res.ok) {
      const data: ExperiencesData = await res.json();
      experienceTypes = experienceTypes.map((experienceType: ExperienceType)=>{
        if(data[`experienceType_${experienceType.id}`]){
          experienceType.experiences = data[`experienceType_${experienceType.id}`];
        }
        return experienceType;
      });
      // TODO: Convert data to classes
      updateExperienceTypeStore(experienceTypes || []);
    } else {
      const error = await res.json();
      console.log(error);
    }
    return {
      props: {},
    };
  };
</script>

<script lang="ts">
  let searchModel = {
    name: '',
    type: '',
    destination: '',
    country: '',
    sort_by: '',
  };
  let configPage = {
    header: {
      page: 'experiences',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };
  let contentHeaderActionMobile = '';

  onMount(async () => {
  });
  let experienceTypes: ExperienceType[] = [];
  let destinationTypes: DestinationType[] = [];
  let countries: Country[] = [];

  getData();

  function getData(){
    experienceTypeStore.subscribe(({ items }) => {
    experienceTypes =  Object.values(items).map( (experienceType: ExperienceType)=>{
        if(experienceType.experiences){
          experienceType.experiences = experienceType.experiences.map((experience: any)=>{
            return new Experience(experience);
          });
        }
        return experienceType;
      });
    });
  }

  

  destinationTypeStore.subscribe(({ items }) => {
    destinationTypes =  Object.values(items);
  });

  countryStore.subscribe(({ items }) => {
      countries = Object.values(items);
  });


  function onSearchSubmit() {
    setTimeout(()=>{
      const queryString = stringHelper.objectToQueryString(searchModel);
      console.log(queryString)
      goto('/experiences-listing/search?' + queryString);
    },0);
  }
  
  function onScrollFixedHeader() {
    if (document.documentElement.clientWidth > 949) {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
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
  }

  async function likeExperienceItem(experience: Experience, experienceType: ExperienceType){
    if(!$authStore.user){
      window.pushToast('Please login to use this feature');
      return;
    }
    let userDataLikes: (number|string)[] | null = [];
    if(experience.users){
      userDataLikes = experience.users.map((item, index)=>{
        return item.id;      
      });
      let indexExist = userDataLikes.findIndex((item)=>item == $authStore.user?.id);
      if(indexExist >= 0){
        userDataLikes.splice(indexExist,1);
      }else{
        userDataLikes.push($authStore.user.id);
      }
      if(userDataLikes.length == 0){
        userDataLikes = null;
      }
    }
    const res = await fetch(`/api/pages/experience/like?id=${experience.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataLikes)
    });

    if (res.ok) {
      const data: UpdateExperienceData = await res.json();
      experience.users = data.updateExperience.experience.users;
      if(experienceType.experiences){
        experienceType.experiences = experienceType.experiences.map((item: Experience)=>{
          if(item.id === experience.id){
            item = experience;
          }
          return item;
        });
      }
      updateExperienceTypeStore([experienceType]);
      getData();
    } else {
      const error = await res.json();
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
<Layout config={configPage} on:refreshPage={()=>{}}>
  <div class="content">
    <section class="header-title d-pt-120 d-pb-95 m-pt-80 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container m-none">
          <form
            class="search-form-experiences"
            action="/"
            on:submit|preventDefault={onSearchSubmit}
          >
            <LayoutGrid class="p-0">
              <Cell span="4">
                <div class="form-control">
                  <Textfield
                    variant="outlined"
                    bind:value={searchModel.name}
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
                  <Select
                    variant="outlined"
                    bind:value={searchModel.type}
                    label="By Experience Type"
                  >
                    <Option value="" />
                    {#if experienceTypes}
                      {#each experienceTypes as item}
                        <Option on:click={onSearchSubmit} value={item.id}>{item.name}</Option>
                      {/each}
                    {/if}
                  </Select>
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <Select
                    variant="outlined"
                    bind:value={searchModel.destination}
                    label="By Destination"
                  >
                    <Option value="" />
                    {#if destinationTypes}
                      {#each destinationTypes as item}
                        <Option on:click={onSearchSubmit} value={item.id}>{item.name}</Option>
                      {/each}
                    {/if}
                  </Select>
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <Select
                    variant="outlined"
                    bind:value={searchModel.country}
                    label="By Country"
                  >
                    <Option value="" />
                    {#if countries}
                      {#each countries as item}
                        <Option on:click={onSearchSubmit} value={item.id}>{item.name}</Option>
                      {/each}
                    {/if}
                  </Select>
                </div>
              </Cell>
              <Cell span="2">
                <div class="form-control">
                  <Select
                    variant="outlined"
                    bind:value={searchModel.sort_by}
                    label="Sort By"
                  >
                    <Option on:click={onSearchSubmit} value="" />
                  </Select>
                </div>
              </Cell>
            </LayoutGrid>
          </form>
          <LayoutGrid class="p-0 hidden-on-sticky">
            <Cell span="12">
              <h1 class="text-center mb-30">Curate Your Experiences</h1>
              <p class="text-center">
                Bespoke itineraries created by our leading tastemakers.
              </p>
            </Cell>
          </LayoutGrid>
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
      {#if experienceTypes && experienceTypes.length > 0}
        {#each experienceTypes as type, indexType}
          {#if type.experiences && type.experiences.length > 0}
          <!-- {#if type.experiences.length > 0} -->
          <div class="container">
            <div class="section-title">
              <LayoutGrid class="p-0">
                <Cell span="12"
                  ><h2
                    class="text-h1 title {indexType == 0 ? 'mt-0' : ''} d-mb-30"
                  >
                    {type.name}
                  </h2></Cell
                >
              </LayoutGrid>
            </div>
            <div class="section-content">
              <LayoutGrid class="p-0">
                {#each type.experiences as item, i}
                  <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                    <div class="experience-item">
                      <div class="thumbnail">
                        <a href={item.url}>
                          <div
                            class="image-cover"
                            style="padding-top: calc(410 / 315 * 100%)"
                          >
                            <BlurhashImage
                              src={item.gallery.length > 0
                                ? item.gallery[0].url
                                : ''}
                              hash={item.gallery.length > 0
                                ? item.gallery[0].blurHash
                                : ''}
                              fadeDuration="1000"
                              alt=""
                            />
                          </div>
                        </a>
                        <IconButton
                          class="btn-favorite {item.liked ? 'liked' : ''}"
                          on:click={likeExperienceItem(item, type)}
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
                      <a href={item.url}>
                        <LayoutGrid class="p-0 d-block m-none">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left">
                              {item.country.name}
                            </p></Cell
                          >
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-right">
                              Experience
                            </p></Cell
                          >
                        </LayoutGrid>
                        <LayoutGrid class="p-0 m-block d-none">
                          <Cell spanDevices={{ desktop: 6, phone: 2 }}
                            ><p class="text-eyebrow text-left mt-20 mb-20">
                              Experience
                            </p></Cell
                          >
                        </LayoutGrid>
                        <div class="divider" />
                        <h4 class="text-h2 title m-mt-30">{item.name}</h4>
                        <p class="short-text m-none">{item.excerpt}</p>
                      </a>
                    </div>
                  </Cell>
                {/each}
                <Cell spanDevices={{ desktop: 3, phone: 2, tablet: 4 }}>
                  <a href={type.url}>
                    <div
                      class="experience-read-more item-read-more"
                      style="padding-top: calc(410 / 315 * 100%)"
                    >
                      <p class="text-h3 label">
                        See more <i class="material-icons">chevron_right</i>
                      </p>
                    </div>
                  </a>
                </Cell>
              </LayoutGrid>
            </div>
          </div>
          {/if}
        {/each}
      {/if}
    </section>
  </div>
</Layout>
<HeaderActionMobile
  bind:content={contentHeaderActionMobile}
  bind:searchModel
  bind:destination_types={destinationTypes}
  bind:experience_types={experienceTypes}
  bind:countries
  on:close={onSearchSubmit}
/>
<OyNotification />

<style lang="scss">
  $desktop-width: 950px;
  @mixin mobile {
    @media (max-width: #{$desktop-width - 1px}) {
      @content;
    }
  }
  @mixin desktop {
    @media (min-width: #{$desktop-width}) {
      @content;
    }
  }
  .header-title {
    background-color: #f0f7f8;
  }
  .header-title:global(.is_sticky) {
    @include desktop{
      padding-bottom: 55px !important;
    }
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
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    margin: 0;
  }
  .item-read-more .label .material-icons {
    position: relative;
    top: 5px;
  }

  @include mobile {
    .section-title .title:after {
      margin-left: 20px;
    }

    .experience-item .title {
      height: auto;
      overflow: auto;
    }
  }
</style>
