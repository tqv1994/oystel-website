<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Title from './Title.svelte';
  import TripModal from './TripModal.svelte';

  export let name: string;
  export let guests: string[];
  export let advisor: string;
  export let date_join: string;
  export let status: string;
  export let image: UploadFile;
  let open: boolean = false;
</script>

<div class="box">
  <div class="thumbnail">
    <div class="image-cover" style="padding-top: calc(212 / 383 * 100%)">
      <BlurImage {...image} />
    </div>
    <div class="content">
      <div class="row">
        <div class="d-col-6 m-col-8">
          <p class="m-0">{date_join}</p>
        </div>
        <div class="d-col-6 m-col-4 text-right">
          <span class="status">{status}</span>
        </div>
      </div>
      <svelte:component this={Title}>{name}</svelte:component>
      <p class="m-0">Number of Guests: {guests.length}</p>
      <p class="m-0">Travel Advisor: {advisor}</p>
    </div>
    <div class="actions">
      <div class="row">
        <div class="d-col-6 m-col-6 text-left">
          <svelte:component
            this={ButtonUnderline}
            label="View Detail"
            on:click={() => {
              open = true;
            }}
          />
        </div>
        <div class="d-col-6 m-col-6 text-right">
          <svelte:component
            this={ChatIcon}
            width={16}
            height={14}
            class="mr-5"
          />
          <svelte:component this={ButtonUnderline} label="Live Chat" />
        </div>
      </div>
    </div>
  </div>
</div>

<svelte:component
  this={TripModal}
  bind:open
  {name}
  {guests}
  {advisor}
  {date_join}
  {status}
  {image}
/>

<style lang="scss">
  @use '../../../style/include/grid';
  @use '../../../theme/mixins';
  .box {
    --mdc-typography-body1-font-size: 14px;
    @include mixins.mobile {
      --mdc-typography-body1-font-size: 12px;
    }
    background-color: #f7f7f7;
    position: relative;
    .content,
    .actions {
      padding: 20px;
    }
    .actions {
      border-top: 1px solid #9d9d9d;
    }
    .status {
      --mdc-typography-body1-font-size: 14px;
      background-color: #9d9d9d;
      color: #fff;
      padding: 8px 20px 5px;
    }
  }
</style>
