<script lang="ts">
  import Field from '../Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  import ButtonUnderline from '../components/ButtonUnderline.svelte';
  let name: string = 'June Doe';
  let type: string = 'ID Card';
  let file: string = 'JuneDoe_IDCard.pdf';
</script>

<form>
  <svelte:component
    this={Field}
    label="Traveler Name*"
    column_1={4}
    column_2={8}
  >
    <Textfield bind:value={name} label="" type="text" />
  </svelte:component>
  <svelte:component
    this={Field}
    label="Document Type*"
    column_1={4}
    column_2={8}
  >
    <Select bind:value={type} label="">
      <Option value="ID Card" selected>ID Card</Option>
      <Option value="Passport">Husband</Option>
      <Option value="Driver's License">Driver's License</Option>
    </Select>
  </svelte:component>
  <svelte:component
    this={Field}
    label="Upload New File"
    column_1={4}
    column_2={8}
  >
    <Textfield bind:value={file} label="" type="file" />
  </svelte:component>
  <div class="row mt-30 m-none">
    <div class="d-col-4 m-col-12">
      <svelte:component this={Note} />
    </div>
    <div class="d-col-8 m-col-12">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
      <svelte:component
        this={ButtonUnderline}
        class="btn-delete"
        label="Delete Record"
      />
    </div>
  </div>
  <div class="row d-none m-block text-center mt-20">
    <div class="m-col-12 mb-30">
      <svelte:component this={Note} />
    </div>
    <div class="m-col-12 mb-10">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
    </div>
    <div class="m-col-12">
      <svelte:component
        this={ButtonUnderline}
        class="btn-delete"
        label="Delete Record"
      />
    </div>
  </div>
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  form {
    :global(.mdc-text-field),
    :global(.mdc-select) {
      width: 100%;
    }
    :global(.mdc-button.btn-delete) {
      text-decoration: underline;
    }
    :global(input[type='file']::file-selector-button) {
      padding: 7px;
      background-color: #9d9d9d;
      color: #fff;
      border: none;
    }
  }
</style>
