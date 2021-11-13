<script lang="ts">
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import Layout from '$lib/components/common/Layout.svelte';
  import InquiryModal from '$lib/components/modals/InquiryModal.svelte';
  let open = true;
</script>

<Layout />
<InquiryModal bind:open />
