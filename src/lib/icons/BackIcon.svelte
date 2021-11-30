<script lang="ts">
  import { Icon } from '@smui/common';
  import Svg from '@smui/common/elements/Svg.svelte';
  export let width: number | undefined;
  export let height: number | undefined;
  let classNames: string;
  export {classNames as class};
</script>

<Icon class={`${classNames}`} component={Svg} {width} {height} viewBox="0 0 8.056 14.173">
  <path
    data-name="Arrow - Drop Down"
    d="M0,0,5.942,5.553,0,12.054"
    transform="translate(6.996 13.113) rotate(180)"
    fill="none"
    stroke="#000"
    stroke-linecap="round"
    stroke-width="1.5"
  />
</Icon>
  