<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  import Textfield from '@smui/textfield';
  import * as yup from 'yup';
  import Button, { Label } from '@smui/button';
  import HelperText from '@smui/textfield/helper-text';
  import {
    browserSessionPersistence,
    confirmPasswordReset,
    getAuth,
  } from 'firebase/auth';
  export const load: Load = async ({ url }) => {
    const resetPasswordToken = url.searchParams.get('token');
    if (!resetPasswordToken) {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {
      props: {
        resetPasswordToken,
      },
    };
  };
</script>

<script lang="ts">
  export let resetPasswordToken: string;
  let model = {
    password: '',
    confirm: '',
  };
  let errors: { password: string | null; confirm: string | null } = {
    password: null,
    confirm: null,
  };
  const resetModel = () => {
    model = {
      password: '',
      confirm: '',
    };
  };
  const schemaValidator = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(6, 'Your password must be at least 6 characters'),
    confirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  });

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    errors = {
      password: null,
      confirm: null,
    };
    try {
      await schemaValidator.validate(model, { abortEarly: false });
      const auth = getAuth();
      await auth.setPersistence(browserSessionPersistence); // To save user after logging into the browser session
      await confirmPasswordReset(auth, resetPasswordToken, model.password);
      window.pushToast(
        'Your password has been updated successfully. Please sign-in again.',
      );
      resetModel();
      window.openSignInModal();
    } catch (err) {
      if (
        (err.code === 400 && err.message === 'EXPIRED_OOB_CODE') ||
        err.code === 'auth/expired-action-code' ||
        err.code === 'auth/invalid-action-code'
      ) {
        window.pushToast('Link is invalid or has expired');
        resetModel();
        return;
      }
      if (typeof err == 'object') {
        if (err.inner) {
          errors = err.inner.reduce((acc, err) => {
            return { ...acc, [err.path]: err.message };
          }, {});
          return;
        }
      }
      resetModel();
      window.pushToast('Something went wrong! Please try again later');
    }
  }
</script>

<div class="content">
  <section class=" d-pt-128 m-pt-70">
    <div class="container">
      <div class="reset-password-wrap">
        <h1>Reset Password</h1>
        <form on:submit={onSubmit} action="javascript:void(0);">
          <div class="row mb-20">
            <div class="d-col-12 m-col-12">
              <div class="form-control">
                <Textfield
                  style="width: 100%;"
                  bind:value={model.password}
                  label="New password"
                  type="password"
                  invalid={errors.password ? true : false}
                >
                  <HelperText validationMsg slot="helper">
                    {errors?.password || ''}
                  </HelperText>
                </Textfield>
              </div>
            </div>
            <div class="d-col-12 m-col-12">
              <div class="form-control">
                <Textfield
                  style="width: 100%;"
                  bind:value={model.confirm}
                  label="Confirm password"
                  type="password"
                  invalid={errors.confirm ? true : false}
                >
                  <HelperText validationMsg slot="helper">
                    {errors?.confirm || ''}
                  </HelperText>
                </Textfield>
              </div>
              <!-- {#if errors.confirm}
                <span class="text-danger text-eyebrow">{errors.confirm}</span>
              {/if} -->
            </div>
          </div>
          <div class="form-control mb-20">
            <Button variant="unelevated">
              <Label class="text-body2">SUBMIT</Label>
            </Button>
          </div>
          <div class="form-control">
            Is this a mistake? <a
              href="javascript:void(0);"
              on:click={() => {
                window.openSignUpModal();
              }}>Sign in now</a
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  @use '../../style/include/grid';
  section {
    @include mixins.desktop {
      padding-left: calc(8%);
    }
  }
  .reset-password-wrap {
    padding: 0.3em 1.5em 1.5em;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    @include mixins.desktop {
      width: 450px;
    }
  }
</style>
