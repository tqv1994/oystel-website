<script>
  import { authStore } from '$lib/store/auth';
  import { afterUpdate } from 'svelte';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import Radio from '@smui/radio';
  import FormField from '@smui/form-field';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import InviteMembersModal from '$lib/components/modals/InviteMembersModal.svelte';
  import { goto } from '$app/navigation';
  import Layout from '$lib/components/common/Layout.svelte';
  let active = 'Account Details';
  let model = { name: 'High places', type: 'company' };
  let userModel = $authStore.user;
  const advisorMe = userModel?.advisorMe;
  const agencyApplicationState = advisorMe?.agency.state;
  console.log(advisorMe, agencyApplicationState);
  let modelEmailPreferences = {
    neverMissADrop: false,
    curatedForYou: false,
  };
  let openInviteMembers = false;
  afterUpdate(() => {
    if (!$authStore.user) {
      window.location.href = '/';
    }
  });

  async function signOut() {
    try {
      console.log($authStore.user);
      const res = await fetch('/auth/sign-out.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
        }),
      });
      if (res.ok) {
        authStore.set({ user: undefined });
        location.href = '/';
        return;
      }
      console.error('Error authenticating', res);
    } catch (error) {
      console.error('Create/update user failure', error);
    }
  }

  async function onSubmitApplication(e) {
    try {
      const res = await fetch('/agency.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: model.type,
          name: model.name,
        }),
      });
      if (res.ok) {
        goto('/my-agency/apply');
        return;
      }
      console.error('Error post application', res);
    } catch (error) {
      console.error('Post application error', error);
    }
  }
</script>

<Layout>
  <div class="container">
    <section class="pt-40 pb-40 my-agency-dashboard light">
      {#if agencyApplicationState === 'submitted'}
        <div class="section-header">
          <h1 class="mb-0">Your aplication is pending</h1>
        </div>
        <div class="divider" />
        <div class="section-body">
          <p>
            Your application is pending, we will contact you in case we need
            more information
          </p>
        </div>
      {:else if agencyApplicationState === 'rejected'}
        <div class="section-header">
          <h1 class="mb-0">Your application has been rejected</h1>
        </div>
        <div class="divider" />
        <div class="section-body">
          <p>Your application as been rejected, sorry!</p>
        </div>
      {:else if agencyApplicationState === 'approved'}
        <div class="section-header">
          <p>Advisors</p>
          <h1 class="mb-0">My agency</h1>
        </div>
        <div class="divider" />
        <div class="section-body">
          <h2 class="mt-30 mb-30">High Places</h2>
          <LayoutGrid class="d-pl-0 d-pt-0 d-pr-0">
            <Cell span="6">
              <div class="section-members">
                <LayoutGrid class="p-0 pb-30">
                  <Cell span="12"><h5 class="mb-0 mt-0">Members</h5></Cell>
                  <Cell span="12">
                    <ul class="list-members">
                      <li><a href="#">Member 1</a></li>
                      <li><a href="#">Member 2</a></li>
                      <li><a href="#">Member 3</a></li>
                      <li>
                        <a
                          href="javascript:void(0);"
                          on:click={() => {
                            openInviteMembers = true;
                          }}
                          ><Icon class="material-icons">person_add_alt</Icon> Invite
                          an advisor</a
                        >
                      </li>
                    </ul>
                  </Cell>
                </LayoutGrid>
              </div>
            </Cell>
            <Cell span="6">
              <div class="section-members-pending">
                <LayoutGrid class="p-0 pb-30">
                  <Cell span="12"
                    ><h5 class="mb-0 mt-0">Pending invitations</h5></Cell
                  >
                  <Cell span="12">
                    <ul class="list-members">
                      <li><a href="#">Member 1</a></li>
                      <li><a href="#">Member 2</a></li>
                    </ul>
                  </Cell>
                </LayoutGrid>
              </div>
            </Cell>
          </LayoutGrid>
        </div>
      {:else}
        <div class="section-header">
          <h1 class="mb-0">Join Oysteo</h1>
        </div>
        <div class="divider" />
        <div class="section-body">
          <p>
            Are you a self-employed advisor or do you represent an agency? Apply
            now to join Oysteo
          </p>
          <form on:submit|preventDefault={onSubmitApplication}>
            <div class="radio-demo">
              <FormField>
                <Radio bind:group={model.type} value="company" />
                <span slot="label"> A registered company </span>
              </FormField>
              <FormField>
                <Radio bind:group={model.type} value="brand" />
                <span slot="label"> My brand </span>
              </FormField>
            </div>
            <Textfield
              name="name"
              label="Name of your organisation"
              bind:value={model.name}
              required
            />
            <Button variant="outlined" type="submit">
              <Label>Apply</Label>
            </Button>
          </form>
        </div>
      {/if}
    </section>
    <InviteMembersModal bind:open={openInviteMembers} />
  </div>
</Layout>

<style>
  a.text-input {
    text-decoration: underline;
  }
  .my-agency-dashboard .section-header {
    position: relative;
  }
  .my-agency-dashboard .section-header .btn-sign-out {
    position: absolute;
    right: 0;
    top: 30px;
  }
  /*.user-dashboard .personal-info{*/
  /*    position: relative;*/
  /*    padding: 25px 30px;*/
  /*    border: 1px solid #000;*/
  /*}*/
  .section-members,
  .section-members-pending {
    padding: 25px 30px;
    position: relative;
    border: 1px solid #000;
  }
  .list-members {
    list-style: none;
    padding-left: 0;
  }
  .list-members li {
    margin-bottom: 10px;
  }
  section {
    /*padding: 2em;*/
  }
  .radio-demo > :global(*) {
    margin: 0 0.2em;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 20em;
    border: 1px solid black;
    padding: 2em;
  }
  @media screen and (max-width: 768px) {
    form {
      width: 100%;
      padding: 0;
    }
  }
  form > :global(*) {
    margin: 1em 0;
  }
  form > :global(.mdc-button) {
    align-self: center;
  }
  .container :global(.mdc-form-field) {
    display: flex;
  }
</style>
