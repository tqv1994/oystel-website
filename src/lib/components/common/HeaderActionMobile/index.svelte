<script lang="ts">
    import TopAppBar, {Section, Row, Title} from '@smui/top-app-bar';
    import { createEventDispatcher } from 'svelte';
    import Button, {Icon} from '@smui/button';
    import Svg from '@smui/common/Svg.svelte';
    import IconButton from '@smui/icon-button';
    import OyMenu from './OyMenu.svelte';
    import OyExplode from './OyExplode.svelte';
    import OyFormSearchExperience from './OyFormSearchExperience.svelte';
    let dispathcher = createEventDispatcher();
    export let open = false;
    export let content;
    export let searchModel;
    function callCloseHeaderActionMobile(){
        content = '';
        dispathcher('close');
    }
</script>
{#if (content != '')}
<div id="header-action-mobile" class="d-none m-block pt-10">
    <div class="wrap mr-20 ml-20">
        <TopAppBar
                variant="static"
                class="demo-top-app-bar light"
        >
            <Row>
                <Section class="pl-0">
                    <Title
                            id="logo"
                            href="/"
                            class="mdc-theme--primary pl-0"
                    >
                        <img src="/img/logo.svg" />
                    </Title>
                </Section>
                <Section class="pr-0" align="end">
                    <div class="wrap-close-btn">
                        <IconButton on:click={()=>{content = ''}}>
                            <Icon component={Svg} viewBox="0 0 18.858 18.858">
                                <g id="Icon_-_Close" data-name="Icon - Close" transform="translate(-331.071 -23.571)">
                                    <line id="Line" y1="17" x2="18" transform="translate(331.5 24.5)" fill="none" stroke="#000" stroke-width="1.25"/>
                                    <line id="Line-2" data-name="Line" y1="17" x2="18" transform="translate(349 24) rotate(90)" fill="none" stroke="#000" stroke-width="1.25"/>
                                </g>
                            </Icon>
                        </IconButton>
                    </div>
                </Section>
            </Row>
            <div class="divider"></div>
        </TopAppBar>
        <div class="">
            {#if (!content || content == 'menu')}
            <OyMenu on:close={callCloseHeaderActionMobile}>no content</OyMenu>
            {:else if (content == 'explode')}
                <OyExplode on:close={callCloseHeaderActionMobile}>no content</OyExplode>
            {:else if (content == 'experience-search')}
                <OyFormSearchExperience bind:searchModel on:close={callCloseHeaderActionMobile}>no content</OyFormSearchExperience>
            {/if}
        </div>
    </div>
</div>
{/if}
<style>
    #header-action-mobile{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100vh - 83px);
        background-color: #F0F7F8;
        z-index: 10;
    }
    .wrap-close-btn{
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: nowrap;
    }
    .wrap-close-btn :global(.mdc-icon-button){
        --mdc-ripple-color: tranparent;
        padding: 12px 0;
        width: auto;
        height: auto;
    }
</style>
