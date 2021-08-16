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
        specialty: '',
        location: ''
    };
    function onSearchSubmit(){
        dispatch('close');
    }
</script>
<div id="form-search-advisor-wrap" class="mt-40">
    <form class="search-form-advisor" action="/" on:submit|preventDefault={onSearchSubmit}>
        <div class="form-control mb-40">
            <Select variant="outlined" bind:value={searchModel.specialty} label="By Specialty">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control mb-40">
            <Select variant="outlined" bind:value={searchModel.location} label="By Location">
                <Option value=""></Option>
            </Select>
        </div>
        <div class="form-control btn-submit-wrap">
            <Button variant="outlined" style="width: 100%;" type="submit"><Label>Filter Your Results</Label></Button>
        </div>
    </form>
</div>
<style>
    .search-form-advisor :global(.mdc-select){
        width: 100%;
    }
    .search-form-advisor :global(.mdc-select.mdc-select--outlined .mdc-select__anchor){
        height: 35px;
    }
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__leading),
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__notch),
    .search-form-advisor :global(.mdc-text-field .mdc-notched-outline__trailing),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__leading),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__notch),
    .search-form-advisor :global(.mdc-select .mdc-notched-outline__trailing){
        border-color: #000;
    }
    .search-form-advisor{
        position: relative;
        height:calc( 100vh / 667  * 455);
    }
    .search-form-advisor .btn-submit-wrap{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>