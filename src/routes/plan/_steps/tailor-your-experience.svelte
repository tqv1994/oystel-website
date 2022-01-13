<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import { TripInput } from '$lib/store/trip';
  let note: string = '';
  export let tripInput: TripInput = new TripInput();
  tripInput.description = tripInput.description || '';
</script>

<Step
  title="To help us tailor your experience, is there anything else we should know?"
  subtitle=""
>
  <div class="form-control m-none">
    <Textfield
      textarea
      bind:value={tripInput.description}
      label="Free text entry.. For example, I like a beach holiday, but I sunburn easily, so please get me a covered sunbed"
    />
  </div>
  <div class="form-control m-block d-none">
    <Textfield
      textarea
      bind:value={tripInput.description}
      label="Free text entry..."
    />
  </div>
</Step>

<style lang="scss">
  .form-control{
      :global(.mdc-text-field){
          padding: 15px;
          min-height: 254px;
          width: 100%;
      }
  }
</style>
