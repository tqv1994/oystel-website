<script lang="ts">
  import { clickOutside } from '$lib/components/events/clickOutside.js';
  import Textfield from '@smui/textfield';
  import { Icon } from '@smui/button';
  import { searchKeys } from '$lib/const';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
import { documentHelper } from '$lib/helpers';
  export let searchResult: string = '';
  // tagsStore.subscribe(({ tags }) => {
  //     tagDatas = Object.values(tags);
  // });
  let keyResult: string[] = [];
  let disabled: boolean;
  export let label: string = 'Start with a search';

  export let openSearchComplete: boolean = false;
  function handleOpenSearchComplete() {
    openSearchComplete = true;
    keyResult = searchKeys;
  }
  function handleCloseSearchComplete() {
    openSearchComplete = false;
    keyResult = [];
  }

  if (openSearchComplete) {
    handleOpenSearchComplete();
  }

  function handleSearchTags() {
    if (searchResult != '') {
      keyResult = [];
      searchKeys.map((item) => {
        let result = item.toLowerCase();
        let search = searchResult.toLowerCase();
        let index = result.indexOf(search);
        if (index >= 0) {
          keyResult.push(item);
        }
      });
    } else {
      keyResult = searchKeys;
    }
  }

  async function handleSearch(key: string){
    goto(`/search?q=${key}`);
    return;
  }

  onMount(async()=>{
    checkDeviceToDisableInput();
  });
  function checkDeviceToDisableInput(){
    if (document.documentElement.clientWidth <= 949) {
      if(documentHelper.getMobileOperatingSystem() == "Android"){
        disabled = true;
      }else{
        disabled = false;
      }
    }
    else{
      disabled = false;
    }
  }
</script>
<svelte:window
  on:resize={() => {
    checkDeviceToDisableInput();
  }}
/>
<form class="search-form">
  <div
    class="form-control {openSearchComplete == true
      ? 'open-search-complete'
      : false}"
    use:clickOutside
    on:click_outside={handleCloseSearchComplete}
  >
    <Textfield
      on:click={handleOpenSearchComplete}
      variant="outlined"
      {label}
      withTrailingIcon={false}
      bind:value={searchResult}
      on:keyup={handleSearchTags}
      disabled={disabled}
    >
      <Icon slot="trailingIcon"><img src="/img/icons/icon-search.svg" /></Icon>
    </Textfield>
    <div class="tags light mr--35 ml--35">
      {#if searchResult == ''}
        <p class="m-0 mt-25">Trending Searches</p>
      {/if}
      <ul>
        {#if keyResult.length > 0}
          {#each keyResult as key}
            <li class="mt-0"><a class="m-0" href="javascript:void(0);" on:click={()=>{handleSearch(key)}}>{key}</a></li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</form>

<style lang="scss">
  .search-form :global(.mdc-text-field) {
    height: 44px;
    width: 457px;
    -webkit-backdrop-filter: blur(7px) brightness(0.85);
    backdrop-filter: blur(7px) brightness(0.85);
    background-color: rgba(255, 255, 255, 0.65);
    border-radius: 0;

    @media screen and (max-width: 949px) {
      width: 100%;
    }
  }
  .form-control {
    .tags {
      display: none;
    }
    &.open-search-complete {
      background: #fff;
      display: inline-block;
      @media screen and (max-width: 949px) {
        display: block;
      }
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        width: calc(100% + 70px);
        height: calc(100% + 50px);
        background: #fff;
        left: 50%;
        transform: translateX(-50%);
        top: -25px;
      }
      :global(.mdc-text-field.mdc-text-field *) {
        border-color: transparent;
      }
      .tags {
        display: block;
        position: relative;
        p {
          padding-left: 50px;
          font-weight: 300;
        }
        ul {
          padding-left: 0;
          list-style: none;
          a {
            padding-left: 70px;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 0.2;
            line-height: 22px;
            padding-top: 12.5px;
            padding-bottom: 12.5px;
            display: block;
            &:active {
              background-color: #d9d8da;
            }
          }
        }
        max-height: 200px;
        overflow-y: scroll;
        &::-webkit-scrollbar-track {
          background-color: #d3d3d3;
        }
        &::-webkit-scrollbar {
          width: 5px;
          background-color: #d3d3d3;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #000;
        }
      }
    }
  }
</style>
