<script lang="ts">
  import '$lib/firebase';
  import Textfield from '@smui/textfield';
  import { Icon } from '@smui/common';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import {
    getAuth,
    createUserWithEmailAndPassword,
    inMemoryPersistence,
  } from 'firebase/auth';
  import { session } from '$app/stores';
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
        const res = await fetch('/auth.json', {
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
          session.set({ user });
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
<form action="/auth.json" on:submit|preventDefault={onSubmit}>
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
  <Button variant={email && password ? 'raised' : 'outlined'} type="submit">
    <Label>Register</Label>
  </Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>
