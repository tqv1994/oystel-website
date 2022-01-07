<script lang="ts">
  import Field from '../components/Field.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import Note from '../components/Note.svelte';
  import Button, { Label } from '@smui/button';
  import Icon from '@smui/textfield/icon';
  import {
    convertTravellerToInput,
    Traveller,
    TravellerInput,
  } from '$lib/store/traveller';
  import { salutationTypeStore } from '$lib/store/salutation-type';
  import { get } from 'svelte/store';
  import * as yup from 'yup';
  import { updateTravellerData } from '../../traveller/update-[id].json';
  import { authStore, User } from '$lib/store/auth';
  import { createTravellerData } from '../../traveller/create.json';
  import { createEventDispatcher } from 'svelte';
  import { deleteTravellerData } from '../../traveller/delete-[id].json';
  import Text from '../components/Text.svelte';
import OyDatepicker from '$lib/components/common/OyDatepicker.svelte';

  export var traveller: Traveller | null;
  export let relationship: string = '';
  const salutationTypes = Object.values(get(salutationTypeStore).items);
  let travellerInput: TravellerInput;
  let name: string = '';
  let errors: any = {};
  let me: User | undefined = $authStore.user;
  const dispatch = createEventDispatcher();
  const schemaValidator = yup.object().shape({
    surname: yup.string().required(),
    forename: yup.string().required(),
    birthday: yup.string().required(),
  });
  if (traveller == null) {
    travellerInput = new TravellerInput();
  } else {
    travellerInput = convertTravellerToInput(traveller);
    name = travellerInput.forename + ' ' + travellerInput.surname;
  }
  travellerInput.birthday = travellerInput.birthday || '';

  async function handleSubmitForm() {
    errors = {};
    let apiUrl = '/traveller/';
    let method = 'POST';
    if (traveller == null) {
      apiUrl += 'create.json';
    } else {
      apiUrl += `update-${traveller.id}.json`;
      method = 'PUT';
    }
    try {
      await schemaValidator.validate(travellerInput, { abortEarly: false });
      const res = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...travellerInput,
        }),
      });
      if (res.ok) {
        if (method == 'POST' && me) {
          const data: createTravellerData = await res.json();
          traveller = data.createTraveller.traveller;
          const travellerInputMe = convertTravellerToInput(me.travellerMe);
          switch (relationship) {
            case 'Parent':
              travellerInputMe.parents.push(traveller.id + '');
              break;
            case 'Children':
              travellerInputMe.children = traveller.id + '';
              break;
            case 'Relative':
              travellerInputMe.relatives.push(traveller.id + '');
              break;
            case 'Partner':
              travellerInputMe.partners.push(traveller.id + '');
              break;
            case 'Spouse':
              travellerInputMe.spouse.push(traveller.id + '');
              break;
            case 'Other Relative':
              travellerInputMe.otherRelations.push(traveller.id + '');
              break;
          }
          const resUpdateTravellerMe = await fetch(
            `/traveller/update-me.json`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...travellerInputMe,
              }),
            },
          );
          if (resUpdateTravellerMe.ok) {
            const data: updateTravellerData = await resUpdateTravellerMe.json();
            me.travellerMe = data.updateTraveller.traveller;
            authStore.set({ user: me });
          }
        } else {
          const data: updateTravellerData = await res.json();
          traveller = data.updateTraveller.traveller;
          handleAfterUpdate();
        }
        dispatch('afterSubmit');
      } else {
        window.pushToast('An error occurred');
      }
    } catch (err) {
      if (err.inner) {
        errors = err.inner.reduce((acc, err) => {
          return { ...acc, [err.path]: err.message };
        }, {});
      }
    }
  }

  async function handleDeleteTraveller() {
    const res = await fetch(`/traveller/delete-${traveller?.id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      if (!me) {
        return;
      }
      const data: deleteTravellerData = await res.json();
      traveller = data.deleteTraveller.traveller;
      const travellerInputMe = convertTravellerToInput(me?.travellerMe);
      switch (relationship) {
        case 'Parent':
          travellerInputMe.parents.reduce((acc: string[], item) => {
            if (item == traveller?.id + '') {
              return acc;
            }
            return acc.push(item);
          }, []);
          break;
        case 'Children':
          const children: any = null;
          travellerInputMe.children = children;
          break;
        case 'Spouse':
          travellerInputMe.spouse.reduce((acc: string[], item) => {
            if (item == traveller?.id + '') {
              return acc;
            }
            return acc.push(item);
          }, []);
        case 'Relative':
          travellerInputMe.relatives.reduce((acc: string[], item) => {
            if (item == traveller?.id + '') {
              return acc;
            }
            return acc.push(item);
          }, []);
          break;
        case 'Partner':
          travellerInputMe.partners.reduce((acc: string[], item) => {
            if (item == traveller?.id + '') {
              return acc;
            }
            return acc.push(item);
          }, []);
          break;
        case 'Other Relative':
          travellerInputMe.otherRelations.reduce((acc: string[], item) => {
            if (item == traveller?.id + '') {
              return acc;
            }
            return acc.push(item);
          }, []);
          break;
      }
      const resUpdateTravellerMe = await fetch(`/traveller/update-me.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...travellerInputMe,
        }),
      });
      if (resUpdateTravellerMe.ok) {
        const data: updateTravellerData = await resUpdateTravellerMe.json();
        me.travellerMe = data.updateTraveller.traveller;
        authStore.set({ user: me });
      }
      dispatch('afterSubmit');
    } else {
      window.pushToast('An error occurred');
    }
  }

  function handleAfterUpdate() {
    if (traveller == null) {
      return;
    }
    if (typeof me?.travellerMe != 'undefined') {
      switch (relationship) {
        case 'Children':
          me.travellerMe.children = traveller;
          break;
        case 'Parent':
          me.travellerMe.parents = me.travellerMe.parents.map((item) =>
            item.id == traveller?.id ? traveller : item,
          );
          break;
        case 'Relative':
          me.travellerMe.spouse = me.travellerMe.spouse.map((item) =>
            item.id == traveller?.id ? traveller : item,
          );
          break;
        case 'Relative':
          me.travellerMe.relatives = me.travellerMe.relatives.map((item) =>
            item.id == traveller?.id ? traveller : item,
          );
          break;
        case 'Partner':
          me.travellerMe.partners = me.travellerMe.partners.map((item) =>
            item.id == traveller?.id ? traveller : item,
          );
          break;
        case 'OtherRelative':
          me.travellerMe.otherRelations = me.travellerMe.otherRelations.map(
            (item) => (item.id == traveller?.id ? traveller : item),
          );
          break;
      }
    }
    authStore.set({ user: me });
  }
</script>

<form on:submit|preventDefault={handleSubmitForm}>
  <svelte:component this={Field} label="Name*" column_1={4} column_2={8}
    ><div class="row">
      <div class="d-col-7 m-col-12">
        <Textfield
          bind:value={name}
          label="Name"
          type="text"
          on:input={() => {
            travellerInput.forename = name.split(' ')[0];
            travellerInput.surname = name.split(' ')[1] || '';
          }}
        />
        {#if errors.surname}
          <svelte:component this={Text} class="text-danger text-eyebrow"
            >{errors.surname}</svelte:component
          >
        {/if}
        {#if errors.forename}
          <svelte:component this={Text} class="text-danger text-eyebrow"
            >{errors.forename}</svelte:component
          >
        {/if}
      </div>
      <div class="d-col-5 m-col-12">
        <Select bind:value={travellerInput.salutationType} label="Salutation">
          {#each salutationTypes as item}
            <Option value={item.id}>{item.name}</Option>
          {/each}
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
    <Select
      bind:value={relationship}
      label=""
      disabled={traveller?.id ? true : false}
    >
      <Option value="Parent">Parent</Option>
      <Option value="Spouse">Spouse</Option>
      <Option value="Children">Child</Option>
      <Option value="Relative">Relative</Option>
      <Option value="Partner">Partner</Option>
      <Option value="Other Relative">Other Relative</Option>
    </Select>
  </svelte:component>
  <svelte:component
    this={Field}
    label="Date of Birth"
    column_1={4}
    column_2={8}
  >
    <OyDatepicker bind:value={travellerInput.birthday} />
    {#if errors.birthday}
      <svelte:component this={Text} class="text-danger text-eyebrow"
        >{errors.birthday}</svelte:component
      >
    {/if}
  </svelte:component>
  <div class="row mt-30 m-none">
    <div class="d-col-4 m-col-12">
      <svelte:component this={Note} />
    </div>
    <div class="d-col-8 m-col-12">
      <Button variant="unelevated" type="submit"
        ><Label class="text-button2">Save Changes</Label></Button
      >
      <Button class="btn-delete" type="button" on:click={handleDeleteTraveller}
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
      <Button class="btn-delete" type="button" on:click={handleDeleteTraveller}
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
