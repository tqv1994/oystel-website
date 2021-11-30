<script lang="ts">
  import Field from '../Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  let name: string = 'June Doe';
  let identification: string = 'Ms.';
  let relationship: string = 'Mother-in-Law';
  let birthday: string = '';
</script>

<form>
  <svelte:component this={Field} label="Name*" column_1={4} column_2={8}
    ><div class="row">
      <div class="d-col-7 m-col-12">
        <Textfield bind:value={name} label="Name" type="text" />
      </div>
      <div class="d-col-5 m-col-12">
        <Select bind:value={identification} label="">
          <Option value="Ms." selected>Ms.</Option>
          <Option value="Mr.">Mr.</Option>
        </Select>
      </div>
    </div>
  </svelte:component>
  <svelte:component
    this={Field}
    label="Relationship*"
    column_1={4}
    column_2={8}
  >
    <Select bind:value={relationship} label="">
      <Option value="Mother-in-Law" selected>Mother-in-Law</Option>
      <Option value="Husband">Husband</Option>
      <Option value="Father">Father</Option>
    </Select>
  </svelte:component>
  <svelte:component
    this={Field}
    label="Date of Birth"
    column_1={4}
    column_2={8}
  >
    <Textfield bind:value={birthday} label="" type="date" />
  </svelte:component>
  <div class="row mt-30 m-none">
    <div class="d-col-4 m-col-12">
      <svelte:component this={Note} />
    </div>
    <div class="d-col-8 m-col-12">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
      <Button class="btn-delete" type="button"
        ><Label class="text-button2">Delete Record</Label></Button
      >
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
        <Button class="btn-delete" type="button"
        ><Label class="text-button2">Delete Record</Label></Button
      >
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
  }
</style>
