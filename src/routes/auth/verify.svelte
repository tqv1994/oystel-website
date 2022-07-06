<script lang="ts" context="module">
  import { ppost } from '$lib/utils/fetch';
  import type { Load } from '@sveltejs/kit';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import Button from '@smui/button';
  import { getWebsiteUrl } from '$lib/utils/link';

  export const load: Load = async ({ url, session }) => {
    if (session.user) {
      const redirect = '/';
      if (browser) {
        goto(redirect);
      } else {
        return {
          status: 302,
          redirect,
        };
      }
    }
    const email = url.searchParams.get('email');

    return {
      props: {
        email,
      },
    };
  };
</script>

<script lang="ts">
  export let email: string;
  let sentTs: number;

  const reSendAccountVerifyLink = async () => {
    if (!email) {
      notify({
        kind: 'error',
        title: 'Oops',
        subtitle:
          "The email address is invalid... you're probably in the wrong place. Redirecting you to the home page",
      });
      // goto('/');
      return;
    }
    const nowTs = new Date().getTime();
    if (sentTs && sentTs < nowTs + 60 * 1000) {
      window.pushToast(
        'Please wait a minute before trying again - even email takes time to be delivered.',
      );
      return;
    }
    try {
      const res = await ppost(`auth/send-traveller-email-verification-link`, {
        email,
        continueUrl: getWebsiteUrl(),
      });
      if (res.ok) {
        sentTs = nowTs;
        window.pushToast(
          "The email has been sent successfully. If you still don't receive it, please check your spam folder or check with your email provider/administator that oysteo.com is whitelisted.",
        );
      } else {
        console.log(res);
      }
    } catch (error) {
      if (error.errorInfo) {
        switch (error.errorInfo) {
          case 'auth/user-not-found':
            window.pushToast(
              "This is strange - we couldn't find your email address... please register again",
            );
            window.openSignUpModal();
            break;
          default:
            console.error(error.errorInfo);
        }
      } else {
        console.error(error);
      }
    }
  };
</script>

<div class="content">
  <section class=" d-pt-128 m-pt-70">
    <div class="container">
      <h1>YOU'RE ONE STEP AWAY</h1>
      <div class="section-login--messenge-content">
        <p>Your OYSTEO account has been confirmed.</p>
        <p>
          Check your email {#if email}<b>{email}</b>{/if} to VERIFY your account
          to instantly access our network of leading travel advisors and travel inspiration.
        </p>
        <p>If you haven't received an email, click <b>RESEND</b>.</p>
      </div>
      <div>
        {#if email}
          <Button
            variant="unelevated"
            type="button"
            on:click={reSendAccountVerifyLink}
            class="btn-submit">RESEND BUTTON</Button
          >
        {/if}
      </div>
    </div>
  </section>
</div>

<style lang="scss">
  @use '../../theme/mixins';
  section {
    @include mixins.desktop {
      padding-left: calc(8%);
    }
  }
</style>
