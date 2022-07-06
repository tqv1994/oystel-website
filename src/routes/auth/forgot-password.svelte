<script lang="ts" context="module">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';

  import type { Load } from '@sveltejs/kit';
  import { PASSWORD_RESET_LINK, TIME_RESEND_EMAIL_FORGOT_PW } from '$lib/const';
  import { ppost } from '$lib/utils/fetch';
  import Button from '@smui/button';
  let email: string;

  export const load: Load = async ({ url, session, params }) => {
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

    email = url.searchParams.get('email') || '';
    email = email.replace(' ', '+');
    return {
      props: {
        email,
      },
    };
  };
</script>

<script lang="ts">
  export let email: string;
  import { onMount } from 'svelte';
  import { getWebsiteUrl } from '$lib/utils/link';
  let count = TIME_RESEND_EMAIL_FORGOT_PW;
  let countDownStart = true;
  const countDown = () => {
    if (count > 0 && countDownStart) {
      count--;
      setTimeout(countDown, 1000);
    } else {
      countDownStart = false;
      count = TIME_RESEND_EMAIL_FORGOT_PW;
    }
  };
  onMount(() => {
    countDown();
  });

  const reSendPasswordResetEmail = async () => {
    try {
      const res = await ppost('auth/forgot-password', {
        email,
        continueUrl: `${getWebsiteUrl()}${PASSWORD_RESET_LINK}`,
      });
      if (res.ok) {
        countDownStart = true;
        countDown();
      } else {
        const error = await res.json();
        console.error(error);
        window.pushToast('Something went wrong! Please try again later');
      }
    } catch (error) {
      console.error(error);
      window.pushToast('Something went wrong! Please try again later');
    }
  };
</script>

<div class="content">
  <section class=" d-pt-128 m-pt-70">
    <div class="container">
      <h1>Forgot Password</h1>
      <div class="section-login--messenge-content">
        <p>
          We have sent an email to {#if email}<b>{email}</b>{:else}you{/if} to reset
          your password.
        </p>
        <p>Please check your email and click the link provided.</p>
        <p>If you haven’t received our email click <b>RESEND</b>.</p>
      </div>
      <div>
        {#if !countDownStart}
          <Button
            variant="unelevated"
            type="button"
            on:click={reSendPasswordResetEmail}
            class="btn-submit">RESEND</Button
          >
        {:else}
          <Button
            variant="unelevated"
            type="button"
            on:click={reSendPasswordResetEmail}
            disabled
            class="btn-submit">{count}</Button
          >
        {/if}
      </div>
      <div class="section-resetpw">
        <p>
          Got the email? <a
            href="javascript:void(0);"
            on:click={() => {
              window.openSignInModal();
            }}>Sign in</a
          >
        </p>
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
