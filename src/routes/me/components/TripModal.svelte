<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import type { UploadFile } from '$lib/store/upload-file';
  import IconButton from '@smui/icon-button';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Field from './Field.svelte';

  import Modal from './Modal.svelte';
  import NextIcon from '$lib/icons/NextIcon.svelte';
  import { ENUM_TRIP_STATE_LABEL, type Trip } from '$lib/store/trip';
  import Carousel from '$lib/components/Carousel.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import { destinationStore } from '$lib/store/destination';
  import type { TripWithImage } from '../trips.svelte';
  import type { Traveller } from '$lib/store/traveller';
  export let open = false;
  export let trip: TripWithImage;

  const DATE_FORMAT = 'MMM DD, YYYY';

  function getNumbersOfRoom(trip: Trip) {
    return ((trip.numberOfAdults || 0) + (trip.numberOfChildren || 0)) / 2;
  }

  function getTravellerName(traveller: Traveller) {
    let result = '';
    if (traveller) {
      if (traveller.forename) {
        result += `${traveller.forename} `;
      }
      if (traveller.surname) {
        result += `${traveller.surname}`;
      }
    }
    return result;
  }
</script>

<div>
  <Modal bind:open>
    <IconButton
      class="material-icons btn-close"
      on:click={() => {
        open = false;
      }}>close</IconButton
    >
    <div class="thumbnail">
      <!-- {#if trip.destinations.length}
        {#if trip.destinations[0].gallery.length > 1}
          <Carousel >
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
      <div class="image-cover">
        {#if trip?.image}
          <BlurImage {...trip?.image} />
        {:else}
          <BlurImage />
        {/if}
      </div>
    </div>
    <div class="content text-body1">
      <div class="row header mb-25">
        <div class="d-col-6 m-col-6 mb-0">
          <p class="m-0 text-travel-details">TRAVEL DETAILS</p>
        </div>
        <div class="d-col-6 m-col-6 mb-0 text-right travel-live-chat">
          <ChatIcon width={16} height={14} class="mr-5" />
          <ButtonUnderline label="Live Chat" />
        </div>
      </div>
      <div class="row d-mb-24">
        <div class="d-col-6 m-col-6 mb-0 col">
          <p class="m-0 text-eyebrow">
            {dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
              ? dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
              : ''}
            {dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
              ? ' - ' + dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
              : ''}
          </p>
        </div>
        <div class="d-col-6 m-col-6 text-right mb-8 col">
          <span class="text-reference">
            Reference: {trip.reference ? trip.reference : 'No-reference'}
          </span>
        </div>
        <div class="d-col-6 m-col-12">
          <h4 class="m-0">
            {trip.destinationTypes && trip.destinationTypes.length > 0
              ? trip.destinationTypes.map((item) => item.name).join(', ')
              : ''}
          </h4>
        </div>
        <div class="d-col-6 m-col-12 text-right m-none col">
          <span class="status">{ENUM_TRIP_STATE_LABEL[trip.state]}</span>
        </div>
        <div class="d-col-6 m-col-12 d-none m-block col">
          <span class="status">{ENUM_TRIP_STATE_LABEL[trip.state]}</span>
        </div>
      </div>
      <Field
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15 field-fullwidth"
        label="{(trip.travellers || []).length} Guests"
      >
        {trip.travellers.map((item) => getTravellerName(item)).join(', ')}
      </Field>
      <div class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="Destinations"
        >
          {trip.desiredDestinations}
        </Field>
      </div>
      <Field
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15 field-fullwidth"
        label="Room Styles"
      >
        {(trip.roomStyles || []).map((item) => `${item.name}`).join(', ')}
      </Field>
      <div class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="Experiences"
        >
          {(trip.experienceTypes || []).map((item) => item.name).join(', ')}
        </Field>
      </div>
      <Field
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15 field-fullwidth"
        label="Accommodation"
      >
        {(trip.lodgingTypes || []).map((item) => item.name).join(', ')}
        . Room Preferences:
        {(trip.roomPreferences || []).map((item) => item.name).join(', ')}
      </Field>
      <div class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="Flight"
        >
          {`${trip.needFlights ? 'Yes' : 'No'}. If yes: ${
            trip.travelByFlight || ''
          }. Travel in a different way: ${trip.travelAnotherWay || ''}`}
        </Field>
      </div>
      <Field
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15 field-fullwidth"
        label="Numbers of Room"
      >
        {Math.ceil(getNumbersOfRoom(trip))}
      </Field>
      <div class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="Budget"
        >
          {trip.currency?.code || ''}. Per Night: up to {trip?.nightlyBudget ??
            0}. Total: up to {trip?.budget ?? 0}
        </Field>
      </div>
      <Field
        column_1={4}
        column_2={8}
        class="m-mb--10 d-mb--15 field-fullwidth"
        label="Fully Vaccinated"
      >
        {trip.vaccinated ? 'Yes' : 'No'}
      </Field>
      <div class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15"
          label="Previous trips"
        >
          {trip.numberOfTripsInSixMonths || 0}
        </Field>
      </div>
      <a href="#" class="text-body1">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15"
          label="View Itinerary"
        >
          <div class="text-right">
            <NextIcon width={10} height={19} />
          </div>
        </Field>
      </a>
      <a href="#" class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="View Travel Documents"
        >
          {#if trip.documents.length > 0}
            {#each trip.documents as document}
              {#each document.documents as item}
                <ButtonUnderline label={item.name || ''} />
                {item ===
                trip.documents[trip.documents.length - 1].documents[
                  trip.documents[trip.documents.length - 1].documents.length - 1
                ]
                  ? ''
                  : ', '}
              {/each}{/each}
          {/if}
        </Field>
      </a>
      <a href="#" class="text-body1">
        <Field
          column_1={4}
          column_2={8}
          label="Get Invoice"
          class="m-mb--10 d-mb--15"
        >
          <div class="text-right">
            <NextIcon width={10} height={19} />
          </div>
        </Field>
      </a>
      <a href="#" class="text-body1 btn-action">
        <Field
          column_1={4}
          column_2={8}
          class="m-mb--10 d-mb--15 field-fullwidth"
          label="Travel Insurance"
        >
          <ButtonUnderline label={trip.insurance?.policyId || ''} />
        </Field>
      </a>
    </div>
  </Modal>
</div>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/colors';
  @use '../../../theme/mixins';
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
      background-color: #{colors.$black};
      color: #fff;
      font-weight: 400;
      padding: 0 20px;
      line-height: 32px;
      display: inline-block;
    }
    .header {
      padding: 15px 0;
      border-bottom: 1px solid #000;
      align-items: center;
      margin-bottom: 16px !important;
    }
    .btn-action {
      margin-bottom: 15px;
      display: block;
      padding-top: 15px;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
    }
    .text-reference {
      font-weight: 800;
    }
    .text-travel-details {
      font-weight: 400;
    }
    .travel-live-chat {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .image-cover {
      padding-top: 30.802139%;
      @include mixins.mobile {
        padding-top: 52%;
      }
    }
    :global(.mdc-dialog .mdc-dialog__content) {
      @include mixins.mobile {
        padding: 20px 14px;
      }
    }
    :global(.mdc-dialog .mdc-dialog__surface) {
      max-height: calc(100% - 128px);
      @include mixins.mobile {
        max-height: calc(100% - 40px);
      }
    }
    :global(.field-fullwidth) {
      --mdc-layout-grid-gutter-phone: 5px;
      --mdc-layout-grid-gutter-tablet: 5px;
      @include mixins.mobile {
        :global(.mdc-layout-grid__cell--span-4-tablet) {
          grid-column-end: span 8;
        }
      }
    }
  }
</style>
