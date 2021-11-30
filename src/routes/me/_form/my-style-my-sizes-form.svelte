<script lang="ts">
  import Field from '../Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Button, { Label } from '@smui/button';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  import { User } from '$lib/store/auth';
  let gender: string = 'Female';
  let dressSize: string = 'US 8';
  let jeanPantSize: string = 'US 7';
  let topSize: string = 'US Medium';
  let braSize: string = '34C';
  let shoeSize: string = 'US 8';
  let weightSize: number = 48;
  let weightUnit: string = 'kgs';
  let heightSize: number = 169;
  let heightUnit: string = 'cms';
  let bodyStyle: string = 'Slim';

  export let me: User;
  export let is_edit: boolean = true;

  function handleCancelClick() {
    is_edit = false;
  }
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
      <Select bind:value={gender} label="">
        <Option value="Female" selected>Female</Option>
        <Option value="Male">Male</Option>
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="DRESS SIZE" column_1={3} column_2={9}>
      <Select bind:value={dressSize} label="">
        <Option value="US 8" selected>US 8</Option>
        <Option value="US 7">US 7</Option>
        <Option value="US 6">US 6</Option>
      </Select>
    </svelte:component>
    <svelte:component
      this={Field}
      label="JEAN / PANT SIZE"
      column_1={3}
      column_2={9}
    >
      <Select bind:value={jeanPantSize} label="">
        <Option value="US 8" selected>US 8</Option>
        <Option value="US 7">US 7</Option>
        <Option value="US 6">US 6</Option>
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="TOP SIZE" column_1={3} column_2={9}>
      <Select bind:value={topSize} label="">
        <Option value="US Medium" selected>US Medium</Option>
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="BRA SIZE" column_1={3} column_2={9}>
      <Select bind:value={braSize} label="">
        <Option value="34C" selected>34C</Option>
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="SHOE SIZE" column_1={3} column_2={9}>
      <Select bind:value={shoeSize} label="">
        <Option value="US 8" selected>US 8</Option>
        <Option value="US 7">US 7</Option>
        <Option value="US 6">US 6</Option>
      </Select>
    </svelte:component>
    <svelte:component this={Field} label="WEIGHT" column_1={3} column_2={9}>
      <div class="row">
        <div class="d-col-8 m-col-8">
          <Textfield bind:value={weightSize} label="" type="number" />
        </div>
        <div class="d-col-4 m-col-4">
          <Select bind:value={weightUnit} label="">
            <Option value="kgs" selected>kgs</Option>
            <Option value="gs">gs</Option>
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="HEIGHT" column_1={3} column_2={9}>
      <div class="row">
        <div class="d-col-8 m-col-8">
          <Textfield bind:value={heightSize} label="" type="number" />
        </div>
        <div class="d-col-4 m-col-4">
          <Select bind:value={heightUnit} label="">
            <Option value="ms" selected>ms</Option>
            <Option value="cms">cms</Option>
          </Select>
        </div>
      </div>
    </svelte:component>
    <svelte:component this={Field} label="Body Style" column_1={3} column_2={9}>
      <Select bind:value={bodyStyle} label="">
        <Option value="Slim" selected>Slim</Option>
      </Select>
    </svelte:component>
  </div>
  <div class="row mt-20 actions">
    <div class="d-col-6 m-col-12 m-mb-10">
      <svelte:component this={ButtonUnderline} label="Size Guide" />
    </div>
    <div class="d-col-6 m-col-12 m-mb-10">
      <Button variant="unelevated" type="submit"
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
    @media (max-width: 599px){
      :global(.mdc-layout-grid__cell--span-2-phone) {
        width: auto;
        grid-column-end: span 4;
      }
    }
  }
</style>
