<script lang="ts" context="module">
  import Select, { Option } from '@smui/select';
  import { Nameable } from '$lib/store/types';

  export type DropdownValue<T extends Nameable> = {
    index: number;
    value: T;
  };
</script>

<script lang="ts">
  export let label: string;
  export let items: Nameable[];
  export let value: Nameable | undefined;
  export let blankItem: string = '';

  function getKey(item: Nameable): string {
    return item?.name || '-';
  }
</script>

<Select variant="outlined" key={getKey} on:MDCSelect:change bind:value {label}>
  {#if blankItem}
    <Option>{blankItem}</Option>
  {/if}
  {#each items as item}
    <Option value={item}>{item.name}</Option>
  {/each}
</Select>
