<div class="light sub-menu {open == true ? 'open' : ''}" on:mousemove={()=>{open=true}} on:mouseleave={()=>{open=false; menuId=""}}>
    <LayoutGrid class="p-25">
        <Cell spanDevices={{desktop: 5, mobile: 12}}>
            <img style="width: 100%;" src="{active.image}" alt=""/>
        </Cell>
        <Cell spanDevices={{desktop: 7, mobile: 12}}>
            <TabBar {tabs} let:tab bind:active>
                <!-- Note: the `tab` property is required! -->
                <Tab {tab}>
                    <Label>{tab.category}</Label>
                </Tab>
            </TabBar>
            <div class="tab-content light">
                <div class="post-type mb-15">Most Popular</div>
                <h2 class="mb-40">{active.title}</h2>
                <Button type="button" variant="outlined">
                    <Label>Explore Now</Label>
                </Button>
            </div>
        </Cell>
    </LayoutGrid>
</div>
<script lang="ts">
    import IconButton from '@smui/icon-button';
    import Button from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import { createEventDispatcher } from 'svelte';
    import Tab, { Icon, Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import { onMount, afterUpdate } from 'svelte';
    export let open = false;
    export let menuId;
    let tabs = [
        {
            category: 'Beach',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        },
        {
            category: 'City',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        },
        {
            category: 'Mountain',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        },
        {
            category: 'Sea',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        },
        {
            category: 'Wildernes',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        },
        {
            category: 'View All',
            title: 'St.Barths, Grand Cul De Sac',
            link: '#',
            image: '/img/posts/post1.jpg'
        }
    ];
    let active = tabs[3];
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
        top: 65px;
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
</style>