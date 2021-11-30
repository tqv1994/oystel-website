<script lang="ts">
  import Button from '@smui/button';
  import { Label } from '@smui/common';
  import { Icon } from '@smui/common';
  import Layout from '$lib/components/common/Layout.svelte';
  import InquiryModal from '$lib/components/modals/InquiryModal.svelte';
  let open = true;
</script>

<Layout />
<InquiryModal bind:open />
