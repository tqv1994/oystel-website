<script lang="ts">
  import Select from 'svelte-select';
  import { onMount, createEventDispatcher } from 'svelte';
  import OySelectMultiSelection from './OySelectMultiSelection.svelte';
  import OySelectList from './OySelectList.svelte';
  import type { Kind } from '$lib/store/category';

  export let items: Kind[];
  export let value: string | string[] | undefined | null;
  export let placeholder = '';
  export let isMulti = false;
  export let variant: 'standard' | undefined = undefined;
  export let multiShowAll = false;
  let classNames = '';
  export { classNames as class };
  let selected: Kind | Kind[] | undefined;
  const dispatch = createEventDispatcher();

  onMount(() => {
    if (isMulti && value) {
      if (!Array.isArray(value)) {
        value = [value];
      }
      selected = (value || []).reduce((acc: any[], id: string) => {
        const exist = items.find((item) => item.id === (id || '').toString());
        if (exist) {
          acc.push(exist);
        }
        return acc;
      }, []);
      if (!selected || selected.length == 0) {
        selected = undefined;
      }
    } else {
      const exist = items.find((item) => item.id === (value || '').toString());
      if (exist) {
        selected = exist;
      } else {
        selected = undefined;
      }
    }
  });

  const handleSelect = (event: CustomEvent) => {
    dispatch('select', { value: event.detail });
  };
  const handleClear = (event: CustomEvent) => {
    if (isMulti && selected) {
      let value: Kind | Kind[];
      if (Array.isArray(selected)) {
        value = selected.filter((item: Kind) => item.id !== event.detail?.id);
      } else {
        value = selected;
      }
      dispatch('clear', {
        value,
      });
    } else {
      dispatch('clear', { value: undefined });
    }
  };
</script>

<div
  class="oy-select{variant ? ` oy-select--${variant}` : ''} {classNames}"
  class:empty={!value || !value.length}
>
  <Select
    {items}
    optionIdentifier="id"
    labelIdentifier="name"
    {isMulti}
    {placeholder}
    value={selected}
    on:select={handleSelect}
    on:clear={handleClear}
    list={OySelectList}
    MultiSelection={OySelectMultiSelection}
    containerClasses={!multiShowAll ? 'multiple-limited' : ''}
  />
</div>

<style lang="scss">
  .oy-select {
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
    --listBorderRadius: 0;
    --itemFirstBorderRadius: 0;
    position: relative;
    :global(.multiSelectItem_label) {
      font-size: var(--inputFontSize);
    }
    :global(.multiSelect) {
      height: var(--height);
    }
    :global(.multiSelect input) {
      height: calc(var(--height) - 2px);
    }
    :global(.selectedItem),
    :global(.listItem .item) {
      font-size: var(--mdc-typography-subtitle1-font-size);
    }
    &.oy-select--standard {
      :global(.selectContainer) {
        border-top: 0;
        border-right: 0;
        border-left: 0;
        border-bottom: var(--border);
      }
      &.empty {
        // :global(.selectContainer::after) {
        //   content: '';
        //   display: block;
        //   position: absolute;
        //   right: 0.7rem;
        //   background-image: url("data:image/svg+xml,<svg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'><path d='M1,1,5,5,1,9' transform='translate(10 0) rotate(90)' fill='none' stroke='black' stroke-linecap='round' stroke-width='1.2' /></svg>");
        //   background-size: 14px 14px;
        //   width: 14px;
        //   height: 14px;
        // }
      }
    }

    .iconDropDown {
      position: absolute;
      right: var(--clearSelectRight, 10px);
      top: var(--clearSelectTop, 11px);
      bottom: var(--clearSelectBottom, 11px);
      width: var(--clearSelectWidth, 20px);
      color: var(--clearSelectColor, #c5cacf);
      flex: none !important;
    }
    .iconDropDown:hover {
      color: var(--clearSelectHoverColor, #2c3e50);
    }
  }
</style>
