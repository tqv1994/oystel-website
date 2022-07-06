<script lang="ts">
  import { goto } from '$app/navigation';

  import BottomAppBar from '$lib/components/common/BottomAppBar/index.svelte';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { session } from '$app/stores';

  let content = '';
  let userModel = $session.user;
  const itemClick = (event: CustomEvent) => {
    let data = event.detail;
    if (data.content) {
      content = event.detail.content;
    } else if (data.link !== '') {
      if (userModel) {
        if(data.link !== "/me" && !$session.travellerMe){
          window.pushToast('Please update the information before doing this');
          goto('/me/my-account');
          return;
        }
        goto(data.link);
      } else {
        window.openSignInModal();
      }
    }
  };
</script>

<BottomAppBar on:itemClick={itemClick} />
<HeaderActionMobile bind:content />
