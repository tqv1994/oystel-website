<script lang="ts">
    import TopAppBar, {Section, Row, Title} from '@smui/top-app-bar';
    import Button, {Icon, Label} from '@smui/button';
    import Svg from '@smui/common/Svg.svelte';
    import IconButton from '@smui/icon-button';
    import Textfield from '@smui/textfield';
    import Select, {Option} from '@smui/select';
    import { createEventDispatcher, afterUpdate } from 'svelte';
    import { goto } from '$app/navigation';

    const dispatch = createEventDispatcher();
    export let showSubmenu = false;
    let menuActive;
    export let searchModel = {
        name: '',
        type: '',
        destination: '',
        country: '',
        sort_by: '',
    };
    function onSearchSubmit(){
        dispatch('close');
    }
</script>
<div id="form-search-experience-wrap" class="mt-40">
    <form class="search-form-experiences" action="/" on:submit|preventDefault={onSearchSubmit}>
        <div class="form-control mb-40">
            <Select variant="outlined" bind:value={searchModel.type} label="By Experience Type">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control mb-40">
            <Select variant="outlined" bind:value={searchModel.destination} label="By Destination">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control mb-40">
            <Select variant="outlined" bind:value={searchModel.country} label="By Country">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control mb-80">
            <Select variant="outlined" bind:value={searchModel.sort_by} label="Sort By">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control">
            <Button variant="outlined" style="width: 100%;" type="submit"><Label>Filter Your Results</Label></Button>
        </div>
    </form>
</div>
<style>
    .search-form-experiences :global(.mdc-select){
        width: 100%;
    }
    .search-form-experiences :global(.mdc-select.mdc-select--outlined .mdc-select__anchor){
        height: 35px;
    }
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-text-field .mdc-notched-outline__trailing),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__leading),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__notch),
    .search-form-experiences :global(.mdc-select .mdc-notched-outline__trailing){
        border-color: #000;
    }
</style>