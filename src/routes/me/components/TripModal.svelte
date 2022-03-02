<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import IconButton from '@smui/icon-button';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Field from './Field.svelte';

  import Modal from './Modal.svelte';
  import NextIcon from '$lib/icons/NextIcon.svelte';
  import { ENUM_TRIP_STATE_LABEL, Trip } from '$lib/store/trip';
  import Carousel from '$lib/components/Carousel.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
import { destinationStore } from '$lib/store/destination';
  export let open: boolean = false;
  export let trip: Trip;

  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };

  const DATE_FORMAT = 'MMM DD, YYYY';
</script>

<div>
  <svelte:component this={Modal} bind:open>
    <IconButton
      class="material-icons btn-close"
      on:click={() => {
        open = false;
      }}>close</IconButton
    >
    <div class="thumbnail">
      <!-- {#if trip.destinations.length}
        {#if trip.destinations[0].gallery.length > 1}
          <Carousel {...carouselConfig}>
            {#each trip.destinations[0].gallery as item}
              <div class="image-cover" style="padding-top: calc(288/935 * 100%)">
                <BlurImage {...item} />
              </div>
            {/each}
          </Carousel>
        {:else if trip.destinations[0].gallery.length == 1}
          <div class="image-cover" style="padding-top: calc(288/935 * 100%)">
            <BlurImage {...trip.destinations[0].gallery[0]} />
          </div>
        {/if}
      {/if} -->
      <div class="image-cover" style="padding-top: calc(288/935 * 100%)">
        <BlurImage url="/img/me/trips/trip-1.jpg" />
      </div>
    </div>
    <div class="content">
      <div class="row header mb-25">
        <div class="d-col-6 m-col-6"><p class="m-0">TRAVEL DETAILS</p></div>
        <div class="d-col-6 m-col-6 text-right">
          <svelte:component
            this={ChatIcon}
            width={16}
            height={14}
            class="mr-5"
          />
          <svelte:component this={ButtonUnderline} label="Live Chat" />
        </div>
      </div>
      <div class="row mb-40">
        <div class="d-col-6 m-col-6">
          {dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
            ? dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
            : ''}
          {dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
            ? ' - ' + dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
            : ''}
        </div>
        <div class="d-col-6 m-col-6 text-right">
          Reference: {trip.reference ? trip.reference : 'No-reference'}
        </div>
        <div class="d-col-6 m-col-12">
          <p class="mdc-typography--headline1 m-0">
            {trip.destinationTypes && trip.destinationTypes.length > 0
              ? trip.destinationTypes.map((item) => item.name).join(', ')
              : ''}
          </p>
        </div>
        <div class="d-col-6 m-col-12 text-right m-none">
          <span class="status">{ENUM_TRIP_STATE_LABEL[trip.state]}</span>
        </div>
        <div class="d-col-6 m-col-12 d-none m-block">
          <span class="status">{trip.state}</span>
        </div>
      </div>
      <svelte:component
        this={Field}
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15"
        label="{(trip.numberOfAdults || 0) + (trip.numberOfChildren || 0)} Guests"
      >
        {trip.travellers
          .map((item) => item.forename + ' ' + item.surname)
          .join(', ')}
      </svelte:component>
      <a href="#" class="text-body1 btn-action">
        <svelte:component
          this={Field}
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15"
          label="View Itinerary"
        >
          <div class="text-right">
            <svelte:component this={NextIcon} width={10} height={19} />
          </div>
        </svelte:component>
      </a>
      <svelte:component
        this={Field}
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15"
        label="View Travel Documents"
      >
        {#if trip.documents.length > 0}
          {#each trip.documents as document}
            {#each document.documents as item}
              <svelte:component this={ButtonUnderline} label={item.name} />
              {item ===
              trip.documents[trip.documents.length - 1].documents[
                trip.documents[trip.documents.length - 1].documents.length - 1
              ]
                ? ''
                : ', '}
            {/each}{/each}
        {/if}
      </svelte:component>

      <a href="#" class="text-body1 btn-action">
        <svelte:component
          this={Field}
          column_1={4}
          column_2={8}
          label="Get Invoice"
          class="m-mb--10 d-mb--15"
        >
          <div class="text-right">
            <svelte:component this={NextIcon} width={10} height={19} />
          </div>
        </svelte:component>
      </a>
      <svelte:component
        this={Field}
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15"
        label="Travel Insurance"
      >
        <!-- {#if trip.insurances.length > 0}
          {#each trip.insurances as insurance}
            <svelte:component
              this={ButtonUnderline}
              label={insurance.policyId}
            />
          {/each}
        {/if} -->
        <svelte:component
          this={ButtonUnderline}
          label={trip.insurance?.policyId}
        />
      </svelte:component>
    </div>
  </svelte:component>
</div>

<style lang="scss">
  @use '../../../style/include/grid';
  div {
    --mdc-typography-headline1-font-size: 32px;
    :global(.thumbnail) {
      margin: -20px -24px auto -24px;
    }
    :global(.btn-close) {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;
    }
    .status {
      background-color: #9d9d9d;
      color: #fff;
      padding: 8px 20px 5px;
    }
    .header {
      padding: 15px 0;
      border-bottom: 1px solid #000;
    }
    .btn-action {
      margin-bottom: 15px;
      display: block;
      padding-top: 15px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
    }
  }
</style>
