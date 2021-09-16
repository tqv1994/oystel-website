<script lang="ts">
    import TopAppBar, {Section, Row, Title} from '@smui/top-app-bar';
    import Button, {Icon} from '@smui/button';
    import Svg from '@smui/common/Svg.svelte';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher, afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    const dispatch = createEventDispatcher();
    export let showSubmenu = false;
    let menuActive;
    let searchResultString = '';
    let searchResult = [
        {
            category: 'Hot Destinations',
            items: [
                {
                    name: 'Sea',
                    link: '#'
                },
                {
                    name: 'Mountain',
                    link: '#'
                },
                {
                    name: 'Jungle',
                    link: '#'
                },
                {
                    name: 'Wilderness',
                    link: '#'
                }
            ],
        },
        {
            category: 'Hot Experiences',
            items: [
                {
                    name: 'Dining with a View',
                    link: '#'
                },
                {
                    name: 'Exotic Animals',
                    link: '#'
                },
                {
                    name: 'Yachting Around the World',
                    link: '#'
                },
                {
                    name: 'Backpacking in Style',
                    link: '#'
                }
            ],
        },
    ];
    function doOpenSubmenu(menu){
        menuActive = menu;
    }
    function openLink(menu){
        goto(menu.link);
        dispatch('close');
    }

    afterUpdate(()=>{ document.getElementById('header-action-mobile').style.backgroundColor = '#fff'; });
</script>
<div id="explode-wrap" class="mt-25">
    <form class="search-form">
        <div class="form-control">
            <Textfield variant="outlined" bind:value={searchResultString} label="Start with a search" withTrailingIcon={false}>
                <Icon slot="trailingIcon"
                ><img src="./img/icons/icon-search.svg" /></Icon
                >
            </Textfield>
        </div>
        <div class="wrap-search-result mt-40">
            <ul class="mt-0">
                {#each searchResult as result}
                    <li><a>{result.category}</a></li>
                    <ul>
                        {#each result.items as item}
                            <li><a href="#">{item.name}</a> </li>
                        {/each}
                    </ul>
                {/each}
            </ul>
        </div>
    </form>
</div>
<style>
    .wrap-search-result{
        height:calc( 100vh / 812  * 530);
        overflow-x: scroll;
    }
    .wrap-search-result ul{
        list-style: none;
        padding-left: 0;
    }
    .wrap-search-result ul ul{
        padding-left: 24px;
    }
    .wrap-search-result ul li{
        margin-bottom: 30px;
    }
    .wrap-search-result ul li a{
        position: relative;
    }
    .wrap-search-result ul li a i{
        position: absolute;
        right: -30px;
        top: -4px;
    }
    .wrap-search-result ul li a.back{
        padding-left: 10px;
    }
    .wrap-search-result ul li a.back i{
        position: absolute;
        left: -10px;
        top: -4px;
    }

    .follow-wrap{
        position: absolute;
        bottom: 30px;
    }

    .search-form :global(.mdc-text-field){
        height: 35px;
        width: 100%;

        padding-right: 15px;
    }
    .search-form :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form :global(.mdc-text-field .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form :global(.mdc-text-field .mdc-floating-label){
        padding-left: 24px;
    }
    .search-form .mdc-text-field--outlined :global(.mdc-floating-label){
        left: 22px;
    }
    .search-form :global(.mdc-text-field img){
        filter: brightness(0.1);
    }
</style>