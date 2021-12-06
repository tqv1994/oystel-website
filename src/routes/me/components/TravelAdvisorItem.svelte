<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import { Advisor } from '../types';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Field from './Field.svelte';
  import Modal from './Modal.svelte';
  import Button, { Label } from '@smui/button';
  import Text from './Text.svelte';

  export let item: Advisor;
  export let isPast: boolean = true;
  let open: boolean = false;
</script>

<div class="box">
  <div class="box--content">
    <div class="row pb-30">
      <div class="d-col-4 m-col-4">
        <div class="thumbnail pt-15 pr-15 pb-15">
          <div class="image-cover">
            <BlurImage {...item.avatar} />
          </div>
        </div>
      </div>
      <div class="d-col-8 m-col-8">
        <h3 class="mdc-typography--headline1 m-0 mb-15">{item.name}</h3>
        <p class="m-0">{item.phone}</p>
        <p class="m-0">{item.email}</p>
      </div>
    </div>
    <svelte:component this={Field} label="Last Trip date"
      ><svelte:component this={Text}>{item.tripDate}</svelte:component
      ></svelte:component
    >
    <svelte:component this={Field} label="Number of Open trips"
      ><svelte:component this={Text}>{item.numberOpenTrips}</svelte:component
      ></svelte:component
    >
    <svelte:component this={Field} label="Number of Past trips"
      ><svelte:component this={Text}>{item.numberPastTrips}</svelte:component
      ></svelte:component
    >
  </div>
  <div class="box--actions">
    <div class="box--actions-item">
      <svelte:component this={ButtonUnderline} label="View Advisor Page" />
    </div>
    {#if !isPast}
      <div class="box--actions-item">
        <svelte:component
          this={ButtonUnderline}
          label="De-Register Advisor"
          on:click={() => {
            open = true;
          }}
        />
      </div>
      <div class="box--actions-item">
        <svelte:component this={ChatIcon} width={16} height={14} class="mr-5" />
        <svelte:component this={ButtonUnderline} label="Live Chat" />
      </div>
    {/if}
  </div>
</div>

<div>
  <svelte:component
    this={Modal}
    bind:open
    title=""
    style="width: 700px; max-width: calc(100vw - 32px);"
  >
    <div class="modal-content d-pl-100 d-pr-100 pt-30 pb-30">
      <h2 class="mdc-typography--headline1 m-0 mb-20">Are you sure?</h2>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </p>
    </div>
    <div class="modal-actions d-pl-100 d-pr-100 pb-25 pt-20">
      <div class="row">
        <div class="d-col-6 m-col-12">
          <Button variant="unelevated"
            ><Label class="text-button2">Cancel Request</Label></Button
          >
        </div>
        <div class="d-col-6 m-col-12">
          <Button variant="unelevated"
            ><Label class="text-button2">Confirm</Label></Button
          >
        </div>
      </div>
    </div>
  </svelte:component>
</div>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  .box {
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
    .row {
      align-items: center;
    }
    background-color: #f7f7f7;
    --mdc-typography-headline1-font-size: 22px;
    position: relative;
    .box--content {
      padding: 20px 35px;
      @include mixins.mobile {
        padding: 25px 20px;
      }
      .image-cover {
        border-radius: 50%;
      }
    }
    .box--actions {
      .box--actions-item {
        padding: 20px;
        text-align: center;
        border-top: 1px solid #9d9d9d;
      }
    }
  }
  * :global(.mdc-dialog) {
    :global(.mdc-dialog__header) {
      border-bottom: 0 !important;
    }
  }
  .modal-content,
  .modal-actions {
    text-align: center;
  }
</style>
