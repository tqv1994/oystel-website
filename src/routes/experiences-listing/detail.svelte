<script>
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
  let configPage = {
    header: {
      page: 'experience-detail',
      transparent: true,
      theme: 'light',
      currentMenu: 'experiences',
    },
  };
  let searchModel
  let tabActive = 'Where to Stay';
  let openProductSlide = false;
  let isMobile = false;
  onMount(async () => {
    await getData()
  });

  async function getData(){
    let url = new URL(location.href);
    searchModel = {
      id: url.searchParams.get('id'),
    };
    const res = await fetch('/api/pages/experience/detail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if(res.ok){
      console.log("FETCH")
      return
    }else{
      const error = await res.json();
      if (error.statusCode == 401) {
        localStorage.setItem('token', '');
        authStore.set({ user: undefined });
        getData();
      }
    }
  }
  
  function onScrollFixedHeader() {
    if (document.documentElement.clientWidth > 839) {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
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
<Layout config={configPage}>
  <div class="content">
    <section class="header-title d-pt-90 d-pb-25 m-pt-90 m-pb-25 full-width">
      <div class="content-wrap">
        <div class="container">
          <LayoutGrid class="p-0 hidden-on-sticky">
            <Cell spanDevices={{ desktop: 7, phone: 4, tablet: 8 }}>
              <div class="experience-detail-image">
                <div
                  class="thumbnail"
                  style="background-image: url(/img/experiences/experience-detail-image.jpg)"
                />
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 5, phone: 4, tablet: 8 }}>
              <div class="d-pt-90 d-pb-100">
                <p class="text-eyebrow">Experience Country</p>
                <h1>The best destination dolor sit amet.</h1>
                <p class="mb-30 short-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  ac volutpat neque. Suspendisse varius vitae sem in elementum.
                  Pellentesque efficitur est lectus, una vehicula scelerisque
                  magna congue a.
                </p>
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
                <IconButton>
                  <Icon component={Svg} viewBox="0 0 16.249 14.588">
                    <g
                      id="Icon_-_Heart"
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
                <IconButton>
                  <Icon component={Svg} viewBox="0 0 16.249 14.588">
                    <g
                      id="Icon_-_Heart"
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
                </IconButton>
              </div>
              <h1 class="mb-0 mt-40">The best destination dolor sit amet.</h1>
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
            <h2 class="mt-0">Section Title</h2>
            <div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque congue nisi libero, quis vestibulum augue mollis
                vitae. Vestibulum dapibus ac eros eleifend imperdiet.
                Suspendisse potenti. Vivamus vel finibus dui. Integer nec
                hendrerit lectus, in vestibulum purus. Mauris imperdiet
                tincidunt dui, eu scelerisque leo finibus vitae. Morbi laoreet
                et tellus id cursus. Vestibulum mollis interdum sapien. Mauris
                faucibus vel nisl quis placerat.
              </p>
              <p>
                In efficitur rutrum suscipit. Pellentesque et arcu lacus.
                Integer quis risus eu ex accumsan vulputate at ullamcorper urna.
                Nunc vehicula pulvinar lacus a scelerisque. Integer ornare
                ornare lacus, eu laoreet mauris rhoncus sit amet. Phasellus
                feugiat at diam id cursus. Praesent et metus vitae lorem varius
                congue.
              </p>
              <p>
                Donec volutpat aliquet purus, quis pellentesque orci luctus vel.
                Vestibulum at leo quam. Quisque a eros ac dolor mattis gravida.
                Nam auctor, massa at gravida consequat, erat augue tempor nulla,
                eget bibendum metus metus id massa. Nulla facilisi. Curabitur
                consectetur convallis faucibus. Etiam sit amet ligula
                consectetur, bibendum dui at, consectetur ligula. Sed vel
                dapibus lacus, a molestie tortor. Curabitur quis ipsum quis enim
                eleifend luctus. Suspendisse nec pretium diam, et dictum eros.
                Praesent lectus nisi, facilisis vestibulum quam at, lobortis
                mollis turpis. Suspendisse pellentesque egestas risus in
                rhoncus. Morbi tincidunt sit amet dolor sed fringilla. Curabitur
                vel volutpat lectus, vel aliquam lorem. Nullam sed pretium quam,
                ut porttitor mauris. Mauris semper porta lectus vel aliquam. Nam
                efficitur vitae enim at dignissim. In gravida blandit nunc, non
                sagittis lectus tempus at. Sed sem elit, pellentesque a varius
                eget, consequat vel tellus. Vivamus feugiat non metus id dictum.
                Vivamus dolor odio, rhoncus nec lacus eget, lobortis efficitur
                enim. Donec congue iaculis dolor, nec imperdiet ex ultricies
                vel. Curabitur eu sollicitudin justo. Curabitur porttitor elit
                pharetra erat eleifend, et aliquet nibh elementum. Quisque eros
                Leo, vestibulum et mauris ut, laoreet scelerisque leo.
              </p>
            </div>
            <LayoutGrid class="p-0 d-pt-60 d-pb-40">
              <Cell spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}>
                <div class="thumbnail">
                  <img src="/img/experiences/experience-content.jpg" alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                  do.
                </p>
              </Cell>
              <Cell
                spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
                class="m-none"
              >
                <div class="thumbnail">
                  <img src="/img/experiences/experience-content-2.jpg" alt="" />
                </div>
                <p>
                  Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                  do.
                </p>
              </Cell>
            </LayoutGrid>
            <h2 class="mt-0">Section Title</h2>
            <div>
              <p>
                Integer lorem metus, ornare sed neque sit amet, tincidunt
                volutpat lacus. Integer in justo tempus, egestas mi ornare,
                lobortis lacus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Mauris ut metus quis est euismod ornare.
                Aliquam tincidunt arcu sed eros tristique scelerisque. Nulla
                ultricies, sapien vulputate viverra dapibus, odio nisl tempus
                lacus, id mollis sapien est faucibus lectus. Nam neque nibh,
                dapibus sed pharetra nec, bibendum ut metus. Fusce tincidunt, ex
                vitae sodales commodo, lorem dolor mollis tortor, nec suscipit
                nibh neque ac ipsum. Maecenas mollis est eu ipsum pretium, a
                porta nulla congue. Suspendisse consequat risus in ligula
                gravida, nec gravida justo vulputate. Maecenas commodo nunc quis
                diam iaculis egestas. Sed eget dui et neque porta finibus a
                vitae massa. Phasellus imperdiet urna sit amet mauris convallis
                ullamcorper.
              </p>
              <p>
                Suspendisse et mi interdum, porta mi at, luctus nunc.
                Suspendisse sed hendrerit tortor, ac faucibus enim. Vivamus a
                euismod augue. Sed pretium ultrices mattis. Maecenas massa arcu,
                fermentum in pulvinar in, ultricies id libero. Praesent risus
                est, iaculis in dapibus id, luctus sit amet mauris. Pellentesque
                ut mauris nec erat vehicula iaculis quis quis risus. Maecenas
                consequat metus sed finibus placerat. Nulla sed tellus libero.
                Nulla viverra vitae lectus in tincidunt. Fusce ac placerat
                dolor. Mauris lobortis suscipit ultrices. In neque nisl,
                pharetra in eleifend tempor, aliquam eu velit. Sed ut nulla eu
                neque tempus hendrerit. Nunc sed leo hendrerit, dictum Leo
                vitae, ultrices magna. Aenean nec odio et mi egestas dignissim.
              </p>
              <p>
                Maecenas elementum, metus in ultricies pretium, justo ex
                bibendum ligula, a tincidunt nulla mi nec neque. Morbi fringilla
                sollicitudin tempus. Ut mattis viverra blandit. Vivamus leo
                dolor, aliquam at leo et, vehicula dapibus sem. Vivamus sed est
                lectus. Cras sapien neque, commodo vitae diam vitae, pharetra
                viverra tellus. Sed a sapien vel odio ultrices efficitur. Sed
                libero justo, interdum vitae erat ut, vulputate pellentesque
                orci.
              </p>
              <p>
                Etiam ut semper erat. Sed rhoncus erat quis suscipit vehicula.
                Curabitur ultricies, leo a lacinia pulvinar, nisl enim finibus
                justo, sit amet placerat lorem nulla ac sapien. Sed nec massa
                tellus. Phasellus quis erat ac enim sodales maximus. Praesent a
                rutrum ex. Donec feugiat faucibus risus ut aliquam. Duis eu
                lorem felis. Vivamus eget turpis vel mauris varius hendrerit
                vitae sed leo. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Praesent eu ipsum
                bibendum, bibendum ante ornare, commodo dolor. Etiam ut augue
                molestie, fringilla metus a, eleifend nunc. Nunc vel lorem
                volutpat.
              </p>
            </div>
            <div class="d-none m-block m-pt-80 m-pb-10">
              <div class="thumbnail">
                <img src="/img/experiences/experience-content.jpg" alt="" />
              </div>
              <p>
                Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed do.
              </p>
            </div>
            <div class="d-none m-block">
              <p>
                Maecenas elementum, metus in ultricies pretium, justo ex
                bibendum ligula, a tincidunt nulla mi nec neque. Morbi fringilla
                sollicitudin tempus. Ut mattis viverra blandit. Vivamus leo
                dolor, aliquam at leo et, vehicula dapibus sem. Vivamus sed est
                lectus. Cras sapien neque, commodo vitae diam vitae, pharetra
                viverra tellus. Sed a sapien vel odio ultrices efficitur. Sed
                libero justo, interdum vitae erat ut, vulputate pellentesque
                orci.
              </p>
              <p>
                Etiam ut semper erat. Sed rhoncus erat quis suscipit vehicula.
                Curabitur ultricies, leo a lacinia pulvinar, nisl enim finibus
                justo, sit amet placerat lorem nulla ac sapien. Sed nec massa
                tellus. Phasellus quis erat ac enim sodales maximus. Praesent a
                rutrum ex. Donec feugiat faucibus risus ut aliquam. Duis eu
                lorem felis. Vivamus eget turpis vel mauris varius hendrerit
                vitae sed leo. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Praesent eu ipsum
                bibendum, bibendum ante ornare, commodo dolor. Etiam ut augue
                molestie, fringilla metus a, eleifend nunc. Nunc vel lorem
                volutpat.
              </p>
            </div>
          </Cell>
          <Cell
            spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}
            class="m-none"
          >
            <h1 class="mt-0 mb-40">My Favorites Places</h1>
            <div class="experiences-list">
              <LayoutGrid class="p-0">
                <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                  <a href="/experiences-listing/detail">
                    <div class="experience-item">
                      <div class="thumbnail">
                        <img src="/img/experiences/experience-7.jpg" alt="" />
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
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-left">India</p></Cell
                        >
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-right">
                            Experience
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h2 title">
                        Australian Masterchef Restaurant Tour - Starting in
                        Sydney.
                      </h4>
                      <p class="short-text m-none">
                        Lorem ipsum dolor sit sen amet, consect adipiscing elit,
                        sed do.
                      </p>
                    </div>
                  </a>
                </Cell>
                <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                  <a href="/experiences-listing/detail">
                    <div class="experience-item">
                      <div class="thumbnail">
                        <img src="/img/experiences/experience-9.jpg" alt="" />
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
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-left">India</p></Cell
                        >
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-right">
                            Experience
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h2 title">
                        Australian Masterchef Restaurant Tour - Starting in
                        Sydney.
                      </h4>
                      <p class="short-text m-none">
                        Lorem ipsum dolor sit sen amet, consect adipiscing elit,
                        sed do.
                      </p>
                    </div>
                  </a>
                </Cell>
                <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 4 }}>
                  <a href="/experiences-listing/detail">
                    <div class="experience-item">
                      <div class="thumbnail">
                        <img src="/img/experiences/experience-17.jpg" alt="" />
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
                      <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-left">India</p></Cell
                        >
                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                          ><p class="text-eyebrow text-right">
                            Experience
                          </p></Cell
                        >
                      </LayoutGrid>
                      <div class="divider" />
                      <h4 class="text-h2 title">
                        Australian Masterchef Restaurant Tour - Starting in
                        Sydney.
                      </h4>
                      <p class="short-text m-none">
                        Lorem ipsum dolor sit sen amet, consect adipiscing elit,
                        sed do.
                      </p>
                    </div>
                  </a>
                </Cell>
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
                <img src="/img/experiences/product-1.jpg" alt="" />
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
                    <img src="/img/experiences/product-2.jpg" alt="" />
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
                    <img src="/img/experiences/product-3.jpg" alt="" />
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
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                on:click={() => {
                  openProductSlide = true;
                }}
                class="item-product"
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-1.png)"
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
                <p class="text-eyebrow mt-25">Gucci</p>
                <h3>Papier Wide Brim Hat</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-2.png)"
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
                <p class="text-eyebrow mt-25">Bottega Veneta</p>
                <h3>Oversized Acetate Sunglasses</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-3.png)"
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
                <p class="text-eyebrow mt-25">Carolina Herrera</p>
                <h3>Asymmetric Tiered Organza Gown</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-4.png)"
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
                <p class="text-eyebrow mt-25">Matteau</p>
                <h3>Square-Neck One-Piece Swimsuit</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-5.png)"
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
                <p class="text-eyebrow mt-25">Balenciaga</p>
                <h3>Mallorca Platform Rubber Sandals</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-6.png)"
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
                <p class="text-eyebrow mt-25">Johanna Ortiz</p>
                <h3>Heroica Printed Cotton Sarong</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-6.png)"
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
                <p class="text-eyebrow mt-25">Johanna Ortiz</p>
                <h3>Heroica Printed Cotton Sarong</h3>
              </div>
            </Cell>
            <Cell spanDevices={{ desktop: 2, tablet: 4, phone: 2 }}>
              <div
                class="item-product"
                on:click={() => {
                  openProductSlide = true;
                }}
              >
                <div
                  class="thumbnail"
                  style="background-image: url(/img/products/product-6.png)"
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
                <p class="text-eyebrow mt-25">Johanna Ortiz</p>
                <h3>Heroica Printed Cotton Sarong</h3>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </section>
    <section class="t-pt-80 t-pb-100 m-pt-0 m-pb-85 d-none m-block">
      <div class="container">
        <h1 class="mt-0 d-mb-80 m-mb-35">My Favorite Places</h1>
        <div class="experiences-list">
          <LayoutGrid class="p-0">
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
              <a href="/experiences-listing/detail">
                <div class="experience-item">
                  <div class="thumbnail">
                    <img src="/img/experiences/experience-7.jpg" alt="" />
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
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-left">India</p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-right">Experience</p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
              <a href="/experiences-listing/detail">
                <div class="experience-item">
                  <div class="thumbnail">
                    <img src="/img/experiences/experience-9.jpg" alt="" />
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
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-left">India</p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-right">Experience</p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
              <a href="/experiences-listing/detail">
                <div class="experience-item">
                  <div class="thumbnail">
                    <img src="/img/experiences/experience-17.jpg" alt="" />
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
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-left">India</p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-right">Experience</p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
                  </p>
                </div>
              </a>
            </Cell>
            <Cell spanDevices={{ desktop: 3, phone: 4, tablet: 8 }}>
              <a href="/experiences-listing/detail">
                <div class="experience-item">
                  <div class="thumbnail">
                    <img src="/img/experiences/experience-18.jpg" alt="" />
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
                  <LayoutGrid class="p-0">
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-left">India</p></Cell
                    >
                    <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}
                      ><p class="text-eyebrow text-right">Experience</p></Cell
                    >
                  </LayoutGrid>
                  <div class="divider" />
                  <h4 class="text-h2 title">
                    Australian Masterchef Restaurant Tour - Starting in Sydney.
                  </h4>
                  <p class="short-text m-none">
                    Lorem ipsum dolor sit sen amet, consect adipiscing elit, sed
                    do.
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
<ProductSliderModal bind:open={openProductSlide}>no content</ProductSliderModal>

<style>
  :global(.show-on-sticky) {
    display: none;
  }
  :global(.is_sticky .show-on-sticky) {
    display: block;
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
  .experience-item .thumbnail :global(.btn-favorite .like) {
    display: block;
  }
  .experience-item .thumbnail :global(.btn-favorite .liked) {
    display: none;
  }
  .experience-item .thumbnail :global(.btn-favorite:hover .like) {
    display: none;
  }
  .experience-item .thumbnail :global(.btn-favorite:hover .liked) {
    display: block;
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
