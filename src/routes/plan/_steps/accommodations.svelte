<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
import { RoomPreference } from '$lib/store/roomPreference';
import { LodgingType } from '$lib/store/lodgingType';
import { TripInput } from '$lib/store/trip';

  let selected: string[] = [];
  let preferred: string = '';
  let otherVal: string = '';
  export let roomPreferences: RoomPreference[];
  export let lodgingTypes: LodgingType[];
  export let tripInput: TripInput = new TripInput();
  
  console.log('data',lodgingTypes);
  tripInput.lodgingTypeOther = tripInput.lodgingTypeOther || '';
  tripInput.lodgingTypes = tripInput.lodgingTypes || [];
  tripInput.roomPreferences = tripInput.roomPreferences || [];
</script>

<Step title="Your accommodation" subtitle="Check as many as you wish.">
  <div class="row">
    <div class="d-col-4 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Lodging</h3>
      <div class="options options-1">
        {#each lodgingTypes || [] as lodgingType}
        <FormField>
          <Checkbox bind:group={tripInput.lodgingTypes} value={lodgingType.id} />
          <span slot="label">{lodgingType.name}</span>
        </FormField>
        {/each}
        <FormField>
          <Checkbox checked={tripInput.lodgingTypeOther ? true : false} value={'Other'} />
          <span slot="label"
            ><Textfield
              bind:value={tripInput.lodgingTypeOther}
              label="Other Lodging Type.."
              type="text"
            /></span
          >
        </FormField>
      </div>
    </div>
    <div class="d-col-8 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">Room Preferences</h3>
      <div class="options-2 options">
        {#each roomPreferences || [] as roomPreference}
        <FormField>
          <Checkbox bind:group={tripInput.roomPreferences} value={roomPreference.id} />
          <span slot="label">{roomPreference.name}</span>
        </FormField>
        {/each}
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
  label{
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
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
