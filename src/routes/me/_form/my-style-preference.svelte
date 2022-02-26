<script lang="ts">
  import Field from '../components/Field.svelte';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button';
  import FormToggle from '../components/FormToggle.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { createEventDispatcher } from 'svelte';
import { TravelPreference } from '$lib/store/preference';
  export let data;
  export let selected: string[];
  export let is_edit: boolean = true;
  const dispatcher = createEventDispatcher();
  const onSubmit = () => {
    dispatcher('submit');
  };
  const checkLimitOfField = (index: number, value: string) => {
    setTimeout(()=>{
      if(data[index]){
        let beforeSelected = selected;
        let selectedCurrent: string[] = beforeSelected.reduce((acc: string[] , item: string)=>{
          const exist = data[index].preferences.find((preference: string) => preference === item);
          if(exist){
            acc.push(exist);
          }
          return acc;
        },[]);
        // if(selectedCurrent.length === 5){
        //     selected.splice(selectedCurrent.length, 1);
        //   }
        console.log('selectedCurrent',selectedCurrent);
        if(index !== 1){
          if(selectedCurrent.length > 5){
            const idx = beforeSelected.indexOf(value);
            if(index > -1){
              beforeSelected.splice(idx, 1);
              selected = beforeSelected;
            }
            window.pushToast('You can only choose up to 5 options');
          }
        }else{
          if(selectedCurrent.length > 1){
            const idx = beforeSelected.indexOf(selectedCurrent[selectedCurrent.length - 2]);
            if(index > -1){
              beforeSelected.splice(idx, 1);
              selected = beforeSelected;
            }
          }
        }
      }
    },0);
  }
</script>

<form>
  <FormToggle bind:is_edit title="Style Preferences">
    {#each data as type, index}
      <Field label={type.name} column_1={3} column_2={9} class="mb-10">
        <div class="options options-1">
          {#each type.preferences as option}
            <FormField>
              <Checkbox bind:group={selected} value={option} on:click={(e)=>checkLimitOfField(index, option)}/>
              <span slot="label">{option}</span>
            </FormField>
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
  }
  .options-2 {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
  }
</style>
