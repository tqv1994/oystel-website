<script lang="ts">
import Autocomplete from "@smui-extra/autocomplete/src/Autocomplete.svelte";
import { onMount } from "svelte";

    export let options: any[];
    export let key: string | undefined = undefined;
    export let value: number | string | undefined;
    export let getOptionLabel: (option: any) => string = (option: any) =>
    option == null ? '' : `${option}`;
    export let valueInput: any = undefined;
    onMount(()=>{
        valueInput = options.find((item)=> (key ? item[key] : item) == value);
    });
</script>
<Autocomplete bind:options bind:getOptionLabel bind:value={valueInput} on:SMUIAutocomplete:selected={(option)=>{ value = key ? option.detail[key] : option.detail }} />
<style lang="scss">

</style>