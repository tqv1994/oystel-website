<script lang="ts">
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Title from './Title.svelte';
  import Text from './Text.svelte';
  import type { Traveller } from '$lib/store/traveller';
  import { dateTimeHelper } from '$lib/helpers/datetime';
  export let traveller: Traveller;
  export let relationship: string;
</script>

<div class="box" on:click>
  <div class="title mb-20">
    <Title class="name"
      >{`${traveller?.forename || ''} ${traveller?.surname || ''}`}</Title
    >
    <Text class="relationship">{relationship}</Text>
    <ButtonUnderline label="Edit" />
  </div>
  <div class="content">
    <Text
      >Date of Birth: {dateTimeHelper.formatDate(traveller.birthday) ||
        ''}</Text
    >
  </div>
</div>

<style lang="scss">
  .box {
    padding: 20px;
    background-color: #f7f7f7;
    --mdc-typography-headline1-font-size: 22px;
    position: relative;
    :global(.name) {
      display: block;
    }
    :global(.relationship) {
      display: inline;
      font-style: oblique;
    }
    :global(.mdc-button) {
      position: absolute;
      top: 25px;
      right: 0;
      text-decoration: underline;
      min-width: auto;
      padding: 0 20px 0 0;
    }
  }
</style>
