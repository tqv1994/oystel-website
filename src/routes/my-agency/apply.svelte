<script lang="ts">
  import Button, { Label, Icon } from '@smui/button';
  import Textfield from '@smui/textfield';
  import { goto } from '$app/navigation';
  import Layout from '$lib/components/common/Layout.svelte';

  let model = {
    description: '',
  };

  async function onSubmit() {
    try {
      const res = await fetch('/api/agency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: model.description,
        }),
      });
      if (res.ok) {
        goto('/my-agency/apply');
        return;
      }
      console.error('Error post application', res);
    } catch (error) {
      console.error('Post application error', error);
    }
  }
</script>
<Layout>
<div class="content user-dashboard light">
  <section class="pt-40 pb-40 my-agency-dashboard light">
    <div class="container">
      <div class="section-header">
        <h1 class="mb-0">Join Oysteo</h1>
      </div>
      <div class="divider" />
      <div class="section-body">
        <p>Tell us a little about your company or yourself</p>
        <form on:submit|preventDefault={onSubmit}>
          <div>
            <Textfield
                    name="name"
                    style="width: 100%"
                    label="Description"
                    bind:value={model.description}
                    textarea
                    required
            />
          </div>
          <div>
            <Button variant="outlined" type="submit">
              <Label>Next</Label>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </section>
</div>
</Layout>
<style>
  /*section {*/
  /*  padding: 2em;*/
  /*}*/
  form {
    display: flex;
    flex-direction: column;
    width: 20em;
    border: 1px solid black;
    padding: 2em;
  }
  form > :global(*) {
    margin: 1em 0;
  }
  form > :global(.mdc-button) {
    align-self: center;
  }
  @media screen and (max-width: 768px) {
    form{
      width: auto;
      padding: 20px;
    }
  }
</style>
