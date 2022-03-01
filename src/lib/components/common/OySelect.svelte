<script lang="ts">
  import Select from 'svelte-select';
  import { onMount, createEventDispatcher } from 'svelte';
import OySelectMultiSelection from './OySelectMultiSelection.svelte';
import OySelectList from './OySelectList.svelte';
  export let items: any[];
  export let value: string | string[];
  export let optionIdentifier: string;
  export let labelIdentifier: string;
  export let placeholder: string = '';
  export let isMulti: boolean = false;
  let valueSelect: any | any[];
  const dispatch = createEventDispatcher();
  onMount(()=>{
      if(isMulti){
          if(!Array.isArray(value)){
              value = [value];
          }
          valueSelect = (value || []).reduce((acc: any[], id: string)=>{
            const exist = items.find(item=>item.id == id.toString());
            if(exist){
                acc.push(exist);
            }
            return acc;
          },[]);
          if(!valueSelect || valueSelect.length == 0){
            valueSelect = undefined;
          }
      }else{
        const exist = items.find(item=>item.id === value.toString());
        if(exist){
            valueSelect = exist;
        }else{
            valueSelect = undefined;
        }
      }
  })
  const handleSelect = (event: CustomEvent) => {
    dispatch('select', { value: event.detail });
  };
  const handleClear = (event: CustomEvent) => {
      if(isMulti){
        dispatch('clear', { value: valueSelect.filter((item)=>item[optionIdentifier] !== event.detail?.id) }); 
      }else{
        dispatch('clear', { value: undefined}); 
      }
  }
</script>
<div class="oy-select">
<Select
  {items}
  {optionIdentifier}
  {labelIdentifier}
  {isMulti}
  {placeholder}
  value={valueSelect}
  on:select={handleSelect}
  on:clear={handleClear}
  List={OySelectList}
  MultiSelection={OySelectMultiSelection}
  

/>
</div>
<style lang="scss">
    .oy-select{
        --borderRadius: 0;
        --border: 1px solid #000;
        --borderHoverColor: #000;
        --height: 35px;
        --multiItemHeight: 25px;
        --inputFontSize: var(--mdc-typography-subtitle1-font-size);
        --clearSelectTop: 7px;
        --indicatorTop: 7px;
        --multiClearTop: 4px;
        --multiItemActiveBG: #dedede;
        --itemIsActiveBG: #dedede;
        --itemHoverBG: #dedede;
        --itemIsActiveColor: #000;
        --multiItemActiveColor: #000;
        --background: transparent;
        :global(.multiSelectItem_label){
            font-size: var(--inputFontSize);
        }
        :global(.multiSelect){
            height:  var(--height);
        }
        :global(.selectedItem), :global(.listItem .item){
          font-size: var(--mdc-typography-subtitle1-font-size);
        }
    }
</style>
