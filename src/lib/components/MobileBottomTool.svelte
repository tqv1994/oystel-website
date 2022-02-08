<script lang="ts">
  import { goto } from '$app/navigation';

  import BottomAppBar from '$lib/components/common/BottomAppBar/index.svelte';
  import HeaderActionMobile from '$lib/components/common/HeaderActionMobile/index.svelte';
  import { authStore } from '$lib/store/auth';
  
  let content: string = '';
  let userModel = $authStore.user;
  const itemClick = (event: CustomEvent) => {
    let data = event.detail;
    if (data.content) {
      content = event.detail.content;
      console.log('test',content);
    } else if (data.link !== '') {
      if (userModel && data.link.includes('/me')) {
        goto(data.link);
      } else {
        window.pushToast('Please login to use this feature');
      }
    }
  };
</script>
<BottomAppBar on:itemClick={itemClick} />
<HeaderActionMobile bind:content />
