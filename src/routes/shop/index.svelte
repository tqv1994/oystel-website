<script>
  import authStore from '$lib/api/auth/store';
  import Layout from '$lib/components/common/Layout.svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import OyCarousel from '$lib/components/common/OyCarousel.svelte';
  import Button, { Icon, Label } from '@smui/button';
  import IconButton, { Icon as Icon2 } from '@smui/button';
  import Svg from '@smui/common/Svg.svelte';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import Select, { Option } from '@smui/select';
  import { goto } from '$app/navigation';
  let openSignupModal, openSigninModal;
  let userModel = $authStore.user;
  let filterActive = 'Current Drops';
  let configPage = {
    header: {
      page: 'shop',
      transparent: true,
      theme: 'dark',
      currentMenu: 'shop',
    },
  };
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

<Layout config={configPage}>
  <div class="content">
    <section
      class="header-title full-width dark d-pt-115 d-pb-20 t-pt-80 t-pb-20 m-pt-90 m-pb-15"
    >
      <div class="content-wrap">
        <div class="container">
          <LayoutGrid class="p-0 mb-15">
            <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
              <div class="content-left">
                <div>
                  <span class="text-h3 d-mr-50 m-mr-60">Fashion Drop</span>
                  <Button variant="outlined"
                    ><Label>Shop the Drop</Label></Button
                  >
                </div>
                <h1 class="d-mb-30 d-mt-30 d-mt-25 m-mb-15">
                  Louis Vuitton Resort Collection Summer
                </h1>
                <p class="mb-0 mt-0 short-description">
                  First hand experience to craft your perfect vacation.
                </p>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
              <div class="shop-slides">
                <OyCarousel perPage={{ 800: 1 }} draggable={false}>
                  <span class="control" slot="left-control">
                    <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
                  </span>
                  <div
                    class="slide-content slide-item"
                    style="background-image: url(/img/slides/shop-slide-1.jpg)"
                  />
                  <div
                    class="slide-content slide-item"
                    style="background-image: url(/img/slides/shop-slide-1.jpg)"
                  />
                  <span class="control" slot="right-control">
                    <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                  </span>
                </OyCarousel>
              </div>
            </Cell>
          </LayoutGrid>
          <div class="divider" />
        </div>
      </div>
    </section>
    <section class="has-padding m-pt-40 m-pb-70" id="featured-drops">
      <LayoutGrid class="pt-0">
        <Cell span="12"><h3 class="text-h1 mt-0 mb-0">Featured Drops</h3></Cell>
      </LayoutGrid>
      <LayoutGrid class="pt-0">
        <Cell spanDevices={{ desktop: 5, tablet: 8, phone: 4 }} class="m-mb-45">
          <div class="item-featured-drop new">
            <div class="thumbnail dark d-mb-70 m-mb-40">
              <img class="" src="/img/feature-drops/item-1.jpg" alt="" />
              <div class="caption"><span>6 Packages left</span></div>
            </div>
            <div class="m-pr-45 m-pl-45">
              <p class="mt-0 m-mb-15 text-eyebrow">Fashion Drop</p>
              <div class="divider d-pb-30 m-pb-20" />
              <h4 class="text-h2 mt-0 mb-30 ">
                Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
              </h4>
              <Button class="hover-affect" variant="outlined"
                ><Label>Plan Your Trip</Label></Button
              >
            </div>
          </div>
        </Cell>
        <Cell
          spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
          class="d-mr--30 m-mr-0"
        >
          <div class="list-featured-drop">
            <LayoutGrid class="p-0">
              <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-40">
                    <img class="" src="/img/feature-drops/item-2.jpg" alt="" />
                    <div class="caption text-h5">
                      <span>11 Packages left</span>
                    </div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-20 " />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-15 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
                <div class="item-featured-drop coming">
                  <div class="thumbnail dark d-mb-60 m-mb-40">
                    <img class="" src="/img/feature-drops/item-3.jpg" alt="" />
                    <div class="caption"><span>Coming 07.02.21</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                    Fashion Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-20" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-15 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Set Reminder</Label></Button
                  >
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-40">
                    <img class="" src="/img/feature-drops/item-4.jpg" alt="" />
                    <div class="caption"><span>3 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-20" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-15 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 4 }}>
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-40">
                    <img class="" src="/img/feature-drops/item-4.jpg" alt="" />
                    <div class="caption"><span>3 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb-15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-20" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-15 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </Cell>
            </LayoutGrid>
          </div>
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
                <span class="">Channel Resort ‘21</span>
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
            class="light d-pl-100 d-pr-70"
          >
            <p class="text-body2 d-mb-100 d-mt-145 m-mt-40 m-mb-40">
              Join now for exclusive biweekly travel promotional drops, special
              content, and bespoke travel itineraries.
            </p>
            <div class="d-pb-35 m-pb-0" />
            <h4 class="mt-0 mb-20">Become an Oysteo Member now</h4>
            <h2 class="text-h1 mt-0 d-mb-40 m-mb-15">Never Miss a Drop</h2>
            <Button
              variant="outlined"
              class="hover-affect"
              on:click={callOpenSignupModal}
              ><Label class="text-button2">Sign Up Now</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="d-pt-90 t-pt-90 m-pt-50 trips-list-wrap">
      <div class="container">
        <div class="text-center d-mb-80 t-mb-80 m-mb-55 filter-wrap">
          <label class="d-mr-100 t-mr-100">Filter Curations</label>
          <Select bind:value={filterActive}>
            <Option value="Current Drops"><h5>Current Drops</h5></Option>
          </Select>
        </div>
        <div class="list-featured-drop">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-5.jpg" alt="" />
                    <div class="caption"><span>6 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Fashion Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-6.jpg" alt="" />
                    <div class="caption"><span>3 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-7.jpg" alt="" />
                    <div class="caption"><span>7 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Fashion Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Carolina Herrara Resort Collection - Designed and created
                    for longevity.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-2.jpg" alt="" />
                    <div class="caption"><span>4 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>

            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-8.jpg" alt="" />
                    <div class="caption"><span>2 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-9.jpg" alt="" />
                    <div class="caption"><span>11 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Fashion Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Louis Vuitton - Photographed by Inez & Vinoodh in Monaco
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-10.jpg" alt="" />
                    <div class="caption"><span>6 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Experience Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Exfoliating and polishing your skin with a finely ground
                    herbs.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="item-featured-drop">
                  <div class="thumbnail dark d-mb-60 m-mb-30">
                    <img class="" src="/img/feature-drops/item-11.jpg" alt="" />
                    <div class="caption"><span>3 Packages left</span></div>
                  </div>
                  <p class="mt-0 d-mb-25 m-mb15 text-eyebrow category">
                    Fashion Drop
                  </p>
                  <div class="divider d-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-25 m-mb-0 title">
                    Carolina Herrara Resort Collection - Designed and created
                    for longevity.
                  </h4>
                  <Button class="hover-affect" variant="outlined"
                    ><Label>Plan Your Trip</Label></Button
                  >
                </div>
              </a>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
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
    background-color: #000;
  }
  .shop-slides {
    height: 100%;
    width: 100%;
    --wrap-width: 100%;
  }

  #featured-drops{
    --mdc-layout-grid-gutter-desktop: 15px;
  }

  .shop-slides :global(.dots) {
    display: none;
  }

  .shop-slides :global(.carousel),
  .shop-slides :global(.slides),
  .shop-slides :global(.slides div) {
    height: 100%;
  }
  .shop-slides :global(.slide-item) {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .header-title .content-left {
    padding-top: 245px;
    padding-bottom: 70px;
  }
  .header-title .short-description {
    @include desktop{
      width: 80%;
    }
  }
  .trips-list-wrap {
    padding-bottom: 110px;
  }

  :global(.mdc-select.smui-select--standard .mdc-select__anchor) {
    height: 35px;
  }

  .trips-list-wrap .item-featured-drop .thumbnail {
    position: relative;
  }
  .trips-list-wrap .item-featured-drop .thumbnail .caption {
    text-transform: uppercase;
    position: absolute;
    bottom: -20px;
    width: calc(100% - 25px);
    background-color: #5078bc;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 0;
    font-size: 14px;
    line-height: 32px;
    letter-spacing: 0.1px;
  }
  .trips-list-wrap .item-featured-drop .thumbnail .caption span {
    width: 100%;
    display: inline-block;
    text-align: center;
  }
  .trips-list-wrap .item-featured-drop.coming .thumbnail .caption {
    background-color: #5078bc;
  }
  .trips-list-wrap .item-featured-drop:not(.new) {
    white-space: normal;
  }

  .trips-list-wrap .item-featured-drop:not(.new) .caption span {
    width: 100%;
    display: inline-block;
    text-align: center;
  }
  .trips-list-wrap .item-featured-drop .title {
    height: 55px;
    overflow: hidden;
  }
  .trips-list-wrap .item-featured-drop .divider::after {
    background-color: #ccc;
  }

  .trips-list-wrap .item-featured-drop {
    margin-bottom: 70px;
  }

  #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
    overflow-x: auto;
    grid-auto-flow: column;
  }

  #featured-drops .list-featured-drop{
      :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb) {
        background-color: #5078bc;
      }
  }

  @media (min-width: 1240px) {
    #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
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
    #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
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
    #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
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
    #featured-drops .list-featured-drop :global(.mdc-layout-grid__inner) {
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

  #signup-section{
    --mdc-layout-grid-gutter-desktop: 15px;
  }

  @media screen and (max-width: 949px) {
    .shop-slides :global(.carousel),
    .shop-slides :global(.slides),
    .shop-slides :global(.slides div) {
      height: auto;
    }
    .shop-slides :global(.slide-item) {
      padding-top: 70%;
    }
    .header-title .short-description {
      width: 100%;
    }
    .shop-slides :global(.wrap-control) {
      display: none;
    }
    .shop-slides {
      margin-bottom: 20px;
    }
    .shop-slides :global(.dots) {
      display: flex;
      justify-content: start;
      margin-top: 20px;
    }
    .header-title :global(.mdc-layout-grid__cell:first-child) {
      order: 2;
    }
    .header-title .content-left {
      padding-top: 15px;
      padding-bottom: 20px;
    }

    .filter-wrap label {
      display: block;
      margin-bottom: 30px;
    }

    .trips-list-wrap {
      padding-bottom: 30px;
    }

    .trips-list-wrap :global(.mdc-select .mdc-select__selected-text) {
      position: absolute;
      text-align: center;
    }

    .trips-list-wrap .item-featured-drop {
      margin-bottom: 50px;
    }

    .trips-list-wrap .item-featured-drop .title {
      height: auto;
    }

    .trips-list-wrap .item-featured-drop :global(.mdc-button) {
      display: none;
    }

    .trips-list-wrap .item-featured-drop .thumbnail .caption {
      padding: 15px 0;
      font-size: 9px;
      line-height: 10px;
      letter-spacing: 0.1px;
      bottom: -15px;
    }
  }

  @media (max-width: 389px) {
    .header-title .content-left .m-mr-60 {
      margin-right: 40px !important;
    }
  }
</style>
