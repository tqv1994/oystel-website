<script>
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import { goto } from '$app/navigation';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Svg from '@smui/common/elements/Svg.svelte';
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '$lib/store/auth';
  export let params;
  export let openSigninModal = false;
  let type;
  let openHeaderActionMobile = false;
  let dispathcher = createEventDispatcher();
  function openTab(tab) {
    dispathcher('openHeaderActionMobile', {
      content: tab,
    });
  }

  function openLink(link) {
    dispathcher('openHeaderActionMobile', {
      content: '',
    });
    goto(link);
  }
</script>

<div class=" d-none m-block" id="bottom-app-bar">
  <LayoutGrid class="pb-30">
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          openLink('#');
        }}
      >
        <div class="wrap-item">
          <Icon component={Svg} viewBox="0 0 25.599 22.563">
            <path
              id="Heart"
              d="M17.252,0c-.183,0-.37.005-.55.021A7.27,7.27,0,0,0,11.964,2.6,7.273,7.273,0,0,0,7.118.214H6.9A6.744,6.744,0,0,0,.005,6.727C-.129,10.1,2.171,12.949,3.914,14.8a38.524,38.524,0,0,0,7.8,6.112,1.193,1.193,0,0,0,1.213-.031,38.506,38.506,0,0,0,7.556-6.417c1.667-1.922,3.853-4.867,3.591-8.227A6.763,6.763,0,0,0,17.252,0"
              transform="translate(0.75 0.75)"
              fill="none"
              stroke="#000"
              stroke-width="1.5"
              fill-rule="evenodd"
            />
          </Icon><br />
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
          <Icon component={Svg} viewBox="0 0 21.232 21.063">
            <path
              id="Icon_-_Search"
              data-name="Icon - Search"
              d="M28.369,19.5A8.869,8.869,0,1,0,33.6,35.532l.375-.274s4.506,4.332,5.253,5.079,2.024-.539,1.281-1.281-5.25-5.083-5.25-5.083l.275-.376a8.76,8.76,0,0,0,1.705-5.228h0A8.879,8.879,0,0,0,28.369,19.5Zm0,15.928a7.059,7.059,0,1,1,7.059-7.059A7.067,7.067,0,0,1,28.369,35.428Z"
              transform="translate(-19.5 -19.5)"
            />
          </Icon><br />
          <Label class="text-eyebrow">Explore</Label>
        </div>
      </Button>
    </Cell>
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          openLink('#');
        }}
      >
        <div class="wrap-item">
          <Icon component={Svg} viewBox="0 0 16.47 22.827">
            <g
              id="Icon_-_Trips"
              data-name="Icon - Trips"
              transform="translate(-240.874 -748)"
            >
              <g
                id="Path_322"
                data-name="Path 322"
                transform="translate(240.874 748)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M8.235,0A8.235,8.235,0,0,1,16.47,8.235c0,4.548-8.235,14.592-8.235,14.592S0,12.783,0,8.235A8.235,8.235,0,0,1,8.235,0Z"
                  stroke="none"
                />
                <path
                  d="M 8.23486328125 1.500003814697266 C 4.52125358581543 1.500003814697266 1.500002861022949 4.52125358581543 1.500002861022949 8.23486328125 C 1.500002861022949 9.124723434448242 2.000372886657715 11.366623878479 5.351483345031738 16.38340377807617 C 6.40300464630127 17.95758628845215 7.463881492614746 19.39158058166504 8.23497486114502 20.3993091583252 C 9.002147674560547 19.39675521850586 10.05652523040771 17.97159004211426 11.10528373718262 16.40280342102051 C 14.46767330169678 11.37314414978027 14.96972274780273 9.126433372497559 14.96972274780273 8.23486328125 C 14.96972274780273 4.52125358581543 11.94847297668457 1.500003814697266 8.23486328125 1.500003814697266 M 8.23486328125 3.814697265625e-06 C 12.78285312652588 3.814697265625e-06 16.46972274780273 3.686874389648438 16.46972274780273 8.23486328125 C 16.46972274780273 12.78284358978271 8.23486328125 22.8270435333252 8.23486328125 22.8270435333252 C 8.23486328125 22.8270435333252 3.814697265625e-06 12.78284358978271 3.814697265625e-06 8.23486328125 C 3.814697265625e-06 3.686874389648438 3.686873435974121 3.814697265625e-06 8.23486328125 3.814697265625e-06 Z"
                  stroke="none"
                  fill="#000"
                />
              </g>
              <g
                id="Path_323"
                data-name="Path 323"
                transform="translate(245.874 753)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M3.5,0A3.5,3.5,0,1,1,0,3.5,3.5,3.5,0,0,1,3.5,0Z"
                  stroke="none"
                />
                <path
                  d="M 3.5 1.5 C 2.397200107574463 1.5 1.5 2.397200107574463 1.5 3.5 C 1.5 4.602799892425537 2.397200107574463 5.5 3.5 5.5 C 4.602799892425537 5.5 5.5 4.602799892425537 5.5 3.5 C 5.5 2.397200107574463 4.602799892425537 1.5 3.5 1.5 M 3.5 0 C 5.433000087738037 0 7 1.566999912261963 7 3.5 C 7 5.433000087738037 5.433000087738037 7 3.5 7 C 1.566999912261963 7 0 5.433000087738037 0 3.5 C 0 1.566999912261963 1.566999912261963 0 3.5 0 Z"
                  stroke="none"
                  fill="#000"
                />
              </g>
            </g>
          </Icon><br />
          <Label class="text-eyebrow">Trips</Label>
        </div>
      </Button>
    </Cell>
    <Cell spanDevices={{ phone: 1, desktop: 3, tablet: 2 }} class="text-center">
      <Button
        on:click={() => {
          $authStore.user ? goto('/me') : (openSigninModal = !openSigninModal);
        }}
      >
        <div class="wrap-item">
          <Icon component={Svg} viewBox="0 0 25.599 22.563">
            <g
              id="Icon_-_Profile"
              data-name="Icon - Profile"
              transform="translate(0.721 0.75)"
            >
              <path
                id="Path_306"
                data-name="Path 306"
                d="M36.155,12.077a5.077,5.077,0,1,0-5.077,5.077A5.092,5.092,0,0,0,36.155,12.077Z"
                transform="translate(-20.811 -7)"
                fill="none"
                stroke="#000"
                stroke-width="1.5"
              />
              <path
                id="Path_307"
                data-name="Path 307"
                d="M20.5,54.706a7.123,7.123,0,0,1-4.469,0,5.744,5.744,0,0,0-6.267,1.7A9.712,9.712,0,0,0,8.029,62c0,1.053.682,1.285,1.735,1.285h17c1.053,0,1.81-.231,1.81-1.285a9.771,9.771,0,0,0-1.81-5.6A5.756,5.756,0,0,0,20.5,54.706Z"
                transform="translate(-8 -42.223)"
                fill="none"
                stroke="#000"
                stroke-width="1.5"
              />
            </g>
          </Icon><br />
          <Label class="text-eyebrow">Profile</Label>
        </div>
      </Button>
    </Cell>
  </LayoutGrid>
</div>

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
