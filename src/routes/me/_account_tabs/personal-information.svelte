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
  import FormToggle from '../components/FormToggle.svelte';
  import AlertBox from '../components/AlertBox.svelte';
  import { documentHelper } from '$lib/helpers';
  import PersonalInfomationMyAssistantForm from '../_form/personal-infomation-my-assistant-form.svelte';
  import PersonalInfomationMedicalConditionsForm from '../_form/personal-infomation-medical-conditions-form.svelte';
  import type { Traveller } from '$lib/store/traveller';
  import type { Country } from '$lib/store/country';
  import type { Kind } from '$lib/store/category';
  import { session } from '$app/stores';
import Avatar from '$lib/components/Avatar.svelte';

  export let travellerMe: Traveller;
  let isInfoEdit = false;
  let generalEdit = false;
  let myAssistantEdit = false;
  let medicalConditionsEdit = false;
  export let countries: Country[], salutationTypes: Kind[], languages: Kind[];
</script>

<div class="personal-infomation-tab">
  {#if !isInfoEdit}
    <LayoutGrid class="p-0">
      <Cell
        class="personal-info"
        spanDevices={{ desktop: 8, phone: 4, tablet: 8 }}
      >
        <BoxContent
          title={`${travellerMe?.forename || ''} ${travellerMe?.surname || ''}`}
          headlineTitle="h2"
          class="d-mt-30"
          bind:is_edit={isInfoEdit}
        >
          <LayoutGrid class="p-0 d-none m-block mb-20">
            <Cell spanDevices={{ phone: 2, tablet: 4 }}>
              <div class="thumbnail user-profile-image dark mt-20">
                <Avatar style="padding-top: 100%" avatar={travellerMe?.avatar || {url:"/img/me/avatar-default.png"}}/>
              </div>
            </Cell>
            <Cell spanDevices={{ phone: 2, tablet: 4 }}>
              <h2 class="mdc-typography--headline1 mb-15">
                {`${travellerMe?.forename || ''}  ${
                  travellerMe?.surname || ''
                }`}
              </h2>
              <ButtonUnderline
                label="Edit"
                on:click={() => {
                  isInfoEdit = true;
                }}
              />
            </Cell>
          </LayoutGrid>
          <Field label="Email">
            <Text>{travellerMe?.email || ''}</Text>
          </Field>
          <Field label="Cell Phone">
            <Text>{travellerMe?.mobilePhone || ''}</Text>
          </Field>
          <Field label="Birth Date">
            <Text
              >{travellerMe?.birthday
                ? dateTimeHelper.formatDate(travellerMe?.birthday)
                : ''}</Text
            >
          </Field>
          <Field label="Country of Residence">
            <Text>{travellerMe?.residence?.name || ''}</Text>
          </Field>
          <Field label="OYSTEO ID Number">
            <Text>{$session.user?.id}</Text>
          </Field>
        </BoxContent>
      </Cell>
      <Cell class="m-none" spanDevices={{ desktop: 4, phone: 4, tablet: 8 }}>
        <div class="thumbnail user-profile-image dark">
          <div class="image-cover" style="padding-top: 100%">
            <Avatar style="padding-top: 100%" avatar={travellerMe?.avatar || {url:"/img/me/avatar-default.png"}}/>
          </div>
        </div>
      </Cell>
    </LayoutGrid>
  {/if}
  {#if isInfoEdit}
    <PersonalInfomationForm
      bind:is_edit={isInfoEdit}
      bind:travellerMe
      {countries}
      {salutationTypes}
    />
  {/if}
</div>
{#if !generalEdit}
  <Box title="General" bind:is_edit={generalEdit}>
    <Field label="Home Phone" column_1={4} column_2={8}>
      <Text>{travellerMe?.homePhone || ''}</Text>
    </Field>
    <Field label="Office Phone" column_1={4} column_2={8}>
      <Text>{travellerMe?.workPhone || ''}</Text>
    </Field>
    <Field label="Address" column_1={4} column_2={8}>
      <Text>
        {#if travellerMe?.address}
          <p class="m-0">
            {`${travellerMe?.address?.line1 || ''}, ${
              travellerMe?.address?.line2 + ', ' || ''
            }
            ${travellerMe?.address?.city + ' ' || ''} ${
              travellerMe?.address?.locality + ' ' || ''
            } ${travellerMe?.address?.province || ''}, ${
              travellerMe?.address?.country?.code || ''
            } ${travellerMe?.address?.postcode || ''}`}
          </p>
        {/if}
      </Text>
    </Field>
    <Field label="Language" column_1={4} column_2={8}>
      <Text>{travellerMe?.language || ''}</Text>
    </Field>
    <Field label="Gender" column_1={4} column_2={8}>
      <Text>{travellerMe?.gender || ''}</Text>
    </Field>
    <Field label="Nationality" column_1={4} column_2={8}>
      <Text>{travellerMe?.nationality?.name || ''}</Text>
    </Field>
    <Field label="Passport Number" column_1={4} column_2={8}>
      <Text>{travellerMe?.passportNumber || ''}</Text>
    </Field>
    <Field label="Expiry Date" column_1={4} column_2={8}>
      <Text
        >{dateTimeHelper.formatDate(travellerMe?.passportExpiryDate) ||
          ''}</Text
      >
    </Field>
    <Field label="Place of Issue" column_1={4} column_2={8}>
      <Text>{travellerMe?.passportPlaceOfIssue || ''}</Text>
    </Field>
    <Field label="Instagram Handle" column_1={4} column_2={8}>
      <Text>{travellerMe?.instagram || ''}</Text>
    </Field>
    <Field label="Facebook Username" column_1={4} column_2={8}>
      <Text>{travellerMe?.facebook || ''}</Text>
    </Field>
    <Field label="Facebook Messenger" column_1={4} column_2={8}>
      <Text>{travellerMe?.messenger || ''}</Text>
    </Field>
    <Field label="WhatsApp Number" column_1={4} column_2={8}>
      <Text>{travellerMe?.whatsapp || ''}</Text>
    </Field>
  </Box>
{/if}
{#if generalEdit}
  {#if travellerMe}
    <PersonalInformationGeneralForm
      bind:is_edit={generalEdit}
      bind:travellerMe
      {countries}
      {languages}
    />
  {/if}
  {#if !travellerMe}
    <FormToggle title="" bind:is_edit={generalEdit}>
      <AlertBox>
        Before doing this. Please tell us your first and last na <ButtonUnderline
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </AlertBox>
    </FormToggle>
  {/if}
{/if}

{#if !myAssistantEdit}
  <Box title="My Assistant" bind:is_edit={myAssistantEdit}>
    <Field label="Name" column_1={4} column_2={8}>
      <Text
        >{travellerMe?.myAssistantSalutationType?.name || ''}
        {travellerMe?.myAssistantName || ''}</Text
      >
    </Field>
    <Field label="Language" column_1={4} column_2={8}>
      <Text>{travellerMe?.myAssistantLanguage?.name || ''}</Text>
    </Field>
    <Field label="Phone" column_1={4} column_2={8}>
      <Text>{travellerMe?.myAssistantPhone || ''}</Text>
    </Field>
    <Field label="Contact Notes" column_1={4} column_2={8}>
      <Text>{travellerMe?.myAssistantContactNotes || ''}</Text>
    </Field>
  </Box>
{/if}
{#if myAssistantEdit}
  {#if travellerMe}
    <PersonalInfomationMyAssistantForm
      bind:travellerMe
      bind:is_edit={myAssistantEdit}
      {countries}
      {salutationTypes}
      {languages}
    />
  {/if}
  {#if !travellerMe}
    <FormToggle title="" bind:is_edit={myAssistantEdit}>
      <AlertBox
        ><ButtonUnderline
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </AlertBox>
    </FormToggle>
  {/if}
{/if}

{#if !medicalConditionsEdit}
  <Box title="Medical Conditions" bind:is_edit={medicalConditionsEdit}>
    <Text>{travellerMe?.medicalCondition || ''}</Text>
  </Box>
{/if}
{#if medicalConditionsEdit}
  {#if travellerMe}
    <PersonalInfomationMedicalConditionsForm
      bind:travellerMe
      bind:is_edit={medicalConditionsEdit}
    />
  {/if}
  {#if !travellerMe}
    <FormToggle title="" bind:is_edit={medicalConditionsEdit}>
      <AlertBox>
        Before doing this. Please tell us your first and last na <ButtonUnderline
          on:click={() => {
            documentHelper.scrollToTop();
          }}
          label="Update them here"
        />
      </AlertBox>
    </FormToggle>
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
    margin: 65px 0 0 50px;
    max-width: 211px;
    :global(img),
    :global(div) {
      border-radius: 100%;
    }
    @include mixins.mobile {
      padding: 0;
      max-width: 120px;
      margin-left: 0;
    }
  }
</style>
