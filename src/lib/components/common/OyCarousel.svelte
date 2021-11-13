<script>
  import Siema from 'siema';
  import { onMount, createEventDispatcher } from 'svelte';
  export let isFadeIn = false;
  export let perPage = 3;
  export let loop = true;
  export let autoplay = 0;
  export let duration = 200;
  export let easing = 'ease-in';
  export let startIndex = 0;
  export let draggable = true;
  export let multipleDrag = true;
  export let dots = true;
  export let controls = true;
  export let threshold = 20;
  export let rtl = false;
  let currentIndex = startIndex;

  let siema;
  let controller;
  let timer;
  let allSlides;
  let transitionEvent;
  const dispatch = createEventDispatcher();
  $: pips = controller ? controller.innerElements : [];
  $: currentPerPage = controller ? controller.perPage : perPage;
  $: totalDots = controller
    ? Math.ceil(controller.innerElements.length / currentPerPage)
    : [];
  let prevBackground = '';

  onMount(() => {
    allSlides = document.querySelectorAll('.slide-content');
    transitionEvent = whichTransitionEvent();
    controller = new Siema({
      selector: siema,
      perPage: typeof perPage === 'object' ? perPage : Number(perPage),
      loop,
      duration: isFadeIn ? 0 : duration,
      easing,
      startIndex,
      draggable,
      multipleDrag,
      threshold,
      rtl,
      onInit: () => {
        document.querySelector('.slides > div').style.zIndex = 1;
        document.querySelector('.slides > div').style.position = 'relative';
        allSlides[0].classList.add('current-slide');
        if (isFadeIn) {
          let backDrop = document.createElement('div');
          backDrop.classList.add('back-drop');
          backDrop.style.backgroundImage = allSlides[0].style.backgroundImage;
          document.querySelector('.slides').appendChild(backDrop);
        }
        changeSlide;
      },
      onChange: handleChange,
    });

    if (autoplay) {
      timer = setInterval(right, autoplay);
    }
    return () => {
      autoplay && clearInterval(timer);
      timer = null;
      controller.destroy();
    };
  });
  export function isDotActive(currentIndex, dotIndex) {
    if (currentIndex < 0) currentIndex = pips.length + currentIndex;
    return (
      currentIndex >= dotIndex * currentPerPage &&
      currentIndex < dotIndex * currentPerPage + currentPerPage
    );
  }

  export function left() {
    prevBackground = allSlides[controller.currentSlide].style.backgroundImage;
    controller.prev();
  }

  export function right() {
    // allSlides[controller.currentSlide].removeEventListener(transitionEvent, right);
    prevBackground = allSlides[controller.currentSlide].style.backgroundImage;

    controller.next();
  }
  export function go(index) {
    controller.goTo(index);
  }

  export function pause() {
    clearInterval(timer);
    timer = null;
  }
  export function resume() {
    if (autoplay && !timer) {
      timer = setInterval(right, autoplay);
    }
  }
  function handleChange(event) {
    if (isFadeIn) {
      allSlides[controller.currentSlide].classList.add('current-slide');
      let slidesEl = document.querySelector('.slides .back-drop');
      if (typeof slidesEl != 'undefined') {
        slidesEl.style.backgroundImage = prevBackground;
      }
    }
    //change speed of slide change
    changeSlide();

    currentIndex = controller.currentSlide;
    dispatch('change', {
      currentSlide: controller.currentSlide,
      slideCount: controller.innerElements.length,
    });
  }

  function changeSlide() {
    if (isFadeIn) {
      for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].classList.add('has-fade-in');
        if (i != controller.currentSlide) {
          allSlides[i].classList.remove('current-slide');
          // transitionEvent && allSlides[i].addEventListener(transitionEvent, right);
        }
      }
    }
    // allSlides[controller.currentSlide].classList.add('is-not-active');
    // transitionEvent && allSlides[controller.currentSlide].addEventListener(transitionEvent, right);
  }

  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      transition: 'transitionend',
      OTransition: 'oTransitionEnd',
      MozTransition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
</script>

<div class="carousel">
  <div class="slides" bind:this={siema}>
    <slot />
  </div>
  {#if controls}
    <div class="wrap-control">
      <button class="left" on:click={left} aria-label="left">
        <slot name="left-control" />
      </button>
      <button class="right" on:click={right} aria-label="right">
        <slot name="right-control" />
      </button>
    </div>
  {/if}
  {#if dots}
    <ul class="dots">
      {#each { length: totalDots } as _, i}
        <li
          on:click={() => go(i * currentPerPage)}
          class={isDotActive(currentIndex, i) ? 'active' : ''}
        />
      {/each}
    </ul>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  button {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    z-index: 1;
    margin-top: -20px;
    border: none;
    background-color: transparent;
  }
  button:focus {
    outline: none;
  }

  .left {
    left: 2vw;
  }

  .right {
    right: 2vw;
  }
  ul {
    list-style-type: none;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -30px;
    padding: 0;
  }
  ul li {
    margin: 6px;
    border-radius: 100%;
    background-color: transparent;
    border: 1px solid #fff;
    height: 8px;
    width: 8px;
  }
  ul li:hover {
    background-color: rgba(255, 255, 255, 0.85);
  }
  ul li.active {
    background-color: rgba(255, 255, 255, 1);
  }
  .wrap-control {
    width: var(--wrap-width);
    max-width: 100vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 1px;
    z-index: 2;
  }

  :global(.slide-content.has-fade-in) {
    opacity: 0;
    transition: opacity 1s ease;
  }
  :global(.slide-content.has-fade-in.current-slide) {
    /*animation: fadeIn 0.5s ease 1 normal forwards;*/
    /*animation-timing-function: ;*/
    /*z-index: 3;*/
    /*z-index: 2;*/
    opacity: 1;
  }

  :global(.slides .back-drop) {
    background-image: var(--background-image);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  :global(.slides .back-drop:before) {
    content: '';
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .dots {
    z-index: 2;
  }
</style>
