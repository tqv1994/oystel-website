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
  import { Category } from '$lib/store/category';
  import { destinationTypeStore } from '$lib/store/destination-type';
  import { sortByName } from '$lib/utils/sort';
  import type { Load } from '@sveltejs/kit';
  import { authStore, User } from '$lib/store/auth';
  import { insertToStore } from '$lib/store/types';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { Locals } from '$lib/store/locals';
  import PlanTemplate from './PlanTemplate.svelte';
  import { goto } from '$app/navigation';
  import { UploadFile } from '$lib/store/upload-file';

  export const load: Load<{ session: Locals }> = async ({ session, url }) => {
      let me: User | undefined;
      me = session.user;
      console.log(me?.travellerMe);
      if (typeof me === 'undefined' || !me.travellerMe) {
        return {
          status: 302,
          redirect: '/',
        };
      }
      let metadataTrip: MetaDataTripQuery|undefined = undefined;
      const res = await fetch("/me/trip/metadata.json");
      if (res.ok) {
        metadataTrip = await res.json();
      }
    insertToStore(
      destinationTypeStore,
      session.metadata?.destinationTypes,
      false,
    );
    insertToStore(
      experienceTypeStore,
      session.metadata?.experienceTypes,
      false,
    );
    authStore.set({ user: session.user });
    return {
      props: {
        key: url.pathname,
        metadataTrip
      },
    };
  };

  let destinationTypes: Category[];
  destinationTypeStore.subscribe((store) => {
    destinationTypes = sortByName(Object.values(store.items));
  });
</script>

<script lang="ts">
  import { MetaDataTripQuery } from '../me/trip/metadata.json';
import { TripInput } from '$lib/store/trip';
import { createTripService } from '$lib/services/trip.service';
import Loading from '$lib/components/Loading.svelte';
  export let metadataTrip: MetaDataTripQuery;
  console.log(metadataTrip);
  let open: boolean = false;
  let progress: number = 0.1;
  let Carousel: any; // for saving Carousel component class
  let carousel: any; // for calling methods of the carousel instance
  let step: number = 0;
  let totalSteps: number = 10;
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
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module?.default;
  });


  const handleNextClick = () => {
    if (totalSteps > step + 1) {
      step += 1;
      carousel.goToNext();
    }
  };

  const handlePrevClick = () => {
    if (step > 0) {
      step -= 1;
      carousel.goToPrev();
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
    await createTripService({...tripInput, lead_traveller: $authStore.user?.travellerMe.id+""}).then(()=>{
      if(isSaveAndClose){
        open = false;
        tripInput = new TripInput();
      }else{
        goto('/plan/success');
      }
    });
    window.closeLoading();
  }
</script>
<div>
<PlanTemplate {image1} {image2} {image3}>
  <h1>Let’s start planning your holiday.</h1>
  <h6>
    To help our expert travel advisors tailor a holiday just for you, we need
    some information to get started.
  </h6>
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
  <Header>
    <Title><OysteoLogo width={130} height={17.217} /></Title>
    <IconButton action="close" class="material-icons">close</IconButton>
  </Header>
  <Content>
    <svelte:component
      this={Carousel}
      bind:this={carousel}
      infinite={false}
      dots={false}
      swiping={false}
      arrows={false}
      bind:initialPageIndex={step}
      on:pageChange={(event) => (progress = (event.detail + 1) / 10)}
    >
      <svelte:component this={When} bind:tripInput />
      <svelte:component this={Who} travelingWithYous={metadataTrip?.travelingWithYous || []} bind:tripInput />
      <svelte:component this={Budget} currencies={metadataTrip.currencies || []} bind:tripInput />
      <svelte:component this={Where}  bind:tripInput {destinationTypes} />
      <svelte:component this={Accommodations} bind:tripInput lodgingTypes={metadataTrip.lodgingTypes || []} roomPreferences={metadataTrip.roomPreferences || []} />
      <svelte:component this={RoomStyle} roomStyles={metadataTrip.roomStyles || []} bind:tripInput />
      <svelte:component this={TailorYourExperience} bind:tripInput  />
      <svelte:component this={Experiences} bind:tripInput  experiences={metadataTrip.experiences || []}/>
      <svelte:component this={YourTravel} bind:tripInput />
      <svelte:component this={Final} bind:tripInput />
    </svelte:component>
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
          <Button class="btn-submit" variant="outlined" on:click={handleSubmit}>
            <Label>Submit</Label>
          </Button>
        {/if}
      </div>
    </div>
  </div>

  <LinearProgress {progress} />
</Dialog>
<Loading/>
</div>
<style type="text/scss" global>
  @use '../../theme/colors';
  @use '../../theme/mixins';
  div {
    @import '../../style/partial/form.scss';
    .mdc-dialog {
      --mdc-checkbox-checked-color: #{colors.$black};
      .mdc-dialog__content{
        color: #{colors.$black};
      }
    }
    .mdc-dialog.mdc-dialog--fullscreen.always .mdc-dialog__surface {
      max-width: 100vw;
      width: 100vw;
      max-height: 100vh;
      height: 100vh;
      border-radius: 0;
      padding-bottom: 40px;
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
      }
      @media (max-width: 399px) {
        grid-template-columns: 1fr;
      }
    }
  }
</style>
