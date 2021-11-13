<script lang="ts">
  import TopAppBar from '@smui/top-app-bar/TopAppBar.svelte';
  import Section from '@smui/top-app-bar/Section.svelte';
  import Row from '@smui/top-app-bar/Row';
  import Title from '@smui/top-app-bar/Title';
  import { createEventDispatcher } from 'svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import Svg from '@smui/common/elements/Svg.svelte';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import OyMenu from './OyMenu.svelte';
  import OyExplode from './OyExplode.svelte';
  import OyFormSearchExperience from './OyFormSearchExperience.svelte';
  import OyFormSearchAdvisor from './OyFormSearchAdvisor.svelte';
  import { Country } from '$lib/store/country';
  import { Speciality } from '$lib/store/speciality';
  import { Category } from '$lib/store/category';
  import { Nameable } from '$lib/store/types';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';

  let dispathcher = createEventDispatcher();
  export let open = false;
  export let content: string;
  export let searchModel: any = {};
  export let experience_types: Category[] = [];
  export let destination_types: Category[] = [];
  export let countries: Country[] = [];
  export let specialities: Speciality[] = [];
  export let orderings: Nameable[] = [];
  function callCloseHeaderActionMobile(event: CustomEvent) {
    dispathcher('close', event.detail);
  }
</script>

{#if content != ''}
  <div id="header-action-mobile" class="d-none m-block pt-10">
    <div class="wrap mr-20 ml-20">
      <TopAppBar variant="static" class="demo-top-app-bar light">
        <Row>
          <Section class="pl-0">
            <Title id="logo" href="/" class="mdc-theme--primary pl-0">
              <OysteoLogo />
            </Title>
          </Section>
          <Section class="pr-0" align="end">
            <div class="wrap-close-btn">
              <IconButton
                on:click={() => {
                  content = '';
                }}
              >
                <Icon component={Svg} viewBox="0 0 18.858 18.858">
                  <g
                    id="Icon_-_Close"
                    data-name="Icon - Close"
                    transform="translate(-331.071 -23.571)"
                  >
                    <line
                      id="Line"
                      y1="17"
                      x2="18"
                      transform="translate(331.5 24.5)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1.25"
                    />
                    <line
                      id="Line-2"
                      data-name="Line"
                      y1="17"
                      x2="18"
                      transform="translate(349 24) rotate(90)"
                      fill="none"
                      stroke="#000"
                      stroke-width="1.25"
                    />
                  </g>
                </Icon>
              </IconButton>
            </div>
          </Section>
        </Row>
      </TopAppBar>
      <div class="">
        {#if !content || content == 'menu'}
          <OyMenu on:close={callCloseHeaderActionMobile}>no content</OyMenu>
        {:else if content == 'explode'}
          <OyExplode on:close={callCloseHeaderActionMobile}
            >no content</OyExplode
          >
        {:else if content == 'experience-search'}
          <OyFormSearchExperience
            bind:searchModel
            on:close={callCloseHeaderActionMobile}
            bind:experience_types
            bind:destination_types
            bind:orderings
            bind:countries>no content</OyFormSearchExperience
          >
        {:else if content == 'advisor-search'}
          <OyFormSearchAdvisor
            bind:searchModel
            bind:locations={countries}
            bind:specialities
            on:close={callCloseHeaderActionMobile}
            >no content</OyFormSearchAdvisor
          >
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  #header-action-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 83px);
    background-color: #f0f7f8;
    z-index: 10;
  }
  .wrap-close-btn {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
  }
  .wrap-close-btn :global(.mdc-icon-button) {
    --mdc-ripple-color: tranparent;
    padding: 12px 0;
    width: auto;
    height: auto;
  }
</style>
