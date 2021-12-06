<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import TripTabItem from './components/TripTabItem.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import { Trip } from '$lib/store/trip';
  import { goto } from '$app/navigation';
  import AlertBox from './components/AlertBox.svelte';
  
  export const load: Load = async ({ fetch, page }) => {
    let me: User | undefined;
    let haveTravellerMe: boolean = true;

    authStore.subscribe(({ user }) => (me = user));
    let travellerId: number = 0;
    if (me?.travellerMe) {
      travellerId = me.travellerMe.id;
    }
    if (travellerId != 0) {
      try {
        const res = await fetch(`/me/trip/${travellerId}.json`);
        if (res.ok) {
          let data = await res.json();
          console.log(data);
          return {
            props: {
              trips: data.trips,
              enquiryTrips: data.trips.filter(
                (item) => item.state == 'enquired',
              ),
              planningTrips: data.trips.filter(
                (item) => item.state == 'planning',
              ),
              activeTrips: data.trips.filter(
                (item) => item.state == 'progressing',
              ),
              pastTrips: data.trips.filter((item) => item.state == 'completed'),
              haveTravellerMe,
            },
          };
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      goto('/me/my-account');
      haveTravellerMe = false;
    }
    return {
      props: { haveTravellerMe },
    };
  };
</script>

<script lang="ts">
  export let trips: Trip[];
  export let enquiryTrips: Trip[];
  export let planningTrips: Trip[];
  export let activeTrips: Trip[];
  export let pastTrips: Trip[];
  export let haveTravellerMe: boolean;
  let active = 'Enquiry';
</script>

<div class="content trips-content">
  <LayoutAccount currentPage="trips">
    {#if !haveTravellerMe}
      <AlertBox>Traveller is not exsist</AlertBox>
    {/if}
    {#if trips}
      <svelte:component this={ButtonBack} label="Trips" link="/me" />
      <svelte:component this={BoxTabs}>
        <div slot="tabs">
          <div class="d-block m-none">
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
            <Select bind:value={active} label="">
              <Option value="Enquiry" selected>Enquiry</Option>
              <Option value="Planning">Planning</Option>
              <Option value="Active">Active</Option>
              <Option value="Past">Past</Option>
            </Select>
          </div>
        </div>
        <div slot="content">
          {#if active == 'Enquiry'}
            <svelte:component this={TripTabItem} trips={enquiryTrips} />
          {:else if active == 'Planning'}
            <svelte:component this={TripTabItem} trips={planningTrips} />
          {:else if active == 'Active'}
            <svelte:component this={TripTabItem} trips={activeTrips} />
          {:else if active == 'Past'}
            <svelte:component this={TripTabItem} trips={pastTrips} />
          {/if}
        </div>
      </svelte:component>
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
  }
</style>
