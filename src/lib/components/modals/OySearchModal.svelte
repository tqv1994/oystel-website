<script lang="ts">
  import { clickOutside } from '$lib/components/events/clickOutside.js';
  import Textfield from '@smui/textfield';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import OySearch from '$lib/components/common/OySearch.svelte';

  export let openSearch: boolean = false;
  let searchLabel: string = 'What are you searching for?';
  function handleOpenSearch() {
    openSearch = true;
  }
  function handleCloseSearch() {
    openSearch = false;
  }
</script>

{#if openSearch}
  <div
    class="wrap-search light"
    use:clickOutside
    on:click_outside={handleCloseSearch}
  >
    <OySearch openSearchComplete={openSearch} label={searchLabel} on:close={handleCloseSearch}/>
  </div>
  <div class="backdrop" />
{/if}

<style lang="scss">
  .wrap-search {
    position: absolute;
    top: calc(117px + 25px);
    z-index: 1;
    :global(.search-form .mdc-text-field){
      width: 390px;
    }
  }
  .backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    position: fixed;
    z-index: 0;
  }
</style>
