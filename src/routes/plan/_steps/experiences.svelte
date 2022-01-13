<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import { Experience } from '$lib/store/experience';
  import { TripInput } from '$lib/store/trip';
  export let experiences: Experience[] = [];
  export let tripInput: TripInput = new TripInput();
  let selected: string[] = [];
  tripInput.experiences = tripInput.experiences || []; 
  type ExperiencesByType = {
    type: string;
    experiences: Experience[];
  }
  const experiencesByTypes: ExperiencesByType[] = experiences.reduce((acc: ExperiencesByType[],item)=>{
    const index = acc.findIndex((itemType)=>itemType.type === item.type1.name);
    if(index >= 0){
      acc[index].experiences.push(item);
    }else{
      if(item.type1){
        acc.push({type: item.type1.name, experiences: [item]});
      }
    }
    return acc;
  },[]);
</script>

<Step
  title="What you would like to experience?"
  subtitle="Check all that apply."
  class="experiences-step-content"
>
  <div class="row mt-30">
    {#each experiencesByTypes as experiencesByType}
    <div class="d-col-3 m-col-12">
      <h3 class="mdc-typography--headline1 text-left mt-0 m-mb-15">{experiencesByType.type}</h3>
      <div class="options">
        {#each experiencesByType.experiences as item}
        <FormField class="d-mb-15">
          <Checkbox bind:group={tripInput.experiences} value={item.id} />
          <span slot="label">{item.name}</span>
        </FormField>
        {/each}
      </div>
    </div>
    {/each}
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
    :global(.content.content) {
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
