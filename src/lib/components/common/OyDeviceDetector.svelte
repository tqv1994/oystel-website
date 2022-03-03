<script lang="ts">
    let innerWidth: number;
    let isMobile: boolean = false;
    export let showInMobile: boolean = true;
    export let showInDesktop: boolean = true;
    $: if(innerWidth > 959){
        isMobile = false;
    }else{
        isMobile = true;
    }
    </script>
    <svelte:window bind:innerWidth />
    {#if showInDesktop && isMobile === false}
        <slot/>
    {:else if showInMobile && isMobile === true}
        <slot/>
    {/if}