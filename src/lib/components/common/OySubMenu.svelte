<div class="light sub-menu {open == true ? 'open' : ''}" on:mousemove={()=>{open=true}} on:mouseleave={()=>{open=false; menuId=""}}>
    {#if tabs && tabs.length > 0}
    <LayoutGrid class="p-25">
        <Cell spanDevices={{desktop: 5, mobile: 12}}>
            {#if active && active.image}
            <div class="image" style="background-image: url({active.image})"></div>
            {/if}
        </Cell>
        <Cell spanDevices={{desktop: 7, mobile: 12}}>
            <TabBar {tabs} let:tab bind:active={active}>
                <!-- Note: the `tab` property is required! -->
                <Tab {tab}>
                    <Label>{tab.category}</Label>
                </Tab>
            </TabBar>
            {#if active && active.title}
            <div class="tab-content light">
                <div class="post-type mb-15">Most Popular</div>
                <h2 class="mb-40">{active.title}</h2>
                <Button type="button" variant="outlined">
                    <Label>Explore Now</Label>
                </Button>
            </div>
            {/if}
        </Cell>
    </LayoutGrid>
    {/if}
</div>
<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import { createEventDispatcher } from 'svelte';
    import Tab, { Icon, Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import { onMount, afterUpdate } from 'svelte';
    import { MenuModel } from '$lib/models/menu';
    import { ExperienceModel } from '$lib/models/experience';
    export let open = false;
    export let menuId: string;
    export let tabs: any[];
    export let active: any;
    
    afterUpdate(async () => {
        let liMenus = document.querySelectorAll('header #main-menu li');
        if(typeof liMenus !== 'undefined' && liMenus.length > 0){
            for(let i =0 ;i < liMenus.length; i++){
                liMenus[i].classList.remove('active');
            }
        }
        if(open == true){
            if(menuId){
                let menuActive = document.querySelector('header #main-menu li#'+menuId);
                if(typeof menuActive != 'undefined'){
                    menuActive.classList.add('active');
                }
            }
        }
        
    });

    onMount(()=>{
        if(tabs){
            active = tabs[0];
        }
    });

</script>
<style>
    .sub-menu{
        opacity: 0;
        z-index: 99;
        position: absolute;
        top: -1000px;
        background: #fff;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
    }
    .sub-menu:after{
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 1px;
        background: #fff;
        bottom: -15px;
    }
    .sub-menu.open{
        top: 90px;
        opacity: 1;
        animation: fadeIn 1s ease;
    }
    .tab-content{
        padding-top: 100px;
    }
    .mdc-tab{
        padding-left: 0;
        justify-content: left;
    }
    .image{
        position: relative;
        width: 100%;
        padding-bottom: 64.31%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
</style>