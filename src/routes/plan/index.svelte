<script lang="ts" context="module">
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import BlurImage from '$lib/components/blur-image.svelte';
  import OysteoLogo from '$lib/components/OysteoLogo.svelte';
</script>

<div class="root">
  <div class="img1">
    <BlurImage url="/img/plan/plan-1.png" />
  </div>
  <div class="img2">
    <BlurImage url="/img/plan/plan-2.png" />
  </div>
  <div class="img3">
    <BlurImage url="/img/plan/couple_holiday.png" />
  </div>
  <div class="main">
    <OysteoLogo dark />
    <div class="content">
      <div>
        <h1>Let’s start planning your holiday.</h1>
        <h6>
          To help our expert travel advisors tailor a holiday just for you, we
          need some information to get started.
        </h6>
        <Button
          class="btn-plan-your-trip mr-10"
          type="button"
          variant="outlined"
          style="width: 100%"
          on:click={() => {}}
        >
          <Label>Let’s Get Started</Label>
        </Button>
      </div>
    </div>
  </div>
  <IconButton class="btn-close material-icons" href="/">close</IconButton>
</div>

<style type="text/scss">
  * :global(.btn-close) {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  @media not screen {
    * :global(.btn-close) {
      display: none;
    }
  }

  .root {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    min-height: 100vh;
    max-height: 100vh;
    position: relative;
  }

  .img1 {
    grid-area: 1 / 1 / 2 / 2;
  }
  .img2 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .img3 {
    grid-area: 2 / 1 / 3 / 3;
  }
  .main {
    grid-area: 1 / 3 / 3 / 4;
    align-self: center;
    padding: 2em 3em;
  }

  @media (min-width: 768px) {
    .content {
      max-width: 28em;
    }
  }
  @media (max-width: 768px) {
    .root {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    .img1 {
      grid-area: 2 / 1;
    }
    .img2 {
      grid-area: 2 / 2;
    }
    .img3 {
      grid-column: 1 / 3;
      grid-row: 3;
    }
    .main {
      grid-column: 1 / 3;
      grid-row: 1;
    }
  }
</style>
