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
import ButtonUnderline from './components/ButtonUnderline.svelte';
  
  export const load: Load = async ({ fetch, url }) => {
    let me: User | undefined;

    authStore.subscribe(({ user }) => (me = user));
    if (me.travellerMe) {
      try {
        const res = await fetch(`/me/trip/list.json`);
        if (res.ok) {
          let data = await res.json();
          return {
            props: {
              trips: data.trips,
              enquiryTrips: data.trips.filter(
                (item) => item.state == 'enquired' || item.state == 'new_enquiry',
              ),
              planningTrips: data.trips.filter(
                (item) => item.state == 'planning',
              ),
              activeTrips: data.trips.filter(
                (item) => item.state == 'progressing',
              ),
              pastTrips: data.trips.filter((item) => item.state == 'completed'),
              me,
            },
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
    return {
      props: { me },
    };
  };
</script>

<script lang="ts">
  export let trips: Trip[];
  export let enquiryTrips: Trip[];
  export let planningTrips: Trip[];
  export let activeTrips: Trip[];
  export let pastTrips: Trip[];
  export let me: User;
  let active = 'Enquiry';
</script>

<div class="content trips-content">
  <LayoutAccount currentPage="trips">
    <svelte:component this={ButtonBack} label="Trips" link="/me" />
    {#if !me.travellerMe}
    <svelte:component this={AlertBox}>
      Before doing this. Please tell us your first and last name. <svelte:component
        this={ButtonUnderline}
        on:click={() => {
          goto('/me/my-account');
        }}
        label="Update them here"
      />
    </svelte:component>
    {/if}
    {#if trips}
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
