<Dialog
        bind:open={open}

        on:MDCDialog:closed={closeHandler}

>
    <Title class="text-h2">Create an agency</Title>
    <Content id="fullscreen-content" class="light">
        <div class="create-agency-form">
            <form on:submit={onSubmit} action="javascript:void(0);">
                <div class="form-control mb-8">
                    <Textfield style="width: 100%;" bind:value={model.name} label="Name" type="text"></Textfield>
                </div>
                <div class="form-control mb-40">
                    <Textfield style="width: 100%;" bind:value={model.domain} label="Domain" type="text"></Textfield>
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
<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button, { Label, Icon } from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher } from 'svelte';
    export let open;
    const dispatch = createEventDispatcher();
    let model = {
        name: '',
        domain: '',
    }
    export function openModal(){
        open = true;
    }

    function onSubmit(){

    }

    function closeHandler(e) {
        model = {
            name: '',
            domain: ''
        }
    }
</script>