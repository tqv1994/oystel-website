<script>
  import Dialog from '@smui/dialog/Dialog.svelte';
  import Title from '@smui/dialog/Title';
  import Content from '@smui/dialog/Content';
  import Actions from '@smui/dialog/Actions';
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import DataTable from '@smui/data-table/DataTable.svelte';
  import Head from '@smui/data-table/Head.svelte';
  import Body from '@smui/data-table/Body.svelte';
  import Row from '@smui/data-table/Row.svelte';
  import Cell from '@smui/data-table/DataTable.svelte';
  import Textfield from '@smui/textfield/Textfield.svelte';
  import { createEventDispatcher } from 'svelte';
  import Select from '@smui/select/Select.svelte';
  import Option from '@smui/select/Option.svelte';
  export let open;
  const dispatch = createEventDispatcher();
  let model = [];
  model.push({ name: '', email: '', role: '' });
  export function openModal() {
    open = true;
  }
  let roleOptions = [
    { id: 1, name: 'Rolo 1' },
    { id: 2, name: 'Rolo 2' },
  ];

  function onSubmit() {}

  function addMember() {
    model = model.concat({ name: '', email: '', role: '' });
  }

  function removeMember(index) {
    let items = model;
    items.map((item, indexItem) => {
      if (indexItem == index) {
        items.splice(indexItem, 1);
      }
    });
    model = items;
  }

  function closeHandler(e) {
    model = [];
    addMember();
  }
  $: remaining = model.filter((t) => !t.role).length;
</script>

<Dialog bind:open on:MDCDialog:closed={closeHandler}>
  <Title class="text-h2">Invite Members</Title>
  <Content id="fullscreen-content" class="light">
    <div class="invite-members-form">
      <form on:submit={onSubmit} action="javascript:void(0);">
        <DataTable>
          <Head>
            <Row>
              <Cell />
              <Cell
                ><Button on:click={addMember}
                  ><Icon class="material-icons">add</Icon></Button
                ></Cell
              >
            </Row>
          </Head>
          <Body>
            {#each model as item, index}
              <Row>
                <Cell>
                  <div class="form-control mb-8">
                    <Textfield
                      style="width: 100%;"
                      bind:value={item.name}
                      label="Name"
                      type="text"
                    />
                  </div>
                  <div class="form-control mb-8">
                    <Textfield
                      style="width: 100%;"
                      bind:value={item.email}
                      label="Email"
                      type="email"
                    />
                  </div>
                  <div class="form-control mb-8">
                    <div style="justify-content: flex-start;">
                      <Select bind:value={item.role} label="Role">
                        {#each roleOptions as itemRole}
                          <Option value={itemRole.id}>{itemRole.name}</Option>
                        {/each}
                      </Select>
                    </div>
                  </div>
                </Cell>
                <Cell>
                  <Button
                    on:click={() => {
                      removeMember(index);
                    }}><Icon class="material-icons">delete</Icon></Button
                  >
                </Cell>
              </Row>
            {/each}
          </Body>
        </DataTable>
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
