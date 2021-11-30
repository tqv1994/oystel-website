<script lang="ts">
    import { authStore, User } from '$lib/store/auth';
    import LayoutAccount from './LayoutAccount.svelte';
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import BoxTabs from './components/BoxTabs.svelte';
    import Enquiry from './_trips_tabs/enquiry.svelte';
    import Select, { Option } from '@smui/select';
    import ButtonBack from './components/ButtonBack.svelte';
  
    let me: User | undefined = $authStore.user;
    let active = 'Enquiry';
  </script>
  
  <div class="content trips-content">
    <LayoutAccount currentPage="trips">
      {#if me}
        <svelte:component this={ButtonBack} label="Trips" link="/me" />
        <svelte:component this={BoxTabs}>
          <div slot="tabs">
            <div class="d-block m-none">
              <TabBar
                tabs={[
                  'Enquiry',
                  'Planning',
                  'Active',
                  'Past',
                ]}
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
                <Option value="Enquiry" selected
                  >Enquiry</Option
                >
                <Option value="Planning">Planning</Option>
                <Option value="Active">Active</Option>
                <Option value="Past">Past</Option>
              </Select>
            </div>
          </div>
          <div slot="content">
            {#if active == 'Enquiry'}
              <svelte:component this={Enquiry} {me} />
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
    }
  </style>
  