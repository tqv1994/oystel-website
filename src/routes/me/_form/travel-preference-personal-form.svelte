<script lang="ts">
  import { User } from '$lib/store/auth';
  import FormToggle from '../components/FormToggle.svelte';
  export let me: User;
  export let is_edit: boolean = true;
  function handleCancelClick() {
    is_edit = false;
  }
</script>

<form>
  <svelte:component this={FormToggle} bind:is_edit title="Personal" />
</form>

<style lang="scss">
  @use '../../../style/include/_grid.scss';
  @use '../../../theme/mixins';
  @use '../../../theme/sizes';
</style>
