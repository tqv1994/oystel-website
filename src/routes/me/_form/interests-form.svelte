<script lang="ts">
  import Field from '../components/Field.svelte';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { createEventDispatcher } from 'svelte';
  import { Interest, InterestType } from '$lib/store/interest';

  export let data: InterestType[];
  export let me: User;
  export let dataSelected: string[];
  const dispatcher = createEventDispatcher();
  export let is_edit: boolean = true;

  const handleSubmit = () => {
    dispatcher('submit');
  };
</script>

<form>
  <FormToggle bind:is_edit title="My Interest">
    {#each data as type}
      <Field label={type.name} column_1={3} column_2={9} class="mb-10">
        <div class="options options-1">
          {#each type.interests as interest}
            <FormField>
              <Checkbox bind:group={dataSelected} value={interest.id} />
              <span slot="label">{interest.name}</span>
            </FormField>
          {/each}
        </div>
      </Field>
    {/each}
    <div class="action">
      <Button variant="unelevated" type="button" on:click={handleSubmit}
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
    @include mixins.mobile{
      grid-template-columns: 1fr 1fr;
    }
    grid-template-rows: 1fr;
  }
  .options-2 {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
</style>
