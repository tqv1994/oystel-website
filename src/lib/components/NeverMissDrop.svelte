<script lang="ts">
  import { Action } from '$lib/store/action';
  import { UploadFile } from '$lib/store/upload-file';

  import Button from '@smui/button';
  import { Cell } from '@smui/layout-grid';
  import LayoutGrid from '@smui/layout-grid';
  import { Label } from '@smui/list';
  import { createEventDispatcher } from 'svelte';
  import BlurImage from './blur-image.svelte';
  import Carousel from './Carousel.svelte';
  import SignupModal from './modals/SignupModal.svelte';
  import SigninModal from './modals/SigninModal.svelte';

  export let name: string | undefined = undefined;
  export let headline: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let actions: Action[] | undefined = undefined;
  export let gallery: UploadFile[] | undefined = undefined;
  export let background: UploadFile[] | undefined = undefined;

  const dispatcher = createEventDispatcher();
  let signupModalOpen = false;
  let signinModalOpen = false;

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };

  function onSignUpModalClose(event: CustomEvent) {
    signupModalOpen = false;
    if (event.detail.type === 'open-signin') {
      signinModalOpen = true;
    }
  }
  function onSignInModalClose(event: CustomEvent) {
    signinModalOpen = false;
    if (event.detail.type === 'open-signup') {
      signupModalOpen = true;
    }
  }
</script>

<LayoutGrid>
  {#if gallery?.length}
    <Cell
      spanDevices={{ desktop: 5, tablet: 8, phone: 4 }}
      class="content-left"
    >
      {#if gallery.length > 1}
        <div class="thumbnail dark multi-images-affect">
          <Carousel {...carouselConfig}>
            {#each gallery as item}
              <div
                class="image-cover"
                style="padding-top: calc(610 / 420 * 100%)"
              >
                <BlurImage {...item} />
              </div>
            {/each}
            
          </Carousel>
          <div class="caption" style="bottom:0">
            <span class="">Channel Resort ‘21</span>
          </div>
        </div>
      {:else}
        <div class="thumbnail dark multi-images-affect">
          <div class="image-cover" style="padding-top: calc(610 / 420 * 100%)">
            <BlurImage {...gallery[0]} />
          </div>
          <div class="caption">
            <span class="">Channel Resort ‘21</span>
          </div>
        </div>
      {/if}
    </Cell>
  {/if}
  <Cell
    spanDevices={{ desktop: 7, tablet: 8, phone: 4 }}
    class="light d-pl-100 d-pr-70 content-right"
  >
    <p class="text-body2 d-mb-100 m-mt-40 m-mb-40">{description}</p>
    <div class="d-pb-35 m-pb-0" />
    <h4 class="mt-0 mb-20">{headline}</h4>
    <h2 class="text-h1 mt-0 d-mb-40 m-mb-15">{name}</h2>
    {#if actions?.length}
      {#each actions as action}
        <Button
          variant="outlined"
          class="hover-affect"
          on:click={() => {
            signupModalOpen = true;
          }}><Label class="text-button2">{action.name}</Label></Button
        >
      {/each}
    {/if}
  </Cell>
</LayoutGrid>
<svelte:component
  this={SignupModal}
  bind:open={signupModalOpen}
  on:close={onSignUpModalClose}
/>
<svelte:component
  this={SigninModal}
  bind:open={signinModalOpen}
  on:close={onSignInModalClose}
/>
