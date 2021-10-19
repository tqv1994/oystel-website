<script lang="ts">
    import {clickOutside} from '$lib/components/events/clickOutside.js';
    import Textfield from '@smui/textfield';
    import Button, { Label, Icon } from '@smui/button';
    import OySearch from '$lib/components/common/OySearch.svelte';

    export let openSearch: boolean = false;
    let searchLabel: string = 'What are you searching for?';
    function handleOpenSearch(){
        openSearch = true;
    }
    function handleCloseSearch(){
        openSearch = false;
    }
</script>
{#if openSearch}
<div class="wrap-search light" use:clickOutside on:click_outside={handleCloseSearch}>
    <OySearch openSearchComplete={openSearch} label={searchLabel}></OySearch>
  </div>
  <div class="backdrop"></div>
{/if}
<style lang="scss">
    .wrap-search{
        position: absolute;
        top: calc(117px + 25px);
        z-index: 1;
    }
    .backdrop{
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.55);
        position: fixed;
        z-index: 0;
    }
</style>