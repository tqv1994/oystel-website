<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button, { Label, Icon } from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import Svg from '@smui/common/Svg.svelte';
    import OyCarousel from '../common/OyCarousel.svelte';

    export let open = false;
</script>
<div class="content-wrap popup-products {open ? 'open' : 'close'}">
    <section class="full-width pt-50 pb-70">
        <div class="content-wrap">
            <div class="container">

                <IconButton class="btn-close" on:click={()=>{open=false}}>
                    <Icon component={Svg} viewBox="0 0 14.707 14.707">
                        <g data-name="Close Icon" transform="translate(-4.596 -4.596)">
                            <line id="Line" x2="14" y2="14" transform="translate(4.949 4.949)" fill="none" stroke="#000" stroke-width="1"/>
                            <line id="Line-2" data-name="Line" x1="14" y2="14" transform="translate(4.949 4.949)" fill="none" stroke="#000" stroke-width="1"/>
                        </g>
                    </Icon>
                </IconButton>
                <OyCarousel perPage={{ 800: 1 }} draggable={false}>
              <span class="control" slot="left-control">
                  <Icon><img src="/img/icons/icon-left-arrow.svg" /></Icon> Previous
              </span>
                    <div class="slide-content slide-item">
                        <LayoutGrid class="p-0">
                            <Cell spanDevices={{desktop: 1}} class="m-none"></Cell>
                            <Cell spanDevices={{desktop: 4, tablet: 4, phone: 4}}>
                                <div class="thumbnail">
                                    <img src="/img/slides/product-slide-1.jpg" alt=""/>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 4, tablet: 4, phone: 4}}>
                                <div class="d-mt-90">
                                    <p class="text-eyebrow ">Matteau</p>
                                    <div class="divider mt-25 pb-25"></div>
                                    <h2 class="mb-25">Square-Neck One-Piece Swimsuit</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.</p>
                                    <h3 class="mb-35 mt-20">$425</h3>
                                    <Button variant="outlined"><Label>Purchase Item</Label></Button>
                                </div>
                            </Cell>
                        </LayoutGrid>
                    </div>
                    <div class="slide-content slide-item">
                        <LayoutGrid class="p-0">
                            <Cell spanDevices={{desktop: 1}} class="m-none"></Cell>
                            <Cell spanDevices={{desktop: 4, tablet: 4, phone: 12}}>
                                <div class="thumbnail">
                                    <img src="/img/slides/product-slide-2.jpg" alt=""/>
                                </div>
                            </Cell>
                            <Cell spanDevices={{desktop: 4, tablet: 4, phone: 12}}>
                                <div class="mt-90">
                                    <p class="text-eyebrow ">Matteau</p>
                                    <div class="divider mt-25 pb-25"></div>
                                    <h2 class="mb-25">Square-Neck One-Piece Swimsuit</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac volutpat neque.</p>
                                    <h3 class="mb-35 mt-20">$425</h3>
                                    <Button variant="outlined"><Label>Purchase Item</Label></Button>
                                </div>
                            </Cell>
                        </LayoutGrid>
                    </div>
                    <span class="control" slot="right-control">
                    Next <Icon><img src="/img/icons/icon-right-arrow.svg" /></Icon>
                  </span>
                </OyCarousel>
            </div>
        </div>
    </section>
</div>
<style>
    section{
        --mdc-layout-grid-gutter-desktop: 100px;
        background-color: #fff;
        border-top: 1px solid #000;
    }
    .divider:after{
        background-color: rgba(0,0,0,0.2);
    }
    .popup-products{
        z-index: 100;
        position: fixed;
        left: 50%;
        bottom:0;
        transform: translateX(-50%);
        opacity: 1;
    }
    .popup-products.close{
        opacity: 0;
        bottom: 999px;
    }
    .popup-products.open{
    }

    .popup-products :global(.btn-close){
        position: absolute;
        top: -30px;
        right: 0;
        z-index: 7;
    }
    .popup-products :global(.carousel .wrap-control button.left .control),
    .popup-products :global(.carousel .wrap-control button.right .control){
        position: relative;
    }
    .popup-products :global(.carousel .wrap-control button.left .control i){
        position: absolute;
        left: -20px;
        top: 2px;
    }
    .popup-products :global(.carousel .wrap-control button.right .control i){
         position: absolute;
         right: -20px;
         top: 2px;
    }
    .popup-products :global(.carousel .wrap-control button .control i img){
        filter: brightness(0) !important;

    }

    @media (max-width: 599px) {
        .popup-products{
            top: 0;
            overflow-y: scroll;
        }
        .popup-products :global(.carousel .wrap-control){
            top: 102%;
        }
        .popup-products :global(.carousel button.left){
            left: 5vw;
        }
        .popup-products :global(.carousel button.right){
            right: 12vw;
        }
        .popup-products :global(.btn-close){
            right: 10px;
        }
    }
</style>