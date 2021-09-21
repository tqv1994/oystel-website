<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label, Icon } from '@smui/button';
  import LayoutGrid, { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text/index';
  import {
    createUserWithEmailAndPassword,
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
  } from 'firebase/auth';
  import authStore from '$lib/stores/auth';
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  export let open;
  export let authModel;
  const dispatch = createEventDispatcher();
  let response = 'Nothing yet.';
  let model = {
    email: '',
    password: '',
  };
  let classModal = '';
  export function openModal() {
    open = true;
  }

  function closeModal(){
    setTimeout(()=>{
      open = false;
      classModal = '';
    },500);
    classModal = 'closing';
  }
  function doSignIn() {
    dispatch('close',{
      type: 'open-signin'
    });
  }

  async function signInWithGoogle() {
    const auth = getAuth();
    try {
      await auth.setPersistence(inMemoryPersistence);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async (cred) => {
        if (!cred) {
          return;
        }
        try {
          const token = await cred.user.getIdToken();
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            localStorage.setItem('token', token);
            const user = await res.json();
            authStore.set({ user });
            authModel = user;
            closeModal()
            auth.signOut();
            console.log('going to /me');
            return goto('/me');
          }
          console.error('Error authenticating', res);
        } catch (error) {
          console.error('Create/update user failure', error);
        }
      });
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
      signInWithPopup(auth, provider).then((result) => {
        let user = result.user;
        authStore.set({ user });
        authModel = user;
        closeModal();
      });
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

  function closeHandler(e) {
    closeModal()
    switch (e.detail.action) {
      case 'close':
        response = 'Closed without response.';
        break;
      case 'reject':
        response = 'Rejected.';
        break;
      case 'accept':
        response = 'Accepted.';
        break;
    }
  }

  async function onSubmit() {
    const auth = getAuth();
    try {
      await auth.setPersistence(inMemoryPersistence);
      const cred = await createUserWithEmailAndPassword(
        auth,
        model.email,
        model.password,
      );
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
          // authModel = authStore.user;
          // doAfterSignup(user);
          authModel = user;
          dispatch('close',{
            type: 'refresh'
          });
          closeModal();
          return;
          // return goto('/me').then(auth.signOut);
        }
        console.error('Error authenticating', res);
      }
    } catch (error) {
      console.error('Error registering', error);
    }
  }
</script>

<Dialog
  bind:open
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
  on:MDCDialog:closed={closeHandler}
  id="signup-modal"
  class="dark {classModal}"
>
    <Content id="fullscreen-content">
      <IconButton
              on:click={closeHandler}
              action="close"
              class="material-icons close-modal">close</IconButton
      >
      <LayoutGrid>
        <Cell spanDevices={{ desktop: 4,tablet: 8, phone: 4 }}>
          <div>
            <h3 class="text-sub-title d-mb-50 m-mb-35">
              Join now for exclusive biweekly travel promotional drops,
              special content, and bespoke travel itineraries.
            </h3>
            <h1 class="m-mb-0 mt-0">Never Miss a Drop</h1>
          </div>
        </Cell>
        <Cell spanDevices={{ desktop: 4,tablet: 8, phone: 4 }}>
          <div class="signup-form">
            <form on:submit={onSubmit} action="javascript:void(0);">
              <div class="form-control mb-8">
                <Textfield
                        style="width: 100%;"
                        bind:value={model.email}
                        label="Email address"
                        type="email"
                />
              </div>
              <div class="form-control mb-40">
                <Textfield
                        style="width: 100%;"
                        bind:value={model.password}
                        label="Password"
                        type="password"
                />
              </div>
              <div class="form-control mb-10 mb-30">
                <Button variant="outlined">
                  <Label class="text-body2">Sign Up Now</Label>
                </Button>
              </div>
              <a
                      href="javascript:void(0);"
                      on:click={doSignIn}
                      class="text-small">Already a member? Sign in.</a
              >
            </form>
          </div>
        </Cell>
        <Cell spanDevices={{ desktop: 4,tablet: 8, phone: 4 }}>
          <div class="signup-socials">
            <p class="text-input m-mb-25">Or sign up using</p>
            <Button
                    on:click={signInWithFacebook}
                    variant="outlined"
                    class="mb-15 m-mb-20"
            >
              <Icon><img src="/img/icons/icon-facebook.svg" /></Icon>
              <Label class="text-body2">Facebook</Label>
            </Button>
            <Button
                    on:click={signInWithGoogle}
                    variant="outlined"
                    class="mb-15"
            ><Icon><img src="/img/icons/icon-google.svg" /></Icon><Label
                    class="text-body2">Google</Label
            ></Button
            >
          </div>
        </Cell>
      </LayoutGrid>
    </Content>
</Dialog>
