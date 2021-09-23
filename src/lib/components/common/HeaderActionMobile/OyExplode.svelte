<script lang="ts">
    import TopAppBar, {Section, Row, Title} from '@smui/top-app-bar';
    import Button, {Icon} from '@smui/button';
    import Svg from '@smui/common/Svg.svelte';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher, afterUpdate, onMount } from 'svelte';
    import { goto } from '$app/navigation';
import { TagModel } from '$lib/models/tag';

    const dispatch = createEventDispatcher();
    export let showSubmenu = false;
    let menuActive;
    let searchResultString = '';
    let tags: TagModel[];
    let tagsResult: TagModel[];
    function doOpenSubmenu(menu){
        menuActive = menu;
    }
    function openLink(menu){
        goto(menu.link);
        dispatch('close');
    }

    onMount(async () =>{
        await getTags();
    });

    async function getTags(){
        const res = await fetch('/api/page/home/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const content = await res.json();
        if (Array.isArray(content)) {
          tags = [];
          content.map((item) => {
            tags.push(new TagModel(item));
          });
          tagsResult = tags;
        }
        return;
      }
    }

    function searchTags(){
        if(searchResultString != ''){
            tagsResult = [];
            tags.map((item)=>{
                let title = item.title.toLowerCase();
                let search = searchResultString.toLowerCase();
                let index = title.indexOf(search);
                if(index >=0 ){
                    tagsResult.push(item);
                }
            });
        }else{
            tagsResult = tags;
        }
    }

    afterUpdate(()=>{ document.getElementById('header-action-mobile').style.backgroundColor = '#fff'; });
</script>
<div id="explode-wrap" class="mt-25">
    <form class="search-form">
        <div class="form-control">
            <Textfield variant="outlined" on:keyup={searchTags} bind:value={searchResultString} label="Start with a search" withTrailingIcon={false}>
                <Icon slot="trailingIcon"
                ><img src="./img/icons/icon-search.svg" /></Icon
                >
            </Textfield>
        </div>
        <div class="wrap-search-result mt-40">
            {#if tagsResult}
            <ul class="mt-0">
                {#each tagsResult as tag}
                    <li><a href={tag.link}>{@html (searchResultString == '' ? tag.titleWithPrefix : tag.title)}</a></li>
                {/each}
            </ul>
            {/if}
        </div>
    </form>
</div>
<style lang="scss">
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
        :global(.mdc-text-field__input){
            padding-left: 24px;
        }
    }
    .search-form :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form :global(.mdc-text-field .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form :global(.mdc-text-field img){
        filter: brightness(0.1);
    }
</style>