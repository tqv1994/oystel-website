<script>
    import {onMount, afterUpdate, beforeUpdate} from 'svelte';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {goto} from '$app/navigation';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import IconButton, {Icon} from '@smui/icon-button';
    import Select, { Option } from '@smui/select';
    import DataTable, { Head, Body, Row, Cell as CellTable } from '@smui/data-table'
    import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
    import Svg from '@smui/common/Svg.svelte';
    import {StringHelper} from '$lib/helpers';
    import Layout from '$lib/components/common/Layout.svelte';
    let stringHelper = new StringHelper();
    let searchModel = {
        name: '',
        specialty: '',
        location: ''
    };
    let contentHeaderActionMobile = '';
    let configPage = {
        header:{
            page: 'advisor-detail',
            transparent: false,
            theme: 'light',
            currentMenu: 'travel-advisors'
        }
    };
</script>
<Layout config={configPage}>
    <div class="content mt-25">
        <section class="header-title full-width" style="background-image: url(/img/advisors/detail-advisor-banner.jpg)">
            <div class="content-wrap">
                <div class="container">
                    <div class="contact-info d-p-45 d-pt-80 d-pb-85 t-pt-80 t-pb-85 m-pt-30 m-pb-45">
                        <IconButton class="btn-share d-none t-none m-block">
                            <Icon component={Svg} viewBox="0 0 16.833 24.384">
                                <g id="Group_439" data-name="Group 439" transform="translate(-1661.127 -152.323)">
                                    <path id="Path_319" data-name="Path 319" d="M156.364-5869.48l4.489-4.489,4.489,4.489" transform="translate(1508.69 6027)" fill="none" stroke="#000" stroke-width="1"/>
                                    <g id="Group_438" data-name="Group 438">
                                        <path id="Path_318" data-name="Path 318" d="M154.564-5867H150.7v15.309h15.833V-5867H162.8" transform="translate(1510.927 6027.899)" fill="none" stroke="#000" stroke-width="1"/>
                                        <path id="Path_320" data-name="Path 320" d="M161.543-5858.913v-14.377" transform="translate(1508 6027)" fill="none" stroke="#000" stroke-width="1"/>
                                    </g>
                                </g>
                            </Icon>
                        </IconButton>
                        <LayoutGrid class="p-0">
                            <Cell spanDevices={{desktop: 6, tablet: 4, phone: 4}} class="text-left">
                                <div class="thumbnail">
                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 6, tablet: 4, phone: 4}} class="text-center t-block m-none">
                                <IconButton class="btn-share">
                                    <Icon component={Svg} viewBox="0 0 16.833 24.384">
                                        <g id="Group_439" data-name="Group 439" transform="translate(-1661.127 -152.323)">
                                            <path id="Path_319" data-name="Path 319" d="M156.364-5869.48l4.489-4.489,4.489,4.489" transform="translate(1508.69 6027)" fill="none" stroke="#000" stroke-width="1"/>
                                            <g id="Group_438" data-name="Group 438">
                                                <path id="Path_318" data-name="Path 318" d="M154.564-5867H150.7v15.309h15.833V-5867H162.8" transform="translate(1510.927 6027.899)" fill="none" stroke="#000" stroke-width="1"/>
                                                <path id="Path_320" data-name="Path 320" d="M161.543-5858.913v-14.377" transform="translate(1508 6027)" fill="none" stroke="#000" stroke-width="1"/>
                                            </g>
                                        </g>
                                    </Icon>
                                </IconButton>
                            </Cell>
                        </LayoutGrid>
                        <h1 class="mt-30 mb-10">Jan Wohl</h1>
                        <p class="mt-0 mb-45 description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Suspendisse varius vitae sem in elementum.</p>
                        <h4 class="mt-0 mb-55">Advisor  |  New York</h4>
                        <Button variant="outlined"><Label>Contact Me</Label></Button>
                    </div>
                </div>
            </div>
        </section>
        <section class="d-pt-80 d-pb-100 m-pt-50 m-pb-80">
            <div class="container">
                <LayoutGrid class="p-0 d-pl-115 d-pr-115 t-pl-0 t-pr-0">
                    <Cell spanDevices={{desktop: 6}} class="m-none t-block"></Cell>
                    <Cell spanDevices={{desktop: 6, tablet:8, phone: 4}}>
                        <div class="">
                            <h1 class="mt-0">Destinations</h1>
                            <LayoutGrid class="p-0">
                                <Cell spanDevices={{desktop: 6, tablet: 4, phone: 2}}>
                                    <div class="mb-30">
                                        <h5 class="mb-15 mt-0">Asia</h5>
                                        <p class="mb-10 mt-0">Indonesia</p>
                                        <p class="m-0">Maldives</p>
                                    </div>
                                    <div class="mb-30">
                                        <h5 class="mb-15 mt-0">South America</h5>
                                        <p class="mb-10 mt-0">Brazil</p>
                                        <p class="m-0">Chile</p>
                                    </div>
                                    <div class="mb-0">
                                        <h5 class="mb-15 mt-0">North America</h5>
                                        <p class="m-0">Saint Barthélemy</p>
                                    </div>
                                </Cell>
                                <Cell spanDevices={{desktop: 6, tablet: 4, phone: 2}}>
                                    <div class="mb-0">
                                        <h5 class="mb-15 mt-0">Europe</h5>
                                        <p class="mb-10 mt-0">France</p>
                                        <p class="mb-10 mt-0">Greece</p>
                                        <p class="mb-10 mt-0">Italy</p>
                                        <p class="mb-10 mt-0">Switzerland</p>
                                        <p class="mb-10 mt-0">Spain</p>
                                        <p class="mb-10 mt-0">United Kingdom</p>
                                    </div>
                                </Cell>
                            </LayoutGrid>
                        </div>
                        <div class="pt-90 m-pt-80">
                            <h1 class="mt-0">My Recent Trips</h1>
                            <p class="mt-0 mb-30 text-eyebrow">Travel Advisor Insight</p>
                            <p class="mt-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <LayoutGrid class="p-0">
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-1.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">Italy</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Aeolian Islands</h4>
                                        </div>
                                    </a>
                                </Cell>
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-2.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">England</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Dorset Cove</h4>
                                        </div>
                                    </a>
                                </Cell>
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-3.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">Indonesia</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Bali</h4>
                                        </div>
                                    </a>
                                </Cell>
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-4.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">Greece</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Mykonos</h4>
                                        </div>
                                    </a>
                                </Cell>
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-5.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">French Polynesia</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Tahiti</h4>
                                        </div>
                                    </a>
                                </Cell>
                                <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                    <a href="/experiences-listing/detail">
                                        <div class="trip-item">
                                            <div class="thumbnail">
                                                <img src="/img/trips/trip-6.jpg" alt=""/>
                                            </div>
                                            <LayoutGrid class="p-0">
                                                <Cell spanDevices={{ desktop: 6, phone: 2, tablet: 4 }}><p class="text-eyebrow text-left">Scotland</p></Cell>
                                            </LayoutGrid>
                                            <div class="divider"></div>
                                            <h4 class="text-h2 title">Isle of Skye</h4>
                                        </div>
                                    </a>
                                </Cell>
                            </LayoutGrid>
                        </div>
                        <div class="d-pt-80 m-pt-20 qualifications-wrap">
                            <h1 class="mt-0">Qualifications</h1>
                            <p class="title mt-0 mb-30">Specialties</p>
                            <p class="text-content mt-0 mb-55">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Suspendisse varius vitae sem in elementum.</p>
                            <p class="title mt-0 mb-30">Languages</p>
                            <p class="text-content mt-0">French, English, Italian</p>
                        </div>
                    </Cell>
                </LayoutGrid>
            </div>
        </section>
    </div>
</Layout>
<style>
    .header-title{
        height: 810px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .contact-info{
        top: 80px;
        position: absolute;
        left: 0;
        background-color: #F0F7F8;
        width: 475px;
    }
    .contact-info .thumbnail{
        width: 100px;
    }
    .contact-info .thumbnail img{
        border-radius: 50%;
    }
    .contact-info :global(.btn-share){
        top: 50%;
        transform: translateY(-50%);
    }
    .contact-info .description{
        width: 85%;
    }

    .trip-item :global(.mdc-layout-grid){
        --mdc-layout-grid-gutter-desktop: 0;
    }
    .trip-item .divider::after{
        background-color: rgba(0,0,0,0.2);
    }
    .trip-item .title{
        height: 50px;
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
    .qualifications-wrap{
        padding-right: 10%;
    }
    .qualifications-wrap .title{
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.2px;
    }
    .qualifications-wrap .text-content{
        font-weight: 300;
        letter-spacing: 0.1px;
        font-size: 17px;
    }

    @media screen and (max-width: 599px) {
        .header-title{
            height: auto;
            padding-bottom: 82.67%;
            margin-bottom:  450px;
        }
        .contact-info{
            text-align: center !important;
            width: calc(100vw - 90px);
            left: 50%;
            transform: translateX(-50%);
            top: 230px;
        }
        .contact-info .thumbnail{
            margin: 0 auto;
        }
        .contact-info :global(.btn-share){
            position: absolute;
            right: 0;
            top: 30px;
        }
    }
    @media screen and (min-width: 1441px){
        .contact-info{
            left: 45px;
        }
    }
</style>