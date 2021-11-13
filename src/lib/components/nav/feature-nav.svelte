<script lang="ts">
  import { Section } from '@smui/top-app-bar';
  import Button from '@smui/button/Button.svelte';
  import { MenuItem } from './types';
  import BlurImage from '../blur-image.svelte';

  export let menu: MenuItem[];

  let activeItem: MenuItem = menu[0];
</script>

<div class="mdc-top-app-bar__row light">
  <Section class="menu">
    <ul>
      {#each menu as item}
        <li
          on:mouseover={() => (activeItem = item)}
          on:focus={() => (activeItem = item)}
        >
          <span>
            {item.label}
          </span>
        </li>
      {/each}
    </ul>
  </Section>
  <Section class="title">
    <h6>Most popular</h6>
    <h4>{activeItem.title}</h4>
    <Button variant="outlined" href={activeItem.href}>Explore now</Button>
  </Section>
  <Section class="image">
    <BlurImage data={activeItem.image} />
  </Section>
</div>

<style lang="scss">
  .mdc-top-app-bar__row {
    background-color: #fff;
    height: 400px;
  }
  * :global(.menu),
  * :global(.image) {
    align-items: start;
    overflow-y: scroll;
  }
  * :global(.title) {
    flex-direction: column;
  }
</style>
