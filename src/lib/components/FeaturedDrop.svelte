<script lang="ts">
import { storeHelper } from '$lib/helpers/store';
import { Action } from '$lib/store/action';

  import { Drop } from '$lib/store/drop';
import { makeLink } from '$lib/utils/link';
import Button, { Label } from '@smui/button';
import LayoutGrid, { Cell } from '@smui/layout-grid';
import { onMount } from 'svelte';
import BlurImage from './blur-image.svelte';
import Carousel from './Carousel.svelte';
  export let drop: Drop;
  export let name: string = 'Featured Drop';
  export let button_1: Action;
  export let button_2: Action;
  const carouselConfig = {
    autoplayDuration: 8000,
    duration: 1500,
    infinite: true,
    particlesToShow: 1,
    chevronPosition: 'outside'
  };
  onMount(()=>{
    let galleryItems = document.querySelectorAll('.gallery-images .gallery-images__item');
    galleryItems.forEach((item, key)=>{
        item.addEventListener("mouseover",function(){
            galleryItems.forEach(function(itemOther){
                itemOther.classList.remove('active');
            });
            item?.classList.add('active');
        });
    });
  });
</script>
<section class="featured-drop">
    <LayoutGrid class="pt-0 pb-0">
        <Cell span={12}>
            <div class="row mb-25">
                <div class="d-col-6 m-col-12 m-mb-0">
                    <h2 class="mt-0 mb-0 featured-drop__title">{name}</h2>
                </div>
                <div class="d-col-6 text-right featured-drop__actions d-block m-none pt-10">
                    {#if button_1}
                        <Button
                            class="mr-10"
                            variant="unelevated"
                            href={button_1.url}
                            ><Label>{button_1.name}</Label></Button
                        >
                    {/if}
                    {#if button_2}
                        <Button
                            variant="outlined"
                            href={button_2.url}
                            ><Label>{button_2.name}</Label></Button
                        >
                    {/if}
                </div>
            </div>
            
            <div class="featured-drop__content">
                <div class="gallery gallery-carousel d-none m-block  mb-10">
                    <Carousel {...carouselConfig}>
                        {#each drop.gallery as item}
                        <div class="thumbnail">
                            <div class="image-cover" style="padding-top: 473px">
                                <BlurImage {...item} />
                            </div>
                        </div>
                        {/each}
                    </Carousel>
                </div>
                <div class="gallery gallery-images d-block m-none  mb-35">
                    {#each drop.gallery as item, i}
                    <div class={`gallery-images__item ${i === 0 ? 'active' : ''}`}>
                        <div class="thumbnail">
                            <div class="image-cover" style="padding-top: 473px;">
                                <BlurImage {...item} />
                            </div>
                        </div>
                    </div>
                    {/each}
                </div>
                <div class="featured-drop__actions d-none m-block">
                    <div class="row mr--5 ml--5">
                        {#if button_1}
                            <div class="col pr-5 pl-5">
                                <Button
                                    variant="raised"
                                    href={button_1.url}
                                    ><Label>{button_1.name}</Label></Button
                                >
                            </div>
                        {/if}
                        {#if button_2}
                            <div class="col pr-5 pl-5">
                                <Button
                                    variant="outlined"
                                    href={button_2.url}
                                    ><Label>{button_2.name}</Label></Button
                                >
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="featured-drop__intro">
                    <div class="row">
                        <div class="d-col-5 m-col-12">
                            <p class="text-eyebrow">Fashion Drop</p>
                            <h3>{drop.name}</h3>
                        </div>
                        <div class="d-col-7 m-col-12">
                            <p class="d-mt-50">{drop.description}</p>
                            <Button
                                class="hover-affect-drop"
                                variant="outlined"
                                href={makeLink('/drops', drop)}
                                ><Label>SHOP THE DROP</Label></Button
                            >
                        </div>
                    </div>
                </div>
            </div>
        </Cell>
    </LayoutGrid>
</section>
<style lang="scss">
    @use '../../style/include/grid';
    @use '../../style/include/button';
    @use '../../theme/mixins';
    @use "../../theme/colors";
    @use "../../theme/variables" as v;
    @use "@material/button" as materialButton;
    .featured-drop{
        :global(.arrow-outside){
            display: none;
        }
        @include mixins.desktop{
            :global(.sc-carousel-dots__container){
                display: none;
            }
        }
        .featured-drop__actions{
            @include mixins.mobile{
                :global(button), :global(a){
                    width: 100%;
                }
            }
        }
    }
    .gallery{
        &.gallery-images{
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            direction: ltr;
            .gallery-images__item{
                transition: flex 1s cubic-bezier(.29,0,.2,1);
                -webkit-transition: flex 1s cubic-bezier(.29,0,.2,1);
                -moz-transition: flex 1s cubic-bezier(.29,0,.2,1);
                will-change: flex;
                flex: 1;
                :global(img){
                    width: calc(100vw * 1087px / 1920px);
                    max-width: calc(100vw * 1087px / 1920px) !important;
                }
                &.active{
                    flex: 3;
                }
            }
        }
        &.gallery-carousel{
            :global(.sc-carousel-dots__container){
                display: none;
            }
        }
    }

    :global(.featured-drop .featured-drop__intro){
        :global(.mdc-button:not(:disabled)){
                --mdc-outlined-button-hover-state-layer-color: transparent;
                min-width: auto;
                width: auto;
                max-width: 100%;
                @include materialButton.outline-width(0,0);
                position: relative;
                border-bottom: 0;
                
            }
            :global(.mdc-button:not(:disabled)::after){
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 1px;
                    background-color: #000;
                    transition: all 800ms;
                }
            :global(.mdc-button:not(:disabled).hover-affect-drop:hover){
                background-color: transparent;
                --mdc-outlined-button-label-text-color: #{colors.$black};
            }
            :global(.mdc-button:not(:disabled).hover-affect-drop:hover::after){
                width: 50%;
            }
        }

        
</style>
