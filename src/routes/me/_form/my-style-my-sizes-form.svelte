<script lang="ts">
  import Field from '../components/Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Button, { Label } from '@smui/button';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import { createEventDispatcher } from 'svelte';
  import { MySize, MySizeSelected } from '../my-style.svelte';

  export let data: MySize;
  export let selected: MySizeSelected;
  export let is_edit: boolean = true;

  function handleCancelClick() {
    is_edit = false;
  }

  const dispatcher = createEventDispatcher();
  const onSubmit = () => {
    dispatcher('submit');
  };
</script>

<form>
  <div class="form-header">
    <h3 class="mdc-typography--headline1 m-0">My Sizes</h3>
    <svelte:component
      this={ButtonUnderline}
      class="btn-cancel"
      on:click={handleCancelClick}
      label="Cancel"
    />
  </div>
  <div class="fields">
    <svelte:component this={Field} label="Gender" column_1={3} column_2={9}>
      <Select bind:value={selected.gender} label="">
        {#each data.gender as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="DRESS SIZE" column_1={3} column_2={9}>
      <Select bind:value={selected.dressSize} label="">
        {#each data.dressSize as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component
      this={Field}
      label="JEAN / PANT SIZE"
      column_1={3}
      column_2={9}
    >
      <Select bind:value={selected.jeanPantSize} label="">
        {#each data.jeanPantSize as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="TOP SIZE" column_1={3} column_2={9}>
      <Select bind:value={selected.topSize} label="">
        {#each data.topSize as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="BRA SIZE" column_1={3} column_2={9}>
      <Select bind:value={selected.braSize} label="">
        {#each data.braSize as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="SHOE SIZE" column_1={3} column_2={9}>
      <Select bind:value={selected.shoeSize} label="">
        {#each data.shoeSize as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="WEIGHT" column_1={3} column_2={9}>
      <div class="row">
        <div class="d-col-8 m-col-8">
          <Textfield bind:value={selected.weight} label="" type="number" />
        </div>
        <div class="d-col-4 m-col-4">
          <Select bind:value={selected.weightUnit} label="">
            {#each data.weightUnit as item}
              <Option value={item}>{item}</Option>
            {/each}
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="HEIGHT" column_1={3} column_2={9}>
      <div class="row">
        <div class="d-col-8 m-col-8">
          <Textfield bind:value={selected.height} label="" type="number" />
        </div>
        <div class="d-col-4 m-col-4">
          <Select bind:value={selected.heightUnit} label="">
            {#each data.heightUnit as item}
              <Option value={item}>{item}</Option>
            {/each}
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Body Style" column_1={3} column_2={9}>
      <Select bind:value={selected.bodyStyle} label="">
        {#each data.bodyStyle as item}
          <Option value={item}>{item}</Option>
        {/each}
      </Select>
    </svelte:component>
  </div>
  <div class="row mt-20 actions">
    <div class="d-col-6 m-col-12 m-mb-10">
      <svelte:component this={ButtonUnderline} label="Size Guide" />
    </div>
    <div class="d-col-6 m-col-12 m-mb-10">
      <Button variant="unelevated" type="button" on:click={onSubmit}
        ><Label class="text-button2">Save Changes</Label></Button
      >
    </div>
  </div>
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  @use '../../../theme/sizes';
  form {
    --mdc-typography-headline1-font-size: 32px;
    border: 1px solid #000;
    padding: 20px 20px 30px;
    margin-bottom: 30px;
    .form-header {
      min-height: 30px;
      position: relative;
      margin-bottom: 20px;
    }
    :global(.btn-cancel) {
      text-decoration: underline;
      position: absolute;
      right: 40px;
      top: 50%;
      transform: translateY(-50%);
    }
    :global(.mdc-text-field),
    :global(.mdc-select) {
      width: 100%;
    }
    :global(.mdc-button.btn-delete) {
      text-decoration: underline;
    }
    @include mixins.desktop {
      .fields {
        width: 70%;
      }
    }
    .actions {
      @include mixins.desktop {
        .d-col-6:nth-of-type(even) {
          text-align: right;
        }
      }
      @include mixins.mobile {
        text-align: center;
      }
    }
    @media (min-width: 600px) and (max-width: #{sizes.$desktop-width - 1px}) {
      :global(.mdc-layout-grid__cell--span-4-tablet) {
        width: auto;
        grid-column-end: span 8;
      }
    }
    @media (max-width: 599px) {
      :global(.mdc-layout-grid__cell--span-2-phone) {
        width: auto;
        grid-column-end: span 4;
      }
    }
  }
</style>
