<script lang="ts">
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import Button, { Label } from '@smui/button';
  import {
    getAuth,
    createUserWithEmailAndPassword,
    inMemoryPersistence,
  } from 'firebase/auth';
  import authStore from '../stores/auth';
  import { goto } from '$app/navigation';

  let email = 'tester@test.net';
  let password = 'test--test 1';

  async function onSubmit() {
    const auth = getAuth();
    try {
      await auth.setPersistence(inMemoryPersistence);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (cred && cred.user) {
        const token = await cred.user.getIdToken();
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        });
        if (res.ok) {
          const user = await res.json();
          authStore.set({ user });
          return goto('/me').then(auth.signOut);
        }
        console.error('Error authenticating', res);
      }
    } catch (error) {
      console.error('Error registering', error);
    }
  }
</script>

<h1>Register with your email and password</h1>
<form action="/api/register" on:submit|preventDefault={onSubmit}>
  <Textfield
    variant="filled"
    bind:value={email}
    label="Email"
    name="email"
    type="email"
    required
  >
    <Icon class="material-icons" slot="leadingIcon">email</Icon>
  </Textfield>
  <Textfield
    variant="filled"
    bind:value={password}
    label="Password"
    name="password"
    type="password"
    required
  >
    <Icon class="material-icons" slot="leadingIcon">password</Icon>
  </Textfield>
  <Button variant={email && password ? 'raised' : 'outline'} type="submit">
    <Label>Register</Label>
  </Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }

</style>
