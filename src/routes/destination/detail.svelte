<script>
    import {onMount, afterUpdate, beforeUpdate} from 'svelte';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {goto} from '$app/navigation';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import Select, { Option } from '@smui/select';
    import Tab from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
    import Svg from '@smui/common/Svg.svelte';
    import OyCarousel from '$lib/components/common/OyCarousel.svelte';
    import Layout from '$lib/components/common/Layout.svelte';
    import ProductSliderModal from '$lib/components/modals/ProductSliderModal.svelte';
    let tabActive = "Where to Stay";
    let openProductSlide = false;
    let configPage = {
        header:{
            page: 'destination-detail',
            transparent: true,
            theme: 'light',
            currentMenu: 'destinations'
        }
    };

    function onScrollFixedHeader(){
        if(document.documentElement.clientWidth > 1239) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                document.getElementById("header").classList.add("fixed");
                document.querySelector('header').style.zIndex = 100;
                document.querySelector('header').style.position = 'relative';
                document.querySelector('.header-title').classList.add('fixed', 'is_sticky');
            } else {
                document.getElementById("header").classList.remove("fixed");
                document.querySelector('header').style.zIndex = 'auto';
                document.querySelector('header').style.position = 'static';
                document.querySelector('.header-title').classList.remove('fixed', 'is_sticky');
            }
        }
    }
</script>
<svelte:window on:scroll={()=>{onScrollFixedHeader()}} />
<Layout config={configPage}>
    <div class="content">
        <section class="header-title d-pt-90 d-pb-25 m-pt-90 m-pb-25 full-width">
            <div class="content-wrap">
                <div class="container">
                    <LayoutGrid class="p-0 hidden-on-sticky">
                        <Cell spanDevices={{ desktop: 7, phone: 4 }}>
                            <div class="experience-detail-slides">
                                <OyCarousel perPage={{ 800: 1 }} draggable={false}>
                                  <span class="control" slot="left-control">
                                    <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon>
                                  </span>
                                    <div class="slide-content slide-item" style="background-image: url(/img/experiences/detail.jpg)"></div>
                                    <div class="slide-content slide-item" style="background-image: url(/img/experiences/detail.jpg)"></div>
                                    <span class="control" slot="right-control">
                                    <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                                  </span>
                                </OyCarousel>
                            </div>
                        </Cell>
                        <Cell spanDevices="{{ desktop: 5, phone: 4 }}">
                            <div class="d-pt-90 d-pb-100">
                                <p class="text-eyebrow">Destination Country</p>
                                <h1 >The best destination dolor sit amet.</h1>
                                <p class="mb-30 short-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Suspendisse varius vitae sem in elementum. Pellentesque efficitur est lectus, una vehicula scelerisque magna congue a.</p>
                                <Button variant="outlined" class="mb-15"><Label>Find My Advisor</Label></Button>
                                <br/>
                                <Button variant="outlined"><Label>What to Pack</Label></Button>
                            </div>
                            <div class="action-buttons m-none">
                                <IconButton >
                                    <Icon component="{Svg}" viewBox="0 0 13.246 19.134">
                                        <g id="Icon_-_Share" data-name="Icon - Share" transform="translate(0.5 1.233)">
                                            <path id="Path_318" data-name="Path 318" d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889" transform="translate(-150.699 5872.56)" fill="none" stroke="#000" stroke-width="1"/>
                                            <path id="Path_320" data-name="Path 320" d="M161.543-5862.169v-11.12" transform="translate(-155.42 5873.29)" fill="none" stroke="#000" stroke-width="1"/>
                                            <path id="Line" d="M156.364-5870.5l3.472-3.473,3.472,3.473" transform="translate(-153.713 5873.443)" fill="none" stroke="#000" stroke-width="1"/>
                                        </g>
                                    </Icon>
                                </IconButton>
                                <IconButton >
                                    <Icon component="{Svg}" viewBox="0 0 16.249 14.588">
                                        <g id="Icon_-_Heart" data-name="Icon - Heart" transform="translate(0.125 0.125)">
                                            <path id="Heart_Off" data-name="Heart Off" d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01" transform="translate(0.001)" stroke="#f0f7f8" stroke-width="0.25" fill-rule="evenodd"/>
                                        </g>
                                    </Icon>
                                </IconButton>
                            </div>
                        </Cell>
                    </LayoutGrid>
                    <LayoutGrid class="p-0 show-on-sticky m-none">
                        <Cell spanDevices={{desktop: 7, tablet: 4}}><div>
                            <span class="text-eyebrow" >Destination Country</span>
                                <IconButton >
                                    <Icon component="{Svg}" viewBox="0 0 13.246 19.134">
                                        <g id="Icon_-_Share" data-name="Icon - Share" transform="translate(0.5 1.233)">
                                            <path id="Path_318" data-name="Path 318" d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889" transform="translate(-150.699 5872.56)" fill="none" stroke="#000" stroke-width="1"/>
                                            <path id="Path_320" data-name="Path 320" d="M161.543-5862.169v-11.12" transform="translate(-155.42 5873.29)" fill="none" stroke="#000" stroke-width="1"/>
                                            <path id="Line" d="M156.364-5870.5l3.472-3.473,3.472,3.473" transform="translate(-153.713 5873.443)" fill="none" stroke="#000" stroke-width="1"/>
                                        </g>
                                    </Icon>
                                </IconButton>
                                <IconButton >
                                    <Icon component="{Svg}" viewBox="0 0 16.249 14.588">
                                        <g id="Icon_-_Heart" data-name="Icon - Heart" transform="translate(0.125 0.125)">
                                            <path id="Heart_Off" data-name="Heart Off" d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01" transform="translate(0.001)" stroke="#f0f7f8" stroke-width="0.25" fill-rule="evenodd"/>
                                        </g>
                                    </Icon>
                                </IconButton>
                        </div>
                            <h1 class="mb-0 mt-40">The best destination dolor sit amet.</h1>
                        </Cell>
                        <Cell spanDevices={{desktop: 5, tablet: 4}} class="text-right">
                            <div class="mt-100">
                                <Button variant="outlined" ><Label>Find My Advisor</Label></Button>
                                <Button variant="outlined"><Label>What to Pack</Label></Button>
                            </div>
                        </Cell>
                    </LayoutGrid>
                </div>
            </div>
        </section>
        <section class="d-pt-90 d-pb-65 m-pt-40 m-pb-40">
            <div class="container">
                <div class="section-title d-mb-65 m-mb-40">
                    <LayoutGrid class="p-0 m-none">
                        <Cell spanDevices={{desktop: 6, phone: 4}}>
                            <TabBar tabs={['Where to Stay', 'Where to Dine & Drink', 'Where to Explore']} let:tab bind:active={tabActive}>
                                <!-- Note: the `tab` property is required! -->
                                <Tab {tab}>
                                    <Label>{tab}</Label>
                                </Tab>
                            </TabBar>
                        </Cell>
                        <Cell spanDevices={{desktop: 6, phone: 4}} class="text-right m-none">
                            <Button variant="outlined"><Label>Find My Advisor</Label></Button>
                        </Cell>
                    </LayoutGrid>
                    <div class="d-none m-block text-center">
                        <Select
                                bind:value={tabActive}
                                label=""
                        >
                            <Option value="Where to Stay" >Where to Stay</Option>
                            <Option value="Where to Dine & Drink">Where to Dine & Drink</Option>
                            <Option value="Where to Explore">Where to Explore</Option>
                        </Select>
                    </div>
                </div>
                <div class="section-content">
                    {#if (tabActive == 'Where to Stay')}
                        <LayoutGrid class="p-0 ">
                            <Cell spanDevices={{desktop: 3, phone: 2}}>
                                <a href="#">
                                    <div class="item-advisor">
                                        <div class="thumbnail">
                                            <img src="/img/experiences/advisor-1.jpg" alt=""/>
                                        </div>
                                        <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                    </div>
                                </a>
                            </Cell>
                            <Cell spanDevices={{desktop: 3, phone: 2}}>
                                <a href="#">
                                    <div class="item-advisor">
                                        <div class="thumbnail">
                                            <img src="/img/experiences/advisor-2.jpg" alt=""/>
                                        </div>
                                        <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                    </div>
                                </a>
                            </Cell>
                            <Cell spanDevices={{desktop: 3, phone: 2}}>
                                <a href="#">
                                    <div class="item-advisor">
                                        <div class="thumbnail">
                                            <img src="/img/experiences/advisor-3.jpg" alt=""/>
                                        </div>
                                        <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                    </div>
                                </a>
                            </Cell>
                            <Cell spanDevices={{desktop: 3, phone: 2}}>
                                <a href="#">
                                    <div class="item-advisor">
                                        <div class="thumbnail">
                                            <img src="/img/experiences/advisor-3.jpg" alt=""/>
                                        </div>
                                        <h4 class="text-h2 mt-30 title">Where to Stay - Hotel Location One</h4>
                                    </div>
                                </a>
                            </Cell>
                        </LayoutGrid>
                    {/if}
                </div>
            </div>
        </section>
        <div class="container">
            <LayoutGrid class="p-0">
                <Cell span="12"><div class="divider"></div></Cell>
            </LayoutGrid>
        </div>
        <section class="d-pt-70 d-pb-40 m-pt-50 m-pb-90">
            <div class="container">
                <LayoutGrid class="p-0">
                    <Cell spanDevices={{desktop: 5, phone: 4}}>
                        <h1 class="mt-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                    </Cell>
                    <Cell spanDevices={{desktop: 7, phone: 4}}>
                        <p class="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet ligula at magna consectetur dignissim at ut tellus. Maecenas dignissim at arcu ac auctor. Phasellus a nulla in nulla hendrerit pellentesque. Morbi eu fringilla nunc. Pellentesque ultricies sodales arcu, a euismod mauris ornare at. Quisque bibendum lorem enim, vel luctus nibh pretium nec. Nullam commodo lectus id neque rhoncus sagittis. Mauris condimentum erat sed nulla porttitor commodo. Aliquam non quam vitae velit ullamcorper aliquam. Suspendisse et viverra ipsum.</p>
                        <p>Aenean iaculis condimentum nisl non dignissim. Quisque ac pulvinar lectus, at laoreet nunc. Quisque ante diam, egestas quis condimentum sit amet, auctor eu dolor. Curabitur imperdiet elementum urna eget facilisis. Fusce luctus gravida tortor, eget elementum libero lobortis pulvinar. Suspendisse at varius tellus. Etiam eget turpis quis ante lacinia viverra lobortis id purus. Aenean at mi nec lectus tristique tempus. Sed luctus mi quis est pharetra consectetur. Fusce faucibus commodo augue, sed sollicitudin ipsum lobortis in. Duis non orci commodo massa vulputate sollicitudin.</p>
                        <p>Fusce euismod, lorem quis dignissim mollis, tellus tellus feugiat diam, sit amet sollicitudin nulla velit sed nisi. In ac venenatis turpis, id aliquet metus. Nunc ex justo, cursus a nibh quis, euismod tempus nulla. Pellentesque vel dui in nulla semper ullamcorper. Vivamus viverra velit id vehicula accumsan. Vestibulum sed leo nulla. Donec tempor tincidunt ligula, non volutpat purus gravida eu. Sed vitae quam vel arcu porttitor aliquet nec a ligula. Quisque ut laoreet metus, porta accumsan massa. </p>
                        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam ac egestas ex, vel vulputate nunc. Praesent venenatis suscipit augue nec facilisis. Morbi ullamcorper enim ullamcorper, porttitor neque eu, laoreet erat.</p>
                        <p>Integer ornare sem ut libero consectetur sagittis. Duis id commodo ante, vitae vestibulum mauris. Donec volutpat hendrerit erat non semper. Praesent elit lacus, feugiat quis erat.</p>
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
                    <Cell spanDevices={{desktop: 6, phone: 4}}>
                        <div class="item-product">
                            <div class="thumbnail">
                                <img src="/img/experiences/product-1.jpg" alt=""/>
                            </div>
                            <div class="title-wrap">
                                <h5>Get the Look</h5>
                                <IconButton>
                                    <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                        <g data-name="Group 397" transform="translate(0)">
                                            <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                            <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                        </g>
                                    </Icon>
                                </IconButton>
                                <div class="divider"></div>
                            </div>
                        </div>
                    </Cell>
                    <Cell spanDevices={{desktop: 6, phone: 4}}>
                        <LayoutGrid class="p-0">
                            <Cell spanDevices={{desktop: 6, phone: 4}}>
                                <div class="item-product">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/product-2.jpg" alt=""/>
                                    </div>
                                    <div class="title-wrap">
                                        <h5>Get the Look</h5>
                                        <IconButton>
                                            <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                                <g data-name="Group 397" transform="translate(0)">
                                                    <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                                    <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                                </g>
                                            </Icon>
                                        </IconButton>
                                        <div class="divider"></div>
                                    </div>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 6, phone: 4}}>
                                <div class="item-product">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/product-3.jpg" alt=""/>
                                    </div>
                                    <div class="title-wrap">
                                        <h5>Get the Look</h5>
                                        <IconButton>
                                            <Icon component={Svg} viewBox="0 0 16.583 16.583">
                                                <g data-name="Group 397" transform="translate(0)">
                                                    <path id="Path_310" data-name="Path 310" d="M9145.428-3682.169v16.583" transform="translate(-9137.136 3682.169)" fill="none" stroke="#000" stroke-width="1"/>
                                                    <path id="Path_311" data-name="Path 311" d="M0,0V16.583" transform="translate(16.583 8.292) rotate(90)" fill="none" stroke="#000" stroke-width="1"/>
                                                </g>
                                            </Icon>
                                        </IconButton>
                                        <div class="divider"></div>
                                    </div>
                                </div>
                            </Cell>
                        </LayoutGrid>
                    </Cell>
                </LayoutGrid>
            </div>
        </section>
        <section class="d-pt-55 m-pt-40">
            <div class="container">
                <h1 class="mt-0">What to Pack</h1>
                <div class="products-list">
                    <LayoutGrid class="p-0">
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div on:click={()=>{openProductSlide=true}} class="item-product">
                                <div class="thumbnail" style="background-image: url(/img/products/product-1.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Gucci</p>
                                <h3>Papier Wide Brim Hat</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-2.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Bottega Veneta</p>
                                <h3>Oversized Acetate Sunglasses</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-3.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Carolina Herrera</p>
                                <h3>Asymmetric Tiered Organza Gown</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-4.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Matteau</p>
                                <h3>Square-Neck One-Piece Swimsuit</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-5.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Balenciaga</p>
                                <h3>Mallorca Platform Rubber Sandals</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-6.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Johanna Ortiz</p>
                                <h3>Heroica Printed Cotton Sarong</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-6.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                    </IconButton>
                                </div>
                                <p class="text-eyebrow mt-25">Johanna Ortiz</p>
                                <h3>Heroica Printed Cotton Sarong</h3>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 2, table: 4, phone: 2}}>
                            <div class="item-product" on:click={()=>{openProductSlide=true}}>
                                <div class="thumbnail" style="background-image: url(/img/products/product-6.png)">
                                    <IconButton class="btn-favorite">
                                        <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                            <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                        </Icon>
                                        <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                            <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
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
        <section class="d-pt-80 d-pb-100 m-pt-40 m-pb-85">
            <div class="container">
                <h1 class="mt-0 d-mb-80 m-mb-35">Where to Experience</h1>
                <div class="experiences-list">
                    <LayoutGrid class="p-0">
                        <Cell spanDevices={{desktop:3, phone: 2, tablet: 4}}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-7.jpg" alt=""/>
                                        <IconButton class="btn-favorite">
                                            <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                                <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                            <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                                <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                        </IconButton>
                                    </div>
                                    <LayoutGrid class="p-0">
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-right">Experience</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop:3, phone: 2, tablet: 4}}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-9.jpg" alt=""/>
                                        <IconButton class="btn-favorite">
                                            <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                                <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                            <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                                <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                        </IconButton>
                                    </div>
                                    <LayoutGrid class="p-0">
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-right">Experience</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop:3, phone: 2, tablet: 4}}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-17.jpg" alt=""/>
                                        <IconButton class="btn-favorite">
                                            <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                                <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                            <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                                <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                        </IconButton>
                                    </div>
                                    <LayoutGrid class="p-0">
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-right">Experience</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{desktop:3, phone: 2, tablet: 4}}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-18.jpg" alt=""/>
                                        <IconButton class="btn-favorite">
                                            <Icon  class="like"  component={Svg} viewBox="-4 -4 24 24">
                                                <path d="M11.185,0c-.118,0-.24,0-.357.014A4.714,4.714,0,0,0,7.757,1.685,4.715,4.715,0,0,0,4.615.139H4.472A4.372,4.372,0,0,0,0,4.361C-.084,6.547,1.407,8.4,2.537,9.6A24.976,24.976,0,0,0,7.6,13.558a.773.773,0,0,0,.786-.02,24.965,24.965,0,0,0,4.9-4.161c1.081-1.246,2.5-3.156,2.328-5.334A4.385,4.385,0,0,0,11.185,0m0,1.3a3.093,3.093,0,0,1,3.128,2.843c.132,1.691-1.087,3.309-2.014,4.378a23.965,23.965,0,0,1-4.336,3.738A23.536,23.536,0,0,1,3.485,8.7C2.518,7.674,1.237,6.109,1.3,4.412A3.053,3.053,0,0,1,4.465,1.44h.112A3.425,3.425,0,0,1,6.823,2.591l.972,1,.932-1.041a3.421,3.421,0,0,1,2.208-1.242c.082-.007.166-.009.249-.009" transform="translate(0.001)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                            <Icon class="liked" component={Svg} viewBox="-4 -4 24 24" >
                                                <path  d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0" transform="translate(0)" fill="#fff" fill-rule="evenodd"/>
                                            </Icon>
                                        </IconButton>
                                    </div>
                                    <LayoutGrid class="p-0">
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-right">Experience</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
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
    .content :global(.mdc-button){
        width: 220px;
    }
    /* Header title */
    .header-title{
        background-color: #F0F7F8;
    }
    .experience-detail-slides{
        height: 100%;
        width: 100%;
        --wrap-width: 100%;
    }

    .experience-detail-slides :global(.dots){
        display: none;
    }

    .experience-detail-slides :global(.carousel),.experience-detail-slides :global(.slides),.experience-detail-slides :global(.slides div){
        height: 100%;
    }
    .experience-detail-slides :global(.slide-item){
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .header-title .action-buttons{
        position: absolute;
        top: 85px;
        right: 100px;
    }
    .header-title .short-description{
        width: 80%;
    }

    .section-title :global(.mdc-tab){
        padding: 0;
        margin-right: 30px;
    }
    .section-title :global(.mdc-tab .mdc-tab__content){
        width: 100%;
        justify-content: left;
    }

    /* Advisors */
    .item-advisor .title{
        height: 30px;
        overflow: hidden;
    }

    /* Products */
    .item-product .title-wrap{
        position: relative;
    }
    .item-product .title-wrap :global(.mdc-icon-button){
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }

    .item-product .title-wrap .divider:after{
        background-color: rgba(0,0,0,0.2);
    }

    .products-list :global(.mdc-layout-grid__inner){
        overflow-x: auto;
        grid-auto-flow: column;
        margin-bottom: 80px;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-track){
        background-color: #D3D3D3;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar){
        height: 10px;
        background-color: #D3D3D3;
    }
    .products-list :global(.mdc-layout-grid__inner::-webkit-scrollbar-thumb){
        background-color: #91421C;
    }

    .products-list  :global(.item-product .thumbnail){
        width: 100%;
        padding-bottom: 145%;
        background-color:#F2F2F2;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
    }

    .products-list :global(.item-product .thumbnail  .btn-favorite) {
        position: absolute;
        top: 2%;
        right: 2%;
        filter: brightness(0);
    }
    .products-list :global(.item-product .thumbnail  .btn-favorite .like) {
        display: block;
    }
    .products-list :global(.item-product .thumbnail  .btn-favorite .liked) {
        display: none;
    }
    .products-list :global(.item-product .thumbnail .btn-favorite:hover .like) {
        display: none;
    }
    .products-list :global(.item-product .thumbnail  .btn-favorite:hover .liked) {
        display: block;
    }
    @media (min-width: 1240px) {
        .products-list :global(.mdc-layout-grid__inner) {
            grid-auto-columns: minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)), 1fr);
            grid-template-columns: repeat(auto-fill, minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-desktop)), 1fr));
        }
    }
    @media (max-width: 1239px) and (min-width: 905px) {
        .products-list :global(.mdc-layout-grid__inner) {
            grid-auto-columns: minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)), 1fr);
            grid-template-columns: repeat(auto-fill, minmax(calc(2 / 12 * 100% - var(--mdc-layout-grid-gutter-tablet)), 1fr));
        }
    }
    @media (max-width: 904px) and (min-width: 600px){
        .products-list :global(.mdc-layout-grid__inner) {
            grid-auto-columns: minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr);
            grid-template-columns: repeat(auto-fill, minmax(calc(1 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr));
        }
    }
    @media (max-width: 599px){
        .products-list :global(.mdc-layout-grid__inner) {
            grid-auto-columns: minmax(calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr);
            grid-template-columns: repeat(auto-fill, minmax(calc(3 / 12 * 100% - var(--mdc-layout-grid-gutter-phone)), 1fr));
        }
    }

    .experience-item :global(.mdc-layout-grid){
        --mdc-layout-grid-gutter-desktop: 0;
    }
    .experience-item .divider::after{
        background-color: rgba(0,0,0,0.2);
    }
    .experience-item .title{
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

    :global(.is_sticky.header-title){
        padding-bottom: 50px !important;
    }

    .divider:after{
        background-color: #000;
    }

    .content :global(.mdc-icon-button){
        margin-top: -15px;
    }

    @media screen and (max-width: 599px) {
        .experience-detail-slides :global(.carousel),.experience-detail-slides :global(.slides),.experience-detail-slides :global(.slides div){
            height: auto;
        }
        .experience-detail-slides :global(.slide-item){
            padding-top: 70%;
        }
        .header-title .short-description{
            width: 100%;
        }
        .experience-detail-slides :global(.wrap-control){
            display: none;
        }
        .experience-detail-slides{
            margin-bottom: 20px;
        }
        .experience-detail-slides :global(.dots){
            display: flex;
            justify-content: end;
            margin-top: 20px;
            filter: brightness(0);
        }
        .item-advisor .title{
            height: 50px;
        }
        .products-list :global(.mdc-layout-grid__inner){
            margin-bottom: 45px;
        }
    }
    /*@media  (max-width: 1239px){*/
    /*    :global(.fixed, .is_sticky){*/
    /*        position: static !important;*/
    /*    }*/
    /*}*/
</style>