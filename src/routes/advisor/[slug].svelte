<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';
  import { onMount } from 'svelte';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
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
      let destinationOfType1: Destination[] = [];
      const destinationOfType2: Destination[] = [];
      const destinationOfType3: Destination[] = [];
      for (let destination of data.destinations || []) {
        switch (destination.type?.id) {
          case data.destinationTypes1?.id:
            destinationOfType1.push(destination);
            break;
          case data.destinationTypes2?.id:
            destinationOfType2.push(destination);
            break;
          case data.destinationTypes3?.id:
            destinationOfType3.push(destination);
            break;
        }
      }
      insertToStore(advisorStore, [data]);
      return {
        props: {
          id,
          destinationOfType1,
          destinationOfType2,
          destinationOfType3,
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

  let configPage = {
    header: {
      page: 'advisor-detail',
      transparent: false,
      theme: 'light',
      currentMenu: 'travel-advisors',
    },
  };
  export let id: string;
  export let destinationOfType1: Destination[];
  export let destinationOfType2: Destination[];
  export let destinationOfType3: Destination[];
  let advisor: Advisor | undefined;
  let stickyShow = false;
  advisorStore.subscribe((store) => {
    advisor = store.items[id];
    if (!advisor) {
      return;
    }
  });
  onMount(async () => {});

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
        await createTripService(
          new TripInput({
            advisor: advisor.id,
            lead_traveller: user.travellerMe.id,
            state: ENUM_TRIP_STATE.enquired,
          }),
        ).then((trip) => {
          window.pushToast(
            'Thank you for contacting our advisor. We will contact you as soon as possible',
          );
        });
      } else {
        window.pushToast(
          'Please update your personal information before taking this action',
        );
      }
    } else {
      window.pushToast(
        'You are not a member, so you cannot perform this action',
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
    <section
      class="header-title full-width"
      style="background-image: url(/img/advisors/detail-advisor-banner.jpg)"
    >
      <div class="content-wrap m-none">
        <div class="container">
          <div
            class={`contact-info d-p-45 d-pr-65 d-pt-80 d-pb-85 m-pt-30 m-pb-45 ${
              stickyShow ? 'fixed' : ''
            }`}
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
                  <div class="image-cover" style="padding-top: 100%">
                    <BlurImage {...advisor.avatar} />
                  </div>
                </div>
              </Cell>
              <Cell
                spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}
                class="text-right t-block m-none"
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
            <h1 class="mt-30 mb-10">
              {advisor && advisor.name}
            </h1>
            <p class="mt-0 d-mb-25 m-mb-20 description">
              {@html advisor.description || ''}
            </p>
            <h4 class="mt-0 d-mb-55 m-mb-40">
              Advisor | {advisor.country?.name || ''}
            </h4>
            <Button
              variant="outlined"
              class="hover-affect"
              on:click={onContactAdvisor}><Label>Contact Me</Label></Button
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
                  <div class="image-cover" style="padding-top: 100%">
                    <BlurImage {...advisor.avatar} />
                  </div>
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
            <h1 class="mt-30 mb-10">
              {advisor.name}
            </h1>
            <p class="mt-0 d-mb-25 m-mb-20 description">
              {@html advisor.description || ''}
            </p>
            <h4 class="mt-0 d-mb-55 m-mb-40">
              Advisor | {advisor.address ? advisor.address.line1 : ''}
            </h4>
            <Button
              variant="outlined"
              class="hover-affect"
              on:click={onContactAdvisor}><Label>Contact Me</Label></Button
            >
          </div>
        </div>
      </div>
    </section>
    <section class="d-pt-80 d-pb-100 m-pt-55 m-pb-80">
      <div class="container">
        <LayoutGrid class="p-0 d-pl-105 d-pr-105 t-pl-0 t-pr-0">
          <Cell spanDevices={{ desktop: 6 }} class="m-none t-block" />
          <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
            <div class="destinations-wrap">
              <h1 class="mt-0">Destinations</h1>
              <LayoutGrid class="p-0">
                {#if advisor.destinationTypes1 || advisor.destinationTypes2}
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    {#if advisor.destinationTypes1}
                      <div class="mb-30">
                        <h5 class="mb-10 mt-0">
                          {advisor.destinationTypes1.name}
                        </h5>
                        {#each destinationOfType1 || [] as destination, indexChild}
                          <p
                            class={indexChild + 1 < destinationOfType1.length
                              ? 'mb-10 mt-0'
                              : 'm-0'}
                          >
                            {destination.name}
                          </p>
                        {/each}
                      </div>
                    {/if}
                    {#if advisor.destinationTypes2}
                      <div class="mb-0">
                        <h5 class="mb-10 mt-0">
                          {advisor.destinationTypes2.name}
                        </h5>
                        {#each destinationOfType2 || [] as destination, indexChild}
                          <p
                            class={indexChild + 1 < destinationOfType2.length
                              ? 'mb-10 mt-0'
                              : 'm-0'}
                          >
                            {destination.name}
                          </p>
                        {/each}
                      </div>
                    {/if}
                  </Cell>
                  {#if advisor.destinationTypes3}
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <div class="mb-0">
                        <h5 class="mb-15 mt-0">
                          {advisor.destinationTypes3.name}
                        </h5>
                        {#each destinationOfType3 || [] as destination, indexChild}
                          <p
                            class={indexChild + 1 < destinationOfType2.length
                              ? 'mb-10 mt-0'
                              : 'm-0'}
                          >
                            {destination.name}
                          </p>
                        {/each}
                      </div>
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
                {#if advisor.experiences && advisor.experiences.length > 0}
                  {#each advisor.experiences as item}
                    <Cell
                      spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                      class="d-mb-20 m-mb-25"
                    >
                      <a href={makeLink('/experience', item)}>
                        <div class="trip-item">
                          <div class="thumbnail">
                            <div
                              class="image-cover"
                              style="padding-top: calc(335 / 258 * 100%)"
                            >
                              <BlurImage {...item.gallery[0]} />
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
                          <h4 class="text-h3 title mt-25 mb-0">
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
                {implodeString(
                  [
                    advisor.type1?.name,
                    advisor.type2?.name,
                    advisor.type3?.name,
                  ],
                  ', ',
                )}
              </p>
              <p class="title mt-0 mb-30">Languages</p>
              <p class="text-content mt-0">
                {implodeString(
                  [
                    advisor.language1?.name,
                    advisor.language2?.name,
                    advisor.language3?.name,
                  ],
                  ', ',
                )}
              </p>
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
  </div>
{/if}
<OyNotification />

<style lang="scss" global>
  @use '../../theme/mixins';
  .advisor-detail {
    @import './src/style/partial/thumbnail.scss';
    .header-title {
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
    .contact-info {
      --mdc-typography-button-font-size: 16px;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      @include mixins.mobile {
        position: relative;
        top: auto;
        left: auto;
      }
      left: 0;
      background-color: #f0f7f8;
      width: calc(475px - 90px);
      transition: top 1s ease;
    }
    .contact-info.fixed {
      top: 40% !important;
      transform: translateY(-40%);
    }
    .contact-info.fixed {
      margin-left: 0;
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

    .trip-item .mdc-layout-grid {
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

    @include mixins.mobile {
      .header-title {
        height: auto;
        padding-bottom: 82.67%;
      }
      #contact-info-mobile{
        height: 200px;
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
    .destinations-wrap h5 {
      font-weight: bold;
      font-size: 16px;
      line-height: 34px;
      letter-spacing: 0.2px;
    }
    @media (max-width: 949px) {
      .destinations-wrap h5 {
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.1px;
      }
    }
  }
</style>
