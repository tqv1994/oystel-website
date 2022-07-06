<script lang="ts">
  import TopAppBar from '@smui/top-app-bar';
  import { Section } from '@smui/top-app-bar';
  import { Row } from '@smui/top-app-bar';
  import { Title } from '@smui/top-app-bar';
  import { createEventDispatcher } from 'svelte';
  import IconButton from '@smui/icon-button';
  import OyMenu from './OyMenu.svelte';
  import OyExplode from './OyExplode.svelte';
  import OyFormSearchExperience from './OyFormSearchExperience.svelte';
  import OyFormSearchAdvisor from './OyFormSearchAdvisor.svelte';
  import type { Country } from '$lib/store/country';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
  import ShopNavMobile from './ShopNavMobile.svelte';
  import ProductSearchFormMobile from './ProductSearchFormMobile.svelte';
  import type { Kind } from '$lib/store/order';

  let dispathcher = createEventDispatcher();
  export let open = false;
  export let content: string;
  export let searchModel: any = {};
  export let experience_types: Kind[] = [];
  export let destination_types: Kind[] = [];
  export let countries: Country[] = [];
  export let advisorTypes: Kind[] = [];
  export let orderings: Kind[] = [];
  export let productTypes: Kind[] = [];
  export let productPatterns: Kind[] = [];
  export let productDesigners: Kind[] = [];
  export let productColours: Kind[] = [];
  export let vacationStyles: Kind[] = [];
  function callCloseHeaderActionMobile(event: CustomEvent) {
    dispathcher('close', event.detail);
  }

  function closeSearchBox() {
    content = '';
  }
</script>

{#if content != ''}
  <div id="header-action-mobile" class="d-none m-block {content}">
    <div class="wrap mr-20 ml-20 nav-wrapper">
      <TopAppBar variant="static" class="light search-form-header">
        <Row>
          <Section class="pl-0">
            <Title href="/" class="mdc-theme--primary pl-0">
              <OysteoLogo width={130} height={17.22} />
            </Title>
          </Section>
          <Section class="pr-0" align="end">
            <div class="wrap-close-btn">
              <IconButton class="explore-close-btn" on:click={closeSearchBox}>
                <CloseIcon />
              </IconButton>
            </div>
          </Section>
        </Row>
      </TopAppBar>
      <div class="nav-main-content">
        {#if !content || content == 'menu'}
          <OyMenu on:close={callCloseHeaderActionMobile}>no content</OyMenu>
        {:else if content == 'explode'}
          <OyExplode on:close={closeSearchBox}>no content</OyExplode>
        {:else if content == 'experience-search'}
          <OyFormSearchExperience
            bind:searchModel
            on:close={callCloseHeaderActionMobile}
            bind:experienceTypeOptions={experience_types}
            bind:destinationTypeOptions={destination_types}
            bind:orderingTypeOptions={orderings}
            bind:countryOptions={countries}
            bind:countries>no content</OyFormSearchExperience
          >
        {:else if content == 'advisor-search'}
          <OyFormSearchAdvisor
            bind:searchModel
            bind:countryOptions={countries}
            bind:experienceTypeOptions={experience_types}
            on:close={callCloseHeaderActionMobile}
            >no content</OyFormSearchAdvisor
          >
        {:else if content == 'shop-nav'}
          <ShopNavMobile
            {productDesigners}
            {productTypes}
            on:close={callCloseHeaderActionMobile}
          />
        {:else if content == 'product-search-form'}
          <ProductSearchFormMobile
            {productColours}
            {productDesigners}
            {productPatterns}
            {productTypes}
            {vacationStyles}
            bind:searchModel
            on:close={callCloseHeaderActionMobile}
          />
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
    background-color: #f2f2f2 !important;
    z-index: 101;
    padding-top: 8px;
    :global(.mdc-top-app-bar) {
      --mdc-theme-primary: #{colors.$slightlyBlue};
      background-color: #f2f2f2 !important;
    }
    &.explode :global(.mdc-top-app-bar) {
      --mdc-theme-primary: #{colors.$white};
    }
  }
  .wrap-close-btn {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
  }
  :global(.mdc-icon-button__icon) {
    width: 18px !important;
    height: 18px !important;
  }
  .wrap-close-btn :global(.mdc-icon-button) {
    --mdc-ripple-color: tranparent;
    padding: 12px 0;
    width: auto;
    height: auto;
  }
</style>
