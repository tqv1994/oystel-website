<script lang="ts">
  import BlurImage from '$lib/components/blur-image.svelte';
  import ChatIcon from '$lib/icons/ChatIcon.svelte';
  import { UploadFile } from '$lib/store/upload-file';
  import IconButton from '@smui/icon-button/IconButton.svelte';
  import ButtonUnderline from './ButtonUnderline.svelte';
  import Field from '../Field.svelte';

  import Modal from './Modal.svelte';
import NextIcon from '$lib/icons/NextIcon.svelte';
  export let open: boolean = false;
  export let name: string;
  export let guests: string[];
  export let advisor: string;
  export let date_join: string;
  export let status: string;
  export let image: UploadFile;
</script>

<div>
  <svelte:component this={Modal} bind:open>
    <IconButton
      class="material-icons btn-close"
      on:click={() => {
        open = false;
      }}>close</IconButton
    >
    <div class="thumbnail">
      <div class="image-cover" style="padding-top: calc(288/935 * 100%)">
        <BlurImage {...image} />
      </div>
    </div>
    <div class="content">
      <div class="row header mb-25">
        <div class="d-col-6 m-col-6"><p class="m-0">TRAVEL DETAILS</p></div>
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
      <div class="row mb-40">
        <div class="d-col-6 m-col-6">{date_join}</div>
        <div class="d-col-6 m-col-6 text-right">Reference: 2234-A</div>
        <div class="d-col-6 m-col-12">
          <p class="mdc-typography--headline1 m-0">{name}</p>
        </div>
        <div class="d-col-6 m-col-12 text-right m-none">
          <span class="status">{status}</span>
        </div>
        <div class="d-col-6 m-col-12 d-none m-block">
          <span class="status">{status}</span>
        </div>
      </div>
      <svelte:component this={Field} column_1={4} column_2={8} label="4 Guests">
        {guests.join(', ')}
      </svelte:component>
      <a href="#" class="text-body1 btn-action">
        <svelte:component
            this={Field}
            column_1={4}
            column_2={8}
            label="View Itinerary"
        >
            <div class="text-right"><svelte:component this={NextIcon} width={10} height={19} /></div>
        </svelte:component>
      </a>
      <svelte:component
        this={Field}
        column_1={4}
        column_2={8}
        label="View Travel Documents"
      >
        <svelte:component this={ButtonUnderline} label="Amazing_Hotel.pdf" />,
        <svelte:component this={ButtonUnderline} label="Airport-pickup.pdf" />,
        <svelte:component this={ButtonUnderline} label="ski-lessions.pdf" />,
      </svelte:component>
      <a href="#" class="text-body1 btn-action">
        <svelte:component
            this={Field}
            column_1={4}
            column_2={8}
            label="Get Invoice"
        >
            <div class="text-right"><svelte:component this={NextIcon} width={10} height={19} /></div>
        </svelte:component>
      </a>
      <svelte:component
        this={Field}
        column_1={4}
        column_2={8}
        label="Travel Insurance"
      >
        AG-556772 
      </svelte:component>
    </div>
  </svelte:component>
</div>

<style lang="scss">
  @use '../../../style/include/grid';
  div {
    --mdc-typography-headline1-font-size: 32px;
    :global(.thumbnail) {
      margin: -20px -24px auto -24px;
    }
    :global(.btn-close) {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 1;
    }
    .status {
      background-color: #9d9d9d;
      color: #fff;
      padding: 8px 20px 5px;
    }
    .header {
      padding: 15px 0;
      border-bottom: 1px solid #000;
    }
    .btn-action{
        margin-bottom: 15px;
        display: block;
        padding-top: 15px;
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
    }
  }
</style>
