<script lang="ts" context="module">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import IconButton from '@smui/icon-button';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
  import Dialog from '@smui/dialog';
  import LinearProgress from '@smui/linear-progress';
  import { Content, Header, Title } from '@smui/dialog';
  import { onMount } from 'svelte';
  import type Carousel from 'svelte-carousel';
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
  import { authStore } from '$lib/store/auth';
  import { insertToStore } from '$lib/store/types';
  import { experienceTypeStore } from '$lib/store/experience-type';
  import { Locals } from '$lib/store/locals';
  import PlanTemplate from './PlanTemplate.svelte';
  import { goto } from '$app/navigation';
  import { UploadFile } from '$lib/store/upload-file';

  export const load: Load<{ session: Locals }> = async ({ session, page }) => {
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
        key: page.path,
      },
    };
  };

  let destinationTypes: Category[];
  destinationTypeStore.subscribe((store) => {
    destinationTypes = sortByName(Object.values(store.items));
  });
</script>

<script lang="ts">
  let open: boolean = false;
  let progress: number = 0.1;
  let Carousel: Carousel; // for saving Carousel component class
  let carousel: Carousel; // for calling methods of the carousel instance
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
  onMount(async () => {
    const module = await import('svelte-carousel');
    Carousel = module.default;
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
    open = false;
  };

  const handleSubmit = () => {
    goto('/plan/success');
  };
</script>

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
      initialPageIndex={step}
      on:pageChange={(event) => (progress = (event.detail + 1) / 10)}
    >
      <svelte:component this={When} />
      <svelte:component this={Who} />
      <svelte:component this={Budget} />
      <svelte:component this={Where} {destinationTypes} />
      <svelte:component this={Accommodations} />
      <svelte:component this={RoomStyle} />
      <svelte:component this={TailorYourExperience} />
      <svelte:component this={Experiences} />
      <svelte:component this={YourTravel} />
      <svelte:component this={Final} />
    </svelte:component>
  </Content>
  <div class="content-wrap mb-30">
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

<style type="text/scss">
  @use '../../theme/colors';
  @use '../../theme/mixins';
  * :global(.mdc-dialog) {
    --mdc-checkbox-checked-color: #{colors.$black};
  }
  :global(.mdc-dialog.mdc-dialog--fullscreen.always .mdc-dialog__surface) {
    max-width: 100vw;
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
    padding-bottom: 40px;
  }
  * :global(.mdc-dialog__content) {
    justify-content: stretch;
  }

  .action-buttons {
    text-align: center;
    @include mixins.desktop {
      :global(.mdc-button) {
        margin-right: 20px;
      }
      :global(.mdc-button:last-child) {
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
</style>
