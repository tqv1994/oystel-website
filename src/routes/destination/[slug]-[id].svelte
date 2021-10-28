<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import { goto } from '$app/navigation';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Select, { Option } from '@smui/select';
  import Tab from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import Svg from '@smui/common/Svg.svelte';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Layout from '$lib/components/common/Layout.svelte';
  import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
  import { ExperienceModel } from '$lib/models/experience';
  import { ProductModel } from '$lib/models/product';
  import authStore from '$lib/api/auth/store';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  import { destinationStore, updateDestinationStore } from '$lib/api/destination/store';
  import { Experience } from '$lib/api/experience/type';
  import { stringHelper } from '$lib/helpers';
  import { DestinationPageData, UpdateDestinationData, UpdateExperienceData, UpdateProductData } from '$lib/api/pages/type';
  import { DestinationModel } from '$lib/models/destination'
import { Destination } from '$lib/api/destination/type';
import { productStore, updateProductStore } from '$lib/api/product/store';
import { experienceStore, updateExperienceStore } from '$lib/api/experience/store';
import { Product } from '$lib/api/product/type';
import { User } from '$lib/api/auth/type';

  export const load: Load = async ({ fetch, session, page }) => {
    let id = stringHelper.getSlugId(page.params.id);
    const res = await fetch(`/api/pages/destination/detail?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data: DestinationPageData = await res.json();
      // TODO: Convert data to classes
      updateDestinationStore([data.destination]);
      updateProductStore(data.products);
      updateExperienceStore(data.experiences);
    } else {
      const error = await res.json();
      console.log(error);
    }
    return { props: { id } };
  };
</script>

<script type="ts">

  let configPage = {
    header: {
      page: 'destination-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'destinations',
    },
  };
  let destination: Destination | undefined;
  let experiences: Experience[];
  let products: Product[];
  let tabActive = 'Where to Stay';
  let openProductSlide = false;
  let isMobile = false;
  let productIndex: number;
  export let id: string;
  onMount(async () => {});
  
  productStore.subscribe( ({items})=>{
    products = Object.values( items )
  });

  getData();
  function getData(){
    destinationStore.subscribe( ({items})=>{
      destination = Object.values( items ).find((item: Destination) => item.id === id);
    });
    experienceStore.subscribe(({items})=>{
      experiences = Object.values(items);
    });
  }
  
  // async function getData() {
  //   const res = await fetch('/api/page/destination/detail?id=' + id, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem('token'),
  //     }),
  //   });
  //   if (res.ok) {
  //     const content = await res.json();
  //     if (content.destination) {
  //       destination = new DestinationModel(content.destination);
  //     }
  //     if (content.experiences) {
  //       experiences = [];
  //       content.experiences.map((item: any) => {
  //         experiences.push(new ExperienceModel(item));
  //       });
  //     }
  //     if (content.products) {
  //       products = [];
  //       content.products.map((item: any) => {
  //         products.push(new ProductModel(item));
  //       });
  //     }
  //     // authModel = authStore.user;
  //     // doAfterSignup(user);
  //     return;
  //     // return goto('/me').then(auth.signOut);
  //   } else {
  //     const error = await res.json();
  //     if (error.statusCode == 401) {
  //       localStorage.setItem('token', '');
  //       authStore.set({ user: undefined });
  //       getData();
  //     }
  //   }
  // }
  function onScrollFixedHeader() {
    if (document.documentElement.clientWidth > 949) {
      if (
        document.body.scrollTop > 900 ||
        document.documentElement.scrollTop > 900
      ) {
        document.getElementById('header').classList.add('fixed');
        document.querySelector('header').style.zIndex = 100;
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
  async function likeExperienceItem(experience: Experience){
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
      updateExperienceStore([experience]);
      getData();
    } else {
      const error = await res.json();
    }
  }

  async function likeDestinationItem(destination: Destination){
    if(!$authStore.user){
      window.pushToast('Please login to use this feature');
      return;
    }
    let userDataLikes: (number|string)[] | null = [];
    if(destination.users){
      userDataLikes = destination.users.map((item: User, index)=>{
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
    const res = await fetch(`/api/pages/destination/like?id=${destination.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataLikes)
    });

    if (res.ok) {
      const data: UpdateDestinationData = await res.json();
      destination.users = data.updateDestination.destination.users;
      updateDestinationStore([destination]);
      getData();
    } else {
      const error = await res.json();
    }
  }

  async function likeProductItem(product: Product){
    if(!$authStore.user){
      window.pushToast('Please login to use this feature');
      return;
    }
    let userDataLikes: (number|string)[] | null = [];
    if(product.users){
      userDataLikes = product.users.map((item: User, index)=>{
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
    const res = await fetch(`/api/pages/product/like?id=${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDataLikes)
    });

    if (res.ok) {
      const data: UpdateProductData = await res.json();
      product.users = data.updateProduct.product.users;
      updateProductStore([product]);
      getData();
    } else {
      const error = await res.json();
    }
  }
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<Layout config={configPage} on:refreshPage={()=>{getData()}}>
  {#if destination}
  <div class="content destination-detail">
    <section class="header-title d-pt-115 d-pb-25 m-pt-90 m-pb-25 full-width">
        <div class="content-wrap">
            <div class="container">
                <LayoutGrid class="p-0 hidden-on-sticky">
                    <Cell spanDevices={{ desktop: 7,tablet: 8, phone: 4 }}>
                        <div class="experience-detail-slides">
                            {#if destination.gallery.length > 0}
                            <OyCarousel perPage={{ 800: 1 }} draggable={false}>
                              <span class="control" slot="left-control">
                                <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
                              </span>
                                {#each destination.gallery as item}
                                    <div class="slide-content slide-item" style="background-image:url({item.url})"></div>
                                {/each}
                                <span class="control" slot="right-control">
                                <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                              </span>
                            </OyCarousel>
                            {/if}
                        </div>
                    </Cell>
                    <Cell spanDevices="{{ desktop: 5,tablet: 8, phone: 4 }}">
                        <div class="d-pt-90 d-pb-100">
                            <p class="text-eyebrow m-mb-0">{destination.country?.name}</p>
                            <h1 class="m-mt-30 m-mb-15">{destination.name}</h1>
                            <p class="mb-30 short-description mt-0">{destination.intro}</p>
                            <Button variant="outlined" class="mb-15"><Label>Find My Advisor</Label></Button>
                            <br/>
                            <Button class="m-mb-35" variant="outlined"><Label>What to Pack</Label></Button>
                        </div>
                        <div class="action-buttons m-none">
                            <IconButton >
                                <Icon component="{Svg}" viewBox="0 0 13.246 19.134">
                                    <g id="Icon_-_Share" data-name="Icon - Share" transform="translate(0.5 1.233)">
                                        <path id="Path_318" data-name="Path 318" d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889" transform="translate(-150.699 5872.56)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Path_320" data-name="Path 320" d="M161.543-5862.169v-11.12" transform="translate(-155.42 5873.29)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Line" d="M156.364-5870.5l3.472-3.473,3.472,3.473" transform="translate(-153.713 5873.443)" fill="none" stroke="#000" stroke-width="1"/>
                                    </g>
                                </Icon>
                            </IconButton>
                            <IconButton class="btn-favorite {destination.liked ? 'liked' : ''}" on:click={likeDestinationItem(destination)}>
                              <Icon class="like" component={Svg} viewBox="0 0 16.249 14.588">
                                <g
                                  data-name="Icon - Heart"
                                  transform="translate(0.125 0.125)"
                                >
                                  <path
                                    id="Heart_Off"
                                    data-name="Heart Off"
                                    d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                                    transform="translate(0.001)"
                                    stroke="#f0f7f8"
                                    stroke-width="0.25"
                                    fill-rule="evenodd"
                                  />
                                </g>
                              </Icon>
                              <Icon class="liked" component={Svg} viewBox="0 0 16.249 14.588">
                                <path
                                    d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                                    transform="translate(0)"
                                    fill="#000"
                                    fill-rule="evenodd"
                                  />
                              </Icon>
                            </IconButton>
                        </div>
                    </Cell>
                </LayoutGrid>
                <LayoutGrid class="p-0 show-on-sticky m-none">
                    <Cell spanDevices={{desktop: 7, tablet: 4}}><div>
                        <span class="text-eyebrow" >{destination.country?.name}</span>
                            <IconButton >
                                <Icon component="{Svg}" viewBox="0 0 13.246 19.134">
                                    <g id="Icon_-_Share" data-name="Icon - Share" transform="translate(0.5 1.233)">
                                        <path id="Path_318" data-name="Path 318" d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889" transform="translate(-150.699 5872.56)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Path_320" data-name="Path 320" d="M161.543-5862.169v-11.12" transform="translate(-155.42 5873.29)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Line" d="M156.364-5870.5l3.472-3.473,3.472,3.473" transform="translate(-153.713 5873.443)" fill="none" stroke="#000" stroke-width="1"/>
                                    </g>
                                </Icon>
                            </IconButton>
                            <IconButton class="btn-favorite {destination.liked ? 'liked' : ''}" on:click={likeDestinationItem(destination)}>
                              <Icon class="like" component={Svg} viewBox="0 0 16.249 14.588">
                                <g
                                  data-name="Icon - Heart"
                                  transform="translate(0.125 0.125)"
                                >
                                  <path
                                    id="Heart_Off"
                                    data-name="Heart Off"
                                    d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                                    transform="translate(0.001)"
                                    stroke="#f0f7f8"
                                    stroke-width="0.25"
                                    fill-rule="evenodd"
                                  />
                                </g>
                              </Icon>
                              <Icon class="liked" component={Svg} viewBox="0 0 16.249 14.588">
                                <path
                                    d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                                    transform="translate(0)"
                                    fill="#000"
                                    fill-rule="evenodd"
                                  />
                              </Icon>
                            </IconButton>
                    </div>
                        <h1 class="mb-0 mt-40">{destination.name}</h1>
                    </Cell>
                    <Cell spanDevices={{desktop: 5, tablet: 4}} class="text-right">
                        <div class="mt-100">
                            <Button variant="outlined" ><Label>Find My Advisor</Label></Button>
                            <Button variant="outlined"><Label>What to Pack</Label></Button>
                        </div>
                    </Cell>
                </LayoutGrid>
            </div>
        </div>
    </section>
    <section class="d-pt-90 d-pb-65 m-pt-40 m-pb-40" id="advisors-section">
        <div class="container">
            <div class="section-title d-mb-65 m-mb-40">
                <LayoutGrid class="p-0 m-none">
                    <Cell spanDevices={{desktop: 6, tablet: 8, phone: 4}}>
                        <TabBar tabs={['Where to Stay', 'Where to Dine & Drink', 'Where to Explore']} let:tab bind:active={tabActive}>
                            <!-- Note: the `tab` property is required! -->
                            <Tab {tab}>
                                <Label>{tab}</Label>
                            </Tab>
                        </TabBar>
                    </Cell>
                    <Cell spanDevices={{desktop: 6, tablet: 8, phone: 4}} class="text-right m-none">
                        <Button variant="outlined"><Label>Find My Advisor</Label></Button>
                    </Cell>
                </LayoutGrid>
                <div class="d-none m-block text-center">
                    <Select
                            bind:value={tabActive}
                            label=""
                    >
                        <Option value="Where to Stay" >Where to Stay</Option>
                        <Option value="Where to Dine & Drink">Where to Dine & Drink</Option>
                        <Option value="Where to Explore">Where to Explore</Option>
                    </Select>
                </div>
            </div>
            <div class="section-content">
                {#if (tabActive == 'Where to Stay')}
                    <LayoutGrid class="p-0 ">
                        <Cell spanDevices={{desktop: 3, tablet: 4, phone: 2}}>
                            <a href="#">
                                <div class="item-advisor">
                                    <div class="thumbnail">
                                        <div class="image-cover" style="padding-top: calc( 410 / 315 * 100% );">
                                            <BlurhashImage src="/img/experiences/advisor-1.jpg" fadeDuration={1000}/>
                                        </div>
                                    </div>
                                    <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop: 3, tablet: 4, phone: 2}}>
                            <a href="#">
                                <div class="item-advisor">
                                    <div class="thumbnail">
                                        <div class="image-cover" style="padding-top: calc( 410 / 315 * 100% );">
                                            <BlurhashImage src="/img/experiences/advisor-2.jpg"/>
                                        </div>
                                    </div>
                                    <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop: 3,tablet: 4, phone: 2}}>
                            <a href="#">
                                <div class="item-advisor">
                                    <div class="thumbnail">
                                        <div class="image-cover" style="padding-top: calc( 410 / 315 * 100% );">
                                            <BlurhashImage src="/img/experiences/advisor-3.jpg"/>
                                        </div>
                                    </div>
                                    <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop: 3,tablet: 4, phone: 2}}>
                            <a href="#">
                                <div class="item-advisor">
                                    <div class="thumbnail">
                                        <div class="image-cover" style="padding-top: calc( 410 / 315 * 100% );">
                                            <BlurhashImage src="/img/experiences/advisor-3.jpg"/>
                                        </div>
                                    </div>
                                    <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                </div>
                            </a>
                        </Cell>
                    </LayoutGrid>
                {/if}
            </div>
        </div>
    </section>
    <div class="container">
        <LayoutGrid class="p-0">
            <Cell span="12"><div class="divider"></div></Cell>
        </LayoutGrid>
    </div>
    <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-10">
        <div class="container">
            <LayoutGrid class="p-0">
                <Cell spanDevices={{desktop: 5,tablet: 8, phone: 4}}>
                    <h1 class="mt-0 m-mb-0">{destination.name}</h1>
                </Cell>
                <Cell spanDevices={{desktop: 7,tablet: 8, phone: 4}}>
                    <p class="mt-5">{@html destination.description}</p>
                </Cell>
            </LayoutGrid>
        </div>
    </section>
    <section class="pt-40" id="shop-by-look-section">
        <div class="container">
            <LayoutGrid class="p-0 pb-30">
                <Cell span="12"><h1 class="mt-0 mb-0">Shop By Look</h1></Cell>
            </LayoutGrid>
            <LayoutGrid class="p-0">
                <Cell spanDevices={{desktop: 6,tablet: 8, phone: 4}}>
                    <div class="item-product">
                        <div class="thumbnail">
                            <div class="image-cover" style="padding-top: calc( 142 / 165 * 100% );">
                                <BlurhashImage src="/img/experiences/product-1.jpg"/>
                            </div>
                        </div>
                        <div class="title-wrap">
                            <h5>Get the Look</h5>
                            <IconButton>
                                <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                    <g data-name="Group 397" transform="translate(0)">
                                        <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                    </g>
                                </Icon>
                            </IconButton>
                            <div class="divider"></div>
                        </div>
                    </div>
                </Cell>
                <Cell spanDevices={{desktop: 6,tablet: 8, phone: 4}}>
                    <LayoutGrid class="p-0">
                        <Cell spanDevices={{desktop: 6,tablet: 8, phone: 4}}>
                            <div class="item-product">
                                <div class="thumbnail">
                                    <div class="image-cover" style="padding-top: calc( 58 / 45 * 100% );">
                                        <BlurhashImage src="/img/experiences/product-2.jpg"/>
                                    </div>
                                </div>
                                <div class="title-wrap">
                                    <h5>Get the Look</h5>
                                    <IconButton>
                                        <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                            <g data-name="Group 397" transform="translate(0)">
                                                <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                                <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                            </g>
                                        </Icon>
                                    </IconButton>
                                    <div class="divider"></div>
                                </div>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 6,tablet: 8, phone: 4}}>
                            <div class="item-product">
                                <div class="thumbnail">
                                    <div class="image-cover" style="padding-top: calc( 58 / 45 * 100% );">
                                        <BlurhashImage src="/img/experiences/product-3.jpg"/>
                                    </div>
                                </div>
                                <div class="title-wrap">
                                    <h5>Get the Look</h5>
                                    <IconButton>
                                        <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                            <g data-name="Group 397" transform="translate(0)">
                                                <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                                <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                            </g>
                                        </Icon>
                                    </IconButton>
                                    <div class="divider"></div>
                                </div>
                            </div>
                        </Cell>
                    </LayoutGrid>
                </Cell>
            </LayoutGrid>
        </div>
    </section>
    <section class="d-pt-55 m-pt-40">
        <div class="container">
            <h1 class="mt-0">What to Pack</h1>
            <div class="products-list">
                <LayoutGrid class="p-0">
                  {#each products as item, i}
                  <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
                    <div
                      on:click={() => {
                        openProductSlide = true;
                        productIndex = i;
                      }}
                      class="item-product"
                    >
                      <div
                        class="thumbnail"
                        style="background-image: url({item.gallery[0]?.url})"
                      >
                        <IconButton class="btn-favorite {item.liked ? 'liked' : ''}" on:click={likeProductItem(item)}>
                          <Icon class="like" component={Svg} viewBox="-4 -4 24 24">
                            <path
                              d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009"
                              transform="translate(0.001)"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </Icon>
                          <Icon class="liked" component={Svg} viewBox="-4 -4 24 24">
                            <path
                              d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                              transform="translate(0)"
                              fill="#fff"
                              fill-rule="evenodd"
                            />
                          </Icon>
                        </IconButton>
                      </div>
                      <p class="text-eyebrow mt-25">{item.brand}</p>
                      <h3>{item.name}</h3>
                    </div>
                  </Cell>
                  {/each}
                </LayoutGrid>
              </div>
        </div>
    </section>
    <section class="d-pt-80 d-pb-100 m-pt-40 m-pb-85">
        <div class="container">
            <h1 class="mt-0 d-mb-80 m-mb-35">Where to Experience</h1>
            {#if experiences && experiences.length > 0}
            <div class="experiences-list">
                <LayoutGrid class="p-0">
                    {#each experiences as item}
                    <Cell spanDevices={{desktop:3, phone: 2, tablet: 4}}>
                            <div class="experience-item">
                                <div class="thumbnail">
                                  <a href={item.url}>
                                    <div class="image-cover" style="padding-top: calc(410 / 315 * 100%)">
                                        <BlurhashImage src={item.gallery[0]?.url} hash={item.gallery[0]?.blurHash} />
                                    </div>
                                  </a>
                                    <IconButton class="btn-favorite {item.liked ? 'liked' : ''}" on:click={likeExperienceItem(item)}>
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <a href={item.url}>
                                  <LayoutGrid class="p-0 m-none">
                                      <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">{item.country ? item.country.name : "Country"}</p></Cell>
                                      <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-right">Experience</p></Cell>
                                  </LayoutGrid>
                                  <LayoutGrid class="p-0 d-none m-block">
                                      <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left mt-20 mb-20">Experience</p></Cell>
                                  </LayoutGrid>
                                </a>
                                <div class="divider"></div>
                                <h4 class="text-h2 title mt-30">{item.name}</h4>
                                <p class="short-text m-none">{item.intro}</p>
                            </div>
                    </Cell>
                    {/each}
                </LayoutGrid>
            </div>
            {/if}
        </div>
    </section>
</div>
{/if}
</Layout>
<ProductSliderModal
  bind:open={openProductSlide}
  {products}
  bind:active={productIndex}>no content</ProductSliderModal
>
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
  :global(.show-on-sticky) {
    display: none;
  }
  :global(.is_sticky .show-on-sticky) {
    display: block;
  }
  .content :global(.mdc-button) {
    width: 220px;
  }
  :global(.destination-detail .header-title  .btn-favorite){
    position: relative;
    :global(.like){
      display: block;
    }
    :global(.liked){
      display: none;
    }
    &:hover{
      :global(.like){
        display: none;
      }
      :global(.liked){
        display: block;
      }
    }
  }
  :global(.destination-detail .header-title  .btn-favorite.liked){
    :global(.liked){
        display: block;
      }
      :global(.like){
        display: none;
      }
  }

  /* Header title */
  .header-title {
    background-color: #f0f7f8;
  }
  .experience-detail-slides {
    height: 100%;
    width: 100%;
    --wrap-width: 100%;
  }

  .experience-detail-slides :global(.dots) {
    display: none;
  }

  .experience-detail-slides :global(.carousel),
  .experience-detail-slides :global(.slides),
  .experience-detail-slides :global(.slides div) {
    height: 100%;
  }
  .experience-detail-slides :global(.slide-item) {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .header-title .action-buttons {
    position: absolute;
    top: 85px;
    right: 100px;
  }
  .header-title .short-description {
    width: 80%;
  }

  .section-title :global(.mdc-tab) {
    padding: 0;
    margin-right: 30px;
  }
  .section-title :global(.mdc-tab .mdc-tab__content) {
    width: 100%;
    justify-content: left;
  }

  /* Advisors */
  #advisors-section{
    @include mobile{
    --mdc-typography-headline2-font-size: 14px;
    --mdc-typography-headline2-line-height: 18px;
    }
    .item-advisor .title {
      @include desktop{
      }
    }
  }
  
  #shop-by-look-section{
    --mdc-typography-headline5-font-size: 14px;
    --mdc-typography-headline5-line-height: 22px;
    /* Products */
    .item-product .title-wrap {
      position: relative;
    }
    .item-product .title-wrap :global(.mdc-icon-button) {
      position: absolute;
      top: 20%;
      right: 0;
      transform: translateY(-50%);
    }

    .item-product .title-wrap .divider:after {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .products-list :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
    padding-bottom: 60px;
    @include mobile{
      padding-bottom: 40px;
    }
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
    height: 10px;
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
    background-color: #5078BC;
  }

  :global(.products-list .item-product){
    @include mobile{
      h3{
        --mdc-typography-headline3-font-size: 14px;
      }
    }
  }

  .products-list :global(.item-product .thumbnail) {
    width: 100%;
    padding-bottom: 145%;
    background-color: #f2f2f2;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }

  .products-list :global(.item-product .thumbnail .btn-favorite) {
    filter: brightness(0);
  }
  @media (min-width: 1240px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)), 1fr)
      );
    }
  }
  @media (max-width: 1239px) and (min-width: 905px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)), 1fr)
      );
    }
  }
  @media (max-width: 904px) and (min-width: 600px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
  }
  @media (max-width: 599px) {
    .products-list :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
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
    @include mobile{
      height: auto;
      overflow: auto;
    }
  }

  :global(.is_sticky.header-title) {
    padding-bottom: 50px !important;
  }

  .divider:after {
    background-color: #000;
  }


  @media screen and (max-width: 949px) {
    .experience-detail-slides :global(.carousel),
    .experience-detail-slides :global(.slides),
    .experience-detail-slides :global(.slides div) {
      height: auto;
    }
    .experience-detail-slides :global(.slide-item) {
      padding-top: 70%;
    }
    .header-title .short-description {
      width: 100%;
    }
    .experience-detail-slides :global(.wrap-control) {
      display: none;
    }
    .experience-detail-slides {
      margin-bottom: 20px;
    }
    .experience-detail-slides :global(.dots) {
      display: flex;
      justify-content: start;
      margin-top: 20px;
      filter: brightness(0);
    }
    .item-advisor .title {
      height: 50px;
    }
    .products-list :global(.mdc-layout-grid__inner) {
      margin-bottom: 10px;
    }
  }
  /*@media  (max-width: 1239px){*/
  /*    :global(.fixed, .is_sticky){*/
  /*        position: static !important;*/
  /*    }*/
  /*}*/
</style>
