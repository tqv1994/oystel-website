<script lang="ts" context="module">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import Dialog from '@smui/dialog';
  import LinearProgress from '@smui/linear-progress';
  import { Content, Header, Title } from '@smui/dialog';
  import { onMount } from 'svelte';
  import When from './_steps/when.svelte';
  import Who from './_steps/who.svelte';
  import Budget from './_steps/budget.svelte';
  import Where from './_steps/where.svelte';
  import Final from './_steps/final.svelte';
  import RoomStyle from './_steps/room-style.svelte';
  import YourTravel from './_steps/your-travel.svelte';
  import Experiences from './_steps/experiences.svelte';
  import TailorYourExperience from './_steps/tailor-your-experience.svelte';
  import Accommodations from './_steps/accommodations.svelte';
  import type { Load } from '@sveltejs/kit';
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import PlanTemplate from './PlanTemplate.svelte';
  import { goto } from '$app/navigation';
  import type { UploadFile } from '$lib/store/upload-file';
  import { H2 } from '@smui/common/elements';
  export type MetaDataTripQuery = {
    roomStyles: RoomStyle[];
    roomPreferences: Kind[];
    lodgingTypes: Kind[];
    currencies: Currency[];
    travelGroupTypes: Kind[];
    experiences: Experience[];
    experienceTypes: Kind[];
    destinationTypes: Kind[];
    countries: Country[];
  };

  export const load: Load = async ({ session, url, fetch }) => {
    if (!session.user) {
      return redirect('/');
    }
    const advisorId = url.searchParams.get('advisor') || undefined;
    if (advisorId) {
      const advisor = await trySearchGetOne<Advisor>(
        fetch,
        'advisor',
        advisorId,
      );
      if (!advisor) {
        return redirect('/advisor');
      }
    }
    let destinationTypes = await getCollection(fetch, 'destination-type');
    let experienceTypes = await getCollection(fetch, 'experience-type');
    let roomStyles = await getCollection(fetch, 'room-style');
    let lodgingTypes = await getCollection(fetch, 'lodging-type');
    let roomPreferences = await getCollection(fetch, 'room-preference');
    let currencies = await getCollection(fetch, 'currencies');
    let travelGroupTypes = await getCollection(fetch, 'travel-group-type');
    let countries = await getCollection(fetch, 'country');

    return {
      props: {
        key: url.pathname,
        advisorId,
        metadataTrip: {
          roomStyles,
          lodgingTypes,
          roomPreferences,
          currencies,
          travelGroupTypes,
          experienceTypes,
          destinationTypes,
          countries,
        },
      },
    };
  };
</script>

<script lang="ts">
  import { ENUM_TRIP_STATE, TripInput } from '$lib/store/trip';
  import Loading from '$lib/components/Loading.svelte';
  import Carousel from '$lib/components/Carousel.svelte';
  import { getCollection } from '$lib/store/collection';
  import { ppost } from '$lib/utils/fetch';
  import type { Currency } from '$lib/store/currency';
  import type { Experience } from '$lib/store/experience';
  import type { Kind } from '$lib/store/category';
  import type { Country } from '$lib/store/country';
  import { redirect } from '$lib/helpers/redirect.svelte';
  import { trySearchGetOne } from '$lib/store/search';
  import type { Advisor } from '$lib/store/advisor';
  export let metadataTrip: MetaDataTripQuery;
  export let advisorId: string | undefined;
  const messageErrorStep3 =
    'We are sorry, the minimum budget requirement has not been met to speak to one of our specialist luxury advisors';
  let open = false;
  let progress = 0.1;
  let step = 0;
  let totalSteps = 10;
  let carousel: Carousel;
  let image1: UploadFile = {
    id: '',
    url: '/img/plan/plan-1.png',
    created_at: '',
    published_at: '',
  };
  let image2: UploadFile = {
    id: '',
    url: '/img/plan/plan-2.png',
    created_at: '',
    published_at: '',
  };
  let image3: UploadFile = {
    id: '',
    url: '/img/plan/couple_holiday.png',
    created_at: '',
    published_at: '',
  };
  let tripInput: TripInput = new TripInput();

  const handleNextClick = async () => {
    if (totalSteps > step + 1) {
      if (step === 2) {
        if (!checkBudget()) {
          await ppost('trips', { ...tripInput });
          window.pushToast(messageErrorStep3);
          return;
        }
      }
      step += 1;
      carousel.onRightClick();
    }
  };

  function checkBudget() {
    const numberOfRooms = Math.ceil(
      (tripInput.numberOfAdults + tripInput.numberOfChildren) / 2,
    );
    const totalBudget =
      tripInput.numberOfNights * numberOfRooms * tripInput.nightlyBudget;
    const currency = (metadataTrip.currencies || []).find(
      (item) => item.id.toString() === (tripInput.currency || '').toString(),
    );
    if (currency) {
      if (currency.name === 'US Dollar') {
        if (tripInput.nightlyBudget < 500) {
          return false;
        }
        if (tripInput.budget - totalBudget < 6000) {
          return false;
        }
      } else if (currency.name === 'British Pound') {
        if (tripInput.nightlyBudget < 400) {
          return false;
        }
        if (tripInput.budget - totalBudget < 5000) {
          return false;
        }
      } else if (currency.name === 'Euro') {
        if (tripInput.nightlyBudget < 450) {
          return false;
        }
        if (tripInput.budget - totalBudget < 5500) {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

  const handlePrevClick = () => {
    if (step > 0) {
      step -= 1;
      carousel.onRightClick();
    } else {
      open = false;
    }
  };

  const handleSaveAndClose = () => {
    onSubmitForm(true);
  };

  const handleSubmit = () => {
    onSubmitForm(false);
  };

  const onSubmitForm = async (isSaveAndClose: boolean) => {
    window.openLoading();
    let formData = {
      ...tripInput,
      lead_traveller: $session.travellerMe?.id,
      state: ENUM_TRIP_STATE.new_enquiry,
      sendThanksMail: isSaveAndClose ? false : true,
      advisor: advisorId,
    };
    const res = await ppost('trips', formData);
    if (res.ok) {
      if (isSaveAndClose) {
        open = false;
        tripInput = new TripInput();
        step = 0;
        carousel.onGo(0);
      } else {
        goto('/plan/success');
      }
    }
    window.closeLoading();
  };
</script>

<div class="plan-your-trip-modal">
  <PlanTemplate {image1} {image2} {image3}>
    <H2 class="plan-your-trip-h2">Let’s start planning your holiday.</H2>
    <p class="plan-your-trip-p">
      To help our expert travel advisors tailor a holiday just for you, we need
      some information to get started.
    </p>
    <Button
      class="btn-plan-your-trip mr-10"
      type="button"
      variant="outlined"
      style="width: 100%"
      on:click={() => {
        open = true;
      }}
    >
      <Label>Let’s Get Started</Label>
    </Button>
  </PlanTemplate>
  <Dialog
    class="always"
    bind:open
    fullscreen
    scrimClickAction=""
    escapeKeyAction=""
    aria-labelledby="Holiday planning wizard"
    aria-describedby="Tell us what you would like for your holiday"
  >
    <Header class="plan-your-trip-modal-header">
      <div class="m-none">{' '}</div>
      <Title><OysteoLogo width={130} height={17.217} /></Title>
      <IconButton action="close" class="material-icons">close</IconButton>
    </Header>
    <Content>
      <Carousel
        bind:this={carousel}
        loop={false}
        dots={false}
        draggable={false}
        controls={false}
        on:change={(event) => (progress = step / 10)}
      >
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
        <div class="content-item" />
      </Carousel>
      <div class="content-form">
        {#if step === 0}
          <svelte:component this={When} bind:tripInput />
        {:else if step === 1}
          <Who
            travelGroupTypes={metadataTrip?.travelGroupTypes || []}
            bind:tripInput
          />
        {:else if step === 2}
          <Budget currencies={metadataTrip.currencies || []} bind:tripInput />
        {:else if step === 3}
          <Where
            bind:tripInput
            destinationTypes={metadataTrip.destinationTypes}
            countries={metadataTrip.countries}
          />
        {:else if step === 4}
          <Accommodations
            bind:tripInput
            lodgingTypes={metadataTrip.lodgingTypes || []}
            roomPreferences={metadataTrip.roomPreferences || []}
          />
        {:else if step === 5}
          <RoomStyle
            roomStyles={metadataTrip.roomStyles || []}
            bind:tripInput
          />
        {:else if step === 6}
          <Experiences
            bind:tripInput
            experienceTypes={metadataTrip.experienceTypes || []}
          />
        {:else if step === 7}
          <TailorYourExperience bind:tripInput />
        {:else if step === 8}
          <YourTravel bind:tripInput />
        {:else if step === 9}
          <Final bind:tripInput />
        {/if}
      </div>
    </Content>
    <div class="content-wrap mb-30 mt-30">
      <div class="container">
        <div class="action-buttons">
          <Button variant="outlined" on:click={handlePrevClick}>
            <Label>Previous Question</Label>
          </Button>
          {#if step + 1 < totalSteps}
            <Button variant="outlined" on:click={handleNextClick}>
              <Label>Next Question</Label>
            </Button>
          {/if}
          {#if step + 1 == totalSteps}
            <Button variant="outlined" on:click={handleSaveAndClose}>
              <Label>Save And Close</Label>
            </Button>
            <Button
              class="btn-submit"
              variant="outlined"
              on:click={handleSubmit}
            >
              <Label>Submit</Label>
            </Button>
          {/if}
        </div>
      </div>
    </div>

    <LinearProgress progress={(step + 1) / 10} />
  </Dialog>
  <Loading />
</div>

<style type="text/scss" global>
  @use '../../theme/colors';
  @use '../../theme/mixins';
  div.plan-your-trip-modal {
    @import '../../style/partial/form.scss';
    .plan-your-trip-h2 {
      margin-bottom: 20px;
      @include mixins.mobile {
        padding-top: 32px;
      }
    }
    .plan-your-trip-p {
      margin-bottom: 64px;
      @include mixins.mobile {
        margin-bottom: 32px;
      }
    }
    .plan-your-trip-modal-header {
      align-items: center;
      margin-bottom: 16px;
    }
    .mdc-dialog.mdc-dialog--fullscreen
      .mdc-dialog__surface
      .mdc-dialog__header {
      @media screen and (max-width: 599px) {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
        flex: 1 1 auto;
        padding: 0;
      }
    }
    .mdc-dialog__header .mdc-dialog__title {
      @media screen and (max-width: 599px) {
        display: flex;
        align-items: center;
        top: 5px;
        margin-left: 0 !important;
        padding-left: 24px;
      }
    }
    .mdc-dialog--fullscreen .mdc-dialog__close {
      display: flex;
      align-items: center;
    }
    .mdc-dialog {
      --mdc-dialog-z-index: 10;
      --mdc-checkbox-checked-color: #{colors.$black};
      .mdc-dialog__content {
        color: #{colors.$black};
      }
    }
    .mdc-dialog.mdc-dialog--fullscreen.always .mdc-dialog__surface {
      max-width: 100vw;
      width: 100vw;
      max-height: 100vh;
      height: 100%;
      border-radius: 0;
      padding-bottom: 40px;
      position: relative;
    }
    .mdc-dialog__content {
      justify-content: stretch;
    }

    .action-buttons {
      text-align: center;
      @include mixins.desktop {
        .mdc-button {
          margin-right: 20px;
        }
        .mdc-button:last-child {
          margin-right: 0;
        }
      }

      @include mixins.mobile {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 1em;
        grid-column-gap: 15px;

        .mdc-button {
          min-width: auto;
          padding: 0;
        }
      }
      @media (max-width: 399px) {
      }
    }
    .mdc-button.mdc-button--outlined:hover {
      background-color: #{colors.$black};
      --mdc-theme-primary: #{colors.$white};
    }
    .font-size-h6 {
      font-size: 16px;
    }
    .content-form {
      padding-top: 3em;
    }
  }
</style>
