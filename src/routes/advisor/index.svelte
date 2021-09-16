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
            page: 'advisors',
            transparent: true,
            theme: 'light',
            currentMenu: 'travel-advisors'
        }
    };

    function onSearchSubmit(){
        let queryString = stringHelper.objectToQueryString(searchModel);
        goto('/advisor?'+queryString);
    }

    function onScrollFixedHeader(){
        /*if(document.documentElement.clientWidth < 839) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                document.getElementById("header").classList.add("fixed");
                document.querySelector('header').style.zIndex = 7;
                document.querySelector('header').style.position = 'relative';
                document.querySelector('.header-title').classList.add('fixed', 'is_sticky');
            } else {
                document.getElementById("header").classList.remove("fixed");
                document.querySelector('header').style.zIndex = 'auto';
                document.querySelector('header').style.position = 'static';
                document.querySelector('.header-title').classList.remove('fixed', 'is_sticky');
            }
        }*/
    }
</script>
<svelte:window on:load={()=>{onScrollFixedHeader();}} on:scroll={()=>{onScrollFixedHeader()}}/>
<Layout config={configPage}>
    <div class="content">
        <section class="header-title d-pt-120 d-pb-95 m-pt-100 m-pb-25 full-width">
            <div class="content-wrap">
                <div class="container">
                    <h1 class="text-center d-mb-30 m-mb-25 mt-0">Crafted from Experience</h1>
                    <p class="text-center mt-0 m-pl-40 m-pr-40 m-mb-45">First hand experience, ready to craft your perfect vacation.</p>
                    <div class="d-none m-block">
                        <Button on:click={()=>{contentHeaderActionMobile = 'advisor-search'}} type="button" style="width: 100%" variant="outlined"><Label>Filter Your Results</Label></Button>
                    </div>
                </div>
            </div>
        </section>
        <section class="d-pt-80 d-pb-200 m-pt-40 m-pb-95">
            <div class="container">
                <form class="m-none search-form-advisor mb-50" action="/" on:submit|preventDefault={onSearchSubmit}>
                    <LayoutGrid class="p-0">
                        <Cell spanDevices={{desktop: 4}}>
                            <div class="form-control">
                                <Textfield variant="outlined" bind:value={searchModel.name} label="Search by name" withTrailingIcon={false}>
                                    <Icon slot="trailingIcon"
                                    ><img src="/img/icons/icon-search.svg" /></Icon
                                    >
                                </Textfield>
                            </div>
                        </Cell>
                        <Cell spanDevices={{desktop: 8}} class="form-inline text-right">
                            <div class="form-control">
                                <label class="text-h3">Filter by Specialty</label>
                                <Select bind:value={searchModel.specialty} label="">
                                    <Option value="" >All</Option>
                                </Select>
                            </div>
                            <div class="form-control">
                                <label class="text-h3">Location</label>
                                <Select bind:value={searchModel.location} label="">
                                    <Option value="" >All</Option>
                                </Select>
                            </div>
                        </Cell>
                    </LayoutGrid>
                </form>
                <div class="d-pl-100 d-pr-100 m-d-0 m-none">
                    <DataTable style="width: 100%;">
                        <Head>
                            <Row>
                                <CellTable style="width: 10%"></CellTable>
                                <CellTable style="width: 35%;">Name</CellTable>
                                <CellTable style="width: 35%;">Specialties</CellTable>
                                <CellTable style="width: 20%;">Location</CellTable>
                            </Row>
                        </Head>
                        <Body>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                            <Row class="item-advisor">
                                <CellTable><a href="/advisor/detail"><img class="avatar" src="/img/advisors/avatar-1.jpg" /></a></CellTable>
                                <CellTable><a href="/advisor/detail" ><p class="name text-h2">Jan Wohl</p></a></CellTable>
                                <CellTable><p>Adventure, Ocean Cruising, River Cruising, Hot…</p></CellTable>
                                <CellTable><p>New York, USA</p></CellTable>
                            </Row>
                        </Body>
                    </DataTable >
                </div>
                <div class="d-none m-block">
                    <div class="advisors-list">
                        <LayoutGrid class="p-0">
                            <Cell span={12}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 8}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 12, tablet: 8, phone: 4}}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 9}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 12, tablet: 8, phone: 4}}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 8}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 12, tablet: 8, phone: 4}}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 8}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 12, tablet: 8, phone: 4}}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 8}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 12, tablet: 8, phone: 4}}>
                                <div class="item-advisor">
                                    <a href="/advisor/detail">
                                        <LayoutGrid class="p-0">
                                            <Cell spanDevices={{phone: 1, tablet: 2, desktop: 4}}>
                                                <div class="thumbnail">
                                                    <img src="/img/advisors/avatar-1.jpg" alt=""/>
                                                </div>
                                            </Cell>
                                            <Cell spanDevices={{phone: 3, tablet: 6, desktop: 8}}>
                                                <h2 class="mt-0 mb-15">Jan Wohl</h2>
                                                <p class="mt-0 mb-30">New York, USA</p>
                                                <p class="m-0">Adventure, Ocean Cruising, River Cruising, Hot…</p>
                                            </Cell>
                                        </LayoutGrid>
                                    </a>
                                </div>
                            </Cell>
                        </LayoutGrid>
                    </div>
                </div>
            </div>
        </section>
    </div>
</Layout>
<HeaderActionMobile bind:content={contentHeaderActionMobile} bind:searchModel on:close={onSearchSubmit}></HeaderActionMobile>
<style>
    .header-title{
        background-color: #F0F7F8;
    }
    :global(.is_sticky .hidden-on-sticky){
        display: none;
    }
    .header-title:global(.is_sticky){
        padding-bottom: 55px !important;
    }
    .search-form-advisor :global(.mdc-layout-grid){
        --mdc-select-idle-line-color: #000;
        --mdc-select-hover-line-color: #000;

    }
    .search-form-advisor :global(.mdc-text-field)
    {
        height: 35px;
        width: 100%;
        padding-right: 15px;
    }
    /*.search-form-advisor :global(.smui-select--standard .mdc-floating-label){*/
    /*    max-width: calc(100% - 35px);*/
    /*}*/
    .search-form-advisor :global(.mdc-select.mdc-select .mdc-select__anchor){
        height: 35px;
    }
    .search-form-advisor :global(.mdc-select.mdc-select .mdc-select__anchor:before){
        height: 20px;
    }
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__trailing),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__leading),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__notch),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form-advisor :global(.mdc-text-field .mdc-floating-label){
        padding-left: 24px;
    }
    .search-form-advisor .mdc-text-field--outlined :global(.mdc-floating-label){
        left: 22px;
    }
    .search-form-advisor :global(.mdc-text-field img){
        filter: brightness(0.1);
    }

    :global(.form-inline .form-control){
        display:  inline-block;
        margin-right: 30px;
    }
    :global(.form-inline .form-control:last-child){
        margin-right: 0;
    }
    form label{
        margin-right: 25px;
    }

    form :global(.mdc-select__selected-text){
        text-transform: uppercase;
    }

    :global(.page-advisors .item-advisor img){
        border-radius: 50%;
        vertical-align: middle;
    }
    :global(.item-advisor .name){
        vertical-align: middle;
    }
    :global(.mdc-data-table){
        border: 0;
    }
    :global(.mdc-data-table tr td){
        padding-top: 50px;
        padding-bottom: 30px;
    }
    :global(.mdc-data-table tr:last-child){
        border-bottom: 1px solid rgba(0,0,0,.12);
    }

    :global(.header-title){
        top: -200px;
        transition: top 2s ease;
    }
    :global(#header.fixed){
        animation: fadeIn 2s ease;
    }

    @media screen and (min-width: 840px) {
        .advisors-list :global(.mdc-layout-grid  .mdc-layout-grid__cell .item-advisor){
            border-bottom: 1px solid rgba(0,0,0,0.2);
        }
    }
    @media screen and (max-width: 839px) {
        .advisors-list :global(.mdc-layout-grid) {
            --mdc-layout-grid-gutter-phone: 0;
            --mdc-layout-grid-gutter-tablet: 0;
            --mdc-layout-grid-gutter-desktop: 0;
        }

        .advisors-list :global(.mdc-layout-grid .mdc-layout-grid) {
            --mdc-layout-grid-gutter-tablet: 20px;
            --mdc-layout-grid-gutter-desktop: 30px;
            --mdc-layout-grid-gutter-phone: 20px;
        }
        .advisors-list :global(.mdc-layout-grid  .mdc-layout-grid__cell .item-advisor){
            border-top: 1px solid rgba(0,0,0,0.2);
        }
        .advisors-list :global(.mdc-layout-grid  .mdc-layout-grid__cell:last-child .item-advisor){
            border-bottom: 1px solid rgba(0,0,0,0.2);
        }
    }

    .item-advisor{

        padding-top: 30px;
        padding-bottom: 30px;
    }

    .item-advisor .thumbnail{
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    :global(.page-advisors .mdc-data-table__header-cell){
        text-transform: uppercase;
    }

</style>