<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import Layout from '$lib/components/common/Layout.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Exhibitable, insertToStore } from '$lib/store/types';
  import { get } from 'svelte/store';
  import { parseId } from '$lib/utils/fetch';
  import { Experience, experienceStore } from '$lib/store/experience';
  import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
  import { makeLink } from '$lib/utils/link';
  import ProductShow from '$lib/components/product-show.svelte';
  import LookShow from '$lib/components/look-show.svelte';
  import { authStore } from '$lib/store/auth';

  export const load: Load = async ({ fetch, page }) => {
    const id = parseId(page.params.slug);
    if (get(experienceStore).items[id]) {
      return {
        props: { id },
      };
    }

    const res = await fetch(`/experience/${id}.json`);
    if (res.ok) {
      const data: Experience = await res.json();
      insertToStore(experienceStore, [data]);
      return { props: { id } };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script type="ts">
  let configPage = {
    header: {
      page: 'experience-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };
  export let id: string;
  let experience: Experience;
  let productSliderOpen: boolean;
  let activeProduct: number;
  let experiences: Experience[];

  if ($authStore.user) {
    experiences = $authStore.user.experienceLikes || [];
  }

  experienceStore.subscribe((store) => {
    experience = store.items[id];
    if (!experience) {
      return;
    }
  });

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
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedHeader();
  }}
/>
<Layout config={configPage}>
  {#if experience}
    <div class="content experience-detail">
      <section class="header-title d-pt-115 d-pb-25 m-pt-90 m-pb-60 full-width">
        <div class="content-wrap">
          <div class="container">
            <LayoutGrid class="p-0 hidden-on-sticky">
              <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
                <div class="experience-detail-image">
                  <div
                    class="thumbnail"
                    style={`background-image: url(${experience?.gallery[0].url})`}
                  />
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
                <div class="d-pt-90 m-pt-45 d-pb-100">
                  <p class="text-eyebrow m-m-0">{experience?.country.name}</p>
                  <h1 class="m-mt-30 m-mb-15">{experience?.name}</h1>
                  <p class="mb-30 short-description m-mt-0">
                    {experience.intro ? experience.intro : ''}
                  </p>
                  <Button variant="outlined" class="mb-15"
                    ><Label>Find My Advisor</Label></Button
                  >
                  <br />
                  <Button variant="outlined"><Label>What to Pack</Label></Button
                  >
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
                  <IconButton
                    class="btn-favorite {experience.liked ? 'liked' : ''}"
                    on:click={likeExperienceItem(experience)}
                  >
                    <Icon
                      class="like"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
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
                    <Icon
                      class="liked"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
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
              <Cell spanDevices={{ desktop: 8 }}
                ><div>
                  <span class="text-eyebrow">{experience.country?.name}</span>
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
                  <IconButton
                    class="btn-favorite {experience.liked ? 'liked' : ''}"
                    on:click={likeExperienceItem(experience)}
                  >
                    <Icon
                      class="like"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
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
                    <Icon
                      class="liked"
                      component={Svg}
                      viewBox="0 0 16.249 14.588"
                    >
                      <path
                        d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                        transform="translate(0)"
                        fill="#000"
                        fill-rule="evenodd"
                      />
                    </Icon>
                  </IconButton>
                </div>
                <h1 class="mb-0 mt-40">{experience?.name}</h1>
              </Cell>
              <Cell spanDevices={{ desktop: 4 }} class="text-right">
                <div class="mt-100">
                  <Button variant="outlined" class="d-mr-20"
                    ><Label>Find My Advisor</Label></Button
                  >
                  <Button variant="outlined"><Label>What to Pack</Label></Button
                  >
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
              <div>{@html experience.description}</div>
            </Cell>
            <Cell
              spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}
              class="m-none"
            >
              <h1 class="mt-0 mb-40">My Favorites Places</h1>
              <div class="experiences-list">
                <LayoutGrid class="p-0">
                  {#each experience.destinations || [] as item}
                    <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                      <div class="experience-item">
                        <div class="thumbnail">
                          <a href={makeLink('/destination', item)}>
                            <div
                              class="image-cover"
                              style="padding-top: calc(499 / 383 * 100%)"
                            >
                              <BlurImage data={item.gallery[0]} />
                            </div>
                          </a>
                          <IconButton
                            class="btn-favorite {item.liked ? 'liked' : ''}"
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
                        <a href={makeLink('/destination', item)}>
                          <InnerGrid class="p-0">
                            <Cell
                              spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                              ><p class="text-eyebrow text-left">
                                {item.country ? item.country.name : 'Country'}
                              </p></Cell
                            >
                            <Cell
                              spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                              ><p class="text-eyebrow text-right">
                                Experience
                              </p></Cell
                            >
                          </InnerGrid>
                          <div class="divider" />
                          <h4 class="text-h2 title">{item.name}</h4>
                          <p class="short-text m-none">
                            {item.intro}
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
      {#if experience.looks && experience.looks.length}
        <LookShow title="Shop by look" items={experience.looks} />
      {/if}
      {#if experience.pack?.length}
        <ProductShow title="What to pack" items={experience.pack} />
      {/if}
      {#if experience.destinations?.length}
        <section class="t-pt-80 t-pb-100 m-pt-0 m-pb-85 d-none m-block">
          <div class="container">
            <h1 class="mt-0 d-mb-80 m-mb-35">My Favorite Places</h1>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                {#each experience.destinations as item}
                  <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
                    <div class="experience-item">
                      <div class="thumbnail">
                        <a href={makeLink('/destination', item)}>
                          <div
                            class="image-cover"
                            style="padding-top: calc(499 / 383 * 100%)"
                          >
                            <BlurImage data={item.gallery[0]} />
                          </div>
                        </a>
                        <IconButton
                          class="btn-favorite {item.liked ? 'liked' : ''}"
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
                      <a href={makeLink('/destination', item)}>
                        <InnerGrid class="p-0 m-none">
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-left">
                              {item.country ? item.country.name : 'Country'}
                            </p></Cell
                          >
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-right">
                              Experience
                            </p></Cell
                          >
                        </InnerGrid>
                        <InnerGrid class="p-0 d-none m-block">
                          <Cell
                            spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                            ><p class="text-eyebrow text-left mt-20 mb-20">
                              Experience
                            </p></Cell
                          >
                        </InnerGrid>
                        <div class="divider" />
                        <h4 class="text-h2 title m-mt-30 m-mb-20">
                          {item.name}
                        </h4>
                        <p class="short-text m-mt-0">
                          {item.intro}
                        </p>
                      </a>
                    </div>
                  </Cell>
                {/each}
              </LayoutGrid>
            </div>
          </div>
        </section>
      {/if}
    </div>
  {/if}
</Layout>
<ProductSliderModal
  bind:open={productSliderOpen}
  products={experience.pack}
  bind:active={activeProduct}>no content</ProductSliderModal
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

  .content :global(.mdc-button) {
    width: 180px;
    min-width: 180px;
    padding: 0 15px;
  }
  /* Header title */
  .header-title {
    background-color: #f0f7f8;
  }

  :global(.experience-detail .header-title .btn-favorite) {
    position: relative;
    :global(.like) {
      display: block;
    }
    :global(.liked) {
      display: none;
    }
    &:hover {
      :global(.like) {
        display: none;
      }
      :global(.liked) {
        display: block;
      }
    }
  }
  :global(.experience-detail .header-title .btn-favorite.liked) {
    :global(.liked) {
      display: block;
    }
    :global(.like) {
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
    @include desktop {
      width: 80%;
    }
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
  #what-to-pack-section {
    --mdc-layout-grid-gutter-phone: 24px;
    --mdc-layout-grid-gutter-tablet: 24px;
  }
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
    background-color: #5078bc;
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

  :global(.products-list .item-product) {
    @include mobile {
      h3 {
        --mdc-typography-headline3-font-size: 14px;
      }
    }
  }

  .products-list :global(.item-product .thumbnail .btn-favorite) {
    filter: brightness(0);
  }

  .experience-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
  }
  .experience-item .divider::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .experience-item .title {
    @include desktop {
      height: 50px;
      overflow: hidden;
    }
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

  @media (max-width: 1222px) {
    .detail-content .container > :global(.mdc-layout-grid) {
      --mdc-layout-grid-gutter-desktop: 30px;
    }
  }

  @media screen and (max-width: 1304px) {
    :global(.page.page-experience-detail
        .header-title
        .show-on-sticky
        button.mdc-button) {
      width: auto;
      min-width: auto;
    }
  }

  @media screen and (max-width: 999px) {
    :global(.page.page-experience-detail
        .header-title
        .show-on-sticky
        button.mdc-button) {
      padding: 10px;
    }
  }

  @media screen and (max-width: 949px) {
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
