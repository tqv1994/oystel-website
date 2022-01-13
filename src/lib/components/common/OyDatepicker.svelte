<script lang="ts">
import { dateTimeHelper } from '$lib/helpers/datetime';

    import Textfield from '@smui/textfield';
    import dayjs from "dayjs";
    import { afterUpdate, onMount } from "svelte";
    import { Datepicker, InlineCalendar } from "svelte-calendar";
    export let value: string | Date;
    //https://6edesign.github.io/svelte-calendar/docs/props
    let store: any;
    let optionsDefault = {
        width: "700px",
        maxWidth: "100vw",
        legend: {
                height: "35px"
        },
        shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
        colors: {
            text: {
                primary: "#333",
                highlight: "#fff"
            },
            background: {
                primary: "#fff",
                highlight: "#eb7400",
                hover: "#eee"
            },
            border: "#eee"
        },
        font: {
            regular: "1em",
            large: "30em"
        },
        grid: {
            disabledOpacity: ".35",
            outsiderOpacity: ".6"
        }
    };
    export let options = {};
    export let type: 'default' | 'inline' = 'default';
    const theme = {
		calendar: {
			...optionsDefault,
            ...options
		}
	};
    let selected: Date = value ? new Date(value) : new Date();
    afterUpdate(()=>{
        const result = new Date($store.selected);
        console.log('updated');
        value = `${result.getFullYear()}-${("0"+result.getMonth()+1).slice(-2)}-${("0"+result.getDate()).slice(-2)}`;
    });
</script>
    {#if type === 'default'}
    <div>
        <Datepicker selected={selected} bind:store let:key let:send let:receive>
            <div in:receive|local={{ key }} out:send|local={{ key }}>
                <Textfield value={$store?.hasChosen ? dateTimeHelper.formatDate($store.selected) : dateTimeHelper.formatDate(value)}/>
            </div>
        </Datepicker>
    </div>
    {:else}
        <InlineCalendar bind:store selected={selected} {theme}/>
    {/if}
<style lang="scss">
    // style calendar
    div{
        :global(.contents-wrapper){
            position: fixed;
        }
    }

</style>