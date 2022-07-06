<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';
  export const load: Load = async ({ session }) => {
    const { user } = session;

    
    return {
      props: { drops: { } },
    };
  };
</script>

<script lang="ts">
  import Loading from '$lib/components/Loading.svelte';
  import SigninModal from '$lib/components/modals/SigninModal.svelte';
  import SignupModal from '$lib/components/modals/SignupModal.svelte';
  import OyNotification from '$lib/components/common/OyNotification.svelte';
</script>

<div class="content-wrap">
  <div>
    <slot />
  </div>
</div>
<Loading />
<SigninModal />
<SignupModal />
<OyNotification />
