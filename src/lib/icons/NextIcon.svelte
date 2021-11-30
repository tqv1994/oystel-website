<script lang="ts">
  import { Icon } from '@smui/common';
  import Svg from '@smui/common/elements/Svg.svelte';
  export let width: number | undefined;
  export let height: number | undefined;
  let classNames: string;
  export { classNames as class };
</script>

<Icon
  class={`${classNames}`}
  component={Svg}
  {width}
  {height}
  viewBox="0 0 10 19"
>
  <path
    d="M14957.5,7535l9.215,9.215-9.215,9.215"
    transform="translate(-14957.057 -7534.558)"
    fill="none"
    stroke="#000"
    stroke-width="1.25"
  />
</Icon>
