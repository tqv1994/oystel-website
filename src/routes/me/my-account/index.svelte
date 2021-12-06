<script lang="ts">
  import { authStore, User } from '$lib/store/auth';
  import LayoutAccount from '../components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from '../components/BoxTabs.svelte';
  import PersonalInformation from '../_account_tabs/personal-information.svelte';
  import FamilyFriends from '../_account_tabs/family-friends.svelte';
  import Select, { Option } from '@smui/select';
  import BackIcon from '$lib/icons/BackIcon.svelte';
  import TravelDocuments from '../_account_tabs/travel-documents.svelte';
  import ButtonBack from '../components/ButtonBack.svelte';
  import { documentHelper } from '$lib/helpers/document';
  import AlertBox from '../components/AlertBox.svelte';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';

  let me: User | undefined = $authStore.user;
  let active = 'Personal Information';
</script>

<div class="content my-account-content">
  <LayoutAccount currentPage="my-account">
    {#if me}
      <svelte:component this={ButtonBack} label="My Account" link="/me" />
      <svelte:component this={BoxTabs}>
        <div slot="tabs">
          <div class="d-block m-none">
            <TabBar
              tabs={[
                'Personal Information',
                'Family & Friends',
                'Travel Documents',
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
              <Option value="Personal Information" selected
                >Personal Information</Option
              >
              <Option value="Family & Friends">Family & Friends</Option>
              <Option value="Travel Documents">Travel Documents</Option>
            </Select>
          </div>
        </div>
        <div slot="content">
          {#if active == 'Personal Information'}
            <svelte:component this={PersonalInformation} bind:me />
          {/if}
          {#if active == 'Family & Friends' && me.travellerMe}
            <svelte:component this={FamilyFriends} {me} />
          {/if}
          {#if active == 'Travel Documents' && me.travellerMe}
            <svelte:component this={TravelDocuments} {me} />
          {/if}
          {#if active != 'Personal Infomation' && !me.travellerMe}
            <svelte:component this={AlertBox}>
              Before doing this. Please tell us your first and last name. <svelte:component
                this={ButtonUnderline}
                on:click={() => {
                  documentHelper.scrollToTop();
                }}
                label="Update them here"
              />
            </svelte:component>
          {/if}
        </div>
      </svelte:component>
    {/if}
  </LayoutAccount>
</div>

<style lang="scss" global>
  @use '../../../theme/mixins';
  .my-account-content {
    @import '../../../style/partial/form.scss';
    @import '../../../style/partial/thumbnail.scss';
    .mdc-select {
      width: 100%;
    }

    .travel-detais,
    .email-preferences {
      padding: 25px 30px;
      position: relative;
      border: 1px solid #000;
    }

    @include mixins.mobile {
      .user-profile-image :global(.btn-update-avatar) {
        top: -5px;
        right: -10px;
      }
      :global(.personal-info .mdc-layout-grid) {
        --mdc-layout-grid-gutter-phone: 5px;
      }
    }
  }
</style>
