<script lang="ts">
  import { Destination } from '$lib/store/destination';
  import { Experience } from '$lib/store/experience';
  import { Product } from '$lib/store/product';
import { Searchable } from '$lib/store/types';
import { createEventDispatcher, onMount } from 'svelte';
import Item from './Item.svelte';
  
  
</script>
<div class="slider-items">
    <slot/>
</div>
<style lang="scss">
   
    @keyframes slideUp{
        100%{
            transform: translateY(-50%) translateZ(0);
        }
    }
    @keyframes slideDown{
        0%{
            transform: translateY(-50%) translateZ(0);
        }
        100%{
            transform: translateY(0%) translateZ(0);
        }
    }
    .slider-items{
        overflow: hidden;
    }
    .slider-items :global(.row .col:nth-child(odd)){
        animation: slideUp 30s linear infinite;
    }
    .slider-items :global(.row .col:nth-child(even)){
        animation: slideDown 30s linear infinite;
    }
</style>