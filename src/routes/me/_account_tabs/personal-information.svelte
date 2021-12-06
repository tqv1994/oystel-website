<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import BoxContent from '../components/BoxContent.svelte';
  import Field from '../components/Field.svelte';
  import Box from '../components/Box.svelte';
  import PersonalInfomationForm from '../_form/personal-infomation-form.svelte';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import Text from '../components/Text.svelte';
  import PersonalInformationGeneralForm from '../_form/personal-information-general-form.svelte';
  import { User } from '$lib/store/auth';
  import FormToggle from '../components/FormToggle.svelte';
  import AlertBox from '../components/AlertBox.svelte';
  import { documentHelper } from '$lib/helpers';
  import PersonalInfomationMyAssistantForm from '../_form/personal-infomation-my-assistant-form.svelte';
  import PersonalInfomationMedicalConditionsForm from '../_form/personal-infomation-medical-conditions-form.svelte';

  export let me: User;
  let isInfoEdit: boolean = false;
  let generalEdit: boolean = false;
  let myAssistantEdit: boolean = false;
  let medicalConditionsEdit: boolean = false;
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
          title={`${me.travellerMe?.forename || ''} ${
            me.travellerMe?.surname || ''
          }`}
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
                {`${me.travellerMe?.forename || ''}  ${
                  me.travellerMe?.surname || ''
                }`}
              </h3>
              <svelte:component
                this={ButtonUnderline}
                label="Edit"
                on:click={() => {
                  isInfoEdit = true;
                }}
              />
            </Cell>
          </LayoutGrid>
          <svelte:component this={Field} label="Email">
            <svelte:component this={Text}>{me.email || ''}</svelte:component>
          </svelte:component>
          <svelte:component this={Field} label="Cell Phone">
            <svelte:component this={Text}
              >{me.travellerMe?.mobilePhone || ''}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="Birthdate">
            <svelte:component this={Text}
              >{dateTimeHelper.formatDate(me.travellerMe?.birthday) ||
                ''}</svelte:component
            >
          </svelte:component>
          <svelte:component this={Field} label="Country of Residence">
            <svelte:component this={Text}
              >{me.travellerMe?.nationality?.name || ''}</svelte:component
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
        >{me.travellerMe?.homePhone || ''}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="Office Phone"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.workPhone || ''}</svelte:component
      >
    </svelte:component>
    <svelte:component this={Field} label="Address" column_1={4} column_2={8}>
      <svelte:component this={Text}>
        {#if (me.travellerMe?.addresses || [])[0]}
          <p>
            {`${me.travellerMe?.addresses[0]?.line1}, ${me.travellerMe?.addresses[0]?.province}, ${me.travellerMe?.addresses[0]?.country.code} ${me.travellerMe?.addresses[0]?.zipcode}`}
          </p>
          {#if me.travellerMe?.addresses[0]?.line2}
            <p>
              {`${me.travellerMe?.addresses[0]?.line2}, ${me.travellerMe?.addresses[0]?.province}, ${me.travellerMe?.addresses[0]?.country.code} ${me.travellerMe?.addresses[0]?.zipcode}`}
            </p>
          {/if}
        {/if}
      </svelte:component>
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
      <svelte:component this={Text}
        >{me.travellerMe?.language || ''}</svelte:component
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
        >{me.travellerMe?.nationality?.name || ''}</svelte:component
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
      <svelte:component this={Text}>{''}</svelte:component>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Instagram Handle"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.instagram || ''}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="Facebook Username"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.facebook || ''}</svelte:component
      >
    </svelte:component>
    <svelte:component
      this={Field}
      label="WhatsApp Number"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text}
        >{me.travellerMe?.whatsapp || ''}</svelte:component
      >
    </svelte:component>
  </svelte:component>
{/if}
{#if generalEdit}
  {#if me.travellerMe}
    <svelte:component
      this={PersonalInformationGeneralForm}
      bind:is_edit={generalEdit}
      bind:me
    />
  {/if}
  {#if !me.travellerMe}
    <svelte:component this={FormToggle} title="" bind:is_edit={generalEdit}>
      <svelte:component this={AlertBox}>
        Before doing this. Please tell us your first and last name. <svelte:component
          this={ButtonUnderline}
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </svelte:component>
    </svelte:component>
  {/if}
{/if}

{#if !myAssistantEdit}
  <svelte:component
    this={Box}
    title="My Assistant"
    bind:is_edit={myAssistantEdit}
  >
    <svelte:component this={Field} label="Name" column_1={4} column_2={8}>
      <svelte:component this={Text} />
    </svelte:component>
    <svelte:component this={Field} label="Language" column_1={4} column_2={8}>
      <svelte:component this={Text} />
    </svelte:component>
    <svelte:component this={Field} label="Phone" column_1={4} column_2={8}>
      <svelte:component this={Text} />
    </svelte:component>
    <svelte:component
      this={Field}
      label="Contact Notes"
      column_1={4}
      column_2={8}
    >
      <svelte:component this={Text} />
    </svelte:component>
  </svelte:component>
{/if}
{#if myAssistantEdit}
  {#if me.travellerMe}
    <svelte:component
      this={PersonalInfomationMyAssistantForm}
      bind:me
      bind:is_edit={myAssistantEdit}
    />
  {/if}
  {#if !me.travellerMe}
    <svelte:component this={FormToggle} title="" bind:is_edit={myAssistantEdit}>
      <svelte:component this={AlertBox}
        ><svelte:component
          this={ButtonUnderline}
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </svelte:component>
    </svelte:component>
  {/if}
{/if}

{#if !medicalConditionsEdit}
  <svelte:component
    this={Box}
    title="Medical Conditions"
    bind:is_edit={medicalConditionsEdit}
  >
    <svelte:component this={Text} />
  </svelte:component>
{/if}
{#if medicalConditionsEdit}
  {#if me.travellerMe}
    <svelte:component
      this={PersonalInfomationMedicalConditionsForm}
      bind:me
      bind:is_edit={medicalConditionsEdit}
    />
  {/if}
  {#if !me.travellerMe}
    <svelte:component
      this={FormToggle}
      title=""
      bind:is_edit={medicalConditionsEdit}
    >
      <svelte:component this={AlertBox}>
        Before doing this. Please tell us your first and last name. <svelte:component
          this={ButtonUnderline}
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </svelte:component>
    </svelte:component>
  {/if}
{/if}

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
