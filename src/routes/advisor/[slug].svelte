<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import BlurImage from '$lib/components/blur-image.svelte';
  import { Advisor } from '$lib/store/advisor';
  import { advisorStore } from '$lib/store/advisor';
  import { Destination } from '$lib/store/destination';
  import { parseId } from '$lib/utils/fetch';
  import { insertToStore } from '$lib/store/types';
  import { makeLink } from '$lib/utils/link';
  import { implodeString } from '$lib/utils/string';
  import { authStore, convertUserToInput } from '$lib/store/auth';

  export const load: Load = async ({ fetch, params }) => {
    const id = parseId(params.slug);
    const res = await fetch(`/advisor/${id}.json`);
    if (res.ok) {
      const data: Advisor = await res.json();
      let destinationCountries: Country[] = [];
      for (let destination of data.destinations || []) {
        destinationCountries.push(destination.country);
      }
      insertToStore(advisorStore, [data]);
      return {
        props: {
          id,
          destinationCountries,
        },
      };
    } else {
      const error = await res.json();
      console.log(error);
    }
  };
</script>

<script lang="ts">
  import OyNotification from '$lib/components/common/OyNotification.svelte';
  import { updateUserService } from '$lib/services/user.service';
  import { createTripService } from '$lib/services/trip.service';
  import { ENUM_TRIP_STATE, TripInput } from '$lib/store/trip';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Markdown from '$lib/components/Markdown.svelte';
  import { Category } from '$lib/store/category';
  import Carousel from '$lib/components/Carousel.svelte';
  import Item from '$lib/components/Item.svelte';
import { Country } from '$lib/store/country';
import { goto } from '$app/navigation';

  export let id: string;
  export let destinationCountries: Country[] = [];
  let advisor: Advisor | undefined;
  let stickyShow = false;
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };
  advisorStore.subscribe((store) => {
    advisor = store.items[id];
    if (!advisor) {
      return;
    }
  });

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
    const user = $authStore.user;
    if (user) {
      if (
        !user.myAdvisors ||
        (user.myAdvisors &&
          !user.myAdvisors.find((item) => item.id === advisor.id))
      ) {
        if (user) {
          const userInput = convertUserToInput(user);
          userInput.myAdvisors.push(advisor.id);
          await updateUserService({ ...userInput }).then((output) => {
            authStore.set({ user: { ...user, myAdvisors: output.myAdvisors } });
          });
        }
      }
      if (user.travellerMe) {
        goto('/plan');
      } else {
        window.pushToast(
          'Please update your information before doing this',
        );
        setTimeout(()=>{
          goto('/me/my-account');
        },1000);
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
    <div class="container">
      <LayoutGrid class="p-0 d-pt-90">
        <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
          <section class="contact-info-wrap d-pr-40">
            <div
              class={`contact-info d-p-25 d-pb-40 ${stickyShow ? 'fixed' : ''}`}
            >
              <div class="contact-info__header">
                <div class="thumbnail">
                  <div class="image-cover">
                    {#if advisor.avatar}
                      <BlurImage {...advisor.avatar} />
                    {:else}
                      <BlurImage />
                    {/if}
                  </div>
                </div>
                <div class="">
                  <Button variant="unelevated" on:click={onContactAdvisor}
                    ><Label>Contact Me</Label></Button
                  >
                </div>
              </div>
              <h2 class="mt-30 mb-25">
                {advisor && advisor.name}
              </h2>
              <div class="divider" />
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Location</p>
                  <h4 class="m-0">{advisor.country?.name || ''}</h4>
                </div>
                <div class="col">
                  <p class="text-eyebrow">Years of Experience</p>
                  <h4 class="m-0">Years</h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Languages</p>
                  <h4 class="m-0">
                    {implodeString(
                      [
                        advisor.language1?.name,
                        advisor.language2?.name,
                        advisor.language3?.name,
                      ],
                      ', ',
                    )}
                  </h4>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p class="text-eyebrow">Specialities</p>
                  <h4 class="m-0">
                    {implodeString(
                      [
                        advisor.experienceType1?.name,
                        advisor.experienceType2?.name,
                        advisor.experienceType3?.name,
                        advisor.experienceType4?.name,
                        advisor.experienceType5?.name,
                      ],
                      ', ',
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </Cell>
        <Cell spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}>
          <section>
            <h2 class="mt-0">Biography</h2>
            <div class="row">
              <div class="d-col-10 m-col-10 m-0">
                <Markdown source={advisor.description || ''} />
              </div>
            </div>
          </section>
          <section class="destinations-wrap">
            <h2 class="mt-0">Destinations</h2>
            <div class="mb-25">
              <Carousel {...carouselConfig}>
                {#each advisor.destinations || [] as destination}
                  <div class="thumbnail">
                    <div
                      class="image-cover"
                      style="padding-top: calc(430 / 747 * 100%)"
                    >
                      {#if destination.gallery.length > 0}
                        <BlurImage {...destination.gallery[0]} />
                      {:else}
                        <BlurImage />
                      {/if}
                    </div>
                  </div>
                {/each}
              </Carousel>
            </div>
            <div class="row">
              {#each destinationCountries as country}
                {#if country?.name}
                <div class="d-col-6 m-col-12">
                  <h4 class="m-0">{country.name}</h4>
                </div>
                {/if}
              {/each}
            </div>
          </section>
          <section>
            <h2 class="mt-0">Favorite Experiences</h2>
            <LayoutGrid class="p-0">
              {#if advisor.experiences && advisor.experiences.length > 0}
                {#each advisor.experiences as item}
                  <Cell
                    spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                    class="d-mb-20 m-mb-25"
                  >
                    <Item {...item} {item} pathPrefix="experience" />
                  </Cell>
                {/each}
              {/if}
            </LayoutGrid>
          </section>
          <section>
            <h2 class="mt-0">Details</h2>
            <div class="row">
              <div class="col m-col-12">
                <p class="text-eyebrow">Affiliate Agency</p>
                <h4 class="m-0">{implodeString(
                  (advisor?.agency?.affiliate_agencies || []).map(item=>item.name),
                  ', ',
                )}</h4>
              </div>
              <div class="col m-col-12">
                <p class="text-eyebrow">Affiliate Network</p>
                <h4 class="m-0">{implodeString(
                  (advisor?.agency?.affiliate_networks || []).map(item=>item.name),
                  ', ',
                )}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col m-col-12">
                <p class="text-eyebrow">Benefit Program</p>
                <h4 class="m-0">{implodeString(
                  (advisor?.agency?.affiliate_benefit_programs || []).map(item=>item.name),
                  ', ',
                )}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col m-col-12">
                <p class="text-eyebrow">Planning Fee</p>
                <h4 class="m-0">Minimum Fee of $60,000.</h4>
              </div>
            </div>
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
    @include mixins.mobile{
      --mdc-typography-body1-font-size: 14px;
      --mdc-typography-body1-font-weight: 400;
      --mdc-typography-body1-line-height: 27px;

      --mdc-typography-headline6-text-transform: none;

      --mdc-typography-headline4-font-size: 20px;
      --mdc-typography-headline4-font-weight: 400;
      --mdc-typography-headline4-line-height: 24px;
    }
    .text-eyebrow{
      font-size: 13px !important;
    }
    .header-title {
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .contact-info {
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
        .image-cover{
          -webkit-filter: grayscale(1);
          filter: grayscale(1);
        }
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
        .contact-info {
          padding-top: 109px;
          padding-bottom: 50px;
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
    .destinations-wrap{
      .arrow-inside{
        .mdc-icon-button{
          color: #{colors.$white};
          &:hover{
            color: #{colors.$black};
          }
        }
      }
    }
  }
</style>
