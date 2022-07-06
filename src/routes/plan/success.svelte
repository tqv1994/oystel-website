<script lang="ts" context="module">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import type { Load } from '@sveltejs/kit';
  import PlanTemplate from './PlanTemplate.svelte';
  import type { UploadFile } from '$lib/store/upload-file';

  export const load: Load = async ({ session, url }) => {
    return {};
  };
</script>

<script lang="ts">
  let image1: UploadFile = {
    id: '',
    url: '/img/plan/plan-3.jpg',
    created_at: '',
    published_at: '',
  };
  let image2: UploadFile = {
    id: '',
    url: '/img/plan/plan-4.jpg',
    created_at: '',
    published_at: '',
  };
  let image3: UploadFile = {
    id: '',
    url: '/img/plan/plan-5.jpg',
    created_at: '',
    published_at: '',
  };
</script>

<PlanTemplate {image1} {image2} {image3}>
  <h1>The adventure begins..</h1>
  <p class="m-0 mb-55">
    Thank you for submitting your trip assessment. Your Oysteo Advisor will be
    in touch within 48 hours.
  </p>
  <Button
    class="btn-plan-your-trip mr-10 mb-20"
    type="button"
    variant="outlined"
    style="width: 100%"
    href="/me"
  >
    <Label class="text-button2">Go to My Account</Label>
  </Button>
  <Button
    class="btn-plan-your-trip mr-10"
    type="button"
    variant="outlined"
    style="width: 100%"
    href="/"
  >
    <Label class="text-button2">Go to Homepage</Label>
  </Button>
</PlanTemplate>

<style type="text/scss">
</style>
