<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ fetch, session, url }) => {
    let me: User | undefined;
    authStore.subscribe(async ({ user }) => {
      me = user;
    });
    if (typeof me === 'undefined') {
      return {
        status: 302,
        redirect: '/',
      };
    }
    return {
      props: { me },
    };
  };
</script>

<script lang="ts">
  import { authStore } from '$lib/store/auth';
  import { onMount, afterUpdate } from 'svelte';
  import { User } from '$lib/store/auth';

  let active = 'Account Details';
  export let me: User;

  onMount(async () => {});

  // async function getData() {
  //   const res = await fetch('/users/me.json', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem('token'),
  //     }),
  //   });
  //   if (res.ok) {
  //     const content = await res.json();
  //     me = new UserModel(content);
  //     authStore.set({ user: userModel });

  //     // authModel = authStore.user;
  //     // doAfterSignup(user);
  //     return;
  //     // return goto('/me').then(auth.signOut);
  //   } else {
  //     const error = await res.json();
  //     if (error.statusCode == 401) {
  //       localStorage.setItem('token', '');
  //       authStore.set({ user: undefined });
  //     }
  //     goto('/');
  //   }
  // }
</script>

{#if me}
  <slot />
{/if}

<style type="text/css">
  a.text-input {
    text-decoration: underline;
  }
  .user-dashboard .section-header {
    position: relative;
  }
  .user-dashboard .personal-info {
    position: relative;
    padding: 25px 30px;
    border: 1px solid #000;
  }
  .user-dashboard .section-header .btn-sign-out {
    position: absolute;
    right: 0;
    top: 30px;
  }
  .btn-edit {
    position: absolute;
    right: 40px;
    top: 25px;
  }

  .travel-detais,
  .email-preferences,
  .section-setting {
    padding: 25px 30px;
    position: relative;
    border: 1px solid #000;
  }

  .mdc-deprecated-list-item.active {
    border-bottom: 1px solid #000;
  }
  @media screen and (max-width: 768px) {
    .user-dashboard .section-header .btn-sign-out {
      margin-top: 13px;
      position: static;
      margin-bottom: 20px;
      display: block;
    }
  }
</style>
