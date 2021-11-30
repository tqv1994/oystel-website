<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';

  let selected: string[] = [];
  let preferred: string = '';
  let otherVal: string = '';
</script>

<Step title="Your accommodations" subtitle="Check as many as you wish.">
  <div class="row">
    <div class="d-col-4 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Lodging</h3>
      <div class="options options-1">
        <FormField>
          <Checkbox bind:group={selected} value={'Hotel'} />
          <span slot="label">Hotel</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Lodge'} />
          <span slot="label">Lodge</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Chalet / Villa'} />
          <span slot="label">Chalet / Villa</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Other'} />
          <span slot="label"
            ><Textfield
              bind:value={otherVal}
              label="Other Lodging Type.."
              type="string"
            /></span
          >
        </FormField>
      </div>
    </div>
    <div class="d-col-8 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Room Preferences</h3>
      <div class="options-2 options">
        <FormField>
          <Checkbox bind:group={selected} value={'Room with a view'} />
          <span slot="label">Room with a view</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Suite – open plan'} />
          <span slot="label">Suite – open plan</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Room with balcony'} />
          <span slot="label">Room with balcony</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Suite – living area'} />
          <span slot="label">Suite – living area</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Connecting rooms'} />
          <span slot="label">Connecting rooms</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Two+ bedroom suite'} />
          <span slot="label">Two+ bedroom suite</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Kitchenette'} />
          <span slot="label">Kitchenette</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={selected} value={'Outdoor space'} />
          <span slot="label">Outdoor space</span>
        </FormField>
      </div>
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
  .options {
    display: grid;
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field) {
      margin-bottom: 17px;
      @include mixins.mobile {
        margin-bottom: 2px;
      }
    }
  }
  .options-1 {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .options-2 {
    grid-template-columns: 1fr 1fr;
    @include mixins.mobile {
      grid-template-columns: 1fr;
    }
  }
  :global(.preferred) {
    margin-top: 2em;
  }
</style>
