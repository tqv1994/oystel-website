<script lang="ts" context="module">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import TravelAdvisorsTemplate from './components/TravelAdvisorsTemplate.svelte';
  import type { Load } from '@sveltejs/kit';
  import { Advisor, AdvisorBase } from '$lib/store/advisor';
import { stringHelper } from '$lib/helpers';

  export const load: Load = async ({ fetch, page }) => {
    let advisors: Advisor[] = [];
    let me: User | undefined;
    authStore.subscribe(async ({ user }) => {
      me = user;
    });
    if(me?.myAdvisors){
      const advisorIds = me.myAdvisors.map((item)=>item.id);
      const res = await fetch(`/advisor/list.json?${stringHelper.objectToQueryString({id:advisorIds})}`);
      if (res.ok) {
        advisors = await res.json();
      }
    }
    return {
      props: {
        advisors
      },
    };
  };
</script>

<script lang="ts">
  let me: User | undefined = $authStore.user;
  export let advisors: Advisor[] = [];
  let currentAdvisors: Advisor[] = advisors.reduce((acc: Advisor[], item: Advisor)=>{
    if(item.accept == true){
      acc.push(item);
    }
    return acc;
  },[]);
  let pastAdvisors: Advisor[] = advisors.reduce((acc: Advisor[], item: Advisor)=>{
    if(item.accept == false){
      acc.push(item);
    }
    return acc;
  },[]);

  let active = 'Current';
</script>

<div class="content travel-advisors-content">
  <LayoutAccount currentPage="travel-advisors">
    {#if me}
      <svelte:component this={ButtonBack} label="Travel Advisors" link="/me" />
      <svelte:component this={BoxTabs}>
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
            <svelte:component
              this={TravelAdvisorsTemplate}
              items={currentAdvisors}
            />
          {/if}
          {#if active == 'Past'}
            <svelte:component
              this={TravelAdvisorsTemplate}
              items={pastAdvisors}
              isPast={true}
            />
          {/if}
        </div>
      </svelte:component>
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
