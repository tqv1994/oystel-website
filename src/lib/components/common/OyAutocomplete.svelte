<script lang="ts">
  import Autocomplete from '@smui-extra/autocomplete/src/Autocomplete.svelte';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import { onMount, createEventDispatcher } from 'svelte';
  export let options: any[];
  export let key: string | undefined = undefined;
  export let value: number | string | undefined = undefined;
  export let getOptionLabel: (option: any) => string = (option: any) =>
    option == null ? '' : `${option}`;
  export let valueInput: any = undefined;
  export let label: string | undefined;
  export let variant: "standard" | "filled" | "outlined" | undefined = undefined
  let text = '';
  const dispatch = createEventDispatcher();
  onMount(() => {
    console.log(typeof value, value);
    setTimeout(()=>{
      if(options.length){
        valueInput = options.find((item) => (key ? item[key] : item) == value);
      }
    },1000);
  });

  const onRemoveValue = () => {
    value = undefined;
    valueInput = undefined;
    text = '';
  };
</script>

<div>
  <Autocomplete
    bind:options
    bind:getOptionLabel
    bind:value={valueInput}
    label={label}
    on:SMUIAutocomplete:selected={(option) => {
        if(option.detail){
        value = key ? option.detail[key] : option.detail;
        dispatch('SMUIAutocomplete:change', {value: option.detail});
        }
    }}
    bind:text
  >
    <Textfield bind:variant bind:value={text} bind:label>
      <a href="javascript:void(0)" on:click={onRemoveValue} slot="trailingIcon">
        {#if value}
          <Icon class="material-icons">close</Icon>
        {/if}
      </a>
    </Textfield>
  </Autocomplete>
</div>

<style lang="scss">
  div {
    :global(.smui-text-field--standard .mdc-text-field__icon--trailing) {
      --mdc-icon-size: 16px;
      font-size: var(--mdc-icon-size);
    }
    :global(.mdc-text-field .material-icons){
        padding:0;
    }
    :global(.mdc-text-field a){
        line-height:0;
        position: relative;
        top: 6px;
    }
  }
</style>
