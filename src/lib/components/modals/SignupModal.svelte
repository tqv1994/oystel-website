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
  import { session } from '$app/stores';
  import { onMount } from 'svelte';
  import * as yup from 'yup';
  import { routerHelper } from '$lib/helpers/router';
  import { goto } from '$app/navigation';
  import { ppost } from '$lib/utils/fetch';
  import FacebookIcon from '$lib/icons/FacebookIcon.svelte';
  import GoogleIcon from '$lib/icons/GoogleIcon.svelte';
  import { getWebsiteUrl } from '$lib/utils/link';
  import { setCookie } from '$lib/utils/cookie';
  let open: boolean;
  let model = {
    email: '',
    password: '',
  };
  let title = 'Sign Up for Exclusive Offers';
  let subTitle =
    'Join now for exclusive offers, inspirational travel content, and guides.';
  let classModal = '';
  export function openModal(heading?: string, subHeading?: string) {
    title = heading || title;
    subTitle = subHeading || subTitle;
    if (!$session.user) {
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
    setCookie('isFirstTime', '0', 1);
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
            session.set({ user });
            goto('/');
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
          const token = await cred.user.getIdToken();
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
            session.set({ user });
            goto('/');
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
        const res = await ppost('auth/send-traveller-email-verification-link', {
          email: model.email,
          continueUrl: getWebsiteUrl(),
        });
        if (res.ok) {
          const user = await res.json();
          open = false;
          goto(`/auth/verify?email=${encodeURIComponent(model.email)}`);
          return;
          // authModel = session.user;
          // doAfterSignup(user);
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
      <div class="col d-col-6 m-col-12 text-sub-title-wrapper">
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
                    <span class="text-danger text-eyebrow">{errors.email}</span>
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
        <div class="signup-socials m-mb-20">
          <p class="text-input m-mb-10">Or sign up using</p>
          <LayoutGrid class="m-0">
            <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
              <Button on:click={signInWithFacebook} variant="outlined" class="">
                <Icon component={Svg} viewBox="0 0 15.126 15.126">
                  <FacebookIcon
                    width={15.126}
                    height={15.126}
                    color="#ffffff"
                  />
                </Icon>
                <Label class="text-body2">Facebook</Label>
              </Button>
            </Cell>
            <Cell spanDevices={{ desktop: 12, tablet: 8, phone: 4 }}>
              <Button on:click={signInWithGoogle} variant="outlined">
                <GoogleIcon width={15.126} height={15.126} color="#ffffff" />
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
    z-index: 100;
    .text-sub-title-wrapper {
      @include mixins.mobile {
        margin-bottom: 32px !important;
      }
    }
    :global(.mdc-dialog__content) {
      @include mixins.mobile {
        padding-bottom: 0;
      }
    }
    .signup-modal__wrap {
      @include mixins.mobile {
        margin-top: 20px;
      }
      .col {
        padding-left: 70px;
        padding-right: 70px;
        margin-bottom: 50px;
        @include mixins.mobile {
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
        padding-left: 12px !important;
        padding-right: 12px !important;
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
