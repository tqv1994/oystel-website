<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import type { Experience } from '$lib/store/experience';
  import { TripInput } from '$lib/store/trip';
  import type { Kind } from '$lib/store/category';

  export let experiences: Experience[] = [];
  export let experienceTypes: Kind[] = [];
  export let tripInput: TripInput = new TripInput();
  let selected: string[] = [];
  tripInput.experienceTypes = tripInput.experienceTypes || [];
  $: if (experienceTypes && experienceTypes.length > 0) {
    let typeOther: Kind;
    experienceTypes = experienceTypes.reduce((acc: Kind[], item, index) => {
      if (
        item.name.toLowerCase() === 'other' &&
        index + 1 < experienceTypes.length
      ) {
        typeOther = item;
      } else {
        acc.push(item);
      }
      if (index + 1 === experienceTypes.length && typeOther) {
        acc.push(typeOther);
      }
      return acc;
    }, []);
  }
</script>

<Step
  title="What you would like to experience?"
  subtitle="Check all that apply."
  class="experiences-step-content"
>
  <div class="row mt-30">
    {#each experienceTypes as experienceType}
      <div class="d-col-4 m-col-12 options">
        <FormField class="d-mb-15">
          <Checkbox bind:group={tripInput.experienceTypes} value={experienceType.id} />
          <span slot="label">{experienceType.name}</span>
        </FormField>
      </div>
    {/each}
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  * {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  label {
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
    @include mixins.mobile {
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  :global(.root.experiences-step-content) {
    :global(.content.content) {
      max-width: 55em;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field) {
      text-align: left;
    }
    :global(.mdc-checkbox) {
      margin-right: calc(20px - 7.5px);
      margin-left: -7.5px;
    }
  }
  * {
    --mdc-typography-headline1-font-size: 30px;
  }
</style>
