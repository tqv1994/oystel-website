<script lang="ts">
    import {onMount, afterUpdate, beforeUpdate} from 'svelte';
    import LayoutGrid, {Cell, InnerGrid } from '@smui/layout-grid';
    import {goto} from '$app/navigation';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import Select, { Option } from '@smui/select';
    import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
    import Svg from '@smui/common/Svg.svelte';
    import {StringHelper} from '$lib/helpers';
    import Layout from '$lib/components/common/Layout.svelte';
    import { ExperienceTypeModel } from '$lib/models/experience_type';
    import { DestinationTypeModel } from '$lib/models/destination_type';
    import { CountryModel } from '$lib/models/country';
    import { DestinationModel } from '$lib/models/destination';
    import authStore from '$lib/stores/auth';
    import OyNotification from '$lib/components/common/OyNotification.svelte';
    import { BlurhashImage } from 'svelte-blurhash';
    let stringHelper = new StringHelper();
    let searchModel = {
        name: '',
        type: '',
        destination: '',
        country: '',
        sort_by: '',
    };
    let contentHeaderActionMobile = '';
    let configPage = {
        header:{
            page: 'destinations',
            transparent: true,
            theme: 'light',
            currentMenu: 'destinations'
        }
    };
    let experience_types: ExperienceTypeModel[];
    let destination_types: DestinationTypeModel[];
    let countries: CountryModel[];

    onMount(async () => {
      await getData();
    });

    async function getData(){
      const res = await fetch('/api/page/destination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      if (res.ok) {
        const content = await res.json();
        if (content.destination_types) {
          destination_types = [];
          content.destination_types.map((type: any) => {
            let destinations: DestinationModel[] = [];
            if (type.destinations) {
              type.destinations.map((item: any) => {
                destinations.push(new DestinationModel(item));
              });
            }
            type.destinations = destinations;
            destination_types.push(new DestinationTypeModel(type));
          });
        }
        if (content.experience_types) {
          experience_types = [];
          content.experience_types.map((type: any) => {
            experience_types.push(new ExperienceTypeModel(type));
          });
        }
        if (content.countries) {
          countries = [];
          content.countries.map((item: any) => {
            countries.push(new CountryModel(item));
          });
        }
        // authModel = authStore.user;
        // doAfterSignup(user);
        return;
        // return goto('/me').then(auth.signOut);
      }else{
        const error = await res.json();
        if(error.statusCode == 401){
            localStorage.setItem('token','');
            authStore.set({ user: undefined });
            getData();
        }
      }
    }

    async function likeItem(item: DestinationModel, indexType: number){
      const res = await fetch(`/api/destinations/like?id=${item.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
          }),
      });
      if (res.ok) {
        item.liked = !item.liked;
        let index =  destination_types[indexType].destinations.findIndex((itemDetail)=>itemDetail.id == item.id);
        if(index >= 0){
          destination_types[indexType].destinations[index] = item;
        }
      }else{
        const error = await res.json();
        if(error.statusCode == 401){
          if(localStorage.getItem('token') != ''){
            window.pushToast('Your account has expired. Please login to continue using this feature');
          }else{
            window.pushToast('Please login to use this feature');
          }
          localStorage.setItem('token','');
          authStore.set({ user: undefined });
        }
      }
    }

    function onSearchSubmit(){
        let queryString = stringHelper.objectToQueryString(searchModel);
        goto('/destination/search?'+queryString);
    }

    function onScrollFixedHeader(){
        let eleHiddenOnScrolls = document.querySelectorAll('.header-title .hidden-on-sticky');
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").classList.add("fixed");
            document.querySelector('header').style.zIndex = 8;
            document.querySelector('header').style.position = 'relative';
            document.querySelector('.header-title').classList.add('fixed', 'is_sticky');
        } else {
            document.getElementById("header").classList.remove("fixed");
            document.querySelector('header').style.zIndex = 'auto';
            document.querySelector('header').style.position = 'static';
            document.querySelector('.header-title').classList.remove('fixed', 'is_sticky');

        }
    }
</script>
<svelte:window on:load={()=>{onScrollFixedHeader();}} on:resize={()=>{}} on:scroll={()=>{}}/>
<Layout config={configPage} on:refreshPage={()=>{getData()}}>
    <div class="content">
        <section class="header-title d-pt-120 d-pb-95 m-pt-90 m-pb-25 full-width">
            <div class="content-wrap">
                <div class="container m-none">
                    <form
            class="search-form-experiences"
            action="/"
            on:submit|preventDefault={onSearchSubmit}
          >
            <LayoutGrid class="p-0">
              <Cell span="5">
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
                    on:click={onSearchSubmit}
                  >
                    <Option value="" />
                    {#if experience_types}
                      {#each experience_types as item}
                        <Option value={item.title}>{item.title}</Option>
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
                    on:click={onSearchSubmit}
                  >
                    <Option value="" />
                    {#if destination_types}
                      {#each destination_types as item}
                        <Option value={item.title}>{item.title}</Option>
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
                    on:click={onSearchSubmit}
                  >
                    <Option value="" />
                    {#if countries}
                      {#each countries as item}
                        <Option value={item.name}>{item.name}</Option>
                      {/each}
                    {/if}
                  </Select>
                </div>
              </Cell>
              <Cell span="1">
                <div class="form-control">
                  <Select
                    variant="outlined"
                    bind:value={searchModel.sort_by}
                    label="Sort By"
                    on:click={onSearchSubmit}
                  >
                    <Option value="" />
                  </Select>
                </div>
              </Cell>
            </LayoutGrid>
          </form>
                    <LayoutGrid class="p-0 hidden-on-sticky">
                        <Cell span="12">
                            <h1 class="text-center mb-30">Choose Your Destination</h1>
                            <p class="text-center">Bespoke destinations created by our leading tastemakers.</p>
                        </Cell>
                    </LayoutGrid>
                </div>
                <div class="container m-block d-none">
                    <LayoutGrid class="p-0">
                        <Cell span="12">
                            <Button on:click={()=>{contentHeaderActionMobile = 'experience-search'}} style="width: 100%" variant="outlined"><Label>Filter Your Results</Label></Button>
                        </Cell>
                    </LayoutGrid>
                </div>
            </div>
        </section>
        <section class="d-pt-85 d-pb-95 m-pt-50 m-pb-70">
            {#if destination_types && destination_types.length > 0}
                {#each destination_types as type, indexType}
                    <div class="container">
                        <div class="section-title">
                            <LayoutGrid class="p-0">
                                <Cell span="12"><h2 class="text-h1 title {indexType == 0 ?  'mt-0' : ''} d-mb-30">{type.title}</h2></Cell>
                            </LayoutGrid>
                        </div>
                        <div class="section-content">
                            <LayoutGrid class="p-0">
                                {#each type.destinations as  item}
                                    <Cell spanDevices={{ desktop: 3, phone: 2 }}>
                                            <div class="experience-item">
                                                <div class="thumbnail">
                                                  <a href="{item.link}">
                                                    <div class="image-cover" style="padding-top: calc(410 / 315 * 100%)">
                                                      <BlurhashImage 
                                                        src={item.featuredPhotoWithHash.url}
                                                        hash={item.featuredPhotoWithHash.blurHash}
                                                        fadeDuration={1000}
                                                        />
                                                    </div>
                                                  </a>
                                                    <IconButton class="btn-favorite {item.liked ? 'liked' : ''}" on:click={likeItem(item, indexType)}>
                                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                                        </Icon>
                                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                                        </Icon>
                                                    </IconButton>
                                                </div>
                                                <a href={item.link}>
                                                  <LayoutGrid  class="p-0 d-block m-none">
                                                      <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">{item.country_title}</p></Cell>
                                                      <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                                  </LayoutGrid >
                                                  <LayoutGrid  class="p-0 m-block d-none">
                                                      <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">Destination</p></Cell>
                                                  </LayoutGrid >
                                                  <div class="divider"></div>
                                                  <h4 class="text-h2 title">{item.name}</h4>
                                                  <p class="short-text m-none">{item.excerpt}</p>
                                                </a>
                                            </div>
                                    </Cell>
                                {/each}
                                <Cell spanDevices={{ desktop: 3, phone: 2 }}>
                                    <a href="/destination/detail">
                                        <div class="experience-read-more item-read-more" style="padding-top: calc(410 / 315 * 100%)">
                                            <p class="text-h3 label">See more <i class="material-icons">chevron_right</i></p>
                                        </div>
                                    </a>
                                </Cell>
                            </LayoutGrid>
                        </div>
                    </div>
                {/each}
            {/if}
        </section>
    </div>
</Layout>
<OyNotification />
<HeaderActionMobile bind:content={contentHeaderActionMobile}
bind:searchModel
  bind:destination_types
  bind:experience_types
  bind:countries on:close={onSearchSubmit}></HeaderActionMobile>
<style>
    .header-title{
        background-color: #F0F7F8;
    }
    .header-title:global(.is_sticky){
        padding-bottom: 55px !important;
    }
    .search-form-experiences :global(.mdc-layout-grid){
        --mdc-layout-grid-gutter-desktop: 0;
        --mdc-select-idle-line-color: #000;
        --mdc-select-hover-line-color: #000;

    }
    .search-form-experiences :global(.mdc-text-field),
    .search-form-experiences :global(.mdc-select){
        height: 35px;
        width: 100%;
        padding-right: 15px;
    }
    .search-form-experiences :global(.mdc-select.mdc-select--outlined .mdc-select__anchor){
        height: 35px;
    }
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__trailing),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form-experiences :global(.mdc-text-field img){
        filter: brightness(0.1);
    }

    /* Section title */
    .section-title .title{
        position: relative;
        overflow: hidden;
    }
    .section-title .title:after{
        content: "";
        display: inline-block;
        border-top: 1px solid;
        border-color: #000;
        vertical-align: middle;
        width: 100%;
        margin-right: -100%;
        margin-left: 40px;
    }

    .experience-item :global(.mdc-layout-grid){
        --mdc-layout-grid-gutter-desktop: 0;
    }
    .experience-item .divider::after{
        background-color: rgba(0,0,0,0.2);
    }
    .experience-item .title{
        height: 50px;
        overflow: hidden;
    }
    

    .item-read-more{
        background-color: #F0F7F8;
        position: relative;
    }
    .item-read-more .label{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;
        margin: 0;
    }
    .item-read-more .label .material-icons{
        position: relative;
        top: 5px;
    }

    @media screen and (max-width: 599px){
        .section-title .title:after{
            margin-left: 20px;
        }

        .experience-item .title{
            height: 70px;
            overflow: hidden;
        }
    }
</style>