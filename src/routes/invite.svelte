<script lang="ts">
  import Button from '@smui/button/Button.svelte';
  import Label from '@smui/common/CommonLabel.svelte';
  import Icon from '@smui/common/CommonIcon.svelte';
  import Layout from '$lib/components/common/Layout.svelte';
</script>

<Layout>
  <h1>You're invited</h1>

  <p>You've been invited to join High Places as an advisor</p>
  <p>
    <Button variant="outlined" type="submit">
      <Label>Accept</Label>
    </Button>
    <Button variant="outlined" type="submit">
      <Label>Reject</Label>
    </Button>
  </p>
</Layout>
