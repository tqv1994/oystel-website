<script>
    import {onMount, afterUpdate, beforeUpdate} from 'svelte';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {goto} from '$app/navigation';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import Select, { Option } from '@smui/select';
    import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
    import Svg from '@smui/common/Svg.svelte';
    import {StringHelper} from '$lib/helpers';
    import Layout from '$lib/components/common/Layout.svelte';
    let stringHelper = new StringHelper();
    let searchModel = {
        name: '',
        type: '',
        destination: '',
        country: '',
        sort_by: '',
    };
    let contentHeaderActionMobile = '';
    let configPage = {
        header:{
            page: 'destinations-search',
            transparent: true,
            theme: 'light',
            currentMenu: 'destinations'
        }
    };

    onMount(()=>{
    });

    function onSearchSubmit(){
        let queryString = stringHelper.objectToQueryString(searchModel);
        goto('/experiences-listing/search?'+queryString);
    }

    function onScrollFixedHeader(){
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("header").classList.add("fixed");
            document.querySelector('header').style.zIndex = 8;
            document.querySelector('header').style.position = 'relative';
            document.querySelector('.header-title').classList.add('fixed', 'is_sticky');
        } else {
            document.getElementById("header").classList.remove("fixed");
            document.querySelector('header').style.zIndex = 'auto';
            document.querySelector('header').style.position = 'static';
            document.querySelector('.header-title').classList.remove('fixed', 'is_sticky');
        }
    }
</script>
<svelte:window on:load={()=>{onScrollFixedHeader();}} on:scroll={()=>{onScrollFixedHeader()}}/>
<Layout config={configPage}>
    <div class="content">
        <section class="header-title d-pt-120 d-pb-55 m-pt-90 m-pb-25 full-width">
            <div class="content-wrap">
                <div class="container m-none">
                    <form class="search-form-experiences" action="/" on:submit|preventDefault={onSearchSubmit} >
                        <LayoutGrid class="p-0">
                            <Cell span="5">
                                <div class="form-control">
                                    <Textfield variant="outlined" bind:value={searchModel.name} label="Start with a search" withTrailingIcon={false}>
                                        <Icon slot="trailingIcon"
                                        ><img src="/img/icons/icon-search.svg" /></Icon
                                        >
                                    </Textfield>
                                </div>
                            </Cell>
                            <Cell span="2">
                                <div class="form-control">
                                    <Select variant="outlined" bind:value={searchModel.type} label="By Experience Type">
                                        <Option value=""></Option>
                                    </Select>
                                </div>
                            </Cell>
                            <Cell span="2">
                                <div class="form-control">
                                    <Select variant="outlined" bind:value={searchModel.destination} label="By Destination">
                                        <Option value=""></Option>
                                    </Select>
                                </div>
                            </Cell>
                            <Cell span="2">
                                <div class="form-control">
                                    <Select variant="outlined" bind:value={searchModel.country} label="By Country">
                                        <Option value=""></Option>
                                    </Select>
                                </div>
                            </Cell>
                            <Cell span="1">
                                <div class="form-control">
                                    <Select variant="outlined" bind:value={searchModel.sort_by} label="Sort By">
                                        <Option value=""></Option>
                                    </Select>
                                </div>
                            </Cell>
                        </LayoutGrid>
                    </form>
                </div>
                <div class="container m-block d-none">
                    <LayoutGrid class="p-0">
                        <Cell span="12">
                            <Button on:click={()=>{contentHeaderActionMobile = 'experience-search'}} style="width: 100%" variant="outlined"><Label>Filter Your Results</Label></Button>
                        </Cell>
                    </LayoutGrid>
                </div>
            </div>
        </section>
        <section class="d-pt-85 d-pb-95 m-pt-50 m-pb-70">
            <div class="container">
                <div class="section-content">
                    <LayoutGrid class="p-0">
                        <Cell spanDevices={{ desktop: 3, tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-1.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Lorem ipsum dolor sit amet, consectetur.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-3.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-2.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Lorem ipsum dolor sit amet, consectetur.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="#">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-10.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-13.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-4.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-12.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="#">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-8.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-5.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/destinations/destination-6.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Australian Masterchef Restaurant Tour - Starting in Sydney.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="/experiences-listing/detail">
                                <div class="experience-item">
                                    <div class="thumbnail">
                                        <img src="/img/experiences/experience-14.jpg" alt=""/>
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">Archaval Ferrer Winery Tour Drink nine wines directly from the barrel.</h4>
                                    <p class="short-text m-none">Lorem ipsum dolor sit sen amet, consect adipiscing  elit, sed do.</p>
                                </div>
                            </a>
                        </Cell>
                        <Cell spanDevices={{ desktop: 3,tablet: 4, phone: 2 }}>
                            <a href="#">
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
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-left">India</p></Cell>
                                        <Cell spanDevices={{ desktop: 6, phone: 2 }}><p class="text-eyebrow text-right">Destination</p></Cell>
                                    </LayoutGrid>
                                    <div class="divider"></div>
                                    <h4 class="text-h2 title">A one-of-a-kind journey of self-exploration.</h4>
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
<HeaderActionMobile bind:content={contentHeaderActionMobile} bind:searchModel></HeaderActionMobile>
<style>
    .header-title{
        background-color: #F0F7F8;
    }
    .header-title:global(.is_sticky){
        padding-bottom: 55px !important;
    }
    .search-form-experiences :global(.mdc-layout-grid){
        --mdc-layout-grid-gutter-desktop: 0;
        --mdc-select-idle-line-color: #000;
        --mdc-select-hover-line-color: #000;

    }
    .search-form-experiences :global(.mdc-text-field),
    .search-form-experiences :global(.mdc-select){
        height: 35px;
        width: 100%;
        padding-right: 15px;
    }
    .search-form-experiences :global(.mdc-select.mdc-select--outlined .mdc-select__anchor){
        height: 35px;
    }
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__trailing),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form-experiences :global(.mdc-text-field .mdc-floating-label),.search-form-experiences :global(.mdc-select .mdc-floating-label){
        padding-left: 18px;
    }
    .search-form-experiences .mdc-text-field--outlined :global(.mdc-floating-label){
        left: 22px;
    }
    .search-form-experiences :global(.mdc-text-field img){
        filter: brightness(0.1);
    }

    /* Section title */
    .section-title .title{
        position: relative;
        overflow: hidden;
    }
    .section-title .title:after{
        content: "";
        display: inline-block;
        border-top: 1px solid;
        border-color: #000;
        vertical-align: middle;
        width: 100%;
        margin-right: -100%;
        margin-left: 40px;
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

    .item-read-more{
        background-color: #F0F7F8;
        position: relative;
    }
    .item-read-more .label{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .item-read-more .label .material-icons{
        position: relative;
        top: 5px;
    }

    @media screen and (max-width: 768px){
        .section-title .title:after{
            margin-left: 20px;
        }
    }
</style>