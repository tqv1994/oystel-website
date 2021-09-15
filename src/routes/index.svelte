<script lang="ts">
  import authStore from '$lib/stores/auth';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Svg from '@smui/common/Svg.svelte';
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label, Icon } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { onMount } from 'svelte';
  import Layout from '$lib/components/common/Layout.svelte';
  import { ExperienceModel } from '$lib/models/experience';
  import { DestinationModel } from '$lib/models/destination';
  import { DropModel } from '$lib/models/drop';
  import { goto } from '$app/navigation';
  let openSignupModal, openSigninModal;
  let userModel = $authStore.user;
  let configPage = {
    header: {
      page: 'home',
      transparent: true,
      theme: 'dark',
    },
  };
  let itemsCuratedForYou: ExperienceModel[] = [];
  let itemsFromOurAdvisor: any[] = [];
  let itemsFeaturedDrop: DropModel[] = [];
  function getUserAfterSignup(event: any) {
    userModel = event.detail.user;
  }

  onMount(async () => {
    const res = await fetch('/api/page', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const content = await res.json();
      if (content.itemsCuratedForYou) {
        itemsCuratedForYou = [];
        content.itemsCuratedForYou.map((item) => {
          itemsCuratedForYou.push(new ExperienceModel(item));
        });
      }
      if (content.itemsFromOurAdvisor) {
        itemsFromOurAdvisor = [];
        content.itemsFromOurAdvisor.map((item) => {
          if (item.type === 'experience') {
            itemsFromOurAdvisor.push(new ExperienceModel(item));
          } else if (item.type === 'destination') {
            itemsFromOurAdvisor.push(new DestinationModel(item));
          }
        });
      }
      if (content.itemsFeaturedDrop) {
        itemsFeaturedDrop = [];
        content.itemsFeaturedDrop.map((item: any) => {
          itemsFeaturedDrop.push(new DropModel(item));
        });
      }
      // authModel = authStore.user;
      // doAfterSignup(user);
      return;
      // return goto('/me').then(auth.signOut);
    }
  });

  function callOpenSignupModal() {
    if (!userModel) {
      openSignupModal = true;
      openSigninModal = false;
    }
    openSignupModal = true;
    openSigninModal = false;
  }

  function callOpenSigninModal() {
    if (!userModel) {
      openSignupModal = false;
      openSigninModal = true;
    }
  }
</script>

<Layout bind:config={configPage}>
  <div class="content">
    <section id="slider" class="full-width">
      <OyCarousel perPage={{ 800: 1 }} draggable={false} isFadeIn={true}>
        <span class="control m-none" slot="left-control">
          <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
        </span>
        <div
          class="slide-content slide-item"
          style="background-image: url(/img/slides/slide-01.jpg);--background-img:url(/img/slides/slide-01.jpg);"
        >
          <div class="content-wrap">
            <div class="dark text-box">
              <LayoutGrid class="pb-0">
                <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
                  ><h3
                    class="mb-0 m-pb-0 m-mb-25 m-block"
                    style="display: inline-block; margin-right: 30px"
                  >
                    Welcome to Oysteo
                  </h3>
                  <Button variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  ></Cell
                >
              </LayoutGrid>
              <LayoutGrid class="pb-0 m-pt-35 d-pt-30">
                <Cell span="12"
                  ><h1 class="mt-0 mb-0">
                    Your lifestyle concierge platform for incredible experiences
                    and luxury resort fashion.
                  </h1></Cell
                >
              </LayoutGrid>
              <LayoutGrid class="pt-45 m-none">
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Advisors
                  </h4>
                  <p class="mt-0">
                    First hand experience to craft your perfect vacation.
                  </p>
                </Cell>
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Experiences
                  </h4>
                  <p class="mt-0">
                    Bespoke itineraries from our leading tastemakers.
                  </p>
                </Cell>
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Fashion
                  </h4>
                  <p class="mt-0">
                    Purchase luxury goods from curated collections.
                  </p>
                </Cell>
              </LayoutGrid>
            </div>
          </div>
        </div>
        <div
          class="slide-content slide-item slide-item-2 is-not-active"
          style="background-image: url(/img/slides/slide-02.jpg)"
        >
          <div class="content-wrap">
            <div class="dark text-box">
              <LayoutGrid class="pb-0">
                <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}
                  ><h3
                    class="mb-0 m-pb-0 m-mb-25 m-block"
                    style="display: inline-block; margin-right: 30px"
                  >
                    Welcome to Oysteo
                  </h3>
                  <Button variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  ></Cell
                >
              </LayoutGrid>
              <LayoutGrid class="pb-0 m-pt-35 d-pt-30">
                <Cell span="12"
                  ><h1 class="mt-0 mb-0">
                    Your lifestyle concierge platform for incredible experiences
                    and luxury resort fashion.
                  </h1></Cell
                >
              </LayoutGrid>
              <LayoutGrid class="pt-45 m-none">
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Advisors
                  </h4>
                  <p class="mt-0">
                    First hand experience to craft your perfect vacation.
                  </p>
                </Cell>
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Experiences
                  </h4>
                  <p class="mt-0">
                    Bespoke itineraries from our leading tastemakers.
                  </p>
                </Cell>
                <Cell>
                  <h4 style="text-transform: uppercase" class="mt-0 mb-15">
                    Fashion
                  </h4>
                  <p class="mt-0">
                    Purchase luxury goods from curated collections.
                  </p>
                </Cell>
              </LayoutGrid>
            </div>
          </div>
        </div>
        <span class="control m-none" slot="right-control">
          <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
        </span>
      </OyCarousel>
    </section>
    <section class="has-padding m-pt-40 m-pb-70" id="featured-drops">
      <LayoutGrid class="pt-0">
        <Cell span="12"><h3 class="text-h1 mt-0 mb-0">Featured Drops</h3></Cell>
      </LayoutGrid>
      <LayoutGrid class="pt-0">
        <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }} class="m-mb-45">
          {#if itemsFeaturedDrop.length > 0}
            <div class="item-featured-drop new">
              <div class="thumbnail dark d-mb-70 m-mb-40">
                <div class="image-cover" style="padding-top: calc(633/430 * 100%)">
                  <img src={itemsFeaturedDrop[0].featuredPhoto} />
                </div>
                <div class="caption">
                  <span
                    >{itemsFeaturedDrop[0].products.length} Packages left</span
                  >
                </div>
              </div>
              <div class="m-pr-45 m-pl-45">
                <p class="mt-0 m-mb-15 text-eyebrow">Fashion Drop</p>
                <div class="divider d-pb-30 m-pb-20" />
                <h4 class="text-h2 mt-0 mb-30 ">
                  {itemsFeaturedDrop[0].title}
                </h4>
                <Button
                  on:click={() => {
                    goto(itemsFeaturedDrop[0].link);
                  }}
                  class="hover-affect"
                  variant="outlined"><Label>Plan Your Trip</Label></Button
                >
              </div>
            </div>
          {/if}
        </Cell>
        <Cell
          spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}
          class="d-mr--30 m-mr-0"
        >
          {#if itemsFeaturedDrop.length > 1}
            <div class="list-featured-drop">
              <LayoutGrid class="p-0">
                {#each itemsFeaturedDrop as item, i}
                  {#if i > 0}
                    <Cell spanDevices={{ desktop: 4, tablet: 4, phone: 4 }}>
                      <div class="item-featured-drop">
                        <div class="thumbnail dark d-mb-60 m-mb-40">
                          <div class="image-cover" style="padding-top: calc(356/227 * 100%)">
                            <img class="" src={item.featuredPhoto} alt="" />
                          </div>
                          <div class="caption text-h5">
                            <span>{item.products.length} Packages left</span>
                          </div>
                        </div>
                        <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                          Experience Drop
                        </p>
                        <div class="divider d-pb-30 m-pb-20 " />
                        <h4 class="text-h2 mt-0 d-mb-25 m-mb-15 title">
                          {item.title}
                        </h4>
                        <Button
                          class="hover-affect"
                          variant="outlined"
                          on:click={() => {
                            goto(item.link);
                          }}><Label>Plan Your Trip</Label></Button
                        >
                      </div>
                    </Cell>
                  {/if}
                {/each}
              </LayoutGrid>
            </div>
          {/if}
        </Cell>
      </LayoutGrid>
    </section>
    <section
      class="d-pt-55 d-pb-70 t-pt-55 t-pb-70 m-pt-20 m-pb-40 full-width"
      id="signup-section"
      style="background-color: #F0F7F8"
    >
      <div class="content-wrap">
        <LayoutGrid>
          <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
            <div class="thumbnail dark multi-images-affect">
              <img src="/img/signup-img.jpg" alt="" />
              <img src="/img/signup-img-2.jpg" alt="" />
              <div class="caption">
                <span>Channel Resort ‘21</span>
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
            class="light d-pl-100 d-pr-70"
          >
            <h3 class="d-mb-100 d-mt-100 m-mt-40 m-mb-40">
              Join now for exclusive biweekly travel promotional drops, special
              content, and bespoke travel itineraries.
            </h3>
            <div class="d-pb-100 m-pb-0" />
            <h5>Become an Oysteo Member now</h5>
            <h2 class="text-h1 mt-30 d-mb-40 m-mb-15">Never Miss a Drop</h2>
            <Button
              variant="outlined"
              class="hover-affect"
              on:click={callOpenSignupModal}><Label>Sign Up Now</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="has-padding m-pt-48" id="experience-section">
      <LayoutGrid>
        <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}>
          {#if itemsCuratedForYou.length > 0}
            <div class="item-experience featured text-center">
              <a href={itemsCuratedForYou[0].link}>
                <div class="thumbnail">
                  <div class="image-cover" style="padding-top: calc(628/483 * 100%)">
                    <img src={itemsCuratedForYou[0].featuredPhoto} />
                  </div>
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
              </a>
              <div class="d-pl-80 d-pr-80">
                <p class="text-h1 mt-40 d-mb-25 m-mb-15">Curated for You</p>
                <div class="divider d-pb-25 m-pb-15" />
              </div>
              <p class="mt-0 text-eyebrow">Featured Experience</p>
              <a href={itemsCuratedForYou[0].link}>
                <h4 class="text-h2 mt-20">{itemsCuratedForYou[0].title}</h4>
              </a>
            </div>
          {/if}
        </Cell>
        <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
          <LayoutGrid class="list-experiences m-p-0">
            {#if itemsCuratedForYou.length > 1}
              {#each itemsCuratedForYou as item, index}
                {#if index > 0}
                  <Cell spanDevices={{ desktop: 6, phone: 2 }}>
                    <a href={item.link}>
                      <div class="item-experience">
                        <div class="thumbnail">
                          <div class="image-cover" style="padding-top: calc(423/329 * 100%)">
                            <img src={item.featuredPhoto} />
                          </div>
                          <IconButton class="btn-favorite">
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
                        <p class="text-eyebrow d-mt-25 m-mt-20 mb-0">
                          Experience
                        </p>
                        <div class="divider d-mt-25 d-pb-30 m-mt-15 m-pb-25" />
                        <h4 class="text-h2 title mt-0">
                          {item.title}
                        </h4>
                      </div>
                    </a>
                  </Cell>
                {/if}
              {/each}
            {/if}
          </LayoutGrid>
        </Cell>
      </LayoutGrid>
    </section>
    <section id="from-advisors" class="pb-60">
      <LayoutGrid class="pt-0 pb-0">
        <Cell span="12">
          <h2 class="text-h1 mt-0">From our Advisors</h2>
        </Cell>
      </LayoutGrid>

      <LayoutGrid class="pt-0 pb-0">
        {#if itemsFromOurAdvisor.length > 0}
          {#each itemsFromOurAdvisor as item, index}
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <div class="item-experience">
                <a href={item.link}>
                  <div class="thumbnail">
                    <div class="image-cover" style="padding-top: calc(410/315 * 100%)">
                      <img src={item.featuredPhoto} />
                    </div>
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
                  <p class="text-eyebrow d-mt-25 m-mt-20 mb-0">
                    {item.type == 'experience' ? 'Experience' : 'Destination'}
                  </p>
                  <div class="divider d-mt-25 m-mt-15 d-pb-30 m-pb-20" />
                  <h4 class="text-h2 mt-0 title">
                    {item.type == 'destination' ? item.name : item.title}
                  </h4>
                </a>
              </div>
            </Cell>
          {/each}
        {/if}
      </LayoutGrid>
    </section>
  </div>
</Layout>
<SignupModal
  bind:open={openSignupModal}
  bind:authModel={userModel}
  on:close={callOpenSigninModal}
/>
<SigninModal
  bind:open={openSigninModal}
  bind:authModel={userModel}
  on:close={callOpenSignupModal}
/>

<style>
  @media screen and (max-width: 1239px) {
    #slider :global(.dots) {
      position: absolute;
      top: 250px;
      left: 50%;
      transform: translateX(-50%);
      right: auto;
      justify-content: left;
      width: calc(100vw - 30px);
    }
  }
  @media screen and (max-width: 599px) {
    .list-experiences .item-experience .text-h2,
    .list-experiences .item-experience h2,
    #from-advisors .item-experience .text-h2,
    #from-advisors .item-experience .h2 {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0;
    }
    #slider .slide-item.slide-item-2 {
      background-position: right;
    }
  }
  .list-featured-drop :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
  }

  @media (min-width: 1240px) {
    .list-featured-drop :global(.mdc-layout-grid__inner) {
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
    .list-featured-drop :global(.mdc-layout-grid__inner) {
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
  @media (max-width: 904px) and (min-width: 600px) {
    .list-featured-drop :global(.mdc-layout-grid__inner) {
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
  @media (max-width: 599px) {
    .list-featured-drop :global(.mdc-layout-grid__inner) {
      grid-auto-columns: minmax(
        calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)),
        1fr
      );
      grid-template-columns: repeat(
        auto-fill,
        minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr)
      );
    }
  }
</style>
