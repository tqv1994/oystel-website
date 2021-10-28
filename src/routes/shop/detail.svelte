<script>
  import { onMount, afterUpdate, beforeUpdate } from 'svelte';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
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
  import QuickShopModal from '$lib/components/modals/QuickShopModal.svelte';
  let tabActive = 'Where to Stay';
  let openQuickShopModal = false;
  let configPage = {
    header: {
      page: 'shop-detail',
      transparent: false,
      theme: 'light',
      currentMenu: 'shop',
    },
  };

  function onScrollFixedTitleHeader() {
    if (document.documentElement.clientWidth > 839) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        document.querySelector('.header-title').classList.add('fixed');
      } else {
        document.querySelector('.header-title').classList.remove('fixed');
      }
    } else {
      document.querySelector('.header-title').classList.remove('fixed');
    }
  }
</script>

<svelte:window
  on:scroll={() => {
    onScrollFixedTitleHeader();
  }}
/>
<Layout config={configPage}>
  <div class="content">
    <section class="pt-30 d-pb-150 t-pb-150 m-pb-80 ">
      <div class="container">
        <LayoutGrid class="p-0">
          <Cell
            spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
            class="content-left"
          >
            <div class="get-the-look-item mb-30">
              <div class="thumbnail d-mb-50 m-mb-25">
                <img src="/img/products/detail-1.jpg" />
              </div>
              <LayoutGrid class="p-0">
                <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                  <h5 class="mt-0">Shop the look</h5>
                </Cell>
                <Cell
                  spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                  class="text-right"
                >
                  <IconButton style="top: -15px">
                    <Icon component={Svg} viewBox="0 0 16.583 16.583">
                      <g
                        id="Group_520"
                        data-name="Group 520"
                        transform="translate(0)"
                      >
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
                </Cell>
              </LayoutGrid>
              <div class="divider" />
            </div>
            <div class="d-pl-115">
              <div class="text-description-wrap mb-90">
                <p class="mt-0">
                  I went to The Bahamas on my first family cruise and my parents
                  actually went there on their honeymoon. Their stories of the
                  Freeport beaches and neighboring islands as well as our own
                  experience of a dip in the pool at The Atlantis, shopping in
                  Nassau, and sharing the magic of the island culture are
                  memorable. The Bahamas was one of my first island experiences
                  and it definitely didn’t disappoint. Complete with delightful
                  people, friendly attitudes, beautiful beaches, and weather
                  that was better than we could have imagined, The Bahamas kept
                  my beach heart happy and my travel soul fulfilled.
                </p>
                <p>
                  As with any other destination, you can find yourself feeling
                  like a tourist or embracing the role of traveling adventurer.
                  If you’re on a cruise in the Bahamas, maybe try to head
                  further from the ports and get access beyond the gates to the
                  true islands. If you’re flying in and staying at a grand
                  resort, give yourself some time to wander a bit further from
                  the edges of the property to check out life lived as a local.
                  Ditch the guidebooks and go rogue – you’re bound to find even
                  more beautiful beaches, genuine people, and delicious eats.
                </p>
                <p class="mb-0">
                  But, before you go, use this packing list for The Bahamas to
                  make sure you’re prepared for your island adventures.
                </p>
              </div>
              <div class="get-the-look-item  d-mb-40 t-mb-40 m-pb-40">
                <div class="thumbnail mb-25">
                  <img src="/img/products/detail-2.jpg" />
                </div>
                <LayoutGrid class="p-0 mb-20">
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <h5 class="mt-0 mb-0">Get the Look</h5>
                  </Cell>
                  <Cell
                    spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                    class="text-right"
                  >
                    <IconButton class="p-0 m-0 mt--15">
                      <Icon component={Svg} viewBox="0 0 16.583 16.583">
                        <g
                          id="Group_520"
                          data-name="Group 520"
                          transform="translate(0)"
                        >
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
                  </Cell>
                </LayoutGrid>
                <div class="divider" />
              </div>
              <LayoutGrid class="p-0 d-mb-45 t-mb-45 m-pb-40">
                <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
                  <div class="get-the-look-item m-pb-40 t-pb-0">
                    <div class="thumbnail mb-25">
                      <img src="/img/products/detail-3.jpg" />
                    </div>
                    <LayoutGrid class="p-0 mb-20">
                      <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                        <h5 class="mt-0 mb-0">Get the Look</h5>
                      </Cell>
                      <Cell
                        spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                        class="text-right"
                      >
                        <IconButton class="p-0 m-0 mt--15">
                          <Icon component={Svg} viewBox="0 0 16.583 16.583">
                            <g
                              id="Group_520"
                              data-name="Group 520"
                              transform="translate(0)"
                            >
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
                      </Cell>
                    </LayoutGrid>
                    <div class="divider" />
                  </div>
                </Cell>
                <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
                  <div class="get-the-look-item d-mt-80 t-mt-80">
                    <div class="thumbnail mb-25">
                      <img src="/img/products/detail-4.jpg" />
                    </div>
                    <LayoutGrid class="p-0 mb-20">
                      <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                        <h5 class="mt-0 mb-0">Get the Look</h5>
                      </Cell>
                      <Cell
                        spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                        class="text-right"
                      >
                        <IconButton class="p-0 m-0 mt--15">
                          <Icon component={Svg} viewBox="0 0 16.583 16.583">
                            <g
                              id="Group_520"
                              data-name="Group 520"
                              transform="translate(0)"
                            >
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
                      </Cell>
                    </LayoutGrid>
                    <div class="divider" />
                  </div>
                </Cell>
              </LayoutGrid>
              <div class="get-the-look-item mb-45">
                <div class="thumbnail mb-25">
                  <img src="/img/products/detail-5.jpg" />
                </div>
                <LayoutGrid class="p-0 mb-20">
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <h5 class="mt-0 mb-0">Get the Look</h5>
                  </Cell>
                  <Cell
                    spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                    class="text-right"
                  >
                    <IconButton class="p-0 m-0 mt--15">
                      <Icon component={Svg} viewBox="0 0 16.583 16.583">
                        <g
                          id="Group_520"
                          data-name="Group 520"
                          transform="translate(0)"
                        >
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
                  </Cell>
                </LayoutGrid>
                <div class="divider" />
              </div>
              <div class="text-description-wrap">
                <p class="m-0">
                  The Bahamas offers the novelty of island culture, natural
                  sights, gorgeous beaches, animal friends, and nightlife
                  aplenty. Whether you’re shopping the straw markets in Nassau,
                  getting your festival on at Junkanoo, or letting it ride
                  amidst the tables in Atlantis, you’re bound to be bit by the
                  island vibe and leave ready to return soon.
                </p>
              </div>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
            class="content-right"
          >
            <div
              class="header-title d-pt-100 d-pb-100 d-pl-120 t-pt-60 t-pb-50 t-pl-60"
            >
              <LayoutGrid class="p-0">
                <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                  <p class="text-eyebrow">Fashion</p>
                </Cell>
                <Cell
                  spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}
                  class="text-right"
                >
                  <IconButton class="mt--15">
                    <Icon component={Svg} viewBox="0 0 16.833 24.384">
                      <g
                        id="Group_440"
                        data-name="Group 440"
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
              <h1 class="d-mb-30 m-mb-20">Best Beach Looks for a Post-Covid Summer</h1>
              <p class="text-input d-mb-30 m-mb-25">
                Curated by: Aureta Thomollari | Oysteo Partner
              </p>
              <Button
                variant="outlined"
                class="t-block m-none"
                on:click={() => {
                  openQuickShopModal = true;
                }}><label>Quick Shop the Edit</label></Button
              >
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </section>
    <section class="recommended-wrap d-mb-50 t-mb-50 m-mb-50">
      <div class="container">
        <h1 class="mt-0 d-mb-90 t-mb-90 m-mb-25">Recommended</h1>
        <div class="products-list">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="#">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img
                      class=""
                      src="/img/products/recommended-1.jpg"
                      alt=""
                    />
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
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Fashion
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 t-block m-none">
                    Curated by: Elise Cook | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="#">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img
                      class=""
                      src="/img/products/recommended-2.jpg"
                      alt=""
                    />
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
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 t-block m-none">
                    Curated by: Pierre Schuester | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="#">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img
                      class=""
                      src="/img/products/recommended-1.jpg"
                      alt=""
                    />
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
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Fashion
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 t-block m-none">
                    Curated by: Chelsea Yamase | Oysteo Partner
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
              <a href="#">
                <div class="product-item">
                  <div class="thumbnail dark d-mb-25 t-mb-25 m-mb-20">
                    <img
                      class=""
                      src="/img/products/recommended-2.jpg"
                      alt=""
                    />
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
                  <p class="mt-0 d-mb-25 t-mb-25 m-mb-15 text-eyebrow">
                    Travel
                  </p>
                  <div class="divider d-pb-30 t-pb-30 m-pb-25" />
                  <h4 class="text-h2 mt-0 d-mb-30 t-mb-30 m-mb-25 title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h4>
                  <p class="mt-0 mb-0 t-block m-none">
                    Curated by: Jan Wohl | Oysteo Advisor
                  </p>
                </div>
              </a>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
  </div>
</Layout>
<QuickShopModal bind:open={openQuickShopModal} />

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
    z-index: 2;
  }
  @include desktop {
    .header-title {
      padding-right: var(--mdc-layout-grid-margin-desktop);
    }
    .header-title:global(:not(.fixed)) {
      margin-top: 80px;
      margin-right: calc(var(--mdc-layout-grid-margin-desktop) * (-1));
    }
  }

  .header-title:global(.fixed) {
    position: fixed;
    top: 50% !important;
    left: auto !important;
    transform: translateY(-50%);
    width: auto;
  }

  @media screen and (min-width: 1441px) {
    .header-title:global(.fixed) {
      margin-right: calc(calc(100vw / 2 - 1440px / 2));
    }
  }
  @media screen and (max-width: 1440px) and (min-width: 950px) {
    .header-title:global(.fixed) {
      padding-right: 0;
    }
  }

  .get-the-look-item :global(.mdc-layout-grid) {
    --mdc-layout-grid-gutter-desktop: 0;
    --mdc-layout-grid-gutter-tablet: 0;
    --mdc-layout-grid-gutter-phone: 0;
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

  .product-item .title-wrap .divider:after {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .products-list :global(.product-item .thumbnail) {
    position: relative;
  }

  .products-list :global(.product-item .thumbnail .btn-favorite) {
    position: absolute;
    filter: brightness(1);
  }
  .products-list :global(.product-item .thumbnail .btn-favorite .like) {
    display: block;
  }
  .products-list :global(.product-item .thumbnail .btn-favorite .liked) {
    display: none;
  }
  .products-list :global(.product-item .thumbnail .btn-favorite:hover .like) {
    display: none;
  }
  .products-list :global(.product-item .thumbnail .btn-favorite:hover .liked) {
    display: block;
  }

  .divider:after {
    background-color: #000;
  }

  :global(.page.page-shop-detail .mdc-icon-button) {
    top: 5px;
  }

  :global(.page.page-shop-detail .header-title) {
    top: -200px;
    transition: top 2s ease;
  }
  :global(#header.fixed) {
    animation: fadeIn 2s ease;
  }

  @include mobile {
    .content {
      --mdc-typography-headline5-font-size: 14px;
    }
    :global(.page-shop-detail .content-right) {
      order: 2;
    }
    :global(.page-shop-detail .content-left) {
      order: 4;
    }
    .header-title {
      position: static;
      transform: translateY(0);
      background-color: transparent;
      z-index: auto;
    }
    .recommended-wrap .product-item .title {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0;
    }
  }
  /*@media  (max-width: 1239px){*/
  /*    :global(.fixed, .is_sticky){*/
  /*        position: static !important;*/
  /*    }*/
  /*}*/
</style>
