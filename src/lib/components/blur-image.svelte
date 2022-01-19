<script lang="ts">
  import BlurhashImage from '$lib/components/svelte-blurhash/BlurhashImage.svelte';

  export let url: string;
  export let blurHash: string = 'LjI5DEWB?bRj_4aytRWBozayRjoL';
</script>

<BlurhashImage fadeDuration={1000} src={url} hash={blurHash} />
