<script context="module">
  export async function load({ page, session }) {
    let stringHelper = new StringHelper();
    let id = stringHelper.getSlugId(page.params.id);
    
    return { props: {id} };
    // const url = `api/v1/users/${page.params.slug}`;
    // const { response, json } = await api.get(session.API_ENDPOINT, url);
    // if (response.status === 200) {
    // return {
    //     props: {
    //     localUser: json.data,
    //     },
    // };
    // } else {
    // return { props: { localUser: [] } };
    // }
  }
</script>

<script type="ts">
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
  import { StringHelper } from '$lib/helpers';
  import { ExperienceModel } from '$lib/models/experience';
  import { ProductModel } from '$lib/models/product';
  import authStore from '$lib/stores/auth';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  
  let configPage = {
    header: {
      page: 'experience-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };
  let experience: ExperienceModel;
  let myFavorites: ExperienceModel[];
  let products: ProductModel[];
  let tabActive = 'Where to Stay';
  let openProductSlide = false;
  let isMobile = false;
  let productIndex: number;
  export let id: string;
  onMount(async() => {
    await getData();
  });

  async function getData(){
    const res = await fetch('/api/page/experience/detail?id='+id, {
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
      if(content.experience){
        experience = new ExperienceModel(content.experience);
      }
      if(content.myFavorites){
        myFavorites = [];
        content.myFavorites.map((item: any)=>{
          myFavorites.push(new ExperienceModel(item));
        });
      }
      if(content.products){
        products = [];
        content.products.map((item: any)=>{
          products.push(new ProductModel(item));
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

  async function likeExperience(item: ExperienceModel){
    const res = await fetch(`/api/experiences/like?id=${item.id}`, {
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
      experience = item;
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

  function onScrollFixedHeader() {
    if (document.documentElement.clientWidth > 839) {
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
        document.querySelector('header').style.position = 'static';
        document
          .querySelector('.header-title')
          .classList.remove('fixed', 'is_sticky');
      }
    }
  }
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<Layout config={configPage} on:refreshPage={getData}>
    {#if experience}
  <div class="content experience-detail">
    <section class="header-title d-pt-90 d-pb-25 m-pt-90 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container">
          <LayoutGrid class="p-0 hidden-on-sticky">
            <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
              <div class="experience-detail-image">

                <div
                  class="thumbnail image-cover"
                  style="background-image: url({experience.featuredPhoto})"
                >
                  <BlurhashImage src={experience.featuredPhotoWithHash.url} hash={experience.featuredPhotoWithHash.blurHash} fadeDuration="1000"/>
                </div>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
              <div class="d-pt-90 d-pb-100">
                <p class="text-eyebrow">Experience Country</p>
                <h1>{experience.title}</h1>
                <p class="mb-30 short-description">{experience.intro}</p>
                <Button variant="outlined" class="mb-15"
                  ><Label>Find My Advisor</Label></Button
                >
                <br />
                <Button variant="outlined"><Label>What to Pack</Label></Button>
              </div>
              <div class="action-buttons m-none">
                <IconButton>
                  <Icon component={Svg} viewBox="0 0 13.246 19.134">
                    <g
                      id="Icon_-_Share"
                      data-name="Icon - Share"
                      transform="translate(0.5 1.233)"
                    >
                      <path
                        id="Path_318"
                        data-name="Path 318"
                        d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                        transform="translate(-150.699 5872.56)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_320"
                        data-name="Path 320"
                        d="M161.543-5862.169v-11.12"
                        transform="translate(-155.42 5873.29)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Line"
                        d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                        transform="translate(-153.713 5873.443)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                  </Icon>
                </IconButton>
                <IconButton class="btn-favorite {experience.liked ? 'liked' : ''}" on:click={likeExperience(experience)}>
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
            <Cell spanDevices={{ desktop: 7 }}
              ><div>
                <span class="text-eyebrow">Destination Country</span>
                <IconButton>
                  <Icon component={Svg} viewBox="0 0 13.246 19.134">
                    <g
                      id="Icon_-_Share"
                      data-name="Icon - Share"
                      transform="translate(0.5 1.233)"
                    >
                      <path
                        id="Path_318"
                        data-name="Path 318"
                        d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                        transform="translate(-150.699 5872.56)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_320"
                        data-name="Path 320"
                        d="M161.543-5862.169v-11.12"
                        transform="translate(-155.42 5873.29)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Line"
                        d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                        transform="translate(-153.713 5873.443)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                  </Icon>
                </IconButton>
                <IconButton class="btn-favorite {experience.liked ? 'liked' : ''}" on:click={likeExperience(experience)}>
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
              <h1 class="mb-0 mt-40">{experience.title}</h1>
            </Cell>
            <Cell spanDevices={{ desktop: 5 }} class="text-right">
              <div class="mt-100">
                <Button variant="outlined"
                  ><Label>Find My Advisor</Label></Button
                >
                <Button variant="outlined"><Label>What to Pack</Label></Button>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
    <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-35 detail-content">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}>
            {#each experience.bodySection as section, i}
            <div>{@html section}</div>
            {#if experience.imageUrlWithHashs[i+i]}
            <LayoutGrid class="p-0 d-pt-60 d-pb-40">
              <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
                <div class="thumbnail">
                  <div class="image-cover" style="padding-top: calc(636 / 493 * 100%);">
                    <BlurhashImage src="{experience.imageUrlWithHashs[i+i].url}" hash={experience.imageUrlWithHashs[i+i].blurHash} alt="" />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                  do.
                </p>
              </Cell>
              {#if experience.imageUrlWithHashs[i+i+1]}
              <Cell
                spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
                class="m-none"
              >
                <div class="thumbnail">
                  <div class="image-cover" style="padding-top: calc(447 / 344 * 100%);">
                    <BlurhashImage src="{experience.imageUrlWithHashs[i+i+1].url}" hash={experience.imageUrlWithHashs[i+i+1].blurHash} alt="" />
                  </div>
                </div>
                <p>
                  Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                  do.
                </p>
              </Cell>
              {/if}
            </LayoutGrid>
            {/if}
            {#if experience.getImagesUrl()[i+i+1]}
            <div class="d-none m-block m-pt-80 m-pb-10">
                <div class="thumbnail">
                  <img src="{experience.getImagesUrl()[i+i+1]}" alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed do.
                </p>
              </div>
            {/if}
            {/each}
            
          </Cell>
          <Cell
            spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}
            class="m-none"
          >
            <h1 class="mt-0 mb-40">My Favorites Places</h1>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                {#each myFavorites as item}
                <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                    <div class="experience-item">
                      <div class="thumbnail">
                        <a href="{item.link}">
                          <div  class="image-cover" style="padding-top: calc(499 / 383 * 100%)">
                            <BlurhashImage src="{item.featuredPhotoWithHash.url}" hash={item.featuredPhotoWithHash.blurHash} fadeDuration="1000" alt="" />
                          </div>
                        </a>
                        <IconButton class="btn-favorite {item.liked ? 'liked' : ''}">
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
                      <a href={item.link}>
                        <InnerGrid class="p-0">
                          <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-left">{item.country_title}</p></Cell
                          >
                          <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-right">
                              Experience
                            </p></Cell
                          >
                        </InnerGrid>
                        <div class="divider" />
                        <h4 class="text-h2 title">{item.title}</h4>
                        <p class="short-text m-none">
                          {item.excerpt}
                        </p>
                      </a>
                    </div>
                </Cell>
                {/each}
              </LayoutGrid>
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="pt-40">
      <div class="container">
        <LayoutGrid class="p-0 pb-30">
          <Cell span="12"><h1 class="mt-0 mb-0">Shop By Look</h1></Cell>
        </LayoutGrid>
        <LayoutGrid class="p-0">
          <Cell spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}>
            <div class="item-product">
              <div class="thumbnail">
                <div class="image-cover" style="padding-top: calc(568 / 660 * 100%)">
                  <BlurhashImage src="/img/experiences/product-1.jpg" alt="" fadeDuration="1000" />
                </div>
              <div class="title-wrap">
                <h5>Get the Look</h5>
                <IconButton>
                  <Icon component={Svg} viewBox="0 0 16.583 16.583">
                    <g data-name="Group 397" transform="translate(0)">
                      <path
                        id="Path_310"
                        data-name="Path 310"
                        d="M9145.428-3682.169v16.583"
                        transform="translate(-9137.136 3682.169)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_311"
                        data-name="Path 311"
                        d="M0,0V16.583"
                        transform="translate(16.583 8.292) rotate(90)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                  </Icon>
                </IconButton>
                <div class="divider" />
              </div>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}>
            <LayoutGrid class="p-0">
              <Cell spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}>
                <div class="item-product">
                  <div class="thumbnail">
                    <div class="image-cover" style="padding-top: calc(58 / 45 * 100%)">
                      <BlurhashImage src="/img/experiences/product-2.jpg" alt="" fadeDuration="1000" />
                    </div>
                  </div>
                  <div class="title-wrap">
                    <h5>Get the Look</h5>
                    <IconButton>
                      <Icon component={Svg} viewBox="0 0 16.583 16.583">
                        <g data-name="Group 397" transform="translate(0)">
                          <path
                            id="Path_310"
                            data-name="Path 310"
                            d="M9145.428-3682.169v16.583"
                            transform="translate(-9137.136 3682.169)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <path
                            id="Path_311"
                            data-name="Path 311"
                            d="M0,0V16.583"
                            transform="translate(16.583 8.292) rotate(90)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </g>
                      </Icon>
                    </IconButton>
                    <div class="divider" />
                  </div>
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 6, phone: 4, tablet: 8 }}>
                <div class="item-product">
                  <div class="thumbnail">
                    <div class="image-cover" style="padding-top: calc(58 / 45 * 100%)">
                      <BlurhashImage src="/img/experiences/product-3.jpg"  alt="" fadeDuration="1000" />
                    </div>
                  </div>
                  <div class="title-wrap">
                    <h5>Get the Look</h5>
                    <IconButton>
                      <Icon component={Svg} viewBox="0 0 16.583 16.583">
                        <g data-name="Group 397" transform="translate(0)">
                          <path
                            id="Path_310"
                            data-name="Path 310"
                            d="M9145.428-3682.169v16.583"
                            transform="translate(-9137.136 3682.169)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <path
                            id="Path_311"
                            data-name="Path 311"
                            d="M0,0V16.583"
                            transform="translate(16.583 8.292) rotate(90)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </g>
                      </Icon>
                    </IconButton>
                    <div class="divider" />
                  </div>
                </div>
              </Cell>
            </LayoutGrid>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="d-pt-55 d-pb-95 m-pt-40">
      <div class="container">
        <h1 class="mt-0">What to Pack</h1>
        <div class="products-list">
          <LayoutGrid class="p-0">
            {#each products as item, i}
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                on:click={() => {
                  openProductSlide = true;
                  console.log('productIndex',i);
                  productIndex = i;
                }}
                class="item-product"
              >
                <div
                  class="thumbnail"
                  style="background-image: url({item.featuredPhoto})"
                >
                  <IconButton class="btn-favorite">
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
                <h3>{item.title}</h3>
              </div>
            </Cell>
            {/each}
          </LayoutGrid>
        </div>
      </div>
    </section>
    <section class="t-pt-80 t-pb-100 m-pt-0 m-pb-85 d-none m-block">
      <div class="container">
        <h1 class="mt-0 d-mb-80 m-mb-35">My Favorite Places</h1>
        <div class="experiences-list">
          <LayoutGrid class="p-0">
            {#each myFavorites as item}
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
                <div class="experience-item">
                  <div class="thumbnail">
                    <a href={item.link} >
                      <div  class="image-cover" style="padding-top: calc(470 / 361 * 100%)">
                        <BlurhashImage src="{item.featuredPhotoWithHash.url}" hash={item.featuredPhotoWithHash.blurHash} fadeDuration="1000"  alt="" />
                      </div>
                    </a>
                    <IconButton class="btn-favorite {item.liked ? 'liked' : ''}">
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
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-left">{item.country_title}</p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-right">Experience</p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title">
                    {item.title}
                  </h4>
                  <p class="short-text m-none">
                    {item.excerpt}
                  </p>
                </div>
            </Cell>
            {/each}
          </LayoutGrid>
        </div>
      </div>
    </section>
  </div>
  {/if}
</Layout>
<ProductSliderModal bind:open={openProductSlide} products={products} bind:active={productIndex}>no content</ProductSliderModal>
<OyNotification />
<style lang="scss">
  :global(.show-on-sticky) {
    display: none;
  }
  :global(.is_sticky .show-on-sticky) {
    display: block;
  }
  .content :global(.mdc-button) {
    width: 220px;
  }
  /* Header title */
  .header-title {
    background-color: #f0f7f8;
  }

  :global(.experience-detail .header-title  .btn-favorite){
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
  :global(.experience-detail .header-title  .btn-favorite.liked){
    :global(.liked){
        display: block;
      }
      :global(.like){
        display: none;
      }
  }

  .experience-detail-image {
    width: 100%;
    height: 100%;
  }
  .experience-detail-image .thumbnail {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
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

  .detail-content .container > :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 100px;
  }

  .detail-content .container :global(.mdc-layout-grid .mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 30px;
  }

  /* Products */
  .item-product .title-wrap {
    position: relative;
  }
  .item-product .title-wrap :global(.mdc-icon-button) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .item-product .title-wrap .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .products-list :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
    padding-bottom: 80px;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track) {
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar) {
    height: 10px;
    background-color: #d3d3d3;
  }
  .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
    background-color: #91421c;
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

  .products-list :global(.item-product .thumbnail) {
    width: 100%;
    padding-bottom: 145%;
    background-color: #f2f2f2;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }

  .products-list :global(.item-product .thumbnail .btn-favorite) {
    position: absolute;
    top: 5%;
    right: 2%;
    filter: brightness(0);
  }
  .products-list :global(.item-product .thumbnail .btn-favorite .like) {
    display: block;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite .liked) {
    display: none;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite:hover .like) {
    display: none;
  }
  .products-list :global(.item-product .thumbnail .btn-favorite:hover .liked) {
    display: block;
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
  .experience-item .thumbnail :global(.btn-favorite) {
    position: absolute;
    top: 2%;
    right: 2%;
  }
  
  :global(.is_sticky.header-title) {
    padding-bottom: 50px !important;
  }

  .divider:after {
    background-color: #000;
  }

  .content :global(.mdc-icon-button) {
    margin-top: -15px;
  }

  @media screen and (max-width: 839px) {
    .experience-detail-image {
      position: relative;
      width: 100%;
      padding-bottom: 65.625%;
      height: auto;
    }
    .experience-detail-image .thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .products-list :global(.mdc-layout-grid__inner) {
      margin-bottom: 45px;
    }
  }
</style>
