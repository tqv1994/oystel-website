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
  import { deRegisterAdvisorService } from '$lib/services/user.service';
  import TravelAdvisorItem from './components/TravelAdvisorItem.svelte';
  export const load: Load = async ({ fetch, url }) => {
    let advisors: Advisor[] = [];
    let me: User | undefined;
    authStore.subscribe(async ({ user }) => {
      me = user;
    });
    if (me?.myAdvisors && me?.myAdvisors.length > 0) {
      const advisorIds = me.myAdvisors.map((item) => item.id);
      const res = await fetch(
        `/advisor/list.json?${stringHelper.objectToQueryString({
          id: advisorIds,
        })}`,
      );
      if (res.ok) {
        advisors = await res.json();
      }
    }
    return {
      props: {
        advisors,
      },
    };
  };
</script>

<script lang="ts">
  let me: User | undefined = $authStore.user;
  export let advisors: Advisor[] = [];
  let currentAdvisors: Advisor[] = advisors.reduce(
    (acc: Advisor[], item: Advisor) => {
      if (item.accept == true) {
        acc.push(item);
      }
      return acc;
    },
    [],
  );
  let pastAdvisors: Advisor[] = advisors.reduce(
    (acc: Advisor[], item: Advisor) => {
      if (item.accept == false) {
        acc.push(item);
      }
      return acc;
    },
    [],
  );

  const reloadItems = () => {
    currentAdvisors = advisors.reduce((acc: Advisor[], item: Advisor) => {
      if (item.accept == true) {
        acc.push(item);
      }
      return acc;
    }, []);
    pastAdvisors = advisors.reduce((acc: Advisor[], item: Advisor) => {
      if (item.accept == false) {
        acc.push(item);
      }
      return acc;
    }, []);
  };
  const onDeRegister = async (event: CustomEvent<Advisor>) => {
    window.openLoading();
    if (event.detail.id && me) {
      try {
        const res = await deRegisterAdvisorService(event.detail.id, me);
        if(!res){
          window.pushToast("Some of this advisor's trips are confirmed so you can't de-register");
        }else{
          advisors = advisors.filter((item)=>item.id !== event.detail.id);
          me.myAdvisors = advisors;
          authStore.set({ user: me });
          reloadItems();
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
            <svelte:component this={TravelAdvisorsTemplate}>
              {#each currentAdvisors || [] as item}
                <div class="d-col-6 m-col-12">
                  <svelte:component
                    this={TravelAdvisorItem}
                    {item}
                    isPast={false}
                    on:deRegister={onDeRegister}
                  />
                </div>
              {/each}
            </svelte:component>
          {/if}
          {#if active == 'Past'}
            <svelte:component this={TravelAdvisorsTemplate}>
              {#each pastAdvisors || [] as item}
                <div class="d-col-6 m-col-12">
                  <svelte:component
                    this={TravelAdvisorItem}
                    {item}
                    isPast={true}
                    on:deRegister={onDeRegister}
                  />
                </div>
              {/each}
            </svelte:component>
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
