<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import CloseIcon from '$lib/icons/CloseIcon.svelte';
  import {
    ENUM_TRIP_STATE,
    ENUM_TRIP_STATE_LABEL,
    type Trip,
  } from '$lib/store/trip';
  import type { UploadFile } from '$lib/store/upload-file';
  import { Label } from '@smui/button';
  import Button from '@smui/button/src/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { TripWithImage } from '../trips.svelte';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Modal from './Modal.svelte';
  import Title from './Title.svelte';
  import TripModal from './TripModal.svelte';
  const dispatch = createEventDispatcher();

  export let trip: TripWithImage;
  let open = false;
  let openConfirmRemove = false;
  const DATE_FORMAT = 'MMM DD, YYYY';

  function handleRemoveTrip() {
    openConfirmRemove = true;
  }

  function onConfirmRemoveTrip() {
    dispatch('delete', trip);
    openConfirmRemove = false;
  }
</script>

<div class="box">
  {#if trip?.state === ENUM_TRIP_STATE.new_enquiry}
    <Button class="btn-remove-trip" on:click={() => handleRemoveTrip()}>
      <CloseIcon color="#fff" />
    </Button>
  {/if}
  <div class="thumbnail">
    <!-- {#if trip.destinations.length > 0}
      {#if trip.destinations[0].gallery.length > 1}
        <Carousel >
          {#each trip.destinations[0].gallery as item}
            <div class="image-cover" style="padding-top: calc(212 / 383 * 100%)">
              <BlurImage {...item} />
            </div>
          {/each}
        </Carousel>
      {:else if trip.destinations[0].gallery.length == 1}
        <div class="image-cover" style="padding-top: calc(212 / 383 * 100%)">
          <BlurImage {...trip.destinations[0].gallery[0]} />
        </div>
      {/if}
    {/if} -->
    <div class="image-cover">
      {#if trip?.image}
        <BlurImage {...trip?.image} />
      {:else}
        <BlurImage />
      {/if}
    </div>
    <div class="content text-body1">
      <div class="row">
        <div class="d-col-6 m-col-6 card-header-cell">
          <p class="m-0 text-eyebrow">
            {dateTimeHelper.formatDate(trip?.depart_at, DATE_FORMAT)
              ? dateTimeHelper.formatDate(trip?.depart_at, DATE_FORMAT)
              : ''}
            {dateTimeHelper.formatDate(trip?.return_at, DATE_FORMAT)
              ? ' - ' + dateTimeHelper.formatDate(trip?.return_at, DATE_FORMAT)
              : ''}
          </p>
        </div>
        <div class="d-col-6 m-col-6 text-right card-header-cell">
          <span class="status">{ENUM_TRIP_STATE_LABEL[trip.state]}</span>
        </div>
      </div>
      <h4 class="mt-0 card-title">
        {trip.destinationTypes && trip.destinationTypes.length > 0
          ? trip.destinationTypes.map((item) => item?.name).join(', ')
          : ''}
      </h4>
      <p class="m-0">
        Number of Guests: {(trip?.numberOfAdults || 0) +
          (trip?.numberOfChildren || 0)}
      </p>
      <p class="m-0">Travel Advisor: {trip?.advisor?.name || ''}</p>
    </div>
    <div class="actions">
      <div class="row">
        <div class="d-col-6 m-col-6 text-left mb-0">
          <ButtonUnderline
            label="View Detail"
            on:click={() => {
              open = true;
            }}
          />
        </div>
        <div class="d-col-6 m-col-6 text-right mb-0">
          <ChatIcon width={16} height={14} class="mr-15" />
          <ButtonUnderline label="Live Chat" />
        </div>
      </div>
    </div>
  </div>
</div>
<div>
  <Modal
    bind:open={openConfirmRemove}
    title=""
    style="width: 700px; max-width: calc(100vw - 32px);"
  >
    <div class="modal-content d-pl-100 d-pr-100 pt-30 pb-30">
      <h2 class="mdc-typography--headline1 m-0 mb-20">Are you sure?</h2>
    </div>
    <div class="modal-actions d-pl-100 d-pr-100 pb-25 pt-20">
      <div class="row">
        <div class="d-col-6 m-col-12">
          <Button
            variant="unelevated"
            on:pointerdown={() => {
              openConfirmRemove = false;
            }}><Label class="text-button2">Cancel Request</Label></Button
          >
        </div>
        <div class="d-col-6 m-col-12">
          <Button variant="unelevated" on:pointerdown={onConfirmRemoveTrip}
            ><Label class="text-button2">Confirm</Label></Button
          >
        </div>
      </div>
    </div>
  </Modal>
</div>

<TripModal bind:open {trip} />
<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  @use '../../../theme/colors';
  .box {
    position: relative;
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
    background-color: #f7f7f7;
    position: relative;
    border: 1px solid #{colors.$black};
    .content {
      padding: 20px;
    }
    .actions {
      padding: 12px 20px;
    }
    .actions {
      border-top: 1px solid #{colors.$black};
    }
    .card-header-cell {
      margin-bottom: 0 !important;
    }
    .card-title {
      margin-bottom: 16px !important;
    }
    .text-eyebrow {
      line-height: 32px !important;
      display: inline-block;
      margin-bottom: 0 !important;
    }
    .image-cover {
      padding-top: 50%;
      @include mixins.mobile {
        padding-top: 56.25%;
      }
    }
    .status {
      font-weight: 400;
      background-color: #{colors.$black};
      color: #fff;
      padding: 0 20px;
      line-height: 32px;
      display: inline-block;
      @include mixins.mobile {
        padding-left: 10px;
        padding-right: 10px;
      }
    }
    :global(.btn-remove-trip) {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 9;
      padding: 0.2em;
      min-width: auto;
    }
  }
  div {
    :global(.mdc-dialog) {
      :global(.mdc-dialog__header) {
        border-bottom: 0 !important;
      }
    }
    .modal-content,
    .modal-actions {
      text-align: center;
    }
  }
</style>
