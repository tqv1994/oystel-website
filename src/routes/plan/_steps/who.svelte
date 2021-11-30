<script lang="ts">
  import Textfield from '@smui/textfield';
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';

  const options = [
    'Solo',
    'A friend',
    'Adult couple(s)',
    'Family with young children (under 12 yrs)',
    'Family with teenage children',
    'Multi generational adults',
    'Large group of adults',
  ];
  let selected: string[] = [];
  let numOfAdults: number = 1;
  let numOfChildren: number = 0;
</script>

<Step title="Who will be be traveling with you?" subtitle="Check as many as you wish">
  <div class="options">
    {#each options as option}
      <FormField>
        <Checkbox bind:group={selected} value={option} />
        <span slot="label">{option}</span>
      </FormField>
    {/each}
  </div>
  <div class="inputs">
    <h3>Guests</h3>
    <Textfield
      class="num-adults"
      bind:value={numOfAdults}
      min={1}
      label="Number of adults"
      type="number"
    />
    <Textfield
      class="num-children"
      bind:value={numOfChildren}
      label="Number of children"
      type="number"
    />
  </div>
</Step>

<style lang="scss">
  @use '../../../theme/mixins';
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include mixins.mobile{
      grid-template-columns: 1fr;
    }
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 0;
    :global(.mdc-form-field){
      margin-bottom: 17px;
      text-align: left;
    }
  }
  .inputs {
    display: flex;
    justify-content: space-between;
    align-self: flex-start;
    margin-top: 2em;
  }
  * :global(.num-adults) {
    margin: 0 2em;
  }
</style>
