<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch, session, url }) => {
    const countries = await getCollection(fetch, 'country');
    const salutationTypes = await getCollection(fetch, 'salutation-type');
    const languages = await getCollection(fetch, 'language');
    return {
      props: {
        countries,
        salutationTypes,
        languages,
      },
    };
  };
</script>

<script lang="ts">
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import LayoutAccount from '../components/LayoutAccount.svelte';
  import Tab, { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import BoxTabs from '../components/BoxTabs.svelte';
  import PersonalInformation from '../_account_tabs/personal-information.svelte';
  import FamilyFriends from '../_account_tabs/family-friends.svelte';
  import Select, { Option } from '@smui/select';
  import TravelDocuments from '../_account_tabs/travel-documents.svelte';
  import ButtonBack from '../components/ButtonBack.svelte';
  import { documentHelper } from '$lib/helpers/document';
  import AlertBox from '../components/AlertBox.svelte';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import { getCollection } from '$lib/store/collection';
  import type { Country } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';

  let me: User | undefined = $session.user;
  let active = 'Personal Information';
  export let countries: Country[], salutationTypes: Kind[], languages: Kind[];
</script>

{#if $session.user}
  <div class="content my-account-content">
    <LayoutAccount currentPage="my-account">
      {#if me}
        <ButtonBack label="My Account" link="/me" />
        <BoxTabs>
          <div slot="tabs">
            <div class="d-block m-none desktop-tabs">
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
              <Select
                class="my-account-mobile-tabs"
                bind:value={active}
                label=""
              >
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
              <PersonalInformation
                travellerMe={$session.travellerMe}
                {countries}
                {salutationTypes}
                {languages}
              />
            {/if}
            {#if active == 'Family & Friends' && $session.travellerMe}
              <FamilyFriends
                travellerMe={$session.travellerMe}
                {salutationTypes}
              />
            {/if}
            {#if active == 'Travel Documents' && $session.travellerMe}
              <TravelDocuments travellerMe={$session.travellerMe} {countries} />
            {/if}
            {#if active != 'Personal Information' && !$session.travellerMe}
              <AlertBox>
                Before doing this. Please tell us your first and last name. <ButtonUnderline
                  on:click={() => {
                    documentHelper.scrollToTop();
                  }}
                  label="Update them here"
                />
              </AlertBox>
            {/if}
          </div>
        </BoxTabs>
      {/if}
    </LayoutAccount>
  </div>
{/if}

<style lang="scss" global>
  @use '../../../theme/mixins';
  .my-account-content {
    @import '../../../style/partial/form.scss';
    @import '../../../style/partial/thumbnail.scss';
    @import '../../../style/partial/tab-bar.scss';
    .mdc-select {
      width: 100%;
    }

    .travel-detais,
    .email-preferences {
      padding: 25px 30px;
      position: relative;
      border: 1px solid #000;
    }

    .desktop-tabs {
      :global(.mdc-tab) {
        height: 56px !important;
      }
      :global(.mdc-tab--active) {
        font-weight: 900;
      }
    }

    :global(.personal-infomation-tab) {
      padding-bottom: 24px;
      padding-top: 8px;
    }

    :global(.my-account-field) {
      padding-bottom: 16px !important;

      .mdc-layout-grid__inner {
        align-items: start;
      }
    }

    :global(.my-account-box) {
      padding: 40px 0;
    }

    :global(.my-account-mobile-tabs) {
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
