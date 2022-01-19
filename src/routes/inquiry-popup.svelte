<script lang="ts">
  import Layout from '$lib/components/common/Layout.svelte';
  import InquiryModal from '$lib/components/modals/InquiryModal.svelte';
  let open = true;
</script>

<Layout />
<InquiryModal bind:open />
