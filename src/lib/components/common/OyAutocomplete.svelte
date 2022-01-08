<script lang="ts">
import Autocomplete from "@smui-extra/autocomplete/src/Autocomplete.svelte";
import Textfield from "@smui/textfield";
import Icon from '@smui/textfield/icon';
import { onMount } from "svelte";

    export let options: any[];
    export let key: string | undefined = undefined;
    export let value: number | string | undefined;
    export let getOptionLabel: (option: any) => string = (option: any) =>
    option == null ? '' : `${option}`;
    export let valueInput: any = undefined;
    let text = ''
    
    onMount(()=>{
        valueInput = options.find((item)=> (key ? item[key] : item) == value);
    });
    
    const onRemoveValue = () =>{
        value = undefined;
        valueInput = undefined;
        text = '';
        console.log('test');
    }
</script>
<div>
<Autocomplete bind:options bind:getOptionLabel bind:value={valueInput} on:SMUIAutocomplete:selected={(option)=>{ value = key ? option.detail[key] : option.detail }}
    bind:text
    >
    <Textfield bind:value={text}>
        
        <a href="javascript:void(0)" on:click={onRemoveValue} slot="trailingIcon" >
            {#if value}
                <Icon class="material-icons" >close</Icon>
            {/if}
        </a>
    </Textfield>
</Autocomplete>
</div>
<style lang="scss">
    div {
        :global(.smui-text-field--standard .mdc-text-field__icon--trailing){
            --mdc-icon-size: 16px;
            font-size: var(--mdc-icon-size);
            padding: 0;
        }
    }
</style>