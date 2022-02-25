<script lang="ts">
  import '$lib/firebase';
  import Dialog, { Content } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import { Svg } from '@smui/common/elements';
  import {
    createUserWithEmailAndPassword,
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    AuthErrorCodes,
    sendEmailVerification,
  } from 'firebase/auth';
  import { authStore } from '$lib/store/auth';
  import { onMount } from 'svelte';
  import * as yup from 'yup';
  import { routerHelper } from '$lib/helpers/router';
  import { goto } from '$app/navigation';
  let open: boolean;
  let model = {
    email: '',
    password: '',
  };
  let title: string = "Sign Up for Drops Now";
  let subTitle: string = "Join now for exclusive biweekly travel promotional drops, special content, and bespoke travel itineraries.";
  let classModal = '';
  export function openModal(heading?: string, subHeading?: string) {
    title = heading || title;
    subTitle = subHeading ||  subTitle;
    if (!$authStore.user) {
      open = true;
    } else {
      goto('/me');
    }
  }
  let errors = {};

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
  function doSignIn() {
    closeModal();
    window.openSignInModal();
  }

  function closeHandler() {
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
          console.log('token', token);
          const res = await fetch('/auth.json', {
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
            routerHelper.redirect('/');
          }
        } catch (err) {
          console.error('Create/update user failure', err);
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
          const res = await fetch('/auth.json', {
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
    errors = {};
    const auth = getAuth();
    try {
      await schemaValidator.validate(model, { abortEarly: false });
      await auth.setPersistence(inMemoryPersistence);
      const cred = await createUserWithEmailAndPassword(
        auth,
        model.email,
        model.password,
      );
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
          // authModel = authStore.user;
          // doAfterSignup(user);
          sendEmailVerification(cred.user).then(()=>{
            window.pushToast('Thank you for registering. Please verify your email');
            routerHelper.redirect('/');
          });
          // return goto('/me').then(auth.signOut);
        } else {
          const error = await res.json();
          console.log(error);
        }
        console.error('Error authenticating', res);
      }
    } catch (err) {
      if (err.code === AuthErrorCodes.EMAIL_EXISTS) {
        errors.email = 'You have already signed up. Please sign in instead.';
      } else {
        console.error('Error registering', err);
        if (typeof err == 'object') {
          if (err.inner) {
            errors = err.inner.reduce((acc, err) => {
              return { ...acc, [err.path]: err.message };
            }, {});
          }
        }
      }
    }
  }

  onMount(() => {
    window.openSignUpModal = openModal;
    window.closeSignUpModal = closeModal;
  });
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
    <div class="row signup-modal__wrap">
      <div class="col d-col-6 m-col-12 m-mb-25">
        <h2 class="m-0">{title}</h2>
      </div>
      <div class="col d-col-6 m-col-12">
        <p class="text-sub-title m-0">
          {subTitle}
        </p>
      </div>
      <div class="col d-col-6 m-col-12">
        <div class="signup-form">
          <form on:submit={onSubmit} action="javascript:void(0);">
            <LayoutGrid class="mb-30">
              <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
                <div class="form-control">
                  <Textfield
                    class="has-padding-left"
                    style="width: 100%;"
                    bind:value={model.email}
                    label="Email address"
                    type="email"
                  />
                  {#if errors.email}
                    <span class="text-danger text-eyebrow"
                      >{errors.email}</span
                    >
                  {/if}
                </div>
              </Cell>
              <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
                <div class="form-control">
                  <Textfield
                    class="has-padding-left"
                    style="width: 100%;"
                    bind:value={model.password}
                    label="Password"
                    type="password"
                  />
                  {#if errors.password}
                    <span class="text-danger text-eyebrow"
                      >{errors.password}</span
                    >
                  {/if}
                </div>
              </Cell>
            </LayoutGrid>
            <LayoutGrid>
              <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
                <div class="form-control">
                  <Button variant="outlined">
                    <Label class="text-body2">Sign Up Now</Label>
                  </Button>
                </div>
              </Cell>
            </LayoutGrid>
          </form>
        </div>
      </div>
      <div class="col d-col-6 m-col-12">
        <div class="signup-socials">
          <p class="text-input m-mb-10">Or sign up using</p>
          <LayoutGrid class="m-0">
            <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
              <Button
                on:click={signInWithFacebook}
                variant="outlined"
                class=""
              >
                <Icon component={Svg} viewBox="0 0 15.126 15.126">
                  <path
                    id="Icon_-_Facebook"
                    data-name="Icon - Facebook"
                    d="M13.461,0H.788A.787.787,0,0,0,0,.788V13.464a.786.786,0,0,0,.788.785H7.614V8.733H5.758V6.582H7.614V5a2.591,2.591,0,0,1,2.766-2.841,15.693,15.693,0,0,1,1.659.083V4.161H10.9c-.893,0-1.066.423-1.066,1.046V6.579h2.129L11.686,8.73H9.832v5.519h3.629a.789.789,0,0,0,.788-.788V.788A.789.789,0,0,0,13.461,0Z"
                    fill="#ffffff"
                  />
                </Icon>
                <Label class="text-body2">Facebook</Label>
              </Button>
            </Cell>
            <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
              <Button on:click={signInWithGoogle} variant="outlined">
                <Icon component={Svg} viewBox="0 0 15.126 15.126">
                  <path
                    id="Icon_-_Google"
                    data-name="Icon - Google"
                    d="M7.563,0a7.563,7.563,0,1,0,7.563,7.563A7.559,7.559,0,0,0,7.563,0Zm4.345,9.186a4.217,4.217,0,0,1-1.183,1.953,4.3,4.3,0,0,1-1.925.99A4.7,4.7,0,0,1,6.408,12.1,4.971,4.971,0,0,1,4.7,11.248,4.685,4.685,0,0,1,3.438,9.681a4.8,4.8,0,0,1-.413-3.025,4.651,4.651,0,0,1,.413-1.183A4.853,4.853,0,0,1,6.105,3.135a4.8,4.8,0,0,1,3.163.028,4.348,4.348,0,0,1,1.513.935c-.137.165-.3.3-.468.468l-.853.853a2.711,2.711,0,0,0-1.018-.605,2.6,2.6,0,0,0-1.375-.055,2.835,2.835,0,0,0-1.4.77,2.867,2.867,0,0,0-.688,1.1,2.924,2.924,0,0,0,0,1.815A2.8,2.8,0,0,0,6.05,9.873a2.362,2.362,0,0,0,1.045.44,3.106,3.106,0,0,0,1.128,0A2.6,2.6,0,0,0,9.268,9.9,2.109,2.109,0,0,0,10.2,8.443H7.646V6.628h4.4A6.142,6.142,0,0,1,11.908,9.186Z"
                    fill="#ffffff"
                  />
                </Icon>
                <Label class="text-body2">Google</Label></Button
              >
            </Cell>
            <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
                <a
                  href="javascript:void(0);"
                  on:click={doSignIn}
                  class="text-eyebrow">Already a member? Sign in.</a
                >
            </Cell>
          </LayoutGrid>
        </div>
      </div>
    </div>
  </Content>
</Dialog>

<style lang="scss" global>
  @use './src/theme/mixins.scss';
  @use './src/style/include/grid.scss';
  @import './src/style/partial/signup-modal.scss';
  #signup-modal {
    @import './src/style/partial/form.scss';
    .signup-modal__wrap{
      @include mixins.mobile{
        margin-top: 20px;
      }
      .col{
        padding-left: 70px;
        padding-right: 70px;
        margin-bottom: 50px;
        @include mixins.mobile{
          padding-left: var(--mdc-layout-grid-margin-phone);
          padding-right: var(--mdc-layout-grid-margin-phone);
          margin-bottom: 50px;
        }
      }
    }
    .mdc-dialog__content {
      padding-left: var(--mdc-layout-grid-margin-desktop);
      padding-right: var(--mdc-layout-grid-margin-desktop);
      @include mixins.mobile {
        padding-left: 0;
        padding-right: 0;
      }
    }
    @media screen and (max-width: 999px) {
      button.mdc-button {
        padding-left: 15px;
        padding-right: 15px;
      }
    }
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
  }
</style>
