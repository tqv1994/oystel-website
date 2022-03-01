<script lang="ts">
  import { Trip } from '$lib/store/trip';
  import TripItem from '../components/TripItem.svelte';

  export let trips: Trip[];
</script>

<div class="row mt-40">
  {#if trips.length > 0}
    {#each trips as trip}
      <div class="d-col-6 m-col-12">
        <svelte:component this={TripItem} {trip} />
      </div>
    {/each}
  {:else}
    <p class="d-col-12 m-col-12">There is no Trip.</p>
  {/if}
</div>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
</style>
