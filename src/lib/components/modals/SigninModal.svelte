<script>
  import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button, { Label, Icon } from '@smui/button';
  import LayoutGrid, { Cell, InnerGrid } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import HelperText from '@smui/textfield/helper-text/index';
  import Svg from '@smui/common/Svg.svelte';
  import {
    signInWithEmailAndPassword,
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    AuthErrorCodes,
  } from 'firebase/auth';
  import authStore from '$lib/api/auth/store';
  import { createEventDispatcher } from 'svelte';
  import { goto } from '$app/navigation';
  import { UserModel } from '$lib/models/user';
  import * as yup from "yup";
import { routerHelper } from '$lib/helpers';
  export let open;
  export let authModel;
  const dispatch = createEventDispatcher();
  let model = {
    email: '',
    password: '',
  };
  let classModal = '';
  let errors = {};
  export function openModal() {
    open = true;
  }
  const schemaValidator = yup.object().shape({
    email: yup.string().required().email().max(255),
    password: yup.string().required().min(6).max(255),
  });

  function closeModal() {
    setTimeout(() => {
      open = false;
      classModal = '';
    }, 500);
    classModal = 'closing';
  }
  function doSignUp() {
    dispatch('close', {
      type: 'open-signup',
    });
  }

  function closeHandler(e) {
    closeModal();
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
            routerHelper.redirect('/');
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
      await auth.setPersistence(inMemoryPersistence);
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider).then(async (cred) => {
        if (!cred) {
          return;
        }
        try {
          console.log('facebook login', cred.user);
          const token = await cred.user.getIdToken();
          console.log('token', token);
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            routerHelper.redirect('/');
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
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log('error login facebook ', error);
      // ...
    }
  }

  async function onSubmit() {
    const auth = getAuth();
    errors = {};
    try {
      await schemaValidator.validate(model, { abortEarly: false });
      await auth.setPersistence(inMemoryPersistence);
      const cred = await signInWithEmailAndPassword(
        auth,
        model.email,
        model.password,
      );
      if (cred && cred.user) {
        const token = await cred.user.getIdToken();
        console.log(token);
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
          routerHelper.redirect('/');
        }
      }
    } catch (err) {
      if(err.code === "auth/user-not-found"){
        errors.email = 'Email or password is incorrect';
      }else{
        console.error('Error registering', err);
        if(typeof err == "object"){
          if(err.inner){
            errors = err.inner.reduce((acc, err) => {
                return { ...acc, [err.path]: err.message };
              }, {});
          }
        }
      }
    }
  }
</script>

<Dialog
  bind:open
  fullscreen
  aria-labelledby="fullscreen-title"
  aria-describedby="fullscreen-content"
  on:MDCDialog:closed={closeHandler}
  id="signin-modal"
  class="dark {classModal}"
>
  <Content id="fullscreen-content">
    <IconButton
      on:click={closeHandler}
      action="close"
      class="material-icons close-modal">close</IconButton
    >
    <div class="content-wrap">
      <div class="container d-m-0">
        <LayoutGrid>
          <Cell spanDevices={{ desktop: 6, mobile: 4, tablet: 8 }}>
            <div class="d-pr-150">
              <p class="text-sub-title mb-50">
                Lorem ipsum dolor sit sen amet, consectetur adipiscing elit, sed
                do eiusmod tempor.
              </p>
              <h1 class="m-mb-0">Welcome Back</h1>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
            <div class="d-pr-100">
              <p class="text-input m-mb-25">Login In Using</p>
              <div class="signin-socials mb-20">
                <LayoutGrid>
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <Button on:click={signInWithFacebook} variant="unelevated">
                      <Icon component={Svg} viewBox="0 0 15.126 15.126">
                        <path
                          id="Icon_-_Facebook"
                          data-name="Icon - Facebook"
                          d="M13.461,0H.788A.787.787,0,0,0,0,.788V13.464a.786.786,0,0,0,.788.785H7.614V8.733H5.758V6.582H7.614V5a2.591,2.591,0,0,1,2.766-2.841,15.693,15.693,0,0,1,1.659.083V4.161H10.9c-.893,0-1.066.423-1.066,1.046V6.579h2.129L11.686,8.73H9.832v5.519h3.629a.789.789,0,0,0,.788-.788V.788A.789.789,0,0,0,13.461,0Z"
                          fill="#5078bc"
                        />
                      </Icon>
                      <Label class="text-body2">Facebook</Label>
                    </Button>
                  </Cell>
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <Button on:click={signInWithGoogle} variant="unelevated"
                      ><Icon component={Svg} viewBox="0 0 15.126 15.126">
                        <path
                          id="Icon_-_Google"
                          data-name="Icon - Google"
                          d="M7.563,0a7.563,7.563,0,1,0,7.563,7.563A7.559,7.559,0,0,0,7.563,0Zm4.345,9.186a4.217,4.217,0,0,1-1.183,1.953,4.3,4.3,0,0,1-1.925.99A4.7,4.7,0,0,1,6.408,12.1,4.971,4.971,0,0,1,4.7,11.248,4.685,4.685,0,0,1,3.438,9.681a4.8,4.8,0,0,1-.413-3.025,4.651,4.651,0,0,1,.413-1.183A4.853,4.853,0,0,1,6.105,3.135a4.8,4.8,0,0,1,3.163.028,4.348,4.348,0,0,1,1.513.935c-.137.165-.3.3-.468.468l-.853.853a2.711,2.711,0,0,0-1.018-.605,2.6,2.6,0,0,0-1.375-.055,2.835,2.835,0,0,0-1.4.77,2.867,2.867,0,0,0-.688,1.1,2.924,2.924,0,0,0,0,1.815A2.8,2.8,0,0,0,6.05,9.873a2.362,2.362,0,0,0,1.045.44,3.106,3.106,0,0,0,1.128,0A2.6,2.6,0,0,0,9.268,9.9,2.109,2.109,0,0,0,10.2,8.443H7.646V6.628h4.4A6.142,6.142,0,0,1,11.908,9.186Z"
                          fill="#5078bc"
                        />
                      </Icon><Label class="text-body2">Google</Label></Button
                    >
                  </Cell>
                </LayoutGrid>
              </div>
              <div class="title-with-line mb-20">
                <b /><span class="title">Or</span><b />
              </div>
              <div class="signin-form">
                <form on:submit={onSubmit} action="javascript:void(0);">
                  <LayoutGrid class="mb-30">
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <div class="form-control">
                        <Textfield
                          style="width: 100%;"
                          bind:value={model.email}
                          label="Email address"
                          type="email"
                          variant="outlined"
                        />
                      </div>
                      {#if errors.email}
                        <span class="text-danger text-eyebrow">{errors.email}</span>
                      {/if}
                    </Cell>
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <div class="form-control">
                        <Textfield
                          style="width: 100%;"
                          bind:value={model.password}
                          label="Password"
                          type="password"
                          variant="outlined"
                        />
                      </div>
                      {#if errors.password}
                        <span class="text-danger text-eyebrow">{errors.password}</span>
                      {/if}
                    </Cell>
                  </LayoutGrid>
                  <LayoutGrid>
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <div class="form-control">
                        <Button variant="unelevated">
                          <Label class="text-body2">Log In</Label>
                        </Button>
                      </div>
                    </Cell>
                    <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                      <a
                        href="javascript:void(0);"
                        on:click={doSignUp}
                        class="text-small">Not a member yet? Sign up.</a
                      >
                    </Cell>
                  </LayoutGrid>
                </form>
              </div>
            </div>
          </Cell>
        </LayoutGrid>
      </div>
    </div>
  </Content>
</Dialog>

<style lang="scss">
  .title-with-line {
    position: relative;
    -js-display: flex;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    b {
      display: block;
      -ms-flex: 1;
      flex: 1;
      height: 1px;
      background-color: #fff;
    }
    .title {
      text-align: center;
      margin: 0 15px;
      font-size: 14px;
    }
  }
  .text-input {
    font-size: var(--mdc-typography-overline-font-size);
    line-height: var(--mdc-typography-overline-line-height);
    font-style: normal;
  }
</style>
