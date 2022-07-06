<script lang="ts">
  // https://hat-tap.com/blog/posts/images-in-svelte-lazy-loading-with-placeholder/

  import { onMount } from 'svelte';

  let el: HTMLElement;
  let visible = false;
  let hasBeenVisible = false;
  let observer: IntersectionObserver;
  let rootMargin = '0px 0px 200px 0px';

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        hasBeenVisible = hasBeenVisible || visible;
      },
      { rootMargin: rootMargin },
    );
    observer.observe(el);

    return () => {
      if (!hasBeenVisible) {
        observer.unobserve(el);
      }
    };
  });

  $: if (hasBeenVisible) {
    observer?.unobserve(el);
  }
</script>

<div bind:this={el} style="height: 100%">
  <slot {visible} {hasBeenVisible} />
</div>
