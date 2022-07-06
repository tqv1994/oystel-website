<script lang="ts">
  import BackIcon from '$lib/icons/BackIcon.svelte';
  export let link: string;
  export let label: string;
</script>

<p class="text-h5 m-none d-block mb-30">{label}</p>
<a class="text-h5 m-block d-none m-0 pb-24" href={link}>
  <BackIcon class="mr-10" width={8} height={10} />
  {label}
</a>
