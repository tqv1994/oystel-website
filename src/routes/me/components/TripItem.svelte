<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import { ENUM_TRIP_STATE_LABEL, Trip } from '$lib/store/trip';
  import { UploadFile } from '$lib/store/upload-file';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Title from './Title.svelte';
  import TripModal from './TripModal.svelte';

  export let trip: Trip;
  let open: boolean = false;
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'inside',
  };

  const DATE_FORMAT = 'MMM DD, YYYY';
</script>

<div class="box">
  <div class="thumbnail">
    <!-- {#if trip.destinations.length > 0}
      {#if trip.destinations[0].gallery.length > 1}
        <Carousel {...carouselConfig}>
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
    <div class="image-cover" style="padding-top: calc(212 / 383 * 100%)">
      <BlurImage url="/img/me/trips/trip-1.jpg" />
    </div>
    <div class="content">
      <div class="row">
        <div class="d-col-6 m-col-8">
          <p class="m-0">
            {dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
              ? dateTimeHelper.formatDate(trip.depart_at, DATE_FORMAT)
              : ''}
            {dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
              ? ' - ' + dateTimeHelper.formatDate(trip.return_at, DATE_FORMAT)
              : ''}
          </p>
        </div>
        <div class="d-col-6 m-col-4 text-right">
          <span class="status">{ENUM_TRIP_STATE_LABEL[trip.state]}</span>
        </div>
      </div>
      <svelte:component this={Title}
        >{trip.destinationTypes && trip.destinationTypes.length > 0
          ? trip.destinationTypes.map((item) => item.name).join(', ')
          : ''}</svelte:component
      >
      <p class="m-0">Number of Guests: {(trip.numberOfAdults || 0) + (trip.numberOfChildren || 0)}</p>
      <p class="m-0">Travel Advisor: {trip.advisor?.name || ''}</p>
    </div>
    <div class="actions">
      <div class="row">
        <div class="d-col-6 m-col-6 text-left">
          <svelte:component
            this={ButtonUnderline}
            label="View Detail"
            on:click={() => {
              open = true;
            }}
          />
        </div>
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
    </div>
  </div>
</div>

<svelte:component this={TripModal} bind:open {trip} />

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  .box {
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
    background-color: #f7f7f7;
    position: relative;
    .content,
    .actions {
      padding: 20px;
    }
    .actions {
      border-top: 1px solid #9d9d9d;
    }
    .status {
      --mdc-typography-body1-font-size: 14px;
      background-color: #9d9d9d;
      color: #fff;
      padding: 8px 20px 5px;
    }
  }
</style>
