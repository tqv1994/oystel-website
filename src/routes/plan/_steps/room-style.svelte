<script lang="ts">
  import Step from '../Step.svelte';
  import FormField from '@smui/form-field';
  import Checkbox from '@smui/checkbox';
  import { Category } from '$lib/store/category';
  import Textfield from '@smui/textfield';
  import ImageWithCheckBox from '../ImageWithCheckBox.svelte';
  import { RoomStyle } from '$lib/store/roomStyle';
  import { TripInput } from '$lib/store/trip';
  export let tripInput: TripInput = new TripInput();
  export let roomStyles: RoomStyle[] = [];
  tripInput.roomStyles = tripInput.roomStyles || [];
  let roomStylesByType: {
    type: string,
    rooms: RoomStyle[];
  }[] = roomStyles.reduce((acc: {
    type: string,
    rooms: RoomStyle[];
  }[], item)=>{
    let index = acc.findIndex((accItem)=> accItem.type == item.roomStyleType.name);
    if(index >= 0){
      acc[index].rooms.push(item);
    }else{
      acc.push({type: item.roomStyleType.name,rooms: [item]});
    }
    return acc;
  },[]);
</script>

<Step
  title="Room style"
  subtitle="Check as many as you wish."
  class="room-style-content"
>
  <div class="row">
    {#each roomStylesByType  as item }
      <div class="d-col-3 m-col-6">
        <h3 class="mdc-typography--headline1 m-0 mb-15">{item.type}</h3>
        <div class="options">
          {#each item.rooms as room}
            <ImageWithCheckBox bind:selected={tripInput.roomStyles} value={room.id} image={room.thumbnail} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</Step>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  * {
    --mdc-typography-headline1-font-size: 30px;
    @include mixins.mobile{
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  :global(.root.room-style-content) {
    :global(.content.content) {
      max-width: 75em;
    }
  }
  label{
    --mdc-typography-headline1-font-size: 30px;
    --mdc-typography-headline1-font-weight: 300;
    @include mixins.mobile{
      --mdc-typography-headline1-font-size: 20px;
    }
  }
  h3{
    @include mixins.mobile{
      height: 38px;
      overflow: hidden;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 2em;
    grid-row-gap: 2em;
  }
  :global(.preferred) {
    margin-top: 2em;
  }
</style>
