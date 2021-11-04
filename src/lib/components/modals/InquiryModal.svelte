<script>
  import '$lib/firebase';
  import Dialog, { Content } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label, Icon } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import { createEventDispatcher } from 'svelte';
  export let open;
  export let authModel;
  const dispatch = createEventDispatcher();
  let classModal = '';
  export function openModal() {
    open = true;
  }

  function closeModal() {
    setTimeout(() => {
      open = false;
      classModal = '';
    }, 500);
    classModal = 'closing';
  }
  function doSignUp() {
    dispatch('close');
  }

  function closeHandler(e) {
    closeModal();
  }
</script>

<Dialog
  bind:open
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
  on:MDCDialog:closed={closeHandler}
  id="inquiry-modal"
  class="dark "
>
  <Content id="fullscreen-content">
    <IconButton
      on:click={closeHandler}
      action="close"
      class="material-icons close-modal">close</IconButton
    >
    <div class="content-wrap">
      <div class="container">
        <LayoutGrid>
          <Cell spanDevices={{ desktop: 8, tablet: 8, phone: 4 }}>
            <div>
              <h3 class="text-sub-title mb-50">
                When you book with an Oysteo advisor, you gain access to a world
                of personalized travel experiences and exclusive perks.
              </h3>
              <h1 class="m-mb-0">Amazing Travel Experiences Curated for you</h1>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 4, tablet: 8, phone: 4 }}>
            <Button class="btn-find-advisor m-mt-30" variant="outlined"
              ><Label>Find My Advisor</Label></Button
            >
          </Cell>
        </LayoutGrid>
      </div>
    </div>
  </Content>
</Dialog>

<style>
  :global(.btn-find-advisor) {
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
    position: absolute;
  }
  @media (max-width: 949px) {
    :global(.btn-find-advisor) {
      top: auto;
      transform: translateY(0);
      left: 0;
      position: relative;
    }
  }
  /*:global(#inquiry-modal.mdc-dialog) {*/
  /*    padding: 0;*/
  /*}*/
  /*:global(#inquiry-modal.mdc-dialog.mdc-dialog--open){*/
  /*    animation-name: fadeInUp;*/
  /*    animation-duration: 2s;*/
  /*}*/
  /*:global(#inquiry-modal.mdc-dialog.closing){*/
  /*    animation-name: fadeOutDown;*/
  /*    animation-duration: 2s;*/
  /*}*/
  /*:global(#inquiry-modal.mdc-dialog.mdc-dialog--closing){*/
  /*display: none;*/
  /*}*/
  /*:global(.mdc-dialog__container){*/
  /*    align-items: flex-end;*/
  /*}*/
  /*:global(.mdc-dialog__scrim){*/
  /*    background-color: transparent;*/
  /*}*/
  /*:global(.mdc-dialog__surface) {*/
  /*    width: var(--wrap-width);*/
  /*    max-width: var(--wrap-width);*/
  /*    background-color: #5078BC;*/
  /*}*/
  /*:global(.mdc-dialog__content){*/
  /*    max-width: 1440px;*/
  /*    margin: auto;*/
  /*    width: 100%;*/
  /*    padding: 80px 45px 90px 45px;*/
  /*    position: relative;*/

  /*}*/
  /*:global(.mdc-dialog__surface .mdc-layout-grid){*/

  /*}*/
  /*.close-modal{*/
  /*position: absolute;*/
  /*right: 48px;*/
  /*top:20px;*/
  /*}*/
</style>
