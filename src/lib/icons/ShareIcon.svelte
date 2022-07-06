<script lang="ts">
  import { Icon } from '@smui/common';
  import { Svg } from '@smui/common/elements';
  export let size = 'sm';
</script>

{#if size == 'sm'}
  <Icon
    class="like"
    component={Svg}
    width="13.246"
    height="19.134"
    viewBox="0 0 13.246 19.134"
  >
    <g
      id="Icon_-_Share"
      data-name="Icon - Share"
      transform="translate(0.5 0.707)"
    >
      <path
        id="Path_318"
        data-name="Path 318"
        d="M152.713-5867H150.7v7.974h8.247V-5867H157"
        transform="translate(-150.7 5871.099)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
      <path
        id="Path_320"
        data-name="Path 320"
        d="M161.543-5865.8v-7.489"
        transform="translate(-157.42 5873.645)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
      <path
        id="Line"
        d="M156.364-5871.631l2.338-2.338,2.338,2.338"
        transform="translate(-154.579 5873.97)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
    </g>
  </Icon>
{:else if size == 'md'}
  <Icon
    class="like"
    component={Svg}
    width="16.39"
    height="24"
    viewBox="0 0 16.39 24"
  >
    <g
      id="Icon_-_Share"
      data-name="Icon - Share"
      transform="translate(0.5 0.707)"
    >
      <path
        id="Path_318"
        data-name="Path 318"
        d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
        transform="translate(-150.7 5873.086)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
      <path
        id="Path_320"
        data-name="Path 320"
        d="M161.543-5862.169v-11.12"
        transform="translate(-155.42 5873.816)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
      <path
        id="Line"
        d="M156.364-5870.5l3.472-3.473,3.472,3.473"
        transform="translate(-153.713 5873.97)"
        fill="none"
        stroke="#fff"
        stroke-width="1"
      />
    </g>
  </Icon>
{/if}
