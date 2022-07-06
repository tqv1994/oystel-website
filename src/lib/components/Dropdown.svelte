<script lang="ts" context="module">
  import Select from '@smui/select';
  import { Option } from '@smui/select';
  import type { Nameable } from '$lib/store/types';

  export type DropdownValue<T extends Nameable> = {
    index: number;
    value: T;
  };

  export type DropdownMultiValues<T extends Nameable> = {
    value: T[] | null;
  };
</script>

<script lang="ts">
  import OyAutocomplete from './common/OyAutocomplete.svelte';

  export let label: string;
  export let items: Nameable[];
  export let value: Nameable | undefined;
  export let blankItem = '';
  export let variant: 'outlined' | 'filled' | 'standard' | undefined =
    'outlined';

  function getKey(item: Nameable): string {
    return item?.name || '-';
  }
</script>

<Select key={getKey} {variant} on:MDCSelect:change bind:value {label}>
  {#if blankItem}
    <Option>{blankItem}</Option>
  {/if}
  {#each items as item}
    <Option value={item}>{item.name}</Option>
  {/each}
</Select>
