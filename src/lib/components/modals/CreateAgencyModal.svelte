<script>
  import Dialog from '@smui/dialog';
  import { Title } from '@smui/dialog';
  import { Content } from '@smui/dialog';
  import { Actions } from '@smui/dialog';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import Textfield from '@smui/textfield';
  import { createEventDispatcher } from 'svelte';
  export let open;
  const dispatch = createEventDispatcher();
  let model = {
    name: '',
    domain: '',
  };
  export function openModal() {
    open = true;
  }

  function onSubmit() {}

  function closeHandler(e) {
    model = {
      name: '',
      domain: '',
    };
  }
</script>

<Dialog bind:open on:MDCDialog:closed={closeHandler}>
  <Title class="text-h2">Create an agency</Title>
  <Content id="fullscreen-content" class="light">
    <div class="create-agency-form">
      <form on:submit={onSubmit} action="javascript:void(0);">
        <div class="form-control mb-8">
          <Textfield
            style="width: 100%;"
            bind:value={model.name}
            label="Name"
            type="text"
          />
        </div>
        <div class="form-control mb-40">
          <Textfield
            style="width: 100%;"
            bind:value={model.domain}
            label="Domain"
            type="text"
          />
        </div>
      </form>
    </div>
  </Content>
  <Actions>
    <Button on:click={() => (open = false)}>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={onSubmit()}>
      <Label>Submit</Label>
    </Button>
  </Actions>
</Dialog>
