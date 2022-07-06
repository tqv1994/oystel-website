<script lang="ts">
  import { ENUM_TRIP_STATE, type Trip } from '$lib/store/trip';
  import { ppatch } from '$lib/utils/fetch';
  import { createEventDispatcher } from 'svelte';
  import TripItem from '../components/TripItem.svelte';
  import type { TripWithImage } from '../trips.svelte';
  const dispatch = createEventDispatcher();
  export let trips: TripWithImage[];

  function handleRemoveTrip(event: CustomEvent<Trip>) {
    dispatch('delete', event.detail);
  }
</script>

<div class="row">
  {#if trips.length > 0}
    {#each trips as trip}
      <div class="d-col-6 m-col-12">
        <TripItem {trip} on:delete={handleRemoveTrip} />
      </div>
    {/each}
  {:else}
    <p class="d-col-12 m-col-12">There is no Trip.</p>
  {/if}
</div>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';

  .row {
    margin-top: 64px;
    @include mixins.mobile {
      margin-top: 32px;
    }
  }
</style>
