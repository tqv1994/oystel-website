<script context="module">
    export async function load({ page, session }) {
      let stringHelper = new StringHelper();
      let id = stringHelper.getSlugId(page.params.id);
      
      return { props: {id} };
      // const url = `api/v1/users/${page.params.slug}`;
      // const { response, json } = await api.get(session.API_ENDPOINT, url);
      // if (response.status === 200) {
      // return {
      //     props: {
      //     localUser: json.data,
      //     },
      // };
      // } else {
      // return { props: { localUser: [] } };
      // }
    }
</script>
<script lang="ts">
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
    import { AdvisorModel } from '$lib/models/advisor';
import InviteMembersModal from '$lib/components/modals/InviteMembersModal.svelte';
import { CountryModel } from '$lib/models/country';
import { DestinationModel } from '$lib/models/destination';
import { ExperienceModel } from '$lib/models/experience';
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
    export let id: string;
    let advisor: AdvisorModel;
    let myRecentTrips: any[];
    let countries: any[];
    onMount(async() => {
        const res = await fetch('/api/page/advisor/detail?id='+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
        if (res.ok) {
        const content = await res.json();
        if(content.advisor){
            advisor = new AdvisorModel(content.advisor);
        }
        if(content.countries){
            countries = content.countries;
        }
        if(content.myRecentTrips){
            myRecentTrips = [];
            content.myRecentTrips.map((item: any)=>{
                if(item.type == 'destination'){
                    myRecentTrips.push(new DestinationModel(item));
                }else{
                    myRecentTrips.push(new ExperienceModel(item));
                }
            });
        }
        // authModel = authStore.user;
        // doAfterSignup(user);
        return;
        // return goto('/me').then(auth.signOut);
        }
    });
    function onScrollFixedContactInfo(){
        if(document.documentElement.clientWidth > 839) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                document.querySelector('.contact-info').classList.add('fixed');
            } else {
                document.querySelector('.contact-info').classList.remove('fixed');
            }
        }else{
            document.querySelector('.contact-info').classList.remove('fixed');
        }
    }
</script>
<svelte:window on:load={()=>{onScrollFixedContactInfo();}} on:scroll={()=>{onScrollFixedContactInfo()}}/>
<Layout config={configPage}>
    {#if advisor}
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
                            <Cell spanDevices={{desktop: 6, tablet: 8, phone: 4}} class="text-left">
                                <div class="thumbnail">
                                    <img src="{advisor.userMe.avatarUrl}" alt=""/>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 6, tablet: 8, phone: 4}} class="text-center t-block m-none">
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
                        <h1 class="mt-30 mb-10">{advisor.userMe.displayName}</h1>
                        <p class="mt-0 mb-45 description">{advisor.bio}</p>
                        <h4 class="mt-0 mb-55">Advisor  |  {advisor.location.name}</h4>
                        <Button variant="outlined" class="hover-affect"><Label>Contact Me</Label></Button>
                    </div>
                </div>
            </div>
        </section>
        <section class="d-pt-80 d-pb-100 m-pt-50 m-pb-80">
            <div class="container">
                <LayoutGrid class="p-0 d-pl-115 d-pr-115 t-pl-0 t-pr-0">
                    <Cell spanDevices={{desktop: 6}} class="m-none t-block"></Cell>
                    <Cell spanDevices={{desktop: 6, tablet:8, phone: 4}}>
                        <div class="destinations-wrap">
                            <h1 class="mt-0">Destinations</h1>
                            <LayoutGrid class="p-0">
                                {#if countries && countries.length > 0}
                                <Cell spanDevices={{desktop: 6, tablet: 4, phone: 2}}>
                                    {#each countries as country,index}
                                        {#if index < 3}
                                        <div class={index + 1 < countries.length ? 'mb-30' : 'mb-0'}>
                                            <h5 class="mb-15 mt-0">{country.name}</h5>
                                            {#each country.items as item, indexChild}
                                                <p class="{indexChild + 1 < country.items.length ? 'mb-10 mt-0' : 'm-0'}">{item.name}</p>
                                            {/each}
                                        </div>
                                        {/if}
                                    {/each}
                                </Cell>
                                    {#if countries[3]}
                                    <Cell spanDevices={{desktop: 6, tablet: 4, phone: 2}}>
                                        {#each countries as country,index}
                                            {#if index >= 3}
                                            <div class={index + 1 < countries.length ? 'mb-30' : 'mb-0'}>
                                                <h5 class="mb-15 mt-0">{country.name}</h5>
                                                {#each country.items as item, indexChild}
                                                <p class="{indexChild + 1 < country.items.length ? 'mb-10 mt-0' : 'm-0'}">{item.name}</p>
                                                {/each}
                                            </div>
                                            {/if}
                                        {/each}
                                    </Cell>
                                    {/if}
                                {/if}
                                
                            </LayoutGrid>
                        </div>
                        <div class="pt-90 m-pt-80">
                            <h1 class="mt-0">My Recent Trips</h1>
                            <p class="mt-0 mb-30 text-eyebrow">Travel Advisor Insight</p>
                            <p class="mt-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <LayoutGrid class="p-0">
                                {#if myRecentTrips && myRecentTrips.length > 0}
                                    {#each myRecentTrips as item}
                                    <Cell spanDevices={{ desktop: 6,tablet: 4, phone: 2 }}>
                                        <a href={item.link}>
                                            <div class="trip-item">
                                                <div class="thumbnail">
                                                    <div class="image-cover" style="padding-top: calc(335 / 258 * 100%)">
                                                        <img src={item.featuredPhoto} alt=""/>
                                                    </div>
                                                </div>
                                                <LayoutGrid class="p-0">
                                                    <Cell spanDevices={{ desktop: 12, phone: 4, tablet: 8 }}><p class="text-eyebrow text-left">{item.country_title}</p></Cell>
                                                </LayoutGrid>
                                                <div class="divider"></div>
                                                <h4 class="text-h2 title">{item.type == 'destination' ? item.name : item.title}</h4>
                                            </div>
                                        </a>
                                    </Cell>
                                    {/each}
                                {/if}
                            </LayoutGrid>
                        </div>
                        <div class="d-pt-80 m-pt-20 qualifications-wrap">
                            <h1 class="mt-0">Qualifications</h1>
                            <p class="title mt-0 mb-30">Specialties</p>
                            <p class="text-content mt-0 mb-55">{advisor.specialtiesString}</p>
                            <p class="title mt-0 mb-30">Languages</p>
                            <p class="text-content mt-0">{advisor.languagesString}</p>
                        </div>
                    </Cell>
                </LayoutGrid>
            </div>
        </section>
    </div>
    {/if}
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
    .contact-info:global(.fixed){
        top: 50% !important;
        transform: translateY(-50%);
    }
    @media screen and (min-width: 1441px) {
        .contact-info:global(.fixed) {
            margin-left: calc(calc(100vw / 2 - 1440px / 2) + var(--mdc-layout-grid-margin-desktop));
        }
    }
    @media screen and (max-width: 1440px) and (min-width: 840px) {
        .contact-info{
            width: 40vw;
        }
        .contact-info:global(.fixed) {
            margin-left: 0;
        }
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

    @media screen and (max-width: 839px) {
        .contact-info{
            position: absolute;
        }
        .contact-info .description{
            width: 100%;
        }
        .header-title{
            height: auto;
            padding-bottom: 82.67%;
            margin-bottom:  120px;
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
    @media screen and (max-width: 559px) {
        .header-title{
            margin-bottom:  450px;
        }
    }
    .destinations-wrap h5{
        font-weight: bold;
        font-size: 16px;
        line-height: 34px;
        letter-spacing: 0.2px;
    }
    @media (min-width: 1441px){
        .contact-info:not(.fixed){
            left: 45px;
        }
    }
    @media (max-width: 904px) {
        .destinations-wrap h5{
            font-size: 12px;
            line-height: 20px;
            letter-spacing: 0.1px;
        }
    }
</style>