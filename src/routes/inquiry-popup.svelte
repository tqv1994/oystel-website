<script lang="ts">
    import Button, { Label, Icon } from '@smui/button';
    import Layout from '$lib/components/common/Layout.svelte';
    import InquiryModal from '$lib/components/modals/InquiryModal.svelte';
    let open = true
</script>
<Layout>

</Layout>
<InquiryModal bind:open></InquiryModal>
