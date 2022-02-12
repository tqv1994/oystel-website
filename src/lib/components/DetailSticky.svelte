<script lang="ts">
    import Button from '@smui/button';
    import { Icon } from '@smui/common';
    import IconButton from '@smui/icon-button';
  
    import { Cell } from '@smui/layout-grid';
    import { Svg } from '@smui/common/elements';
    import LayoutGrid from '@smui/layout-grid';
    import { Label } from '@smui/list';
    import Carousel from './Carousel.svelte';
    import { Experience } from '$lib/store/experience';
    import { Destination } from '$lib/store/destination';
    import BlurImage from './blur-image.svelte';
    import { createEventDispatcher } from 'svelte';
    import HeartIcon from '$lib/icons/HeartIcon.svelte';
    import HeartFilledIcon from '$lib/icons/HeartFilledIcon.svelte';
  
    const dispatcher = createEventDispatcher();
    export let data: Experience | Destination;
  
    export const likeItem = () => {
      dispatcher('like');
    };
  </script>
  
  <LayoutGrid class="p-0 show-on-sticky m-none">
    <Cell spanDevices={{ desktop: 7 }}
      ><div class="socials-wrap">
        <span class="text-eyebrow">{data?.country.name}</span>
        <IconButton>
          <Icon component={Svg} viewBox="0 0 13.246 19.134">
            <g
              id="Icon_-_Share"
              data-name="Icon - Share"
              transform="translate(0.5 1.233)"
            >
              <path
                id="Path_318"
                data-name="Path 318"
                d="M153.689-5867H150.7v11.841h12.246V-5867h-2.889"
                transform="translate(-150.699 5872.56)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
              <path
                id="Path_320"
                data-name="Path 320"
                d="M161.543-5862.169v-11.12"
                transform="translate(-155.42 5873.29)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
              <path
                id="Line"
                d="M156.364-5870.5l3.472-3.473,3.472,3.473"
                transform="translate(-153.713 5873.443)"
                fill="none"
                stroke="#000"
                stroke-width="1"
              />
            </g>
          </Icon>
        </IconButton>
        <IconButton class="btn-favorite {data?.liked ? 'liked' : ''}" on:click={()=>likeItem()}>
          <Icon class="like" component={Svg} viewBox="0 0 16.249 14.588">
            <g
              data-name="Icon - Heart"
              transform="translate(0.125 0.125)"
            >
              <path
                id="Heart_Off"
                data-name="Heart Off"
                d="M11.453,0c-.121,0-.245,0-.365.014A4.8,4.8,0,0,0,7.943,1.769,4.789,4.789,0,0,0,4.726.146H4.579A4.528,4.528,0,0,0,0,4.579c-.089,2.3,1.438,4.236,2.6,5.5A25.674,25.674,0,0,0,7.78,14.236a.775.775,0,0,0,.805-.021A25.736,25.736,0,0,0,13.6,9.846c1.107-1.308,2.558-3.313,2.384-5.6A4.536,4.536,0,0,0,11.453,0m0,1.367a3.2,3.2,0,0,1,3.2,2.985c.135,1.776-1.113,3.474-2.062,4.6a24.721,24.721,0,0,1-4.44,3.924A24.207,24.207,0,0,1,3.569,9.138c-.991-1.081-2.3-2.724-2.234-4.506a3.161,3.161,0,0,1,3.237-3.12h.115a3.48,3.48,0,0,1,2.3,1.209l1,1.053.955-1.093a3.485,3.485,0,0,1,2.261-1.3c.084-.008.17-.01.255-.01"
                transform="translate(0.001)"
                stroke="#f0f7f8"
                stroke-width="0.25"
                fill-rule="evenodd"
              />
            </g>
          </Icon>
          <Icon class="liked" component={Svg} viewBox="0 0 16.249 14.588">
            <path
                d="M11.453,0c-.121,0-.245,0-.365.014A4.827,4.827,0,0,0,7.943,1.725,4.829,4.829,0,0,0,4.726.142H4.579A4.477,4.477,0,0,0,0,4.466C-.086,6.7,1.441,8.6,2.6,9.826A25.576,25.576,0,0,0,7.78,13.883a.792.792,0,0,0,.805-.021A25.564,25.564,0,0,0,13.6,9.6c1.107-1.276,2.558-3.231,2.384-5.462A4.49,4.49,0,0,0,11.453,0"
                transform="translate(0)"
                fill="#000"
                fill-rule="evenodd"
              />
          </Icon>
        </IconButton>
      </div>
      <h1 class="mb-0 mt-40">{data?.name}</h1>
    </Cell>
    <Cell spanDevices={{ desktop: 5 }} class="text-right">
      <div class="mt-100">
        <div class="btn-group">
            <Button variant="outlined"
            ><Label>Find My Advisor</Label></Button
            >
            <Button variant="outlined"><Label>What to Pack</Label></Button>
        </div>
      </div>
    </Cell>
  </LayoutGrid>
  
  <style lang="scss">
    @use '../../theme/mixins';
    .socials-wrap{
        display: flex;
        justify-content: left;
        align-items: center;
    }
  </style>
  