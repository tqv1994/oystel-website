<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BoxContent from '../components/BoxContent.svelte';
  import Field from '../Field.svelte';
  import Box from '../components/Box.svelte';
  import PersonalInfomationForm from '../_form/personal-infomation-form.svelte';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import Text from '../components/Text.svelte';
  import PersonalInformationGeneralForm from '../_form/personal-information-general-form.svelte';

  export let me: User;
  let isInfoEdit: boolean = false;
  let generalEdit: boolean = false;
</script>

<div class="personal-infomation-tab">
  {#if !isInfoEdit}
    <LayoutGrid class="p-0">
      <Cell
        class="personal-info"
        spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}
      >
        <svelte:component
          this={BoxContent}
          title={me.travellerMe?.forename + ' ' + me.travellerMe?.surname ||
            '-'}
          bind:is_edit={isInfoEdit}
        >
          <LayoutGrid class="p-0 d-none m-block mb-20">
            <Cell spanDevices={{ phone: 2, tablet: 4 }}>
              <div class="thumbnail user-profile-image dark">
                <div class="image-cover" style="padding-top: 100%">
                  <BlurImage {...me.avatar} />
                </div>
              </div>
            </Cell>
            <Cell spanDevices={{ phone: 2, tablet: 4 }}>
              <h3 class="mdc-typography--headline1 mb-15">
                {me.travellerMe?.forename + ' ' + me.travellerMe?.surname ||
                  '-'}
              </h3>
              <svelte:component this={ButtonUnderline} label="Edit" />
            </Cell>
          </LayoutGrid>
          <svelte:component this={Field} label="Email">
            <svelte:component this={Text}
              >{me.travellerMe?.email || 'Please update'}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="Cell Phone">
            <svelte:component this={Text}
              >{me.travellerMe?.mobilePhone || 'Please update'}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="Birthdate">
            <svelte:component this={Text}
              >{dateTimeHelper.formatDate(me.travellerMe?.birthday) ||
                'Please update'}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="Country of Residence">
            <svelte:component this={Text}
              >{me.travellerMe?.nationality?.name ||
                'Please update'}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="OYSTEO ID Number">
            <svelte:component this={Text}>{me.id}</svelte:component>
          </svelte:component>
        </svelte:component>
      </Cell>
      <Cell class="m-none" spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
        <div class="thumbnail user-profile-image dark">
          <div class="image-cover" style="padding-top: 100%">
            <BlurImage {...me.avatar} />
          </div>
        </div>
      </Cell>
    </LayoutGrid>
  {/if}
  {#if isInfoEdit}
    <svelte:component
      this={PersonalInfomationForm}
      bind:is_edit={isInfoEdit}
      bind:me
    />
  {/if}
</div>

<section class="section-info" />
{#if !generalEdit}
  <svelte:component this={Box} title="General" bind:is_edit={generalEdit}>
    <svelte:component this={Field} label="Home Phone" column_1={4} column_2={8}>
      <svelte:component this={Text}
        >{me.travellerMe?.homePhone || 'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="Office Phone"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.workPhone || 'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component this={Field} label="Address" column_1={4} column_2={8}>
      <svelte:component this={Text}>{'Please update'}</svelte:component>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
      <svelte:component this={Text}
        >{me.travellerMe?.language || 'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component this={Field} label="Gender" column_1={4} column_2={8}>
      <svelte:component this={Text}>Female</svelte:component>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Nationality"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.nationality?.name ||
          'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="Passport Number"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}>XXXXXXXX</svelte:component>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Expiry Date"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}>XX/XX/XXXX</svelte:component>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Place of Issue"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}>{'Please update'}</svelte:component>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Instagram Handle"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.instagram || 'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="Facebook Username"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.facebook || 'Please update'}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="WhatsApp Number"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.whatsapp || 'Please update'}</svelte:component
      >
    </svelte:component>
  </svelte:component>
{/if}
{#if generalEdit}
  <svelte:component
    this={PersonalInformationGeneralForm}
    bind:is_edit={generalEdit}
    bind:me
  />
{/if}

<svelte:component this={Box} title="My Assistant">
  <svelte:component this={Field} label="Name" column_1={4} column_2={8}>
    <svelte:component this={Text}>Jennifer Doe</svelte:component>
  </svelte:component>
  <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
    <svelte:component this={Text}>English</svelte:component>
  </svelte:component>
  <svelte:component this={Field} label="Phone" column_1={4} column_2={8}>
    <svelte:component this={Text}>XX/XX/XXXX</svelte:component>
  </svelte:component>
  <svelte:component
    this={Field}
    label="Contact Notes"
    column_1={4}
    column_2={8}
  >
    <svelte:component this={Text}
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam</svelte:component
    >
  </svelte:component>
</svelte:component>
<svelte:component this={Box} title="Medical Conditions">
  <svelte:component this={Text}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
  </svelte:component>
</svelte:component>

<style lang="scss">
  @use '../../../theme/mixins';
  .personal-infomation-tab :global(.section-title) {
    @include mixins.mobile {
      display: none;
    }
  }

  .user-profile-image {
    padding: 50px;
    :global(img),
    :global(div) {
      border-radius: 100%;
    }
    @include mixins.mobile {
      padding: 0;
      max-width: 120px;
    }
  }
</style>
