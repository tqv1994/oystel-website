<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { session } from '$app/stores';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import TripTabItem from './components/TripTabItem.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import { ENUM_TRIP_STATE, type Trip } from '$lib/store/trip';
  import { goto } from '$app/navigation';
  import AlertBox from './components/AlertBox.svelte';
  import ButtonUnderline from './components/ButtonUnderline.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { Kind } from '$lib/store/category';
  import type { Destination } from '$lib/store/destination';
  import type { UploadFile } from '$lib/store/upload-file';
  import { ppost } from '$lib/utils/fetch';

  export type TripWithImage = Trip & { image: UploadFile };

  export const load: Load = async ({ fetch, url }) => {
    try {
      const countries = await getCollection(fetch, 'country');
      const destinations = await getCollection(fetch, 'destination');
      const res = await fetch(`/p/trips`);
      if (res.ok) {
        let trips: TripWithImage[] = await res.json();
        trips = trips.map((trip) => {
          return addTripImage(trip, countries, destinations);
        });
        return {
          props: {
            trips: trips,
            enquiryTrips: (trips || []).filter(
              (item: TripWithImage) =>
                item.state == 'enquired' || item.state == 'new_enquiry',
            ),
            planningTrips: (trips || []).filter(
              (item: TripWithImage) => item.state == 'planning',
            ),
            activeTrips: (trips || []).filter(
              (item: TripWithImage) => item.state == 'progressing',
            ),
            pastTrips: (trips || []).filter(
              (item) =>
                item.state === ENUM_TRIP_STATE.completed ||
                item.state === ENUM_TRIP_STATE.canceled,
            ),
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
    return {};
  };

  function addTripImage(
    trip: TripWithImage,
    countries: Kind[],
    destinations: Destination[],
  ) {
    if (trip.desiredDestinations) {
      let countryNames = trip.desiredDestinations.split(',');
      countryNames = countryNames.map((item) => item.trim());
      if (countryNames.length > 0) {
        const countrySelected = countries.find(
          (item) => item.name === countryNames[0],
        );
        if (countrySelected) {
          const destinationSelected = destinations.find(
            (item) =>
              (item.country || '').toString() ===
              (countrySelected?.id || '').toString(),
          );
          if (destinationSelected) {
            trip.image = (destinationSelected.gallery || [])[0];
          }
        }
      }
    }
    return trip;
  }
</script>

<script lang="ts">
  export let trips: TripWithImage[] = [];
  export let enquiryTrips: TripWithImage[] = [];
  export let planningTrips: TripWithImage[] = [];
  export let activeTrips: TripWithImage[] = [];
  export let pastTrips: TripWithImage[] = [];
  let active = 'Enquiry';
  async function handleRemoveTrip(event: CustomEvent<TripWithImage>) {
    window.openLoading('Loading');
    if (event.detail && event.detail.state === ENUM_TRIP_STATE.new_enquiry) {
      try {
        const res = await ppost(`trips/cancel/${event.detail.id}`, {
          state: ENUM_TRIP_STATE.canceled,
        });
        if (res.ok) {
          enquiryTrips = enquiryTrips.filter(
            (item) => item.id !== event.detail.id,
          );
          const trip = { ...event.detail };
          trip.state = ENUM_TRIP_STATE.canceled;
          pastTrips.push(trip);
        }
      } catch (err) {
        window.pushToast('An error occurred! Please try again later');
      }
    } else {
      window.pushToast('You do not have the right to delete this trip');
    }
    window.closeLoading();
  }
</script>

<div class="content trips-content">
  <LayoutAccount currentPage="trips">
    <ButtonBack label="Trips" link="/me" />
    {#if !$session.travellerMe}
      <AlertBox>
        Before doing this. Please tell us your first and last name. <ButtonUnderline
          on:click={() => {
            goto('/me/my-account');
          }}
          label="Update them here"
        />
      </AlertBox>
    {/if}
    {#if trips}
      <BoxTabs>
        <div slot="tabs">
          <div class="d-block m-none desktop-tabs">
            <TabBar
              tabs={['Enquiry', 'Planning', 'Active', 'Past']}
              let:tab
              bind:active
            >
              <Tab {tab}>
                <Label>{tab}</Label>
              </Tab>
            </TabBar>
          </div>
          <div class="d-none m-block">
            <Select class="my-trips-mobile-tabs" bind:value={active} label="">
              <Option value="Enquiry" selected>Enquiry</Option>
              <Option value="Planning">Planning</Option>
              <Option value="Active">Active</Option>
              <Option value="Past">Past</Option>
            </Select>
          </div>
        </div>
        <div slot="content">
          {#if active == 'Enquiry'}
            <TripTabItem trips={enquiryTrips} on:delete={handleRemoveTrip} />
          {:else if active == 'Planning'}
            <TripTabItem trips={planningTrips} />
          {:else if active == 'Active'}
            <TripTabItem trips={activeTrips} />
          {:else if active == 'Past'}
            <TripTabItem trips={pastTrips} />
          {/if}
        </div>
      </BoxTabs>
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .trips-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
    .sc-carousel-dots__container {
      display: none;
    }

    .desktop-tabs {
      :global(.mdc-tab) {
        height: 56px !important;
      }
      :global(.mdc-tab--active) {
        font-weight: 900;
      }
    }

    :global(.my-trips-mobile-tabs) {
      .mdc-select__anchor {
        @include mixins.mobile {
          &::before {
            height: 34px;
          }
        }
      }

      .mdc-select__selected-text-container {
        margin-top: -16px;

        .mdc-select__selected-text {
          font-weight: 900;
          font-size: 14px;
        }
      }
    }
  }
</style>
