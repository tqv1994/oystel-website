<script lang="ts" context="module">
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import TravelAdvisorsTemplate from './components/TravelAdvisorsTemplate.svelte';
  import type { Load } from '@sveltejs/kit';
  import type { Advisor, AdvisorBase } from '$lib/store/advisor';
  import TravelAdvisorItem from './components/TravelAdvisorItem.svelte';
  import { get } from 'svelte/store';
  import { ENUM_TRIP_STATE, type Trip } from '$lib/store/trip';
  import { ppatch } from '$lib/utils/fetch';
  export const load: Load = async ({ fetch, url }) => {
    let advisors: Advisor[] = [];
    try {
      const res = await fetch(`/p/trips`);
      if (res.ok) {
        const trips = await res.json();
        advisors = trips.reduce((acc: Advisor[], trip: Trip)=>{
          if(trip.advisor){
            const index = acc.findIndex((item)=>item.id.toString() === trip.advisor.id.toString());
            if(index < 0){
              const advisor = {...trip.advisor};
              advisor.trips = [trip];
              acc.push(advisor);
            }else{
              acc[index].trips?.push(trip);
            }
          }
          return acc;
        },[]);
      } else {
        console.error(await res.json());
      }
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        advisors,
      },
    };
  };
</script>

<script lang="ts">
  let me: User | undefined = $session.user;
  export let advisors: Advisor[] = [];
  let currentAdvisors: Advisor[];
  let pastAdvisors: Advisor[];

  $: if (advisors) {
    currentAdvisors = (advisors || []).reduce(
      (acc: Advisor[], item: Advisor) => {
        if (item.accept == true) {
          acc.push(item);
        }
        return acc;
      },
      [],
    );
    pastAdvisors = (advisors || []).reduce((acc: Advisor[], item: Advisor) => {
      if (item.accept == false) {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  const onDeRegister = async (event: CustomEvent<Advisor>) => {
    window.openLoading();
    if (event.detail.id && me) {
      const advisor = (advisors || []).find(
        (item) => item.id.toString() === event.detail.id.toString(),
      );
      try {
        const tripsHaveStateConfirmed = (advisor?.trips || []).filter(
          (item) => item.state === ENUM_TRIP_STATE.confirmed,
        );
        if (tripsHaveStateConfirmed && tripsHaveStateConfirmed.length > 0) {
          // Can't unsubscribe when there is a trip with the status of confirmed
          window.pushToast(
            "Some of this advisor's trips are confirmed so you can't de-register",
          );
        } else {
          const myAdvisors = advisors.filter(
            (item) => item.id.toString() !== event.detail.id.toString(),
          );
          const res = await ppatch(`auth/me`, {
            myAdvisors,
          });
          if (res.ok) {
            advisors = myAdvisors;
          } else {
            window.pushToast('An error occurred');
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    window.closeLoading();
  };
  let active = 'Current';
</script>

<div class="content travel-advisors-content">
  <LayoutAccount currentPage="travel-advisors">
    {#if me}
      <ButtonBack label="Travel Advisors" link="/me" />
      <BoxTabs>
        <div slot="tabs">
          <div class="d-block m-none">
            <TabBar tabs={['Current', 'Past']} let:tab bind:active>
              <Tab {tab}>
                <Label>{tab}</Label>
              </Tab>
            </TabBar>
          </div>
          <div class="d-none m-block">
            <Select bind:value={active} label="">
              <Option value="Current" selected>Current</Option>
              <Option value="Past">Past</Option>
            </Select>
          </div>
        </div>
        <div slot="content" class="mt-35">
          {#if active == 'Current'}
            <TravelAdvisorsTemplate>
              {#each currentAdvisors || [] as item}
                <div class="d-col-6 m-col-12">
                  <TravelAdvisorItem
                    {item}
                    isPast={false}
                    on:deRegister={onDeRegister}
                  />
                </div>
              {/each}
            </TravelAdvisorsTemplate>
          {/if}
          {#if active == 'Past'}
            <TravelAdvisorsTemplate>
              {#each pastAdvisors || [] as item}
                <div class="d-col-6 m-col-12">
                  <TravelAdvisorItem
                    {item}
                    isPast={true}
                    on:deRegister={onDeRegister}
                  />
                </div>
              {/each}
            </TravelAdvisorsTemplate>
          {/if}
        </div>
      </BoxTabs>
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../theme/mixins';
  .travel-advisors-content {
    @import '../../style/partial/form.scss';
    @import '../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }
  }
</style>
