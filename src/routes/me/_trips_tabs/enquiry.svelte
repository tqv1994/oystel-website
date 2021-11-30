<script lang="ts">
  import { User } from '$lib/store/auth';
  import TripItem from '../components/TripItem.svelte';

  export let me: User;
</script>

<div class="row mt-40">
  <div class="d-col-6 m-col-12">
    <svelte:component
      this={TripItem}
      name="Courcheval, France"
      date_join="Oct 10 – 18, 2021"
      advisor="Jan Wohl"
      status="Pending"
      guests={[
        'Helen Wozniak',
        'Sarah Wozniak',
        'Henry Wozniak',
        'Jake Wozniak',
      ]}
      image={{
          id: "",
          url: "/img/me/trips/trip-1.jpg",
          created_at: "",
          publish_at: ""
      }}
    />
  </div>
  <div class="d-col-6 m-col-12">
    <svelte:component
      this={TripItem}
      name="Dhigu Island, Maldives"
      date_join="Nov 21 – 28, 2021"
      advisor="Mike Harden"
      status="Pending"
      guests={[
        'Helen Wozniak',
        'Sarah Wozniak',
        'Henry Wozniak',
        'Jake Wozniak',
      ]}
      image={{
          id: "",
          url: "/img/me/trips/trip-2.jpg",
          created_at: "",
          publish_at: ""
      }}
    />
  </div>
  <div class="d-col-6 m-col-12">
    <svelte:component
      this={TripItem}
      name="Santorini, Greece"
      date_join="Nov 12 – 20, 2021"
      advisor="Jan Wohl"
      status="Canceled"
      guests={[
        'Helen Wozniak',
        'Sarah Wozniak',
        'Henry Wozniak',
        'Jake Wozniak',
      ]}
      image={{
          id: "",
          url: "/img/me/trips/trip-3.jpg",
          created_at: "",
          publish_at: ""
      }}
    />
  </div>
</div>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
</style>
