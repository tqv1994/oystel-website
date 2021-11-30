<script lang="ts">
  import BackIcon from '$lib/icons/BackIcon.svelte';
  export let link: string;
  export let label: string;
</script>

<p class="text-h5 m-none d-block">{label}</p>
<a class="text-h5 m-block d-none pb-25" href={link}>
  <svelte:component this={BackIcon} class="mr-10" width={8} height={10} />
  {label}
</a>
