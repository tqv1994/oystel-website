<script lang="ts">
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
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
  viewBox="0 0 16 14"
>
  <path
    id="Path_394"
    data-name="Path 394"
    d="M12.819,6.13H2.236A2.236,2.236,0,0,0,0,8.366v5.892A2.236,2.236,0,0,0,2.231,16.5h.78v1.957c0,.929.559,1.173,1.241.542l2.7-2.5h5.871a2.236,2.236,0,0,0,2.231-2.24h0V8.369A2.236,2.236,0,0,0,12.822,6.13Z"
    transform="translate(0.625 -5.505)"
    fill="none"
    stroke="#000"
    stroke-miterlimit="10"
    stroke-width="1.25"
  />
</Icon>
