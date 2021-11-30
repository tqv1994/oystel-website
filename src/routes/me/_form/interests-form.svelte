<script lang="ts">
  import Field from '../Field.svelte';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button/Button.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import FormField from '@smui/form-field/FormField.svelte';
  import Checkbox from '@smui/checkbox/Checkbox.svelte';
  let leisureSelected: string[] = [];
  let placeSelected: string[] = [];
  let activiteSelected: string[] = [];
  let cultureSelected: string[] = [];
  let pasionsSelected: string[] = [];
  let leisure = {
    title: 'Leisure',
    options: [
      'Alone Time',
      'Crafts',
      'Photography',
      'Being With Friends',
      'Family Time',
      'Reading',
      'Collecting',
      'Meditation',
      'Shopping',
      'Concerts',
      'Movies / TV',
      'Working Out',
      'Cooking',
      'Painting / Drawing',
      'I Don’t Do Leisure!',
    ],
  };
  let places = {
    title: 'Places',
    options: [
      'Away From It All',
      'Gardens',
      'Open Countryside',
      'Boutique',
      'Modern',
      'Resort',
      'Cities',
      'Mountains',
      'Sea',
      'City Centre',
    ],
  };
  let activites = {
    title: 'Activites',
    options: [
      'Cycling',
      'Running',
      'Swimming',
      'Dancing',
      'Sailing',
      'Tennis',
      'Eating Out',
      'Skiing',
      'Walking',
      'Golf',
      'Snowboarding',
      'Yoga',
      'Riding',
    ],
  };
  let culture = {
    title: 'Culture',
    options: [
      'Archaeology Sites',
      'Contemporary Art',
      'Live Music',
      'Architecture',
      'Languages',
      'Theatre',
    ],
  };

  let pasions = {
    title: 'Pasions',
    options: [
      'Animals',
      'Knowledge',
      'Volunteering',
      'Climate action',
      'Work',
      'Food',
      'Social Justice',
    ],
  };
  export let me: User;
  export let is_edit: boolean = true;
  function handleCancelClick() {
    is_edit = false;
  }
</script>

<form>
  <svelte:component this={FormToggle} bind:is_edit title="Travel">
    <svelte:component
      this={Field}
      label={leisure.title}
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        {#each leisure.options as option}
          <FormField>
            <Checkbox bind:group={leisureSelected} value={option} />
            <span slot="label">{option}</span>
          </FormField>
        {/each}
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label={places.title}
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        {#each places.options as option}
          <FormField>
            <Checkbox bind:group={placeSelected} value={option} />
            <span slot="label">{option}</span>
          </FormField>
        {/each}
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label={activites.title}
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        {#each activites.options as option}
          <FormField>
            <Checkbox bind:group={activiteSelected} value={option} />
            <span slot="label">{option}</span>
          </FormField>
        {/each}
      </div>
    </svelte:component>

    <svelte:component
      this={Field}
      label={culture.title}
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        {#each culture.options as option}
          <FormField>
            <Checkbox bind:group={cultureSelected} value={option} />
            <span slot="label">{option}</span>
          </FormField>
        {/each}
      </div>
    </svelte:component>

    <svelte:component
      this={Field}
      label={pasions.title}
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        {#each pasions.options as option}
          <FormField>
            <Checkbox bind:group={pasionsSelected} value={option} />
            <span slot="label">{option}</span>
          </FormField>
        {/each}
      </div>
    </svelte:component>

    <div class="action">
      <Button variant="unelevated" type="submit">Save Changes</Button>
    </div>
  </svelte:component>
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
  }
  .options-2 {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
</style>
