<script lang="ts">
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';

  export let size = 'sm';
</script>

{#if size == 'sm'}
  <Icon component={Svg} viewBox="-4 -4 24 24">
    <g transform="translate(0.625 0.625)">
      <path
        id="Path_306"
        data-name="Path 306"
        d="M32.867,10.434a3.434,3.434,0,1,0-3.434,3.434A3.444,3.444,0,0,0,32.867,10.434Z"
        transform="translate(-22.152 -7)"
        fill="none"
        stroke="#fff"
        stroke-width="1.25"
      />
      <path
        id="Path_307"
        data-name="Path 307"
        d="M16.9,54.617a5.067,5.067,0,0,1-3.179,0,4.086,4.086,0,0,0-4.458,1.206,6.908,6.908,0,0,0-1.234,3.983c0,.749.485.914,1.234.914h12.1c.749,0,1.288-.165,1.288-.914a6.951,6.951,0,0,0-1.288-3.983A4.1,4.1,0,0,0,16.9,54.617Z"
        transform="translate(-8.029 -45.737)"
        fill="none"
        stroke="#fff"
        stroke-width="1.25"
      />
    </g>
  </Icon>
{:else if size == 'md'}
  <Icon component={Svg} viewBox="0 0 25.599 22.563">
    <g
      id="Icon_-_Profile"
      data-name="Icon - Profile"
      transform="translate(0.721 0.75)"
    >
      <path
        id="Path_306"
        data-name="Path 306"
        d="M36.155,12.077a5.077,5.077,0,1,0-5.077,5.077A5.092,5.092,0,0,0,36.155,12.077Z"
        transform="translate(-20.811 -7)"
        fill="none"
        stroke="#000"
        stroke-width="1.5"
      />
      <path
        id="Path_307"
        data-name="Path 307"
        d="M20.5,54.706a7.123,7.123,0,0,1-4.469,0,5.744,5.744,0,0,0-6.267,1.7A9.712,9.712,0,0,0,8.029,62c0,1.053.682,1.285,1.735,1.285h17c1.053,0,1.81-.231,1.81-1.285a9.771,9.771,0,0,0-1.81-5.6A5.756,5.756,0,0,0,20.5,54.706Z"
        transform="translate(-8 -42.223)"
        fill="none"
        stroke="#000"
        stroke-width="1.5"
      />
    </g>
  </Icon>
{/if}
