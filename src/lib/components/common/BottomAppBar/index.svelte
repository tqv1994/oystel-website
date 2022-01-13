<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { goto } from '$app/navigation';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import { Svg } from '@smui/common/elements';
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '$lib/store/auth';
  import HeartIcon from '$lib/icons/HeartIcon.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import TripIcon from '$lib/icons/TripIcon.svelte';
  import UserIcon from '$lib/icons/UserIcon.svelte';
import SigninModal from '$lib/components/modals/SigninModal.svelte';

  export let openSigninModal = false;
  let dispatcher = createEventDispatcher();
  function openTab(tab: string) {
    dispatcher('itemClick', {
      content: tab,
    });
  }

  function openLink(link: string) {
    dispatcher('itemClick', {
      link: link,
    });
  }
</script>

<div class=" d-none m-block" id="bottom-app-bar">
  <LayoutGrid class="pb-30">
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          openLink('/me/wishlist');
        }}
      >
        <div class="wrap-item">
          <HeartIcon size="md" /><br />
          <Label class="text-eyebrow">Wishlist</Label>
        </div>
      </Button>
    </Cell>
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          openTab('explode');
        }}
      >
        <div class="wrap-item">
          <SearchIcon size="md" /><br />
          <Label class="text-eyebrow">Explore</Label>
        </div>
      </Button>
    </Cell>
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          openLink('/plan');
        }}
      >
        <div class="wrap-item">
          <TripIcon /><br />
          <Label class="text-eyebrow">Trips</Label>
        </div>
      </Button>
    </Cell>
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          if($authStore.user){
            let link = $authStore.user ? '/me' : '';
            openLink(link);
          }else{
            openSigninModal = true;
          }
        }}
      >
        <div class="wrap-item">
          <UserIcon size="md" /><br />
          <Label class="text-eyebrow">Profile</Label>
        </div>
      </Button>
    </Cell>
  </LayoutGrid>
</div>
<SigninModal bind:open={openSigninModal} />
<style lang="scss">
  #bottom-app-bar {
    z-index: 20;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-top: 1px solid #000;
    .wrap-item {
      text-align: center;
      :global(.mdc-button__icon) {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
    :global(.mdc-button) {
      padding: 0 8px 0 8px;
      height: auto;
    }
    :global(.mdc-button) {
      min-width: auto;
      overflow: visible;
    }
  }
</style>
