<script lang="ts">
  import { Advisor } from '../types';
  import TravelAdvisorItem from './TravelAdvisorItem.svelte';

  export let items: Advisor[];
  export let isPast: boolean = false;
</script>

<div class="row">
  {#each items as item}
    <div class="d-col-6 m-col-12">
      <svelte:component this={TravelAdvisorItem} {item} {isPast} />
    </div>
  {/each}
</div>

<style lang="scss">
  @use '../../../style/include/grid';
</style>
