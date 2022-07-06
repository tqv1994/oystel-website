<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../components/Field.svelte';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { createEventDispatcher } from 'svelte';
  import { type TravelPreference } from '$lib/store/preference';
  import type { Kind } from '$lib/store/category';

  export let is_edit = true;
  export let data: Kind[];
  export let selected: string[];
  export let title: string;
  export let otherPreference: TravelPreference;
  const dispatcher = createEventDispatcher();

  const onSubmit = () => {
    dispatcher('submit');
  };
</script>

<form>
  <FormToggle bind:is_edit {title}>
    {#each data as type}
      <Field label={type.name} column_1={3} column_2={9} class="mb-10">
        <div
          class="options options-{type.name == 'Hotel Amenities' ? '2' : '1'}"
        >
          {#each type.preferences || [] as preference}
            {#if type.name == 'Hotel Amenities' && preference.name == 'Other'}
              <FormField>
                <Checkbox bind:group={selected} value={preference.id} />
                <span>{preference.name}</span>
                <Textfield
                  label=""
                  bind:value={otherPreference.other}
                  type="text"
                />
              </FormField>
            {:else}
              <FormField>
                <Checkbox bind:group={selected} value={preference.id} />
                <span slot="label">{preference.name}</span>
              </FormField>
            {/if}
          {/each}
        </div>
      </Field>
    {/each}
    <div class="action">
      <Button variant="unelevated" type="button" on:click={onSubmit}
        >Save Changes</Button
      >
    </div>
  </FormToggle>
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  @use '../../../theme/sizes';
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
  form {
    :global(.mdc-layout-grid__inner) {
      align-items: flex-start;
    }
    :global(.form) {
      :global(.mdc-text-field) {
        width: auto;
      }
    }
    .action {
      text-align: right;
      @include mixins.mobile {
        text-align: center;
      }
    }
    @media (max-width: #{sizes.$desktop-width - 1px}) AND (min-width: 600px) {
      :global(.mdc-layout-grid__cell--span-4-tablet) {
        grid-column-end: span 8;
      }
    }
    @media (max-width: 599px) {
      :global(.mdc-layout-grid__cell--span-2-phone) {
        grid-column-end: span 4;
      }
    }
  }
  .options-1 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    @include mixins.mobile {
      grid-template-columns: 1fr 1fr;
    }
  }
  .options-2 {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
</style>
