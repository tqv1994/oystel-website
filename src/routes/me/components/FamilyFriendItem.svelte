<script lang="ts">
import ButtonUnderline from "./ButtonUnderline.svelte";
import Title from "./Title.svelte";
import Text from "./Text.svelte";

export let name: string;
export let relationship: string;
export let birthday: string;
</script>
<div class="box">
    <div class="title mb-20">
        <svelte:component this={Title} class="name">{name}</svelte:component>
        <svelte:component this={Text} class="relationship">{relationship}</svelte:component>
        <svelte:component this={ButtonUnderline} label="Edit"/>
    </div>
    <div class="content">
        <svelte:component this={Text}>Date of Birth: {birthday}</svelte:component>
    </div>
</div>
<style lang="scss">
    .box{
        padding: 20px;
        background-color: #f7f7f7;
        --mdc-typography-headline1-font-size: 22px;
        position: relative;
        :global(.name){
            display: inline;
        }
        :global(.relationship){
            display: inline;
            font-style: oblique;
        }
        :global(.mdc-button){
            position: absolute;
            top: 25px;
            right: 0;
            text-decoration: underline;
            min-width: auto;
            padding: 0 20px 0 0;
        }
    }
</style>