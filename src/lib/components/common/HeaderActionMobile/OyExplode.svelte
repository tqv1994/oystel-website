<script lang="ts">
  import TopAppBar, { Section, Row, Title } from '@smui/top-app-bar';
  import Button, { Icon } from '@smui/button';
  import Svg from '@smui/common/Svg.svelte';
  import IconButton from '@smui/icon-button';
  import Textfield from '@smui/textfield';
  import { createEventDispatcher, afterUpdate, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { searchKeys } from '$lib/const'; 

  const dispatch = createEventDispatcher();
  let menuActive;
  let searchResultString = '';
  let results: string[] = searchKeys;

  function getHierachyTags(){
  //       tagResult = [];
  //       if(Array.isArray(tagDatas)){
  //           for(const tag of tagDatas){
  //               if(tag.parent != null){
  //                   continue;
  //               }
  //               tagResult.push(tag);
  //               let tagChilds = [];
  //               for(const tagChild of tagDatas){
  //                   if(tagChild.parent == null || tagChild.id == tag.id){
  //                       continue;
  //                   }
  //                   if(tagChild.id_relative.indexOf(tag.id_relative) >= 0){
  //                       let prefix = '';
  //                       const countIdRelative = tagChild.id_relative.split('.').length;
  //                       tagChild.title = tagChild.title.split("&nbsp;").join("");
  //                       for(let k = 0; k < countIdRelative - 2; k++){
  //                           prefix += '&nbsp;&nbsp;&nbsp;&nbsp;';
  //                       }
  //                       tagChild.title = prefix + tagChild.title; 
  //                       tagChilds.push(tagChild);
  //                   }
  //               }
  //               tagChilds = tagChilds.sort((a,b)=>{
  //                   if(a.id_relative < b.id_relative){
  //                       return -1;
  //                   }
  //                   if(a.id_relative > b.id_relative){
  //                       return 1;
  //                   }
  //                   return 0
  //               });
  //               tagResult = tagResult.concat(tagChilds);
  //           }
  //       }
    }
  

  function search() {
    if (searchResultString != '') {
      results = [];
      searchKeys.map((item) => {
        item = item.split('&nbsp;').join("");
        let result = item.toLowerCase();
        let search = searchResultString.toLowerCase();
        let index = result.indexOf(search);
        if (index >= 0) {
          results.push(item);
        }
      });
    } else {
      results = searchKeys;
    }
  }

  afterUpdate(() => {
    document.getElementById('header-action-mobile').style.backgroundColor =
      '#fff';
  });

  async function handleSearch(key: string){
    goto(`/search?name=${key}`);
    return;
  }
</script>

<div id="explode-wrap" class="mt-25">
  <form class="search-form">
    <div class="form-control">
      <Textfield
        variant="outlined"
        on:keyup={search}
        bind:value={searchResultString}
        label="Start with a search"
        withTrailingIcon={false}
      >
        <Icon slot="trailingIcon"
          ><img src="./img/icons/icon-search.svg" /></Icon
        >
      </Textfield>
    </div>
    <div class="wrap-search-result mt-40">
      {#if results}
        <ul class="mt-0">
          {#each results as result}
            <li>
              <a href="javascript:void(0)" on:click={()=>{handleSearch(result)}}
                >{result}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </form>
</div>

<style lang="scss">
  .wrap-search-result {
    height: calc(100vh / 812 * 530);
    overflow-x: scroll;
  }
  .wrap-search-result ul {
    list-style: none;
    padding-left: 25px;
  }
  .wrap-search-result ul ul {
    padding-left: 50px;
  }
  .wrap-search-result ul li {
    margin-bottom: 30px;
  }
  .wrap-search-result ul li a {
    position: relative;
  }
  .wrap-search-result ul li a i {
    position: absolute;
    right: -30px;
    top: -4px;
  }
  .wrap-search-result ul li a.back {
    padding-left: 10px;
  }
  .wrap-search-result ul li a.back i {
    position: absolute;
    left: -10px;
    top: -4px;
  }

  .follow-wrap {
    position: absolute;
    bottom: 30px;
  }

  .search-form :global(.mdc-text-field) {
    height: 44px;
    width: 100%;
    -webkit-backdrop-filter: blur(7px) brightness(0.85);
    backdrop-filter: blur(7px) brightness(0.85);
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 0;
  }
  .search-form :global(.mdc-text-field .mdc-notched-outline__leading),
  .search-form :global(.mdc-text-field .mdc-notched-outline__notch),
  .search-form :global(.mdc-text-field .mdc-notched-outline__trailing) {
    border-color: #000;
  }
  .search-form :global(.mdc-text-field img) {
    filter: brightness(0.1);
  }
</style>
