<script lang="ts" context="module">
  import type { Product } from '$lib/store/product';
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ fetch, url }) => {
    const types = await getCollection(fetch, 'product-type');
    const designers = await getCollection(fetch, 'product-designer');
    const patterns = await getCollection(fetch, 'product-patterns');
    const colours = await getCollection(fetch, 'product-colours');
    const vacationStyles = await getCollection(fetch, 'vacation-style');
    const designerId = url.searchParams.get(PRODUCT_DESIGNER);
    const patternIds = url.searchParams.getAll(PRODUCT_PATTERN);
    const colourIds = url.searchParams.getAll(PRODUCT_COLOUR);
    const vacationStyleId = url.searchParams.get(VACATION_STYLE);
    const typeId = url.searchParams.get(TYPE);
    const q = url.searchParams.get(QUERY) || '';

    const searchResult = await searchProducts({
      q,
      designerId,
      typeId,
      patternIds,
      colourIds,
      vacationStyleId,
    });
    return {
      props: {
        types,
        designers,
        patterns,
        colours,
        vacationStyles,
        searchResult,
        params: {
          q,
          designerId,
          typeId,
          patternIds,
          colourIds,
          vacationStyleId,
        },
      },
    };
  };
</script>

<script lang="ts">
  import ShopNavigation from '$lib/components/ShopNavigation.svelte';
  import {
    PRODUCT_COLOUR,
    PRODUCT_DESIGNER,
    PRODUCT_PATTERN,
    QUERY,
    searchProducts,
    TYPE,
    VACATION_STYLE,
    type ProductSearchParams,
  } from '$lib/store/search';
  import ProductList from '$lib/components/ProductList.svelte';
  import type { Kind } from '$lib/store/category';
  import { getCollection } from '$lib/store/collection';
  import ProductSearchForm from '$lib/components/ProductSearchForm.svelte';
  export let searchResult: Product[];
  export let params: ProductSearchParams;
  export let types: Kind[];
  export let patterns: Kind[];
  export let designers: Kind[];
  export let colours: Kind[];
  export let vacationStyles: Kind[];
</script>

<ShopNavigation productTypes={types} productDesigners={designers} />
<div class="content product-listing-page">
  <section class="header-title">
    <div class="container margin-auto add-padding">
      <h1 class="text-center -collection-title text-h2">Shop Collection</h1>
      <p class="text-center m-0 d-mb-50 m-mb-30">
        Bespoke itineraries created by our leading tastemakers.
      </p>
      <ProductSearchForm
        bind:searchResult
        {params}
        {types}
        {patterns}
        {designers}
        {colours}
        {vacationStyles}
      />
    </div>
  </section>
  <section class="results">
    <div class="container">
      <ProductList items={searchResult || []} />
    </div>
  </section>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .product-listing-page {
    @import '../../style/partial/thumbnail.scss';
    .-collection-title {
      margin-top: 16px;
      margin-bottom: 16px;
    }
    .mdc-button {
      height: 40px;
    }
    .oy-select {
      .selectContainer {
        height: 40px;
      }
      .iconDropDown {
        top: 13px !important;
        width: 24px !important;
      }
      .multiSelect {
        input {
          height: 40px;
        }
      }
      .clearSelect {
        top: 8px;
        height: 24px;
        width: 20px;
      }
    }
    .search-form {
      .mdc-text-field {
        height: 40px;

        &__icon {
          padding: 0;
        }
      }
    }
    .results {
      padding-top: 16px;
      .item {
        margin-bottom: 20px;
        @include mixins.mobile {
          margin-bottom: 0;
        }
        .btn-favorite {
          svg {
            filter: brightness(0%);
          }
        }
      }
    }
  }
</style>
