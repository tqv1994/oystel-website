<script lang="ts">
import { dateTimeHelper } from '$lib/helpers/datetime';

    import Textfield from '@smui/textfield';
    import dayjs from "dayjs";
    import { afterUpdate, onMount } from "svelte";
    import { Datepicker } from "svelte-calendar";
    export let value: string;
    //https://6edesign.github.io/svelte-calendar/docs/props
    let store: any;
    let selected: Date = value ? new Date(value) : new Date();
    afterUpdate(()=>{
        const result = new Date($store.selected);
        console.log('updated');
        value = `${result.getFullYear()}-${("0"+result.getMonth()+1).slice(-2)}-${("0"+result.getDate()).slice(-2)}`;
    })
</script>
    <div>
        <Datepicker selected={selected} bind:store let:key let:send let:receive>
            <div in:receive|local={{ key }} out:send|local={{ key }}>
                <Textfield value={$store?.hasChosen ? dateTimeHelper.formatDate($store.selected) : dateTimeHelper.formatDate(value)}/>
            </div>
        </Datepicker>
    </div>
<style lang="scss">
    // style calendar
    div{
        :global(.contents-wrapper){
            position: fixed;
        }
    }

</style>