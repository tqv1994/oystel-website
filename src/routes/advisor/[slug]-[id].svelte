<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Button, { Label } from '@smui/button';
  import IconButton, { Icon } from '@smui/icon-button';
  import Svg from '@smui/common/Svg.svelte';
  import { stringHelper } from '$lib/helpers';
  import Layout from '$lib/components/common/Layout.svelte';
  import { BlurhashImage } from 'svelte-blurhash';
  import { Advisor } from '$lib/api/advisor/type';
  import { advisorStore, updateAdvisorStore } from '$lib/api/advisor/store';
  import { AdvisorPageData } from '$lib/api/pages/type';
  import { Destination } from '$lib/api/destination/type';
  import { Experience } from '$lib/api/experience/type';
  import { routerHelper } from '$lib/helpers';

  export const load: Load = async ({ fetch, session, page }) => {
    let id = stringHelper.getSlugId(page.params.id);
    const res = await fetch(`/api/pages/advisor/detail?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data: AdvisorPageData = await res.json();
      updateAdvisorStore([data.advisor]);
    } else {
      const error = await res.json();
      console.log(error);
    }
    return { props: { id } };
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
  };
</script>

<script lang="ts">
  let searchModel = {
    name: '',
    specialty: '',
    location: '',
  };
  let contentHeaderActionMobile = '';
  let configPage = {
    header: {
      page: 'advisor-detail',
      transparent: false,
      theme: 'light',
      currentMenu: 'travel-advisors',
    },
  };
  export let id: string;
  let advisor: Advisor | undefined;
  let myRecentTrips: any[];
  let countries: any[];
  advisorStore.subscribe(({ items }) => {
    advisor = Object.values(items).find((item: Advisor) => item.id == id);
    myRecentTrips = [];
    if (advisor) {
      if (advisor.destinations) {
        myRecentTrips = advisor.destinations.map((destination: Destination) => {
          let item: any = new Destination(destination);
          item.type = 'destination';
          return item;
        });
      }
      if (advisor.experiences) {
        myRecentTrips = myRecentTrips.concat(
          advisor.experiences.map((experience: Experience) => {
            let item: any = new Experience(experience);
            item.type = 'experience';
            return item;
          }),
        );
      }
    }
  });
  onMount(async () => {});

  function onScrollFixedContactInfo() {
    if (document.documentElement.clientWidth > 839) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.querySelector('.contact-info').classList.add('fixed');
      } else {
        document.querySelector('.contact-info').classList.remove('fixed');
      }
    } else {
      document.querySelector('.contact-info').classList.remove('fixed');
    }
  }
</script>

<svelte:window
  on:load={() => {
    onScrollFixedContactInfo();
  }}
  on:scroll={() => {
    onScrollFixedContactInfo();
  }}
/>
<Layout config={configPage}>
  {#if advisor}
    <div class="content d-mt-25">
      <section
        class="header-title full-width"
        style="background-image: url(/img/advisors/detail-advisor-banner.jpg)"
      >
        <div class="content-wrap m-none">
          <div class="container">
            <div
              class="contact-info d-p-45 d-pt-80 d-pb-85 t-pt-80 t-pb-85 m-pt-30 m-pb-45"
            >
              <IconButton class="btn-share d-none t-none m-block">
                <Icon component={Svg} viewBox="0 0 16.833 24.384">
                  <g
                    id="Group_439"
                    data-name="Group 439"
                    transform="translate(-1661.127 -152.323)"
                  >
                    <path
                      id="Path_319"
                      data-name="Path 319"
                      d="M156.364-5869.48l4.489-4.489,4.489,4.489"
                      transform="translate(1508.69 6027)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1"
                    />
                    <g id="Group_438" data-name="Group 438">
                      <path
                        id="Path_318"
                        data-name="Path 318"
                        d="M154.564-5867H150.7v15.309h15.833V-5867H162.8"
                        transform="translate(1510.927 6027.899)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_320"
                        data-name="Path 320"
                        d="M161.543-5858.913v-14.377"
                        transform="translate(1508 6027)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                  </g>
                </Icon>
              </IconButton>
              <LayoutGrid class="p-0">
                <Cell
                  spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                  class="text-left"
                >
                  <div class="thumbnail">
                    <BlurhashImage
                      src={stringHelper.getFullUrlImage(
                        advisor.userMe.avatar?.url,
                      )}
                      fadeDuration="1000"
                      alt=""
                    />
                  </div>
                </Cell>
                <Cell
                  spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                  class="text-center t-block m-none"
                >
                  <IconButton class="btn-share">
                    <Icon component={Svg} viewBox="0 0 16.833 24.384">
                      <g
                        id="Group_439"
                        data-name="Group 439"
                        transform="translate(-1661.127 -152.323)"
                      >
                        <path
                          id="Path_319"
                          data-name="Path 319"
                          d="M156.364-5869.48l4.489-4.489,4.489,4.489"
                          transform="translate(1508.69 6027)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <g id="Group_438" data-name="Group 438">
                          <path
                            id="Path_318"
                            data-name="Path 318"
                            d="M154.564-5867H150.7v15.309h15.833V-5867H162.8"
                            transform="translate(1510.927 6027.899)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <path
                            id="Path_320"
                            data-name="Path 320"
                            d="M161.543-5858.913v-14.377"
                            transform="translate(1508 6027)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </g>
                      </g>
                    </Icon>
                  </IconButton>
                </Cell>
              </LayoutGrid>
              <h1 class="mt-30 mb-10">{advisor.userMe.displayName || advisor.userMe.email}</h1>
              <p class="mt-0 d-mb-25 m-mb-20 description">
                {@html advisor.bio}
              </p>
              <h4 class="mt-0 d-mb-55 m-mb-40">
                Advisor | {advisor.address ? advisor.address.line1 : ''}
              </h4>
              <Button variant="outlined" class="hover-affect"
                ><Label>Contact Me</Label></Button
              >
            </div>
          </div>
        </div>
      </section>
      <section id="contact-info-mobile" class="d-none m-block">
        <div class="content-wrap">
          <div class="container">
            <div
              class="contact-info d-p-45 d-pt-80 d-pb-85 t-pt-80 t-pb-85 m-pt-30 m-pb-45"
            >
              <IconButton class="btn-share d-none t-none m-block">
                <Icon component={Svg} viewBox="0 0 16.833 24.384">
                  <g
                    id="Group_439"
                    data-name="Group 439"
                    transform="translate(-1661.127 -152.323)"
                  >
                    <path
                      id="Path_319"
                      data-name="Path 319"
                      d="M156.364-5869.48l4.489-4.489,4.489,4.489"
                      transform="translate(1508.69 6027)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1"
                    />
                    <g id="Group_438" data-name="Group 438">
                      <path
                        id="Path_318"
                        data-name="Path 318"
                        d="M154.564-5867H150.7v15.309h15.833V-5867H162.8"
                        transform="translate(1510.927 6027.899)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                      <path
                        id="Path_320"
                        data-name="Path 320"
                        d="M161.543-5858.913v-14.377"
                        transform="translate(1508 6027)"
                        fill="none"
                        stroke="#000"
                        stroke-width="1"
                      />
                    </g>
                  </g>
                </Icon>
              </IconButton>
              <LayoutGrid class="p-0">
                <Cell
                  spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                  class="text-left"
                >
                  <div class="thumbnail">
                    <BlurhashImage
                      src={stringHelper.getFullUrlImage(
                        advisor.userMe.avatar?.url,
                      )}
                      fadeDuration="1000"
                      alt=""
                    />
                  </div>
                </Cell>
                <Cell
                  spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                  class="text-center t-block m-none"
                >
                  <IconButton class="btn-share">
                    <Icon component={Svg} viewBox="0 0 16.833 24.384">
                      <g
                        id="Group_439"
                        data-name="Group 439"
                        transform="translate(-1661.127 -152.323)"
                      >
                        <path
                          id="Path_319"
                          data-name="Path 319"
                          d="M156.364-5869.48l4.489-4.489,4.489,4.489"
                          transform="translate(1508.69 6027)"
                          fill="none"
                          stroke="#000"
                          stroke-width="1"
                        />
                        <g id="Group_438" data-name="Group 438">
                          <path
                            id="Path_318"
                            data-name="Path 318"
                            d="M154.564-5867H150.7v15.309h15.833V-5867H162.8"
                            transform="translate(1510.927 6027.899)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                          <path
                            id="Path_320"
                            data-name="Path 320"
                            d="M161.543-5858.913v-14.377"
                            transform="translate(1508 6027)"
                            fill="none"
                            stroke="#000"
                            stroke-width="1"
                          />
                        </g>
                      </g>
                    </Icon>
                  </IconButton>
                </Cell>
              </LayoutGrid>
              <h1 class="mt-30 mb-10">{advisor.userMe.displayName || advisor.userMe.email}</h1>
              <p class="mt-0 d-mb-25 m-mb-20 description">
                {@html advisor.bio}
              </p>
              <h4 class="mt-0 d-mb-55 m-mb-40">
                Advisor | {advisor.address ? advisor.address.line1 : ''}
              </h4>
              <Button variant="outlined" class="hover-affect"
                ><Label>Contact Me</Label></Button
              >
            </div>
          </div>
        </div>
      </section>
      <section class="d-pt-80 d-pb-100 m-pt-55 m-pb-80">
        <div class="container">
          <LayoutGrid class="p-0 d-pl-115 d-pr-115 t-pl-0 t-pr-0">
            <Cell spanDevices={{ desktop: 6 }} class="m-none t-block" />
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <div class="destinations-wrap">
                <h1 class="mt-0">Destinations</h1>
                <LayoutGrid class="p-0">
                  {#if advisor.countries && advisor.countries.length > 0}
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      {#each advisor.countries as country, index}
                        {#if index < 3}
                          <div
                            class={index + 1 < 3
                              ? 'mb-30'
                              : 'mb-0'}
                          >
                            <h5 class="mb-10 mt-0">{country.name}</h5>
                          </div>
                        {/if}
                      {/each}
                    </Cell>
                    {#if advisor.countries[3]}
                      <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                        {#each advisor.countries as country, index}
                          {#if index >= 3}
                            <div
                              class={index + 1 < advisor.countries.length
                                ? 'mb-30'
                                : 'mb-0'}
                            >
                              <h5 class="mb-15 mt-0">{country.name}</h5>
                            </div>
                          {/if}
                        {/each}
                      </Cell>
                    {/if}
                  {/if}
                  {#if countries && countries.length > 0}
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      {#each countries as country, index}
                        {#if index < 3}
                          <div
                            class={index + 1 < countries.length
                              ? 'mb-30'
                              : 'mb-0'}
                          >
                            <h5 class="mb-15 mt-0">{country.name}</h5>
                            {#each country.items as item, indexChild}
                              <p
                                class={indexChild + 1 < country.items.length
                                  ? 'mb-10 mt-0'
                                  : 'm-0'}
                              >
                                {item.name}
                              </p>
                            {/each}
                          </div>
                        {/if}
                      {/each}
                    </Cell>
                    {#if countries[3]}
                      <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                        {#each countries as country, index}
                          {#if index >= 3}
                            <div
                              class={index + 1 < countries.length
                                ? 'mb-30'
                                : 'mb-0'}
                            >
                              <h5 class="mb-15 mt-0">{country.name}</h5>
                              {#each country.items as item, indexChild}
                                <p
                                  class={indexChild + 1 < country.items.length
                                    ? 'mb-10 mt-0'
                                    : 'm-0'}
                                >
                                  {item.name}
                                </p>
                              {/each}
                            </div>
                          {/if}
                        {/each}
                      </Cell>
                    {/if}
                  {/if}
                </LayoutGrid>
              </div>
              <div class="pt-90 m-pt-80">
                <h1 class="mt-0">My Recent Trips</h1>
                <p class="mt-0 mb-30 text-eyebrow">Travel Advisor Insight</p>
                <p class="mt-0 d-mb-50 m-mb-45">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <LayoutGrid class="p-0">
                  {#if myRecentTrips && myRecentTrips.length > 0}
                    {#each myRecentTrips as item}
                      <Cell
                        spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                        class="d-mb-20 m-mb-25"
                      >
                        <a href={item.url}>
                          <div class="trip-item">
                            <div class="thumbnail">
                              <div
                                class="image-cover"
                                style="padding-top: calc(335 / 258 * 100%)"
                              >
                                <BlurhashImage
                                  src={stringHelper.getFullUrlImage(
                                    item.gallery[0]?.url,
                                  )}
                                  hash={item.gallery[0]?.blurHash}
                                  fadeDuration="1000"
                                  alt=""
                                />
                              </div>
                            </div>
                            <LayoutGrid class="p-0">
                              <Cell
                                spanDevices={{
                                  desktop: 12,
                                  phone: 4,
                                  tablet: 8,
                                }}
                                ><p
                                  class="text-eyebrow text-left d-mt-25 d-mb-25 m-mt-15 m-mb-15"
                                >
                                  {item.country ? item.country.name : 'country'}
                                </p></Cell
                              >
                            </LayoutGrid>
                            <div class="divider" />
                            <h4 class="text-h2 title mt-25 mb-0">
                              {item.name}
                            </h4>
                          </div>
                        </a>
                      </Cell>
                    {/each}
                  {/if}
                </LayoutGrid>
              </div>
              <div class="d-pt-80 m-pt-20 qualifications-wrap">
                <h1 class="mt-0">Qualifications</h1>
                <p class="title mt-0 mb-30 label-specialities">Specialties</p>
                <p class="text-content mt-0 mb-55">
                  {stringHelper.getSpecialtiesString(advisor.specialities)}
                </p>
                <p class="title mt-0 mb-30">Languages</p>
                <p class="text-content mt-0">
                  {stringHelper.getLanguagesString(advisor.languages)}
                </p>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </section>
    </div>
  {/if}
</Layout>

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
    height: 810px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .contact-info {
    --mdc-typography-button-font-size: 16px;
    top: 80px;
    position: absolute;
    @include mobile{
      position: relative;
      top: auto;
      left: auto;
    }
    left: 0;
    background-color: #f0f7f8;
    width: 475px;
  }
  .contact-info:global(.fixed) {
    top: 50% !important;
    transform: translateY(-50%);
  }
  @media screen and (min-width: 1441px) {
    .contact-info:global(.fixed) {
      margin-left: calc(
        calc(100vw / 2 - 1440px / 2) + var(--mdc-layout-grid-margin-desktop)
      );
    }
  }
  @media screen and (max-width: 1440px) and (min-width: 950px) {
    .contact-info {
      width: 40vw;
    }
    .contact-info:global(.fixed) {
      margin-left: 0;
    }
  }
  .contact-info .thumbnail {
    width: 100px;
  }
  .contact-info .thumbnail :global(img) {
    border-radius: 50%;
  }
  .contact-info :global(.btn-share) {
    top: 50%;
    transform: translateY(-50%);
  }
  .contact-info .description {
    max-height:110px;
    overflow-y: scroll;
    width: 85%;
    &::-webkit-scrollbar-track {
        background-color: #d3d3d3;
      }
      &::-webkit-scrollbar {
        width: 5px;
        background-color: #d3d3d3;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #000;
      }
  }

  .trip-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
  }
  .trip-item .divider::after {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .trip-item .title {
    height: 55px;
    overflow: hidden;
  }
  .trip-item .thumbnail {
    position: relative;
  }
  .trip-item .thumbnail :global(.btn-favorite) {
    position: absolute;
    top: 2%;
    right: 2%;
  }
  .trip-item .thumbnail :global(.btn-favorite .like) {
    display: block;
  }
  .trip-item .thumbnail :global(.btn-favorite .liked) {
    display: none;
  }
  .trip-item .thumbnail :global(.btn-favorite:hover .like) {
    display: none;
  }
  .trip-item .thumbnail :global(.btn-favorite:hover .liked) {
    display: block;
  }
  .qualifications-wrap {
    padding-right: 10%;
  }
  .qualifications-wrap .title {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.2px;
  }
  .qualifications-wrap .text-content {
    --mdc-typography-body1-font-weight: 300;
    --mdc-typography-body1-letter-spacing: 0.1px;
    --mdc-typography-body1-font-size: 17px;
  }

  @include mobile {
    .header-title {
      height: auto;
      padding-bottom: 82.67%;
    }
    .contact-info {
      text-align: center !important;
      width: calc(100vw - 90px);
      margin: auto;
      margin-top: -90px;
      padding-left: 8px;
      padding-right: 8px;
      .description {
        width: 100%;
      }
      .thumbnail {
        margin: 0 auto;
      }
      :global(.btn-share) {
        position: absolute;
        right: 0;
        top: 30px;
      }
    }
    :global(.page-advisor-detail .content) {
      :global(button) {
        --mdc-typography-button-font-size: 16px;
        --mdc-typography-button-line-height: 24px;
        --mdc-typography-button-letter-spacing: 0.5;
      }
      .contact-info {
        --mdc-typography-headline4-font-size: 14px;
        --mdc-typography-headline4-line-height: 27px;
      }
      .trip-item {
        .title {
          --mdc-typography-headline2-font-size: 14px;
          --mdc-typography-headline2-line-height: 18px;
        }
      }
      .label-specialities,
      .label-languages {
        --mdc-typography-body1-font-size: 12px;
        --mdc-typography-body1-line-height: 20px;
        --mdc-typography-body1-letter-spacing: 0.1;
      }
      .qualifications-wrap .text-content {
        --mdc-typography-body1-font-weight: 400;
        --mdc-typography-body1-letter-spacing: 0;
        --mdc-typography-body1-line-height: 27px;
        --mdc-typography-body1-font-size: 14px;
      }
    }
  }
  .destinations-wrap h5 {
    font-weight: bold;
    font-size: 16px;
    line-height: 34px;
    letter-spacing: 0.2px;
  }
  @media (min-width: 1441px) {
    .contact-info:not(.fixed) {
      left: 45px;
    }
  }
  @media (max-width: 949px) {
    .destinations-wrap h5 {
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0.1px;
    }
  }
</style>
