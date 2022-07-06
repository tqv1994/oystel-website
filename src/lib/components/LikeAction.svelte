<script lang="ts" context="module">
  import { goto } from '$app/navigation';
  import { session } from '$app/stores';
  import type { User } from '$lib/store/auth';
  import type { Traveller } from '$lib/store/traveller';
  import { get } from 'svelte/store';

  export function actionLike(callback: any, s: {user: User | undefined, travellerMe: Traveller | undefined}) {
    if (s.user) {
      if (s.travellerMe) {
        callback();
      } else {
        window.pushToast('Please update the information before doing this');
        setTimeout(() => {
          goto('/me/my-account');
        }, 2000);
      }
    } else {
      window.openSignInModal();
    }
  }
</script>
