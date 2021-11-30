<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';

  let selected: string[] = [];
</script>

<Step
  title="What you would like to experience?"
  subtitle="Check all that apply."
  class="experiences-step-content"
>
  <div class="row mt-30">
    <div class="d-col-3 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Relax</h3>
      <div class="options">
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Fitness'} />
          <span slot="label">Fitness</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Spa'} />
          <span slot="label">Spa</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Wellness/Medical Retreat'} />
          <span slot="label">Wellness/Medical Retreat</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Yoga'} />
          <span slot="label">Yoga</span>
        </FormField>
      </div>
    </div>
    <div class="d-col-3 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Celebrate</h3>
      <div class="options">
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Anniversary'} />
          <span slot="label">Anniversary</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Birthday'} />
          <span slot="label">Birthday</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Engagement'} />
          <span slot="label">Engagement</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Honeymoon'} />
          <span slot="label">Honeymoon</span>
        </FormField>
      </div>
    </div>
    <div class="d-col-3 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Discover</h3>
      <div class="options">
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Art & Culture'} />
          <span slot="label">Art & Culture</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Fashion'} />
          <span slot="label">Fashion</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Food/Wine'} />
          <span slot="label">Food/Wine</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Local Experiences'} />
          <span slot="label">Local Experiences</span>
        </FormField>
        <FormField class="d-mb-15">
          <Checkbox bind:group={selected} value={'Safari'} />
          <span slot="label">Safari</span>
        </FormField>
      </div>
  </div>
  <div class="d-col-3 m-col-12">
    <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Activity</h3>
    <div class="options">
      <FormField class="d-mb-15">
        <Checkbox bind:group={selected} value={'Golf'} />
        <span slot="label">Golf</span>
      </FormField>
      <FormField class="d-mb-15">
        <Checkbox bind:group={selected} value={'Hiking'} />
        <span slot="label">Hiking</span>
      </FormField>
      <FormField class="d-mb-15">
        <Checkbox bind:group={selected} value={'Tennis'} />
        <span slot="label">Tennis</span>
      </FormField>
      <FormField class="d-mb-15">
        <Checkbox bind:group={selected} value={'Water Sports'} />
        <span slot="label">Water Sports</span>
      </FormField>
      <FormField class="d-mb-15">
        <Checkbox bind:group={selected} value={'Winter Sports'} />
        <span slot="label">Winter Sports</span>
      </FormField>
    </div>
</div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  * {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile{
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  :global(.root.experiences-step-content){
    :global(.content) {
      max-width: 75em;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field){
      text-align: left;
    }
    :global(.mdc-checkbox){
      margin-right: calc(20px - 7.5px);
      margin-left: -7.5px;
    }
  }
  *{
    --mdc-typography-headline1-font-size: 30px;
  }
</style>
