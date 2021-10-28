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
  let openSignupModal, openSigninModal;
  let userModel = $authStore.user;
  let filterActive = 'All';
  let configPage = {
    header: {
      page: 'shop',
      transparent: true,
      theme: 'light',
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
      class="header-title full-width light d-pt-115 d-pb-20 t-pt-80 t-pb-20 m-pt-90 m-pb-15"
    >
      <div class="content-wrap">
        <div class="container">
          <LayoutGrid class="p-0 mb-15">
            <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
              <div class="content-left">
                <div class="d-mb-55 m-mb-40">
                  <span class="text-h3 m-0">Featured Article</span>
                </div>
                <h1 class="m-0 d-mb-15 m-mb-20">Best Beach Looks for a Post-Covid Summer</h1>
                <p class="mt-0 d-mb-30 t-mb-30 m-mb-0 short-description">
                  Curated by: Aureta Thomollari | Oysteo Partner
                </p>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
              <div
                class="thumbnail"
                style="background-image: url(/img/shop/shop-thumbnail.jpg)"
              />
            </Cell>
          </LayoutGrid>
          <div class="divider t-block m-none" />
        </div>
      </div>
    </section>
    <section class="d-pt-60 t-pt-60 m-pt-40" id="latest-wrap">
      <div class="container d-pl-160 d-pr-160 t-pl-80 t-pr-80 d-pb-80 t-pb-80">
        <h1 class="mt-0 mb-50">The Latest</h1>
        <div class="latest-list">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <a href="/shop/detail">
                <div class="latest-item t-mb-0 m-mb-50">
                  <div class="thumbnail d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-1.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Fashion
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 title t-mb-30 m-mb-25">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 d-mb-0">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
              <a href="/shop/detail">
                <div class="latest-item t-mb-0 m-mb-50">
                  <div class="thumbnail d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-2.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 text-eyebrow t-mb-25 m-mb-15">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 d-mb-0">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </div>
              </a>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
      <div class="container">
        <div class="divider" />
      </div>
    </section>
    <section
      class="d-pt-90 d-pb-45 t-pt-90 t-pb-45 m-pb-45 m-pt-50 products-list-wrap"
    >
      <div class="container">
        <div class="text-center d-mb-80 t-mb-80 m-mb-55 filter-wrap">
          <label class="d-mr-100 t-mr-100">Filter Curations</label>
          <Select bind:value={filterActive}>
            <Option value="All"><h5>All</h5></Option>
          </Select>
        </div>
        <div class="products-list">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-3.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">Curated by: Jan Wohl | Oysteo Advisor</p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-4.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Shea Marie | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-5.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel Gear
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Charles Moore | Oysteo Advisor
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-6.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Accessories
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Janet Wohl | Oysteo Advisor
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-7.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel Gear
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Elise Cook | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-8.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Pierre Schuester | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-9.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Top 10 Lists
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">
                    Curated by: Chelsea Yamase | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="/shop/detail">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img class="" src="/img/shop/curated-looks-10.jpg" alt="" />
                  </div>
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Accessories
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 m-none">Curated by: Jan Wohl | Oysteo Advisor</p>
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
    background-color: #f0f7f8;
  }
  .header-title .thumbnail {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .header-title .content-left {
    padding-top: 315px;
    padding-bottom: 70px;
  }
  .header-title .short-description {
    @include desktop{
      width: 80%;
    }
  }

  .header-title .divider:after,
  #latest-wrap .divider:after {
    background-color: #000;
  }

  .latest-list .latest-item .title {
    height: 30px;
    overflow: hidden;
  }

  #latest-wrap .latest-list .latest-item .divider:after,
  .products-list .product-item .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .products-list .product-item .title {
    @include desktop{
      height: 50px;
      overflow: hidden;
    }
  }

  .products-list .product-item {
    margin-bottom: 40px;
  }

  :global(.mdc-select.smui-select--standard .mdc-select__anchor) {
    height: 35px;
  }

  @media screen and (max-width: 949px) {
    .header-title .thumbnail {
      padding-bottom: 100%;
      height: auto;
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

    .latest-list .latest-item .title {
      height: 25px;
      overflow: hidden;
    }
  }
</style>
