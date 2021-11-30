<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from './LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from './components/BoxTabs.svelte';
  import Select, { Option } from '@smui/select';
  import ButtonBack from './components/ButtonBack.svelte';
  import TravelAdvisorsTemplate from './components/TravelAdvisorsTemplate.svelte';

  let me: User | undefined = $authStore.user;
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
              items={[
                {
                  name: 'Jan Wohl',
                  phone: '+X XXX-XXX-XXXX',
                  email: 'name@email.com',
                  tripDate: 'Oct 2021',
                  numberOpenTrips: 12,
                  numberPastTrips: 23,
                  avatar: {
                    url: '/img/me/advisors/advisor-1.jpg',
                  },
                },
                {
                  name: 'Mike Harden',
                  phone: '+X XXX-XXX-XXXX',
                  email: 'name@email.com',
                  tripDate: 'Sept 2021',
                  numberOpenTrips: 5,
                  numberPastTrips: 15,
                  avatar: {
                    url: '/img/me/advisors/advisor-2.jpg',
                  },
                },
              ]}
            />
          {/if}
          {#if active == 'Past'}
            <svelte:component
              this={TravelAdvisorsTemplate}
              items={[
                {
                  name: 'Jenny Knott',
                  phone: '+X XXX-XXX-XXXX',
                  email: 'name@email.com',
                  tripDate: 'Oct 2021',
                  numberOpenTrips: 12,
                  numberPastTrips: 23,
                  avatar: {
                    url: '/img/me/advisors/advisor-3.jpg',
                  },
                },
                {
                  name: 'Sophia Gonzalez',
                  phone: '+X XXX-XXX-XXXX',
                  email: 'name@email.com',
                  tripDate: 'Sept 2021',
                  numberOpenTrips: 5,
                  numberPastTrips: 15,
                  avatar: {
                    url: '/img/me/advisors/advisor-4.jpg',
                  },
                },
              ]}
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
