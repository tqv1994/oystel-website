<script lang="ts">
  import { goto } from '$app/navigation';

  import BottomAppBar from '$lib/components/common/BottomAppBar/index.svelte';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { authStore } from '$lib/store/auth';
  import { createEventDispatcher } from 'svelte';
  import SigninModal from './modals/SigninModal.svelte';
  import SignupModal from './modals/SignupModal.svelte';

  let content: string = '';
  let userModel = $authStore.user;
  let openSignupModal: boolean = false;
  let openSigninModal: boolean = false;
  const itemClick = (event: CustomEvent) => {
    let data = event.detail;
    if (data.content) {
      content = event.detail.content;
    } else if (data.link !== '') {
      if (userModel && data.link.includes('/me')) {
        goto(data.link);
      } else {
        window.pushToast('Please login to use this feature');
      }
    } else {
      openSigninModal = true;
    }
  };

  function callOpenSignupModal(event: any) {
    userModel = $authStore.user;
    if (!userModel) {
      openSignupModal = true;
      openSigninModal = false;
    }
  }

  function callOpenSigninModal(event: any) {
    userModel = $authStore.user;
    if (!userModel) {
      openSignupModal = false;
      openSigninModal = true;
    }
  }
</script>
<BottomAppBar on:itemClick={itemClick} />
<HeaderActionMobile bind:content />
