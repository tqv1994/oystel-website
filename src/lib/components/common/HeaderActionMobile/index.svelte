<script lang="ts">
  import TopAppBar from '@smui/top-app-bar';
  import { Section } from '@smui/top-app-bar';
  import { Row } from '@smui/top-app-bar';
  import { Title } from '@smui/top-app-bar';
  import { createEventDispatcher } from 'svelte';
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  import IconButton from '@smui/icon-button';
  import OyMenu from './OyMenu.svelte';
  import OyExplode from './OyExplode.svelte';
  import OyFormSearchExperience from './OyFormSearchExperience.svelte';
  import OyFormSearchAdvisor from './OyFormSearchAdvisor.svelte';
  import { Country } from '$lib/store/country';
  import { Category } from '$lib/store/category';
  import { Nameable } from '$lib/store/types';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';

  let dispathcher = createEventDispatcher();
  export let open = false;
  export let content: string;
  export let searchModel: any = {};
  export let experience_types: Category[] = [];
  export let destination_types: Category[] = [];
  export let countries: Country[] = [];
  export let advisorTypes: Category[] = [];
  export let orderings: Nameable[] = [];
  function callCloseHeaderActionMobile(event: CustomEvent) {
    dispathcher('close', event.detail);
  }

  function closeSearchBox(){
    content = '';
  }
</script>

{#if content != ''}
  <div id="header-action-mobile" class="d-none m-block pt-10">
    <div class="wrap mr-20 ml-20">
      <TopAppBar variant="static" class="demo-top-app-bar light">
        <Row>
          <Section class="pl-0">
            <Title href="/" class="mdc-theme--primary pl-0">
              <OysteoLogo />
            </Title>
          </Section>
          <Section class="pr-0" align="end">
            <div class="wrap-close-btn">
              <IconButton
                on:click={closeSearchBox}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </Section>
        </Row>
      </TopAppBar>
      <div class="">
        {#if !content || content == 'menu'}
          <OyMenu on:close={callCloseHeaderActionMobile}>no content</OyMenu>
        {:else if content == 'explode'}
          <OyExplode on:close={closeSearchBox}
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
            bind:advisorTypes
            on:close={callCloseHeaderActionMobile}
            >no content</OyFormSearchAdvisor
          >
        {/if}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  @use '../../../../theme/mixins';
  @use '../../../../theme/colors';
  #header-action-mobile {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 83px);
    background-color: #f0f7f8;
    z-index: 10;
    :global(.mdc-top-app-bar){
      --mdc-theme-primary: #{colors.$slightlyBlue};
    }
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
