<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import BlurImage from '$lib/components/blur-image.svelte';
  import {
    type Agency,
    getSpecialtiesString,
    type Advisor,
  } from '$lib/store/advisor';
  import { implodeString } from '$lib/utils/string';

  export const load: Load = async ({ fetch, params: { id } }) => {
    id = id.substring(id.lastIndexOf('-') + 1);
    const countriesMap = await getCollectionAsMap<Country>(fetch, 'country');
    const experienceTypes = await getCollection<Kind>(fetch, 'experience-type');
    const languagesMap = await getCollectionAsMap<Kind>(fetch, 'language');
    const destinationsMap = await getCollectionAsMap<Destination>(
      fetch,
      'destination',
    );
    const experiencesMap = await getCollectionAsMap<Experience>(
      fetch,
      'experience',
    );
    const advisor = await trySearchGetOne<Advisor>(fetch, 'advisor', id);
    const agency = await trySearchGetOne<Agency>(
      fetch,
      'agency',
      advisor?.agency?.id || '',
    );
    let myCountries: Country[] = [];
    let location: string = '';
    const country = countriesMap[advisor?.country || ''];
    if (country) {
      location = `${
        advisor?.city && advisor?.city != '' ? advisor?.city + ', ' : ''
      }${country.name}`;
    } else {
      location = `${advisor?.city || ''}`;
    }
    let myLanguages: Kind[] = [];
    let myDestinations: Destination[] = [];
    let myExperiences: Experience[] = [];
    let destinationsGallery: UploadFile[] = [];
    if (advisor) {
      myDestinations = (advisor.destinations || []).map(
        (id) => destinationsMap[id],
      );
      myExperiences = (advisor.experiences || []).map(
        (id) => experiencesMap[id],
      );
      for (let destination of myDestinations || []) {
        if ((destination.gallery || []).length > 0) {
          destinationsGallery.push(destination.gallery[0]);
        }
        if (destination.country) {
          const country = countriesMap[destination.country];
          if (country) {
            const exist = myCountries.find(
              (itemCountry) =>
                itemCountry.id.toString() === country.id.toString(),
            );
            if (!exist) {
              myCountries.push(country);
            }
          }
        }
      }
      if (advisor.language1) {
        myLanguages.push(languagesMap[advisor.language1]);
      }
      if (advisor.language2) {
        myLanguages.push(languagesMap[advisor.language2]);
      }
      if (advisor.language3) {
        myLanguages.push(languagesMap[advisor.language3]);
      }
    }
    return {
      props: {
        id,
        advisor,
        myCountries,
        mySpecialities: advisor
          ? getSpecialtiesString(advisor, experienceTypes)
          : '',
        myLanguages: myLanguages.reduce((acc: string, item: Kind) => {
          if (acc === '') {
            acc = item.name;
          } else {
            acc += `, ${item.name}`;
          }
          return acc;
        }, ''),
        myDestinations,
        myExperiences,
        agency,
        location,
        destinationsGallery,
      },
    };
  };
</script>

<script lang="ts">
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Markdown from '$lib/components/Markdown.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import Item from '$lib/components/Item.svelte';
  import { type Country } from '$lib/store/country';
  import { goto } from '$app/navigation';
  import { trySearchGetOne } from '$lib/store/search';
  import { getCollection, getCollectionAsMap } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  import type { Destination } from '$lib/store/destination';
  import type { Experience } from '$lib/store/experience';
  import { calculateYear } from '$lib/utils/date';
  import { session } from '$app/stores';
  import CarouselImages from '$lib/components/CarouselImages.svelte';
  import type { UploadFile } from '$lib/store/upload-file';
import Avatar from '$lib/components/Avatar.svelte';

  export let advisor: Advisor;
  export let agency: Agency;
  export let myCountries: Country[];
  export let mySpecialities: string;
  export let myLanguages: string;
  export let myDestinations: Destination[];
  export let myExperiences: Experience[];
  export let location: string;
  export let id: string;
  export let destinationsGallery: UploadFile[] = [];

  let stickyShow = false;

  function onScrollFixedContactInfo() {
    // const classList = document.querySelector('.contact-info')?.classList;
    // const footer = document.querySelector('footer');
    // if (
    //   document.documentElement.clientWidth >= 950 &&
    //   (document.body.scrollTop > 100 ||
    //     document.documentElement.scrollTop > 100)
    // ) {
    //   classList?.add('fixed');
    //   documentHelper.checkOffset(
    //     document.querySelector('.contact-info'),
    //     footer,
    //   );
    // } else {
    //   classList?.remove('fixed');
    // }
  }

  const onContactAdvisor = async () => {
    if ($session.user) {
      if ($session.travellerMe) {
        goto(`/plan?advisor=${id}`);
      } else {
        window.pushToast('Please update your information before doing this');
        setTimeout(() => {
          goto('/me/my-account');
        }, 1000);
      }
    } else {
      window.openSignUpModal(
        'Join Us. Stay Inspired.',
        'Get access to exclusive promotions, travel guides, and curated editorial content.',
      );
    }
  };

  const onResize = (event: Event) => {
    if (window.scrollY < 64) {
      stickyShow = false;
    } else {
      stickyShow = false;
    }
  };

  const adjustNav = () => {
    if (window.scrollY < 64) {
      stickyShow = false;
    } else {
      stickyShow = true;
    }
  };

  const onScroll = (event: Event) => {
    adjustNav();
  };

  function onStart(event: CustomEvent) {
    adjustNav();
  }
</script>

<svelte:window
  on:resize={onResize}
  on:scroll={onScroll}
  on:sveltekit:start={onStart}
/>
{#if advisor}
  <div class="content d-mt-25 advisor-detail">
    <div class="container margin-auto add-padding">
      <LayoutGrid class="p-0 content-padding">
        <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
          <section class="contact-info-wrap d-pr-40">
            <div class={`contact-info ${stickyShow ? 'fixed' : ''}`}>
              <div class="contact-info__header">
                <div class="thumbnail">
                  <Avatar avatar={advisor.avatar} alt={advisor?.name || ''} />
                </div>
                <div class="">
                  <Button variant="unelevated" on:click={onContactAdvisor}
                    ><Label>Contact Me</Label></Button
                  >
                </div>
              </div>
              <h1 class="advisor-name text-h2">
                {advisor.name || ''}
              </h1>
              <div class="divider" />
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Location</p>
                  <h4 class="m-0">{location || ''}</h4>
                </div>
                <div class="col">
                  <p class="text-eyebrow">Years of Experience</p>
                  <h4 class="m-0">
                    {advisor.joined_at
                      ? `${calculateYear(advisor.joined_at)} Years`
                      : ''}
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Languages</p>
                  <h4 class="m-0">
                    {myLanguages || ''}
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Specialities</p>
                  <h4 class="m-0">
                    {mySpecialities}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </Cell>
        <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
          <section class="adjust-sections">
            <h2 class="section__title">Biography</h2>
            <div class="row">
              <div class="d-col-10 m-col-10 m-0 markdown-wrapper">
                <Markdown source={advisor.biography || ''} />
              </div>
            </div>
          </section>
          <section class="destinations-wrap adjust-sections">
            <h2 class="section__title">Destinations</h2>
            {#if (myDestinations || []).length > 0}
              <div class="mb-25">
                <CarouselImages
                  loop={true}
                  gallery={destinationsGallery || []}
                  styleItem="padding-top: calc(430 / 747 * 100%);"
                />
              </div>
            {/if}
            <div class="row">
              {#each myCountries as country}
                <div class="d-col-6 m-col-12">
                  <h4 class="m-0">{country.name}</h4>
                </div>
              {/each}
            </div>
          </section>
          <!-- Hidden in phase 1 -->
          <!-- <section class="adjust-sections">
            <h2 class="section__title">Favorite Experiences</h2>
            <LayoutGrid class="p-0">
              {#if myExperiences && myExperiences.length > 0}
                {#each myExperiences as item}
                  <Cell
                    spanDevices={{ desktop: 5, tablet: 4, phone: 2 }}
                    class="d-mb-20 m-mb-25"
                  >
                    <Item {item} pathPrefix="/experience" />
                  </Cell>
                {/each}
              {/if}
            </LayoutGrid>
          </section> -->
          <section class="adjust-sections">
            <h2 class="section__title">Details</h2>
            <div class="row">
              {#if (agency?.affiliate_agencies || []).length > 0}
                <div class="col m-col-12">
                  <p class="text-eyebrow">Affiliate Agency</p>
                  <h4 class="m-0">
                    {implodeString(
                      (agency?.affiliate_agencies || []).map(
                        (item) => item.name,
                      ),
                      ', ',
                    )}
                  </h4>
                </div>
              {/if}
              {#if (agency?.affiliate_networks || []).length > 0}
                <div class="col m-col-12">
                  <p class="text-eyebrow">Affiliate Network</p>
                  <h4 class="m-0">
                    {implodeString(
                      (agency?.affiliate_networks || []).map(
                        (item) => item.name,
                      ),
                      ', ',
                    )}
                  </h4>
                </div>
              {/if}
            </div>
            <div class="row">
              {#if (agency?.affiliate_benefit_programs || []).length > 0}
                <div class="col m-col-12">
                  <p class="text-eyebrow">Benefit Program</p>
                  <h4 class="m-0">
                    {implodeString(
                      (agency?.affiliate_benefit_programs || []).map(
                        (item) => item.name,
                      ),
                      ', ',
                    )}
                  </h4>
                </div>
              {/if}
            </div>
            {#if advisor?.planningFee !== null}
              <div class="row">
                <div class="col m-col-12">
                  <p class="text-eyebrow">Planning Fee</p>
                  <h4 class="m-0">
                    {advisor?.planningFee ? 'Yes' : 'No'}
                  </h4>
                </div>
              </div>
            {/if}
          </section>
        </Cell>
      </LayoutGrid>
    </div>
  </div>
{/if}
<OyNotification />

<style lang="scss" global>
  @use '../../style/include/grid';
  @use '../../theme/mixins';
  @use '../../theme/colors';
  .advisor-detail {
    @import './src/style/partial/thumbnail.scss';
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
    padding-bottom: 80px;
    @include mixins.mobile {
      padding-bottom: 24px;
    }
    .text-eyebrow {
      font-size: 13px !important;
    }
    .header-title {
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .contact-info {
      padding: 40px 24px 40px 24px;
      --mdc-typography-button-font-size: 16px;
      @include mixins.mobile {
        position: relative;
        top: auto;
        left: auto;
      }
      background-color: #f2f2f2;
      transition: top 1s ease;

      .contact-info__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        div:first-child {
          justify-self: start;
        }
        div:last-child {
          justify-self: end;
        }
        .image-cover {
          -webkit-filter: grayscale(1);
          filter: grayscale(1);
        }
      }

      .divider {
        margin-bottom: 24px;
      }

      .divider::after {
        background-color: #000;
      }
    }
    .contact-info.fixed {
      position: sticky !important;
      top: 150px !important;
      transition: top 2s;
      z-index: auto !important;
    }
    .contact-info-wrap {
      @include mixins.desktop {
        height: 100%;
      }
      @include mixins.mobile {
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        padding-top: 0;
        .contact-info {
          padding-top: 40px;
          padding-bottom: 24px;
          padding-left: var(--mdc-layout-grid-margin-phone);
          padding-right: var(--mdc-layout-grid-margin-phone);
        }
      }
    }
    .contact-info .thumbnail {
      width: 100px;
    }
    .contact-info .thumbnail .image-cover {
      border-radius: 50%;
    }
    .contact-info :global(.btn-share) {
      top: 50%;
      transform: translateY(-50%);
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

    @include mixins.mobile {
      .contact-info {
        .description {
          width: 100%;
        }
        .btn-share {
          position: absolute;
          right: 0;
          top: 30px;
        }
      }
      .content {
        button {
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
    .destinations-wrap {
      .arrow-inside {
        .mdc-icon-button {
          color: #{colors.$white};
          &:hover {
            color: #{colors.$black};
          }
        }
      }
    }
  }
  .advisor-name {
    margin: 32px 0 32px 0;
  }
  .markdown-wrapper {
    p {
      margin-top: 0;
      margin-bottom: 16px;
    }
  }
  .adjust-sections {
    padding-bottom: 0;
    @include mixins.mobile {
      padding: 16px 0 32px 0;
    }
  }
</style>
