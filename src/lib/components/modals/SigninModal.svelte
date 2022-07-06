<script lang="ts">
  import '$lib/firebase';
  import Dialog from '@smui/dialog';
  import { Content } from '@smui/dialog';
  import IconButton from '@smui/icon-button';
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import LayoutGrid from '@smui/layout-grid';
  import { Cell } from '@smui/layout-grid';
  import Textfield from '@smui/textfield';
  import '$lib/firebase';
  import { Svg } from '@smui/common/elements';
  import {
    signInWithEmailAndPassword,
    getAuth,
    inMemoryPersistence,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
  } from 'firebase/auth';
  import { onMount } from 'svelte';
  import * as yup from 'yup';
  import { session } from '$app/stores';
  import { goto } from '$app/navigation';
  import { PASSWORD_RESET_LINK } from '$lib/const';
  import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
  import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
  import type { Auth } from '$lib/store/auth';
  import { getWebsiteUrl } from '$lib/utils/link';
  let open: boolean;
  let showLinkReResetPassword = false;
  let model = {
    email: '',
    password: '',
  };
  let classModal = '';
  let errors = {};
  function openModal() {
    if (!$session.user) {
      open = true;
    } else {
      goto('/me');
    }
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
    window.closeSignInModal();
    window.openSignUpModal();
  }

  function closeHandler(e) {
    window.closeSignInModal();
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
          const res = await fetch('/auth.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            const authRes: Auth = await res.json();
            session.update((s) => {
              s.user = authRes.user;
              s.travellerMe = authRes.travellerMe;
              return s;
            });
            window.closeSignInModal();
            window.pushToast('Logged in successfully');
            // goto('/');
          } else {
            console.error('Error authenticating', res);
          }
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
          const token = await cred.user.getIdToken();
          const res = await fetch('/auth.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });
          if (res.ok) {
            const authRes: Auth = await res.json();
            session.update((s) => {
              s.user = authRes.user;
              s.travellerMe = authRes.travellerMe;
              return s;
            });
            window.closeSignInModal();
            window.pushToast('Logged in successfully');
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
        if (cred.user.emailVerified) {
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
            const authRes: Auth = await res.json();
            session.update((s) => {
              s.user = authRes.user;
              s.travellerMe = authRes.travellerMe;
              return s;
            });
            window.closeSignInModal();
            window.pushToast('Logged in successfully');
            goto('/');
          }
        } else {
          session.set({ user: undefined });
          open = false;
          goto(`/auth/verify?email=${encodeURIComponent(model.email)}`);
        }
      }
      showLinkReResetPassword = false;
    } catch (err) {
      console.log('code', err.code);
      if (
        err.code === 'auth/wrong-password'
      ) {
        errors.password = 'Password is incorrect';
        showLinkReResetPassword = true;
      }else if( err.code === 'auth/user-not-found') {
        errors.email = 'This email is unregistered';
        showLinkReResetPassword = false;
      }else {
        showLinkReResetPassword = false;
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

  const sendMailForgotPassword = async () => {
    if (model.email) {
      const res = await fetch('/p/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: model.email,
          continueUrl: `${getWebsiteUrl()}${PASSWORD_RESET_LINK}`,
        }),
      });
      if (res.ok) {
        showLinkReResetPassword = false;
        open = false;
        goto(`/auth/forgot-password?email=${model.email}`);
      } else {
        const error = await res.json();
        console.error(error);
        window.pushToast('Something went wrong! Please try again later');
        showLinkReResetPassword = false;
      }
    } else {
      window.pushToast('Email address is not valid');
    }
  };

  onMount(() => {
    window.openSignInModal = openModal;
    window.closeSignInModal = closeModal;
  });
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
      <div class="container margin-auto add-padding">
        <LayoutGrid>
          <Cell spanDevices={{ desktop: 6, mobile: 4, tablet: 8 }}>
            <div class="d-pr-150">
              <p class="text-sub-title mb-50">To continue, sign in.</p>
              <h3 class="m-mb-0 text-h1">Welcome Back</h3>
            </div>
          </Cell>
          <Cell spanDevices={{ desktop: 6, tablet: 8, phone: 4 }}>
            <div class="d-pr-100">
              <p class="text-input m-mb-25">Login In Using</p>
              <div class="signin-socials mb-20">
                <LayoutGrid>
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <Button on:click={signInWithFacebook} variant="unelevated">
                      <FacebookIcon
                        color="#000"
                        width={15.126}
                        height={15.126}
                      />
                      <Label class="text-body2">Facebook</Label>
                    </Button>
                  </Cell>
                  <Cell spanDevices={{ desktop: 6, tablet: 4, phone: 2 }}>
                    <Button on:click={signInWithGoogle} variant="unelevated"
                      ><GoogleIcon
                        width={15.126}
                        height={15.126}
                        color="#000"
                      /><Label class="text-body2">Google</Label></Button
                    >
                  </Cell>
                </LayoutGrid>
              </div>
              <div class="title-with-line mb-30">
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
                        <span class="text-danger text-eyebrow"
                          >{errors.email}</span
                        >
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
                        <span class="text-danger text-eyebrow"
                          >{errors.password}</span
                        >
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
                      {#if !showLinkReResetPassword}
                        <a
                          href="javascript:void(0);"
                          on:click={doSignUp}
                          class="text-small">Not a member yet? Sign up.</a
                        >
                      {:else}
                        <a
                          href="javascript:void(0);"
                          on:click={sendMailForgotPassword}
                          class="text-small">Reset password?</a
                        >
                      {/if}
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

<style lang="scss" global>
  @use './src/theme/mixins.scss';
  @use './src/theme/colors.scss';
  @import './src/style/partial/signin-modal.scss';
  #signin-modal {
    @import './src/style/partial/form.scss';
    z-index: 100;
    .close-modal {
      right: 8px !important;
    }
    .mdc-text-field {
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-text-fill-color: #fff !important;
        -webkit-box-shadow: 0 0 0 30px colors.$black inset;
        box-shadow: 0 0 0 30px colors.$black inset;
      }
    }
    .mdc-dialog__content {
      padding-left: 0;
      padding-right: 0;
    }

    @media screen and (max-width: 999px) {
      button.mdc-button {
        min-width: auto;
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
