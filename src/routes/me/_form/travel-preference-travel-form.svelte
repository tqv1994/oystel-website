<script lang="ts">
  import Textfield from '@smui/textfield';
  import Field from '../Field.svelte';
  import { User } from '$lib/store/auth';
  import Button from '@smui/button/Button.svelte';
  import FormToggle from '../components/FormToggle.svelte';
  import FormField from '@smui/form-field/FormField.svelte';
  import Checkbox from '@smui/checkbox/Checkbox.svelte';
  let flightSelected: string[] = [];
  let hotelSelected: string[] = [];
  let accommodationSelected: string[] = [];
  let hotelAmenitieSelected: string[] = [];
  let groundTransportationSelected: string[] = [];
  let other: string = 'Spa';
  export let me: User;
  export let is_edit: boolean = true;
  function handleCancelClick() {
    is_edit = false;
  }
</script>

<form>
  <svelte:component this={FormToggle} bind:is_edit title="Travel">
    <svelte:component
      this={Field}
      label="Flights"
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        <FormField>
          <Checkbox bind:group={flightSelected} value={'First'} />
          <span slot="label">First</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={flightSelected} value={'Premium'} />
          <span slot="label">Premium</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={flightSelected} value={'Private - hire'} />
          <span slot="label">Private - hire</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={flightSelected} value={'Business'} />
          <span slot="label">Business</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={flightSelected} value={'Economy / Coac'} />
          <span slot="label">Economy / Coac</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={flightSelected} value={'Private - own'} />
          <span slot="label">Private - own</span>
        </FormField>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Hotels"
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Hotel'} />
          <span slot="label">Hotel</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Lodge'} />
          <span slot="label">Lodge</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Villa'} />
          <span slot="label">Villa</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Traditional'} />
          <span slot="label">Traditional</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Modern'} />
          <span slot="label">Modern</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Boutique'} />
          <span slot="label">Boutique</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'City Centre'} />
          <span slot="label">City Centre</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Quiet Location'} />
          <span slot="label">Quiet Location</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelSelected} value={'Resort'} />
          <span slot="label">Resort</span>
        </FormField>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Accommodations"
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        <FormField>
          <Checkbox bind:group={accommodationSelected} value={'Room'} />
          <span slot="label">Room</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={accommodationSelected}
            value={'Suite - open plan'}
          />
          <span slot="label">Suite - open plan</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={accommodationSelected} value={'High Floor'} />
          <span slot="label">High Floor</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={accommodationSelected}
            value={'Room with View'}
          />
          <span slot="label">Room with View</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={accommodationSelected}
            value={'Suite - living area'}
          />
          <span slot="label">Suite - living area</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={accommodationSelected} value={'Low Floor'} />
          <span slot="label">Low Floor</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={accommodationSelected}
            value={'Room with Balcony'}
          />
          <span slot="label">Room with Balcony</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={accommodationSelected}
            value={'Connecting Rooms'}
          />
          <span slot="label">Connecting Rooms</span>
        </FormField>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Hotel Amenities"
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-2">
        <FormField>
          <Checkbox bind:group={hotelAmenitieSelected} value={'Pool'} />
          <span slot="label">Pool</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelAmenitieSelected} value={'Gardens'} />
          <span slot="label">Gardens</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={hotelAmenitieSelected}
            value={'Quality Restaurant'}
          />
          <span slot="label">Quality Restaurant</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={hotelAmenitieSelected}
            value={'Shuttle Service'}
          />
          <span slot="label">Shuttle Service</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelAmenitieSelected} value={'Pet Friendly'} />
          <span slot="label">Suite - living area</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={hotelAmenitieSelected} value={'Other'} />
          <span>Other</span>
          <Textfield label="" bind:value={other} type="text" />
        </FormField>
      </div>
    </svelte:component>
    <svelte:component
      this={Field}
      label="Ground Transportation"
      column_1={3}
      column_2={9}
      class="mb-10"
    >
      <div class="options options-1">
        <FormField>
          <Checkbox
            bind:group={groundTransportationSelected}
            value={'Town Car'}
          />
          <span slot="label">Town Car</span>
        </FormField>
        <FormField>
          <Checkbox bind:group={groundTransportationSelected} value={'Limo'} />
          <span slot="label">Limo</span>
        </FormField>
        <FormField>
          <Checkbox
            bind:group={groundTransportationSelected}
            value={'Meet & Great'}
          />
          <span slot="label">Meet & Great</span>
        </FormField>
      </div>
    </svelte:component>
    <div class="action">
      <Button variant="unelevated" type="submit">Save Changes</Button>
    </div>
  </svelte:component>
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
