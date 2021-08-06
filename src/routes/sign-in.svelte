<script lang="ts">
  import {
    getAuth,
    signInWithRedirect,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    inMemoryPersistence,
  } from 'firebase/auth';
  import Textfield from '@smui/textfield';
  import Icon from '@smui/textfield/icon';
  import Button, { Label } from '@smui/button';
  import authStore from '../stores/auth';
  import { goto } from '$app/navigation';

  async function google() {
    const auth = getAuth();
    try {
      await auth.setPersistence(inMemoryPersistence);
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  }

  async function signInWithFacebook() {
    const auth = getAuth();
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithRedirect(auth, provider);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  }

  let email = 'tester@test.net';
  let password = 'test--test 1';

  async function onSubmit() {
    const auth = getAuth();
    try {
      await auth.setPersistence(inMemoryPersistence);
      const cred = await signInWithEmailAndPassword(auth, email, password);
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

<h1>Sign up & sign in</h1>

<button on:click={google}>Sign in with Google</button>
-
<button>Sign in with Facebook</button>
<div>
  <h3>Sign in with your email and password</h3>
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
      <Label>Sign in</Label>
    </Button>
  </form>
</div>

<style lang="scss">
    form {
      display: flex;
      flex-direction: column;
    }
</style>
